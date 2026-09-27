/**
 * Cloudflare Pages middleware: serve the same profile as markdown to AI/ATS
 * clients (Accept: text/markdown or known bot User-Agents). Humans still get
 * the React SPA. Facts are identical to /site.md — format only differs.
 */

/** Known AI / LLM / research crawler User-Agent substrings (case-insensitive). */
const AI_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "Google-Extended",
  "GoogleOther",
  "Bytespider",
  "meta-externalagent",
  "FacebookBot",
  "Amazonbot",
  "Applebot-Extended",
  "PerplexityBot",
  "YouBot",
  "CCBot",
  "Diffbot",
  "cohere-ai",
  "AI2Bot",
  "omgili",
  "DuckAssistBot",
];

const STATIC_EXT =
  /\.(md|txt|pdf|js|css|map|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|json|xml|webmanifest)$/i;

function wantsMarkdown(request) {
  const accept = request.headers.get("Accept") || "";
  if (/\btext\/markdown\b/i.test(accept)) return true;

  const ua = request.headers.get("User-Agent") || "";
  return AI_USER_AGENTS.some((token) => ua.includes(token));
}

function isPassthroughPath(pathname) {
  if (pathname === "/site.md" || pathname === "/llms.txt") return true;
  if (pathname.startsWith("/assets/")) return true;
  if (STATIC_EXT.test(pathname)) return true;
  return false;
}

export async function onRequest(context) {
  const { request, next, env } = context;
  const method = request.method.toUpperCase();

  if (method !== "GET" && method !== "HEAD") {
    return next();
  }

  const url = new URL(request.url);
  if (isPassthroughPath(url.pathname)) {
    return next();
  }

  if (!wantsMarkdown(request)) {
    return next();
  }

  const mdRequest = new Request(new URL("/site.md", url.origin), {
    method: "GET",
    headers: request.headers,
  });

  const assetResponse = env.ASSETS
    ? await env.ASSETS.fetch(mdRequest)
    : await fetch(mdRequest);

  if (!assetResponse.ok) {
    return next();
  }

  const headers = new Headers(assetResponse.headers);
  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("Vary", "Accept, User-Agent");
  headers.set("Cache-Control", "public, max-age=300");

  if (method === "HEAD") {
    return new Response(null, {
      status: assetResponse.status,
      headers,
    });
  }

  return new Response(assetResponse.body, {
    status: assetResponse.status,
    headers,
  });
}
