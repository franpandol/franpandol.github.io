import React from "react";
import { Link } from "react-router-dom";
import Section from "./Section";
import { selectedProjects } from "../data/projects";

const SelectedWorkPreview = () => {
  const preview = selectedProjects.filter((p) => p.featured);

  return (
    <Section id="key-projects">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-display-sm font-semibold text-content-primary">
            Selected work
          </h2>
          <p className="mt-3 max-w-xl text-content-secondary">
            Key projects — backend systems and APIs with public repos. Problem, solution, impact,
            and stack; no filler demos.
          </p>
        </div>
        <Link
          to="/projects"
          className="font-mono text-sm text-accent transition hover:text-content-primary"
        >
          Full selected work →
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {preview.map((project) => (
          <article
            key={project.id}
            className="flex flex-col rounded-xl border border-surface-border bg-surface-raised p-6 shadow-card transition hover:border-stone-400"
          >
            <h3 className="text-lg font-semibold text-content-primary">{project.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-content-secondary">
              <span className="font-medium text-content-primary">Problem: </span>
              {project.problem}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-content-secondary">
              <span className="font-medium text-content-primary">Solution: </span>
              {project.solution}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">
              <span className="font-medium text-content-primary">Impact: </span>
              {project.impact}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-surface-border bg-surface-overlay px-2 py-0.5 font-mono text-xs text-content-tertiary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-4 pt-6">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-accent transition hover:text-content-primary"
              >
                GitHub
              </a>
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-content-tertiary transition hover:text-content-secondary"
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
