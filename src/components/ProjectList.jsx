import React from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";
import { selectedProjects } from "../data/projects";
import PageHeader from "./PageHeader";

const ProjectList = () => {
  const { t } = useTranslation();

  return (
    <main className="w-full">
      <PageHeader title={t("projects.page.title")} description={t("projects.page.description")} />
      <div className="w-full px-6 pb-12 pt-8 md:px-12 md:pb-16 md:pt-10 lg:px-16">
        <div className="max-w-[90rem] divide-y divide-surface-border">
          {selectedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProjectList;
