import React from "react";
import { useTranslation } from "react-i18next";

const linkClass = "text-base text-accent underline-offset-4 hover:underline";

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

/** Subtle band tones so adjacent cards feel distinct without leaving the palette. */
const PLACEHOLDER_TONES = [
  "from-teal-50 via-zinc-100 to-teal-100/80",
  "from-amber-50 via-zinc-100 to-orange-100/70",
  "from-zinc-100 via-teal-50/80 to-zinc-200/90",
  "from-cyan-50 via-zinc-100 to-teal-100/70",
  "from-stone-100 via-amber-50/60 to-zinc-200/80",
  "from-teal-50/90 via-emerald-50/50 to-zinc-100",
];

const toneFor = (id) => {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return PLACEHOLDER_TONES[hash % PLACEHOLDER_TONES.length];
};

const ProjectCard = ({ project, index = 0 }) => {
  const { t } = useTranslation();
  const isCaseStudy = project.type === "professional";
  const stackPreview = (project.stack || []).slice(0, 3);

  return (
    <article
      className="group flex h-full animate-fade-up flex-col overflow-hidden rounded-lg border border-surface-border bg-surface-raised shadow-card transition hover:-translate-y-0.5 hover:border-accent-muted/45 hover:shadow-cardHover"
      style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-overlay">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className={`relative flex h-full w-full flex-col justify-end bg-gradient-to-br p-5 md:p-6 ${toneFor(project.id)}`}
            aria-hidden="true"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(15,118,110,0.18) 1px, transparent 0)",
                backgroundSize: "18px 18px",
              }}
            />
            <span className="pointer-events-none absolute right-4 top-10 font-display text-6xl font-semibold leading-none text-accent/20 md:right-5 md:text-7xl">
              {initials(project.name)}
            </span>
            <div className="relative z-[1] space-y-2.5">
              <p className="font-display text-xl font-semibold leading-snug text-content-primary line-clamp-2 md:text-2xl">
                {project.name}
              </p>
              {stackPreview.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {stackPreview.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-accent/15 bg-white/70 px-2 py-0.5 font-mono text-[11px] text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
        <span
          className={`absolute left-3 top-3 z-[1] rounded-full px-2.5 py-1 text-xs font-medium ${
            isCaseStudy
              ? "bg-accent-secondary-soft text-accent-secondary"
              : "bg-surface-raised/90 text-content-secondary"
          }`}
        >
          {isCaseStudy ? t("projects.labels.caseStudy") : t("projects.labels.personal")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-lg font-semibold text-content-primary md:text-xl">
          {project.name}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-content-secondary">
          <span className="font-medium text-content-primary">{t("projects.labels.problem")} </span>
          {project.problem}
        </p>
        <p className="mt-2 text-base leading-relaxed text-content-secondary">
          <span className="font-medium text-content-primary">{t("projects.labels.solution")} </span>
          {project.solution}
        </p>
        <p className="mt-2 text-base leading-relaxed text-content-secondary">
          <span className="font-medium text-content-primary">{t("projects.labels.impact")} </span>
          {project.impact}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-surface-border bg-surface-overlay px-2.5 py-1 font-mono text-xs text-content-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 pt-1">
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {t("projects.labels.github")}
            </a>
          ) : null}
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {t("projects.labels.liveDemo")}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
