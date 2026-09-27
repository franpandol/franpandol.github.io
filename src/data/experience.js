/**
 * Experience data from ./experience.json (EN) or ./experience.es.json (ES).
 * Featured roles: full problem / highlights / stack. Earlier career: compact summary rows.
 * Ordered by start date (most recent first). `earlierCareer: true` marks the “Earlier career” list.
 */

import rawEn from "./experience.json";
import rawEs from "./experience.es.json";

function getRaw(lang) {
  const l = String(lang || "en").toLowerCase();
  return l.startsWith("es") ? rawEs : rawEn;
}

function isEarlierCareer(exp) {
  return exp.earlierCareer === true;
}

function formatMonthYear(iso, locale) {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`);
  return d.toLocaleDateString(locale, { month: "short", year: "numeric" });
}

function formatPeriod(exp, locale, presentLabel) {
  const start = formatMonthYear(exp.start, locale);
  if (exp.current) {
    return `${start} — ${presentLabel}`;
  }
  if (exp.end) {
    return `${start} — ${formatMonthYear(exp.end, locale)}`;
  }
  return start;
}

function makeId(exp) {
  if (exp.slug) return exp.slug;
  return `${exp.company}-${exp.role}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

function toFeaturedRole(exp, locale, presentLabel) {
  return {
    id: makeId(exp),
    startDate: exp.start,
    title: exp.role,
    org: exp.company,
    period: formatPeriod(exp, locale, presentLabel),
    problem: exp.summary,
    highlights: exp.achievements,
    stack: exp.tech.join(", "),
  };
}

function toEarlierRole(exp, locale, presentLabel) {
  return {
    id: makeId(exp),
    startDate: exp.start,
    title: exp.role,
    org: exp.company,
    period: formatPeriod(exp, locale, presentLabel),
    summary: exp.summary,
  };
}

const byStartDateDesc = (a, b) => b.startDate.localeCompare(a.startDate);

const stripSortKey = ({ startDate, ...rest }) => rest;

/**
 * @param {string} lang i18n language (e.g. en, es)
 * @param {string} presentLabel localized “Present” (e.g. Present / Presente)
 */
export function buildExperienceLists(lang, presentLabel) {
  const raw = getRaw(lang);
  const locale = String(lang || "en").toLowerCase().startsWith("es") ? "es-MX" : "en-US";
  const featuredRoles = [...raw.experiences.filter((exp) => !isEarlierCareer(exp)).map((exp) => toFeaturedRole(exp, locale, presentLabel))]
    .sort(byStartDateDesc)
    .map(stripSortKey);
  const earlierRoles = [...raw.experiences.filter(isEarlierCareer).map((exp) => toEarlierRole(exp, locale, presentLabel))]
    .sort(byStartDateDesc)
    .map(stripSortKey);
  return { featuredRoles, earlierRoles };
}

/** Skills block from the active locale JSON */
export function getExperienceSkills(lang) {
  return getRaw(lang || "en").skills;
}

/**
 * Roles surfaced as "professional" project case studies on the Projects page.
 * `featured` controls whether the case study appears in the Home page preview.
 */
const CASE_STUDY_SLUGS = [
  { slug: "dexter-development", featured: true },
  { slug: "realtrends", featured: true },
  { slug: "glasfunds", featured: false },
];

function toCaseStudy(exp, featured) {
  const project = exp.projects?.[0];
  return {
    id: exp.slug,
    type: "professional",
    name: project?.name ?? exp.role,
    problem: exp.summary,
    solution: exp.achievements.slice(0, 3).join(" "),
    impact: project?.description ?? exp.achievements[exp.achievements.length - 1],
    stack: exp.tech,
    repoUrl: null,
    demoUrl: project?.link ?? null,
    image: null,
    featured,
  };
}

/** Professional case-study projects derived from experience data, for the given language. */
export function getCaseStudies(lang) {
  const raw = getRaw(lang);
  return CASE_STUDY_SLUGS.map(({ slug, featured }) => {
    const exp = raw.experiences.find((e) => e.slug === slug);
    return exp ? toCaseStudy(exp, featured) : null;
  }).filter(Boolean);
}
