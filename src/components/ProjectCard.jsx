import React from "react";

const linkClass =
  "text-sm text-accent-muted underline-offset-4 hover:text-accent hover:underline";

const ProjectCard = ({ project }) => (
  <article className="py-8 md:py-10">
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
    <p className="mt-3 font-mono text-xs text-content-tertiary">{project.stack.join(" · ")}</p>
    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
        GitHub
      </a>
      {project.demoUrl ? (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Live demo
        </a>
      ) : null}
    </div>
  </article>
);

export default ProjectCard;
