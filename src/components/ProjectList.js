import React from "react";
import ProjectCard from "./ProjectCard";
import { selectedProjects } from "../data/projects";

const ProjectList = () => (
  <div className="mx-auto max-w-4xl px-5 py-12 md:px-6 md:py-16">
    <header className="max-w-2xl">
      <p className="font-mono text-sm text-accent">Selected work</p>
      <h1 className="mt-2 font-display text-display-sm font-semibold text-content-primary">
        Key backend projects
      </h1>
      <p className="mt-4 text-content-secondary leading-relaxed">
        APIs and backends with real constraints: problem, solution, impact, and stack. No generic
        demos or unrelated stacks.
      </p>
    </header>
    <div className="mt-12 grid gap-8 md:grid-cols-2">
      {selectedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </div>
);

export default ProjectList;
