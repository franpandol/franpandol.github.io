import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";
import { useProjects } from "../hooks/useProjects";

const FeaturedProjects = () => {
  const { t } = useTranslation();
  const projects = useProjects()
    .filter((project) => project.featured)
    .slice(0, 3);

  if (projects.length === 0) return null;

  return (
    <section className="px-6 pb-4 pt-2 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-[90rem]">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-muted">
              {t("landing.featuredProjects.title")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-content-secondary md:text-[15px]">
              {t("landing.featuredProjects.description")}
            </p>
          </div>
          <Link
            to="/projects"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t("landing.featuredProjects.viewAll")}
          </Link>
        </div>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.id}>
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedProjects;
