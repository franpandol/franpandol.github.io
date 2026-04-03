import React from "react";
import { Link } from "react-router-dom";
import Section, { sectionTitleClass } from "./Section";
import { selectedProjects } from "../data/projects";

const linkClass =
  "text-sm text-content-secondary underline-offset-4 hover:text-content-primary hover:underline";

const SelectedWorkPreview = () => {
  const preview = selectedProjects.filter((p) => p.featured);

  return (
    <Section id="key-projects">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className={sectionTitleClass}>Selected work</h2>
        <Link to="/projects" className={`${linkClass} shrink-0`}>
          View all projects
        </Link>
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-content-secondary">
        Representative backend work with public repositories — problem, solution, impact, and
        stack.
      </p>
      <div className="mt-8 space-y-0 divide-y divide-surface-border border-t border-surface-border">
        {preview.map((project) => (
          <article key={project.id} className="py-8 first:pt-6">
            <h3 className="text-base font-semibold text-content-primary">{project.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-content-secondary">
              <span className="font-medium text-content-primary">Problem. </span>
              {project.problem}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">
              <span className="font-medium text-content-primary">Solution. </span>
              {project.solution}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">
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
    </Section>
  );
};

export default SelectedWorkPreview;
