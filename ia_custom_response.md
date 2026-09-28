# Persona

**Name:** Elena Vargas  
**Role:** Senior technical writer and independent technology reporter  
**Beat:** Developer tooling, web platforms, and how engineers make products legible to both people and machines  
**Audience:** Recruiters, engineering managers, and developers who care about machine-readable profiles and production edge infrastructure  
**Assignment:** Cover Francisco Pandol’s portfolio work with a clear, concrete, slightly journalistic voice — promote him as a Software Project Leader and Backend Tech Lead who ships thoughtful infrastructure, not just UI polish. Explain *why* each step mattered. No invented credentials; no hype fluff.

---

# When the Crawler Can’t Run JavaScript: How Francisco Pandol Made His Portfolio Speak Markdown to AI and ATS Systems

*By Elena Vargas*

Most personal sites still treat search engines and résumé parsers as an afterthought. Francisco Pandol’s portfolio at [franpandol.com](https://franpandol.com) is a polished React SPA — and that creates a quiet failure mode: an applicant-tracking system or AI agent that fetches the homepage without executing JavaScript receives an empty shell. Title tags, maybe. No experience. No stack. No story.

Pandol fixed that the way a backend lead would: same facts, different format, served at the edge. Here is every step of how that feature landed — and why each one matters.

## The problem: a beautiful SPA that crawlers never see

Pandol’s site is built with React, Vite, React Router, and Tailwind, hosted on Cloudflare Pages. Client-side routing depends on a Cloudflare `_redirects` rule that maps every path to `index.html` with a 200 response. Humans get a fast app. Machines that do not run JS get roughly this:

- Meta description and Open Graph tags from `index.html`
- An empty `<div id="root"></div>`
- A `<noscript>` note that the app needs JavaScript

For a recruiter’s browser, that is fine. For an ATS or an LLM crawler scanning `/` or `/experience`, it is a blank résumé. Pandol already offered a downloadable Markdown CV from the contact page — but that only helps if something *knows to fetch it*. The goal became broader: make the profile machine-readable by default, without watering down the human experience.

**Non-negotiable constraint:** serve the *same* facts to bots and humans. Change the format, not the narrative. Different content for crawlers would be cloaking. Format negotiation is infrastructure.

## Step 1 — Generate Markdown from the same sources the UI uses

The first move was not a Worker. It was a single source of truth.

Experience lives in `src/data/experience.json`. Copy lives in `src/locales/en.json`. Contact and interview windows live in `src/constants/contact.js` and `src/data/availability.js`. Personal projects live in `src/data/projects.js`. The React pages already transform those files for the browser.

Pandol added `scripts/generate-site-md.mjs`, a Node build script that:

1. Reads those same sources
2. Strips i18n rich-text tags (e.g. `<1>Francisco Pandol</1>` → plain text)
3. Formats employment periods the way the UI does (`Jul 2024 — Present`)
4. Writes three artifacts into `public/`:
   - **`site.md`** — full profile: about, contact, availability, experience, earlier career, skills, projects
   - **`cv_markdown_en_Francisco_Pandol.md`** — résumé-oriented export (replacing a hand-maintained CV that had drifted out of date)
   - **`llms.txt`** — a short index pointing agents at the Markdown sources and key HTML routes

Why build-time generation matters: if the SPA and the Markdown diverge, you have two résumés. Generating both from JSON at build time means updating Dexter Development bullets once updates the site *and* the crawler payload. That is the kind of consistency hiring teams notice when they cross-check LinkedIn, PDF, and web.

## Step 2 — Make the Markdown discoverable without special headers

User-Agent sniffing alone will never catch every ATS. Many scrapers look like generic HTTP clients. So Pandol made the Markdown URLs first-class:

| URL | Role |
|-----|------|
| `/site.md` | Canonical machine-readable profile |
| `/llms.txt` | Emerging convention: a map for AI agents |
| `/cv_markdown_en_Francisco_Pandol.md` | Résumé-shaped Markdown (also linked from Contact) |

He also added an alternate link in `index.html` so even a non-JS fetch of the HTML shell can discover the Markdown:

```html
<link
  rel="alternate"
  type="text/markdown"
  href="/site.md"
  title="Francisco Pandol — Markdown profile"
/>
```

If a parser only ever reads the static shell, it still finds a pointer. That is defensive design — the same instinct that puts health checks next to the API, not only behind a dashboard.

## Step 3 — Intercept at the Cloudflare edge (Pages Functions)

Static files solve the “give me a URL” case. Pandol also wanted `/` itself to answer in Markdown when the *client* asks for it.

Cloudflare Pages treats a top-level `functions/` directory as edge code. No separate Worker project. No dashboard toggle beyond a normal Pages deploy. Drop in `functions/_middleware.js`, export `onRequest`, and it runs in front of the static assets and the SPA `_redirects` fallback.

The middleware’s logic is deliberately small:

1. Only handle `GET` / `HEAD`
2. Pass through real static assets (`.md`, `.pdf`, `/assets/`, fonts, etc.)
3. If `Accept` includes `text/markdown`, **or** `User-Agent` matches a known AI crawler list (`GPTBot`, `ClaudeBot`, `Google-Extended`, `PerplexityBot`, and peers), fetch `/site.md` via `env.ASSETS` and return it with:
   - `Content-Type: text/markdown; charset=utf-8`
   - `Vary: Accept, User-Agent`
   - A short cache TTL
4. Otherwise call `next()` — browsers keep the React SPA

```js
function wantsMarkdown(request) {
  const accept = request.headers.get("Accept") || "";
  if (/\btext\/markdown\b/i.test(accept)) return true;

  const ua = request.headers.get("User-Agent") || "";
  return AI_USER_AGENTS.some((token) => ua.includes(token));
}
```

`Vary` is not decoration. Without it, a CDN could cache the Markdown response and serve it to the next human — or cache HTML and starve a bot. Pandol set the header so caches key on the negotiation inputs.

Importantly, the middleware does not invent copy. It returns the same file humans can open at `/site.md`. Edge logic chooses *representation*; content stays one artifact.

## Step 4 — Wire generation into every production build

A generator that nobody runs is theater. Pandol hooked it into `package.json`:

```json
"generate:md": "node scripts/generate-site-md.mjs",
"build": "npm run generate:md && vite build"
```

Cloudflare Pages already used `npm run build` with output directory `dist`. After this change, every deploy regenerates Markdown into `public/`, Vite copies it into `dist/`, and the Pages Function ships beside that output. He documented curl checks and local Function testing (`wrangler pages dev dist`) in the README, because infrastructure without a verification recipe tends to rot.

`CLAUDE.md` — the repo’s agent-facing guide — got the new `generate:md` command as well. When the next contributor (human or otherwise) touches experience data, the path to keep crawlers in sync is obvious.

## Step 5 — Deploy and prove it in production

No custom Cloudflare dashboard settings were required. The Git-connected Pages project kept:

- Build command: `npm run build`
- Output directory: `dist`
- Functions directory: default `/functions`

After deploy, live checks on `franpandol.com` confirmed the contract:

```bash
# AI / content negotiation → Markdown
curl -sI -H "Accept: text/markdown" https://franpandol.com/ | grep -i content-type
# → content-type: text/markdown; charset=utf-8

curl -sI -A "ClaudeBot" https://franpandol.com/ | grep -i content-type
# → content-type: text/markdown; charset=utf-8

# Normal browser → HTML SPA
curl -sI -A "Mozilla/5.0" https://franpandol.com/ | grep -i content-type
# → content-type: text/html; charset=utf-8

# Always available without negotiation
curl -sL https://franpandol.com/site.md | head
curl -sL https://franpandol.com/llms.txt
```

The Markdown body opens with Pandol’s positioning — Backend Tech Lead, Python and Node.js, scalable systems — then walks about, contact, interview windows in `America/Argentina/Buenos_Aires`, full experience from Dexter Development through earlier career, skills groups, and open-source projects. That is the same résumé a human reads in the React UI, flattened for agents that never paint a pixel.

## Why this is a leadership signal, not a gimmick

Plenty of engineers ship portfolio animations. Fewer treat crawlers as first-class clients.

What Pandol demonstrated here:

- **He understands the failure mode of SPAs.** Empty `#root` is not theoretical; it is how many ATS and AI fetchers see the web.
- **He refuses dual sources of truth.** Experience JSON drives UI and Markdown. Drift is an engineering bug, not a content chore.
- **He uses the platform he deploys on.** Cloudflare Pages Functions at the edge, `Vary` headers, ASSETS fetch — production patterns, not a hack in `useEffect`.
- **He designs for incomplete signals.** UA lists are partial; so `/site.md`, `/llms.txt`, and `rel="alternate"` exist for clients that never announce themselves as bots.

If you are hiring a Software Project Leader or Backend Tech Lead who has shipped fintech and high-concurrency backends — and who thinks about how systems are *consumed*, not only how they look — start at [franpandol.com](https://franpandol.com). Ask an agent to fetch it with `Accept: text/markdown`. Or open [franpandol.com/site.md](https://franpandol.com/site.md) yourself.

You will get the same engineer. Just in a format machines can read on the first request.

---

# Beyond a Static Résumé: Francisco Pandol Put a Scoped AI Chatbot in Front of His Own CV

*By Elena Vargas*

Serving Markdown to crawlers, as covered above, solves the read problem: machines can now *see* the résumé. It does not solve the ask-a-follow-up problem. A recruiter skimming a portfolio at 11 p.m. does not want to parse a full experience section to answer "does he have fintech experience?" — they want a one-line answer and a nudge toward booking time. So Pandol shipped a chatbot, scoped tightly to his own CV, running on infrastructure he already trusted.

## The constraint that shaped everything: no new source of truth

The easy version of this feature is a chatbot with its own hand-written knowledge base. Pandol rejected that immediately — the site had already been burned once by a hand-maintained CV drifting out of date (see Step 1, above). Any new AI feature had to read from the *same* generated `public/site.md` that `scripts/generate-site-md.mjs` already produces at build time from `experience.json`, `en.json`, `contact.js`, and `availability.js`. One update to a job description updates the UI, the crawler payload, *and* the chatbot's knowledge — automatically, at build time, with zero duplication.

## Architecture: a proxy with no API key to leak

Pandol had a real decision to make: call an external LLM API (Gemini, Claude, GPT) from a Cloudflare Pages Function, or use Cloudflare's own inference product, Workers AI. He picked Workers AI, and the reasoning is pure backend-lead thinking:

- **No secret to manage.** `env.AI.run(...)` is a native binding — no API key sitting in an environment variable, no key rotation, no leak surface.
- **No new vendor.** The site already runs on Cloudflare Pages with a Pages Function (`functions/_middleware.js`) for the Markdown negotiation feature. Adding `functions/api/chat.js` extends infrastructure already in production rather than bolting on a new one.
- **Cost discipline.** Rather than reach for a large, "obviously good" model, Pandol picked the cheapest chat-capable model in Cloudflare's catalog, `@cf/ibm-granite/granite-4.0-h-micro` — instruction-tuned, 131K context window, streaming-capable, and priced low enough that a personal portfolio's traffic realistically stays inside Cloudflare's free daily neuron allowance. Startups reach for GPT-4-class models out of habit; Pandol reached for "smallest model that's actually good enough," which is the harder, more disciplined call.

## The system prompt does the real product work

A chatbot bolted onto a CV can go wrong in two directions: hallucinate facts, or wander off into general chit-chat. Pandol's `functions/api/chat.js` closes both doors in the system prompt, assembled fresh on every request from the live `site.md` content:

- Answer only questions about Francisco's experience, skills, availability, and projects — the profile text is the *sole* source of truth.
- Keep answers short: 2–4 sentences. This is a portfolio widget, not a document reader.
- Refuse and redirect anything unrelated — no general knowledge, no coding help, no opinions.
- End every answer with a nudge toward booking an interview or emailing directly.
- Match the visitor's language (English or Spanish), same as the rest of the i18n'd site.

That last rule — always end on a contact nudge — is the difference between "a chatbot" and a hiring-conversion feature. Every answer is a small on-ramp back to the same email and interview-availability data already surfaced in `RecruiterInterviewCta`.

## Guardrails sized to the actual risk

No enterprise-grade auth, no third-party WAF rule — because the actual risk here is small and Pandol scoped the defenses to match it:

- Reject malformed JSON bodies outright.
- Cap conversation history at 12 messages and each message at 500 characters, so a single abusive request can't blow up token usage or context.
- Model selection itself is a cost guardrail: the cheapest model in the catalog means even a bad actor hammering the endpoint stays cheap to absorb.

## Frontend: streaming, not a spinner

The widget (`src/components/ChatWidget.jsx`) reads the Workers AI SSE stream token-by-token and paints the reply as it arrives, rather than blocking on a full response — the same instinct that makes a terminal feel alive versus a form that submits into a loading screen. It's mounted once, globally, in `App.jsx`, so it's available from any route, and it respects the site's existing i18n and Tailwind design tokens rather than importing a new component library or color palette.

## Why this, again, reads as a leadership signal

- **He wouldn't duplicate a source of truth**, even under pressure to ship a flashy AI feature fast.
- **He picked infrastructure he already operates**, instead of adding a new vendor relationship for a personal-site feature.
- **He priced the solution before building it** — cheapest capable model, free-tier-aware, guardrailed proportionally to actual risk.

If you want to see it: open [franpandol.com](https://franpandol.com), click the chat launcher in the corner, and ask it what stack he uses, or whether he's available this week. It will answer from his real CV — and it will tell you how to reach him.
