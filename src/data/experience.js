/**
 * Experience data sourced from ./experience.json.
 * Featured roles: full problem / highlights / stack. Earlier career: compact summary rows.
 * Ordered by start date (most recent first). `startDate` is stripped before export to the UI.
 */

import raw from "./experience.json";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatMonthYear(iso) {
  const [y, m] = iso.slice(0, 10).split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

function formatPeriod(exp) {
  const start = formatMonthYear(exp.start);
  if (exp.current) {
    return `${start} — Present`;
  }
  if (exp.end) {
    return `${start} — ${formatMonthYear(exp.end)}`;
  }
  return start;
}

function makeId(exp) {
  return `${exp.company}-${exp.role}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

/** Teaching, government, and freelance blocks — rendered in the “Earlier career” list */
function isEarlierCareer(exp) {
  const c = exp.company.toLowerCase();
  return (
    c.includes("catamarca government") ||
    c.includes("ministry of economy") ||
    c.includes("custom software solutions")
  );
}

function toFeaturedRole(exp) {
  return {
    id: makeId(exp),
    startDate: exp.start,
    title: exp.role,
    org: exp.company,
    period: formatPeriod(exp),
    problem: exp.summary,
    highlights: exp.achievements,
    stack: exp.tech.join(", "),
  };
}

function toEarlierRole(exp) {
  return {
    id: makeId(exp),
    startDate: exp.start,
    title: exp.role,
    org: exp.company,
    period: formatPeriod(exp),
    summary: exp.summary,
  };
}

const byStartDateDesc = (a, b) => b.startDate.localeCompare(a.startDate);

const stripSortKey = ({ startDate, ...rest }) => rest;

const featuredRolesRaw = raw.experiences
  .filter((exp) => !isEarlierCareer(exp))
  .map(toFeaturedRole);

const earlierRolesRaw = raw.experiences.filter(isEarlierCareer).map(toEarlierRole);

export const featuredRoles = [...featuredRolesRaw].sort(byStartDateDesc).map(stripSortKey);

export const earlierRoles = [...earlierRolesRaw].sort(byStartDateDesc).map(stripSortKey);

/** Skills block from the same JSON file (optional for Skills section or CV tooling) */
export const experienceSkills = raw.skills;
