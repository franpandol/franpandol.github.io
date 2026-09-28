import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { onRequestPost } from "./chat.js";
import { outOfScopeRefusal } from "../lib/chatScope.js";

const CHAT_MODEL = "@cf/ibm-granite/granite-4.0-h-micro";
const EMBED_MODEL = "@cf/baai/bge-m3";

// Each test gets its own CV text so the module-level embedding cache never
// hides embedding calls from a later test.
let cvCounter = 0;
function nextCv() {
  cvCounter += 1;
  return `# Francisco Pandol ${cvCounter}

Backend lead with years of Django and FastAPI experience across several companies.
`;
}

function sseStream(text) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${text}\n\n`));
      controller.close();
    },
  });
}

/**
 * Embeddings: text containing "offtopic" maps to an orthogonal vector, so it
 * scores 0 against the CV chunks; everything else matches them exactly.
 */
function makeEnv(overrides = {}) {
  const run = vi.fn(async (model, input) => {
    if (model === EMBED_MODEL) {
      return {
        data: input.text.map((text) => (/offtopic/i.test(text) ? [0, 1] : [1, 0])),
      };
    }
    return sseStream("model-output");
  });
  const cv = nextCv();
  const env = {
    AI: { run },
    TURNSTILE_SECRET: "secret",
    ASSETS: { fetch: vi.fn(async () => new Response(cv)) },
    ...overrides,
  };
  return { env, run };
}

function makeRequest(body, { raw } = {}) {
  return new Request("https://franpandol.com/api/chat", {
    method: "POST",
    headers: { "CF-Connecting-IP": "203.0.113.7" },
    body: raw ?? JSON.stringify(body),
  });
}

function validBody(overrides = {}) {
  return {
    messages: [{ role: "user", content: "What does Francisco do?" }],
    lang: "en",
    "cf-turnstile-response": "token",
    ...overrides,
  };
}

function stubSiteverify(result, { ok = true } = {}) {
  const fetchMock = vi.fn(async () => ({
    ok,
    json: async () => result,
  }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

const verified = { success: true, action: "chat", hostname: "franpandol.com" };

async function call(env, body, opts) {
  return onRequestPost({ request: makeRequest(body, opts), env });
}

beforeEach(() => {
  stubSiteverify(verified);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("request parsing and validation", () => {
  test("400 on invalid JSON", async () => {
    const { env } = makeEnv();
    const res = await call(env, null, { raw: "{not json" });
    expect(res.status).toBe(400);
  });

  test("400 on invalid messages, after Turnstile passes", async () => {
    const { env, run } = makeEnv();
    const cases = [
      { messages: [] },
      { messages: "hi" },
      { messages: [{ role: "system", content: "x" }] },
      { messages: [{ role: "user", content: "" }] },
      { messages: [{ role: "user", content: "a".repeat(501) }] },
      {
        messages: Array.from({ length: 13 }, () => ({ role: "user", content: "hi" })),
      },
    ];
    for (const overrides of cases) {
      const res = await call(env, validBody(overrides));
      expect(res.status).toBe(400);
    }
    expect(run).not.toHaveBeenCalled();
  });

  test("accepts exactly 12 messages of 500 characters", async () => {
    const { env } = makeEnv();
    const messages = Array.from({ length: 12 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: "a".repeat(500),
    }));
    messages[messages.length - 1] = { role: "user", content: "a".repeat(500) };
    const res = await call(env, validBody({ messages }));
    expect(res.status).toBe(200);
  });
});

describe("Turnstile verification", () => {
  async function expectForbidden(env, body, code) {
    const res = await call(env, body);
    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ error: "Forbidden", code });
  }

  test("rejects a missing token without calling siteverify", async () => {
    const fetchMock = stubSiteverify(verified);
    const { env, run } = makeEnv();
    await expectForbidden(env, validBody({ "cf-turnstile-response": undefined }), "missing_token");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(run).not.toHaveBeenCalled();
  });

  test("rejects an oversized token", async () => {
    const { env } = makeEnv();
    await expectForbidden(
      env,
      validBody({ "cf-turnstile-response": "t".repeat(2049) }),
      "missing_token"
    );
  });

  test("fails closed when the secret is not configured", async () => {
    const { env } = makeEnv({ TURNSTILE_SECRET: "  " });
    await expectForbidden(env, validBody(), "missing_secret");
  });

  test("surfaces the first siteverify error code", async () => {
    stubSiteverify({ success: false, "error-codes": ["invalid-input-response", "other"] });
    const { env } = makeEnv();
    await expectForbidden(env, validBody(), "invalid-input-response");
  });

  test("uses a generic code when siteverify rejects without codes", async () => {
    stubSiteverify({ success: false });
    const { env } = makeEnv();
    await expectForbidden(env, validBody(), "siteverify_rejected");
  });

  test("rejects an action mismatch", async () => {
    stubSiteverify({ ...verified, action: "login" });
    const { env } = makeEnv();
    await expectForbidden(env, validBody(), "action_mismatch");
  });

  test("rejects a hostname that is not allowed", async () => {
    stubSiteverify({ ...verified, hostname: "evil.example" });
    const { env } = makeEnv();
    await expectForbidden(env, validBody(), "hostname_mismatch");
  });

  test("accepts hostnames from TURNSTILE_HOSTNAMES, case-insensitively", async () => {
    stubSiteverify({ ...verified, hostname: "Preview.Example.com" });
    const { env } = makeEnv({ TURNSTILE_HOSTNAMES: "franpandol.com, preview.example.com" });
    const res = await call(env, validBody());
    expect(res.status).toBe(200);
  });

  test("fails closed on a siteverify network error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      })
    );
    const { env } = makeEnv();
    await expectForbidden(env, validBody(), "siteverify_network");
  });

  test("reports non-JSON siteverify responses by HTTP status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: false,
        json: async () => {
          throw new Error("not json");
        },
      }))
    );
    const { env } = makeEnv();
    await expectForbidden(env, validBody(), "siteverify_http");
  });

  test("posts the secret, token and client IP to siteverify", async () => {
    const fetchMock = stubSiteverify(verified);
    const { env } = makeEnv();
    await call(env, validBody());

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
    const params = new URLSearchParams(init.body);
    expect(params.get("secret")).toBe("secret");
    expect(params.get("response")).toBe("token");
    expect(params.get("remoteip")).toBe("203.0.113.7");
  });
});

describe("retrieval failures and refusals", () => {
  test("502 when retrieval throws", async () => {
    const { env } = makeEnv();
    env.AI.run = vi.fn(async () => {
      throw new Error("embedding service down");
    });
    const res = await call(env, validBody());
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "Retrieval failed" });
  });

  test("streams a refusal without calling the chat model for off-topic questions", async () => {
    const { env, run } = makeEnv();
    const res = await call(
      env,
      validBody({ messages: [{ role: "user", content: "offtopic: write me a poem" }] })
    );

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/event-stream");
    const text = await res.text();
    expect(text).toContain(JSON.stringify(outOfScopeRefusal("en")).slice(1, -1));
    expect(run.mock.calls.some(([model]) => model === CHAT_MODEL)).toBe(false);
  });

  test("refuses in Spanish when lang is es", async () => {
    const { env } = makeEnv();
    const res = await call(
      env,
      validBody({ lang: "es", messages: [{ role: "user", content: "offtopic" }] })
    );
    const text = await res.text();
    expect(text).toContain("Solo puedo responder");
  });

  test("refuses when the CV asset cannot be loaded", async () => {
    const { env, run } = makeEnv();
    env.ASSETS.fetch = vi.fn(async () => new Response("", { status: 404 }));
    const res = await call(env, validBody());
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("I can only answer from Francisco");
    expect(run).not.toHaveBeenCalled();
  });
});

describe("generation", () => {
  function chatCall(run) {
    return run.mock.calls.find(([model]) => model === CHAT_MODEL);
  }

  test("streams the chat model output back as SSE", async () => {
    const { env } = makeEnv();
    const res = await call(env, validBody());

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/event-stream");
    expect(res.headers.get("Cache-Control")).toBe("no-cache");
    expect(await res.text()).toContain("model-output");
  });

  test("sends a grounded system prompt followed by the conversation", async () => {
    const { env, run } = makeEnv();
    const messages = [
      { role: "user", content: "Hi" },
      { role: "assistant", content: "Hello" },
      { role: "user", content: "What does Francisco do?" },
    ];
    await call(env, validBody({ messages }));

    const [, input] = chatCall(run);
    expect(input.stream).toBe(true);
    expect(input.messages[0].role).toBe("system");
    expect(input.messages[0].content).toContain("Answer ONLY using the CV excerpts");
    expect(input.messages[0].content).toContain("Django and FastAPI");
    expect(input.messages[0].content).toContain("Always respond in English.");
    expect(input.messages.slice(1)).toEqual(messages);
  });

  test("asks for Spanish answers when lang is es", async () => {
    const { env, run } = makeEnv();
    await call(env, validBody({ lang: "es" }));
    const [, input] = chatCall(run);
    expect(input.messages[0].content).toContain("Responde siempre en español.");
  });

  test("falls back to English for unknown languages", async () => {
    const { env, run } = makeEnv();
    await call(env, validBody({ lang: "fr" }));
    const [, input] = chatCall(run);
    expect(input.messages[0].content).toContain("Always respond in English.");
  });

  test("routes the chat call and the embedding calls through AI Gateway when configured", async () => {
    const { env, run } = makeEnv({ AI_GATEWAY_ID: "default" });
    await call(env, validBody());

    expect(run.mock.calls.length).toBeGreaterThanOrEqual(3);
    for (const call of run.mock.calls) {
      expect(call[2]).toEqual({ gateway: { id: "default", collectLog: true } });
    }
  });

  test("passes no gateway options when AI_GATEWAY_ID is not set", async () => {
    const { env, run } = makeEnv();
    await call(env, validBody());

    expect(run.mock.calls.length).toBeGreaterThanOrEqual(3);
    for (const call of run.mock.calls) {
      expect(call[2]).toBeUndefined();
    }
  });
});
