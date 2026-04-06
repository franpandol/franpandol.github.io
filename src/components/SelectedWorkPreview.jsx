import React from "react";
import { useTranslation } from "react-i18next";
import { selectedProjects } from "../data/projects";

const linkClass =
  "text-sm text-accent-muted underline-offset-4 hover:text-accent hover:underline";

export const SelectedWorkContent = () => {
  const { t } = useTranslation();
  const preview = selectedProjects.filter((p) => p.featured);

  return (
    <div className="space-y-0 divide-y divide-surface-border">
      {preview.map((project) => {
        const base = `projects.items.${project.id}`;
        return (
          <article key={project.id} className="py-8 first:pt-6 md:py-10 md:first:pt-8">
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
            <p className="mt-3 font-mono text-xs text-content-tertiary">
              {project.stack.join(" · ")}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t("projects.labels.github")}
              </a>
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {t("projects.labels.live")}
                </a>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
};
