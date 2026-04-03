import React from "react";

const ProjectCard = ({ project }) => (
  <article className="flex h-full flex-col rounded-xl border border-surface-border bg-surface-raised p-6 shadow-card transition hover:border-stone-400 md:p-8">
    <h3 className="text-xl font-semibold text-content-primary">{project.name}</h3>
    <p className="mt-4 text-sm leading-relaxed text-content-secondary">
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
    <div className="mt-auto flex flex-wrap gap-4 border-t border-surface-border pt-6">
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
          Live demo
        </a>
      ) : null}
    </div>
  </article>
);

export default ProjectCard;
