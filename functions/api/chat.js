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
  return new Set(
    String(env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean)
  );
}

/**
 * Canonical Turnstile siteverify. Fail closed on any network/parse/mismatch issue.
 * @returns {Promise<boolean>}
 */
async function verifyTurnstile({ token, remoteip, env }) {
  const hostnames = expectedHostnames(env);
  const secret = env.TURNSTILE_SECRET;

  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    hostnames.size === 0 ||
    typeof secret !== "string" ||
    secret.length === 0
  ) {
    return false;
  }

  let result;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteip) {
      body.set("remoteip", remoteip);
    }

    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body,
    });
    if (!response.ok) {
      return false;
    }
    result = await response.json();
  } catch {
    return false;
  }

  return (
    result?.success === true &&
    result.action === TURNSTILE_ACTION &&
    hostnames.has(result.hostname)
  );
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

  const allowed = await verifyTurnstile({ token: turnstileToken, remoteip, env });
  if (!allowed) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
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
