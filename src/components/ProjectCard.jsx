import React from "react";
import { useTranslation } from "react-i18next";

const linkClass = "text-sm text-accent underline-offset-4 hover:underline";

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const ProjectCard = ({ project, index = 0 }) => {
  const { t } = useTranslation();
  const isCaseStudy = project.type === "professional";

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
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-soft to-surface-overlay">
            <span className="font-display text-3xl font-semibold text-accent-muted/70">
              {initials(project.name)}
            </span>
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${
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
        <p className="mt-3 text-sm leading-relaxed text-content-secondary md:text-[15px]">
          <span className="font-medium text-content-primary">{t("projects.labels.problem")} </span>
          {project.problem}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-content-secondary md:text-[15px]">
          <span className="font-medium text-content-primary">{t("projects.labels.solution")} </span>
          {project.solution}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-content-secondary md:text-[15px]">
          <span className="font-medium text-content-primary">{t("projects.labels.impact")} </span>
          {project.impact}
        </p>
        <p className="mt-3 font-mono text-xs text-content-tertiary">{project.stack.join(" · ")}</p>
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
