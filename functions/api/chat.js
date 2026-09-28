/**
 * Cloudflare Pages Function: CV chatbot backend.
 * Scopes a Workers AI model to Francisco's profile (public/site.md) and
 * streams the reply back as SSE. No external API key: inference runs on
 * Cloudflare's own Workers AI, kept within the free daily neuron budget by
 * using the cheapest instruction-tuned chat model in the catalog.
 *
 * Every request is gated on Cloudflare Turnstile siteverify (action: chat).
 */

const MODEL = "@cf/ibm-granite/granite-4.0-h-micro";
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 500;
const TURNSTILE_ACTION = "chat";
const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function buildSystemPrompt(profileMarkdown, lang) {
  const languageLine =
    lang === "es" ? "Responde siempre en español." : "Always respond in English.";

  return [
    "You are the AI assistant embedded on Francisco Pandol's personal portfolio website.",
    "Answer only questions about Francisco's professional experience, skills, availability, and projects, using the profile below as the sole source of truth.",
    "Keep answers short: 2-4 sentences.",
    "Never invent facts that are not in the profile below.",
    "If asked about anything unrelated to Francisco's candidacy (general knowledge, coding help, opinions, etc.), politely decline and steer back to his experience.",
    "Answer the question directly and factually. Do not add a closing sentence about contacting Francisco or booking an interview — that is appended separately, after your answer.",
    languageLine,
    "",
    "--- PROFILE START ---",
    profileMarkdown,
    "--- PROFILE END ---",
  ].join("\n");
}

function isValidMessages(messages) {
  return (
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.length <= MAX_MESSAGES &&
    messages.every(
      (message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.length > 0 &&
        message.content.length <= MAX_MESSAGE_LENGTH
    )
  );
}

function expectedHostnames(env) {
  // Fallback so a missing Pages plain-var never fail-closes every request
  // when the Dashboard only allows encrypted secrets (wrangler-managed vars).
  const raw = String(env.TURNSTILE_HOSTNAMES || "franpandol.com");
  return new Set(
    raw
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean)
  );
}

/**
 * Canonical Turnstile siteverify. Fail closed on any network/parse/mismatch issue.
 * @returns {Promise<{ ok: true } | { ok: false, code: string }>}
 */
async function verifyTurnstile({ token, remoteip, env }) {
  const hostnames = expectedHostnames(env);
  // Dashboard paste often adds a trailing newline; trim so siteverify accepts it.
  const secret = String(env.TURNSTILE_SECRET ?? "").trim();

  if (typeof token !== "string" || token.length === 0 || token.length > 2048) {
    return { ok: false, code: "missing_token" };
  }
  if (!secret) {
    return { ok: false, code: "missing_secret" };
  }
  if (hostnames.size === 0) {
    return { ok: false, code: "missing_hostnames" };
  }

  let result;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteip) {
      body.set("remoteip", remoteip);
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    let response;
    try {
      response = await fetch(SITEVERIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: controller.signal,
        body,
      });
    } finally {
      clearTimeout(timer);
    }

    // Siteverify returns JSON on 4xx (e.g. invalid-input-secret) as well as 2xx.
    try {
      result = await response.json();
    } catch {
      return { ok: false, code: response.ok ? "siteverify_bad_json" : "siteverify_http" };
    }
  } catch {
    return { ok: false, code: "siteverify_network" };
  }

  if (result?.success !== true) {
    const codes = Array.isArray(result?.["error-codes"]) ? result["error-codes"] : [];
    return { ok: false, code: codes[0] || "siteverify_rejected" };
  }
  if (result.action !== TURNSTILE_ACTION) {
    return { ok: false, code: "action_mismatch" };
  }
  const hostname = String(result.hostname || "").toLowerCase();
  if (!hostnames.has(hostname)) {
    return { ok: false, code: "hostname_mismatch" };
  }
  return { ok: true };
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { messages, lang } = body || {};
  const turnstileToken = body?.["cf-turnstile-response"];
  const remoteip = request.headers.get("CF-Connecting-IP") || undefined;

  const verification = await verifyTurnstile({ token: turnstileToken, remoteip, env });
  if (!verification.ok) {
    return Response.json(
      { error: "Forbidden", code: verification.code },
      { status: 403 }
    );
  }

  if (!isValidMessages(messages)) {
    return Response.json({ error: "Invalid messages" }, { status: 400 });
  }

  const url = new URL(request.url);
  const profileRequest = new Request(new URL("/site.md", url.origin));
  const profileResponse = env.ASSETS
    ? await env.ASSETS.fetch(profileRequest)
    : await fetch(profileRequest);
  const profileMarkdown = profileResponse.ok ? await profileResponse.text() : "";

  const systemPrompt = buildSystemPrompt(profileMarkdown, lang === "es" ? "es" : "en");

  const stream = await env.AI.run(MODEL, {
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    stream: true,
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}
