/**
 * Cloudflare Pages Function: CV chatbot backend.
 * Scopes a Workers AI model to Francisco's profile (public/site.md) and
 * streams the reply back as SSE. No external API key: inference runs on
 * Cloudflare's own Workers AI, kept within the free daily neuron budget by
 * using the cheapest instruction-tuned chat model in the catalog.
 */

const MODEL = "@cf/ibm-granite/granite-4.0-h-micro";
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 500;

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

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { messages, lang } = body || {};
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
