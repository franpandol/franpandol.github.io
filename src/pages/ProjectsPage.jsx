import React from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/ProjectCard";
import PageHeader from "../components/PageHeader";
import { useProjects } from "../hooks/useProjects";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const projects = useProjects();

  return (
    <main className="w-full">
      <PageHeader title={t("projects.page.title")} description={t("projects.page.description")} />
      <div className="w-full px-6 pb-12 pt-6 md:px-12 md:pb-16 md:pt-8 lg:px-16">
        <ul className="grid max-w-[90rem] gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.id}>
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default ProjectsPage;
