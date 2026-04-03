import React from "react";
import ProjectCard from "./ProjectCard";
import { selectedProjects } from "../data/projects";
import { sectionTitleClass } from "./Section";

const ProjectList = () => (
  <div className="px-6 pb-16 pt-8 md:px-8">
    <header className="border-b border-surface-border pb-8">
      <h1 className={sectionTitleClass}>Selected work</h1>
      <p className="mt-4 text-sm leading-relaxed text-content-secondary">
        APIs and backends with real constraints: problem, solution, impact, and stack.
      </p>
    </header>
    <div className="mt-0 border-t border-surface-border">
      {selectedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </div>
);

export default ProjectList;
