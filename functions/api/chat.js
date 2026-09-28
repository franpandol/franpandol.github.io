/**
 * Cloudflare Pages Function: CV chatbot backend.
 * Answers only from retrieved excerpts of public/site.md (Workers AI embeddings
 * + a small chat model). Off-topic questions that don't match the CV are
 * refused before generation. Turnstile siteverify gates every request.
 */

import { outOfScopeRefusal, sseTextStream } from "../lib/chatScope.js";
import { retrieveCvContext } from "../lib/cvRetrieve.js";

const MODEL = "@cf/ibm-granite/granite-4.0-h-micro";
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 500;
const TURNSTILE_ACTION = "chat";
const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function buildSystemPrompt(excerpts, lang) {
  const languageLine =
    lang === "es" ? "Responde siempre en español." : "Always respond in English.";

  return [
    "You are the AI assistant on Francisco Pandol's portfolio site.",
    "Answer ONLY using the CV excerpts below. They are the sole allowed source.",
    "If the excerpts do not contain the answer, say you can only answer from his CV and stop. Do not invent facts.",
    "Never write code, scripts, tutorials, or general programming help — even if asked.",
    "Keep answers short: 2-4 sentences.",
    "Do not add a closing sentence about contacting Francisco or booking an interview — that is appended separately.",
    languageLine,
    "",
    "--- CV EXCERPTS START ---",
    excerpts,
    "--- CV EXCERPTS END ---",
  ].join("\n");
}

function latestUserContent(messages) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index]?.role === "user") {
      return messages[index].content;
    }
  }
  return "";
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

function sseResponse(stream) {
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
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

  const resolvedLang = lang === "es" ? "es" : "en";
  const question = latestUserContent(messages);

  const url = new URL(request.url);
  const profileRequest = new Request(new URL("/site.md", url.origin));
  const profileResponse = env.ASSETS
    ? await env.ASSETS.fetch(profileRequest)
    : await fetch(profileRequest);
  const profileMarkdown = profileResponse.ok ? await profileResponse.text() : "";

  let retrieval;
  try {
    retrieval = await retrieveCvContext({
      env,
      profileMarkdown,
      query: question,
    });
  } catch {
    return Response.json({ error: "Retrieval failed" }, { status: 502 });
  }

  // No matching CV evidence → refuse. Scalable: we don't enumerate off-topic asks.
  if (retrieval.chunks.length === 0) {
    return sseResponse(sseTextStream(outOfScopeRefusal(resolvedLang)));
  }

  const systemPrompt = buildSystemPrompt(retrieval.chunks.join("\n\n---\n\n"), resolvedLang);

  // Optional: route through Cloudflare AI Gateway to log every prompt/response.
  // Enabled only when AI_GATEWAY_ID is set (create the gateway in the dashboard).
  const gatewayId = String(env.AI_GATEWAY_ID ?? "").trim();
  const stream = await env.AI.run(
    MODEL,
    {
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
    },
    gatewayId ? { gateway: { id: gatewayId, collectLog: true } } : undefined,
  );

  return sseResponse(stream);
}
