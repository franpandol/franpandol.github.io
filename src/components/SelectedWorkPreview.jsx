import React from "react";
import { selectedProjects } from "../data/projects";

const linkClass =
  "text-sm text-accent-muted underline-offset-4 hover:text-accent hover:underline";

export const SelectedWorkContent = () => {
  const preview = selectedProjects.filter((p) => p.featured);

  return (
    <div className="space-y-0 divide-y divide-surface-border border-t border-surface-border">
      {preview.map((project) => (
        <article key={project.id} className="py-8 first:pt-6 md:py-10 md:first:pt-8">
          <h3 className="text-lg font-semibold text-content-primary md:text-xl">{project.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-content-secondary md:text-[15px]">
            <span className="font-medium text-content-primary">Problem. </span>
            {project.problem}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-content-secondary md:text-[15px]">
            <span className="font-medium text-content-primary">Solution. </span>
            {project.solution}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-content-secondary md:text-[15px]">
            <span className="font-medium text-content-primary">Impact. </span>
            {project.impact}
          </p>
          <p className="mt-3 font-mono text-xs text-content-tertiary">
            {project.stack.join(" · ")}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Live
              </a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
};

