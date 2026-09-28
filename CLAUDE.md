# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server at http://localhost:5173
npm test             # Run tests once with Vitest
npm run generate:md  # Regenerate public/site.md, llms.txt, CV markdown
npm run build        # generate:md + production build → dist/
npm run preview      # Serve the dist/ build locally
```

Run a single test file:
```bash
npx vitest run src/components/RecruiterInterviewCta.test.jsx
```

## Architecture

React 18 SPA built with Vite, React Router v6, Tailwind CSS, and i18next (EN/ES). Hosted on Cloudflare Pages; `public/_redirects` routes all paths to `index.html` for client-side routing.

**Routing** (`src/App.jsx`): flat route tree — `/`, `/experience`, `/about`, `/skills`, `/work`, `/projects`, `/blogs`, `/contact`. Unmatched paths redirect to `/`.

**i18n** (`src/i18n.js`): all user-facing strings live in `src/locales/en.json` and `src/locales/es.json`. Language is detected from `localStorage` then browser preference, falling back to EN. When adding copy, add keys to both locale files.

**Experience data** (`src/data/`):
- Source of truth: `experience.json` (EN) and `experience.es.json` (ES) — structured JSON with `experiences[]` and `skills`.
- `experience.js` exports `buildExperienceLists(lang, presentLabel)` and `getExperienceSkills(lang)` — these transform raw JSON into the shapes consumed by `ExperiencePage` and `SkillsSection`.
- Roles with `earlierCareer: true` render in the compact "Earlier career" list; all others render as featured roles.

**Availability / contact** (`src/data/availability.js`, `src/constants/contact.js`): update `dailyWindows` and `TIMEZONE_IANA` in `availability.js` when interview availability changes. `EMAIL` in `contact.js` is the single source for the contact email.

**Testing**: Vitest + jsdom + React Testing Library. Setup in `src/setupTests.js`. Tests that use i18n should wrap with `<I18nextProvider i18n={i18n}>` and call `await i18n.changeLanguage("en")` in `beforeEach`.
