import React from "react";
import { useTranslation } from "react-i18next";

const linkClass = "text-sm text-accent underline-offset-4 hover:underline";

const ProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const base = `projects.items.${project.id}`;

  return (
    <article className="py-8 md:py-10">
      <h3 className="text-lg font-semibold text-content-primary md:text-xl">{t(`${base}.name`)}</h3>
      <p className="mt-3 text-sm leading-relaxed text-content-secondary md:text-[15px]">
        <span className="font-medium text-content-primary">{t("projects.labels.problem")} </span>
        {t(`${base}.problem`)}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-content-secondary md:text-[15px]">
        <span className="font-medium text-content-primary">{t("projects.labels.solution")} </span>
        {t(`${base}.solution`)}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-content-secondary md:text-[15px]">
        <span className="font-medium text-content-primary">{t("projects.labels.impact")} </span>
        {t(`${base}.impact`)}
      </p>
      <p className="mt-3 font-mono text-xs text-content-tertiary">{project.stack.join(" · ")}</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {t("projects.labels.github")}
        </a>
        {project.demoUrl ? (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {t("projects.labels.liveDemo")}
          </a>
        ) : null}
      </div>
    </article>
  );
};

export default ProjectCard;
