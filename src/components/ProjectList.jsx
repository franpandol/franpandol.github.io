import React from "react";
import ProjectCard from "./ProjectCard";
import { selectedProjects } from "../data/projects";
import PageHeader from "./PageHeader";

const ProjectList = () => (
  <main className="w-full">
    <PageHeader
      title="All projects"
      description="APIs and backends with real constraints: problem, solution, impact, and stack."
    />
    <div className="w-full border-t border-surface-border px-6 py-12 md:px-12 md:py-16 lg:px-16">
      <div className="max-w-[90rem] divide-y divide-surface-border border-t border-surface-border">
        {selectedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </main>
);

export default ProjectList;
