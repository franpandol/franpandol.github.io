
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

**Client-side routing:** [`public/_redirects`](public/_redirects) sends all paths to `index.html` so React Router works on direct loads and refresh.

**Environment variables:** add any `VITE_*` secrets (e.g. PostHog) under **Settings → Environment variables** for Production and Preview as needed.

**Custom domain:** attach your domain in **Custom domains**; DNS can stay on Cloudflare or follow their docs for external registrars.

## Built with

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

MIT (see repository if a `LICENSE` file is added).
