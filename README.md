
# Portfolio (React + Vite)

React portfolio site with Vite, React Router, Tailwind CSS, and Vitest.

## Getting started

**Prerequisites:** Node.js 20+ and npm.

```bash
git clone https://github.com/franpandol/franpandol.github.io.git
cd franpandol.github.io
npm install
```

### Run locally

```bash
npm run dev
```

Opens the Vite dev server (default [http://localhost:5173](http://localhost:5173)).

### Tests

```bash
npm test
```

### Production build

```bash
npm run build
npm run preview
```

`npm run build` regenerates markdown for crawlers (`public/site.md`, `public/llms.txt`, and the CV markdown) from experience/locale data, then runs Vite.

Regenerate markdown alone:

```bash
npm run generate:md
```

## Markdown for AI / ATS crawlers

The HTML site is a React SPA (empty shell without JS). Machine-readable copies of the same content:

| URL | Purpose |
|-----|---------|
| `/site.md` | Full profile (about, experience, skills, projects, contact) |
| `/llms.txt` | Short index pointing agents at the markdown sources |
| `/cv_markdown_en_Francisco_Pandol.md` | Resume-oriented markdown (also linked from Contact) |

A Cloudflare Pages Function ([`functions/_middleware.js`](functions/_middleware.js)) returns `/site.md` when a request to an HTML route sends `Accept: text/markdown` or a known AI bot `User-Agent`. Browsers still get the SPA. Facts are identical; only the format changes.

**Verify after deploy** (replace the host with your domain or Pages preview URL):

```bash
curl -sL https://franpandol.com/site.md | head
curl -sL https://franpandol.com/llms.txt
curl -sI -H "Accept: text/markdown" https://franpandol.com/ | grep -i content-type
curl -sI -A "ClaudeBot" https://franpandol.com/ | grep -i content-type
curl -sI https://franpandol.com/ | grep -i content-type
```

Expect `text/markdown` for the Accept / ClaudeBot checks, and `text/html` for a normal browser request.

**Local middleware testing:** Vite preview only serves the static files. To exercise the Pages Function locally, use Wrangler after a build:

```bash
npm run build
npx wrangler pages dev dist
```

## Deployment (Cloudflare Pages)

Hosting is on **Cloudflare Pages** (connected to this GitHub repository).

**Build settings** (Dashboard → Workers & Pages → your project → Settings → Builds):

| Setting | Value |
|--------|--------|
| Framework preset | None, or Vite (if offered) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (repository root) |

**Node version:** set **Environment variable** `NODE_VERSION` to `20` or `22`, or pin in the Pages project settings if your dashboard exposes a Node version control.

**Client-side routing:** [`public/_redirects`](public/_redirects) sends all paths to `index.html` so React Router works on direct loads and refresh. Pages Functions in [`functions/`](functions/) run ahead of that fallback for matching requests.

**Environment variables:** add any `VITE_*` secrets (e.g. PostHog) under **Settings → Environment variables** for Production and Preview as needed.

**Custom domain:** attach your domain in **Custom domains**; DNS can stay on Cloudflare or follow their docs for external registrars.

## Built with

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

MIT (see repository if a `LICENSE` file is added).
