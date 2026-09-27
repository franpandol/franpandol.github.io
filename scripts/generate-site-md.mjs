/**
 * Build-time generator: site.md, CV markdown, and llms.txt from the same
 * sources the React UI uses (experience.json, en.json, contact, projects).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { EMAIL } from "../src/constants/contact.js";
import { dailyWindows, TIMEZONE_IANA } from "../src/data/availability.js";
import { selectedProjects } from "../src/data/projects.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

const experience = JSON.parse(
  readFileSync(join(root, "src/data/experience.json"), "utf8")
);
const en = JSON.parse(readFileSync(join(root, "src/locales/en.json"), "utf8"));

const GITHUB_URL = "https://github.com/franpandol";
const LINKEDIN_URL = "https://www.linkedin.com/in/franciscopandol/en/";
const SITE_URL = "https://franpandol.com";
const CV_MD_FILENAME = "cv_markdown_en_Francisco_Pandol.md";

/** Strip i18n rich-text tags like <1>text</1> → text */
function stripRichText(value) {
  return String(value || "")
    .replace(/<\/?\d+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatMonthYear(iso) {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatPeriod(exp) {
  const start = formatMonthYear(exp.start);
  if (exp.current) return `${start} — Present`;
  if (exp.end) return `${start} — ${formatMonthYear(exp.end)}`;
  return start;
}

function bulletList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function buildSiteMarkdown() {
  const lines = [];

  lines.push(`# ${en.nav.brand}`);
  lines.push("");
  lines.push(en.hero.subtitle);
  lines.push("");
  lines.push(en.meta.description);
  lines.push("");
  lines.push("## About");
  lines.push("");
  lines.push(stripRichText(en.about.p1));
  lines.push("");
  lines.push(stripRichText(en.about.p2));
  lines.push("");

  lines.push("## Contact");
  lines.push("");
  lines.push(`- Email: ${EMAIL}`);
  lines.push(`- GitHub: ${GITHUB_URL}`);
  lines.push(`- LinkedIn: ${LINKEDIN_URL}`);
  lines.push(`- Site: ${SITE_URL}`);
  lines.push(`- CV (Markdown): ${SITE_URL}/${CV_MD_FILENAME}`);
  lines.push(`- CV (PDF): ${SITE_URL}/CV_Francisco_Pandol.pdf`);
  lines.push("");
  lines.push(`Interview availability (${TIMEZONE_IANA}), every day:`);
  for (const window of dailyWindows) {
    lines.push(`- ${window.start}–${window.end}`);
  }
  lines.push("");

  lines.push("## Experience");
  lines.push("");
  lines.push(en.experience.page.description);
  lines.push("");

  const featured = experience.experiences.filter((exp) => !exp.earlierCareer);
  const earlier = experience.experiences.filter((exp) => exp.earlierCareer);

  for (const exp of featured) {
    lines.push(`### ${exp.role}, ${exp.company}`);
    lines.push("");
    lines.push(`**${formatPeriod(exp)}**`);
    lines.push("");
    if (exp.summary) {
      lines.push(exp.summary);
      lines.push("");
    }
    if (exp.achievements?.length) {
      lines.push("Key contributions:");
      lines.push(bulletList(exp.achievements));
      lines.push("");
    }
    if (exp.tech?.length) {
      lines.push(`**Tech:** ${exp.tech.join(", ")}`);
      lines.push("");
    }
    if (exp.projects?.length) {
      for (const project of exp.projects) {
        const link = project.link ? ` — ${project.link}` : "";
        lines.push(`- **${project.name}**${link}: ${project.description || ""}`);
      }
      lines.push("");
    }
  }

  if (earlier.length) {
    lines.push(`## ${en.experience.earlierTitle}`);
    lines.push("");
    lines.push(en.experience.earlierIntro);
    lines.push("");
    for (const exp of earlier) {
      lines.push(`### ${exp.role}, ${exp.company}`);
      lines.push("");
      lines.push(`**${formatPeriod(exp)}**`);
      lines.push("");
      if (exp.summary) {
        lines.push(exp.summary);
        lines.push("");
      }
      if (exp.achievements?.length) {
        lines.push(bulletList(exp.achievements));
        lines.push("");
      }
      if (exp.tech?.length) {
        lines.push(`**Tech:** ${exp.tech.join(", ")}`);
        lines.push("");
      }
    }
  }

  lines.push("## Skills");
  lines.push("");
  for (const group of Object.values(en.skills.groups)) {
    lines.push(`### ${group.title}`);
    lines.push("");
    lines.push(bulletList(group.items));
    lines.push("");
  }

  lines.push("## Projects");
  lines.push("");
  lines.push(en.projects.page.description);
  lines.push("");

  for (const project of selectedProjects) {
    const copy = en.projects.items[project.id];
    if (!copy) continue;
    lines.push(`### ${copy.name}`);
    lines.push("");
    lines.push(`**${en.projects.labels.problem}** ${copy.problem}`);
    lines.push("");
    lines.push(`**${en.projects.labels.solution}** ${copy.solution}`);
    lines.push("");
    lines.push(`**${en.projects.labels.impact}** ${copy.impact}`);
    lines.push("");
    if (project.stack?.length) {
      lines.push(`**Stack:** ${project.stack.join(", ")}`);
      lines.push("");
    }
    if (project.repoUrl) {
      lines.push(`- ${en.projects.labels.github}: ${project.repoUrl}`);
    }
    if (project.demoUrl) {
      lines.push(`- ${en.projects.labels.liveDemo}: ${project.demoUrl}`);
    }
    lines.push("");
  }

  return `${lines.join("\n").trim()}\n`;
}

function buildCvMarkdown() {
  const lines = [];

  lines.push("## Curriculum Vitae");
  lines.push("");
  lines.push("**Surnames / First names:** Francisco Julio Pandol Avalos");
  lines.push(`**E-mail:** ${EMAIL}`);
  lines.push(`**Linkedin:** [${LINKEDIN_URL}](${LINKEDIN_URL})`);
  lines.push(`**Github:** [${GITHUB_URL}](${GITHUB_URL})`);
  lines.push(`**Portfolio:** [${SITE_URL}](${SITE_URL})`);
  lines.push("");
  lines.push(en.meta.description);
  lines.push("");
  lines.push("### Work Experience");
  lines.push("");

  for (const exp of experience.experiences) {
    lines.push(`### ${exp.role}, ${exp.company}`);
    lines.push(`**Dates of Employment:** ${formatPeriod(exp)}`);
    lines.push("");
    if (exp.summary) {
      lines.push(exp.summary);
      lines.push("");
    }
    if (exp.achievements?.length) {
      lines.push("**Key Contributions:**");
      lines.push(bulletList(exp.achievements));
      lines.push("");
    }
    if (exp.tech?.length) {
      lines.push(`**Key Skills:** ${exp.tech.join(", ")}`);
      lines.push("");
    }
  }

  lines.push("### Skills");
  lines.push("");
  for (const group of Object.values(en.skills.groups)) {
    lines.push(`**${group.title}:** ${group.items.join(", ")}`);
  }
  lines.push("");

  return `${lines.join("\n").trim()}\n`;
}

function buildLlmsTxt() {
  return `# ${en.nav.brand}

> ${en.meta.description}

This site is a React SPA. Prefer the markdown sources below for indexing and ATS parsing.

## Primary

- [Full profile (Markdown)](${SITE_URL}/site.md): about, experience, skills, projects, contact
- [CV (Markdown)](${SITE_URL}/${CV_MD_FILENAME}): resume-oriented export of the same experience data
- [CV (PDF)](${SITE_URL}/CV_Francisco_Pandol.pdf)

## Contact

- Email: ${EMAIL}
- GitHub: ${GITHUB_URL}
- LinkedIn: ${LINKEDIN_URL}

## HTML site

- Home: ${SITE_URL}/
- Experience: ${SITE_URL}/experience
- Skills: ${SITE_URL}/skills
- Projects: ${SITE_URL}/projects
- Contact: ${SITE_URL}/contact
`;
}

const siteMd = buildSiteMarkdown();
const cvMd = buildCvMarkdown();
const llmsTxt = buildLlmsTxt();

writeFileSync(join(publicDir, "site.md"), siteMd, "utf8");
writeFileSync(join(publicDir, CV_MD_FILENAME), cvMd, "utf8");
writeFileSync(join(publicDir, "llms.txt"), llmsTxt, "utf8");

console.log(`Wrote public/site.md (${siteMd.length} bytes)`);
console.log(`Wrote public/${CV_MD_FILENAME} (${cvMd.length} bytes)`);
console.log(`Wrote public/llms.txt (${llmsTxt.length} bytes)`);
