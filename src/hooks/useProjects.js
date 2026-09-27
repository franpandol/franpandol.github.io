import { useTranslation } from "react-i18next";
import { selectedProjects } from "../data/projects";
import { getCaseStudies } from "../data/experience";

/**
 * Combined, localized list of projects: professional case studies (derived from
 * experience data) first, then personal projects (copy from locales/projects.items.<id>).
 * Featured entries are sorted first within each group.
 */
export function useProjects() {
  const { t, i18n } = useTranslation();

  const personal = selectedProjects.map((project) => {
    const base = `projects.items.${project.id}`;
    return {
      id: project.id,
      type: project.type,
      name: t(`${base}.name`),
      problem: t(`${base}.problem`),
      solution: t(`${base}.solution`),
      impact: t(`${base}.impact`),
      stack: project.stack,
      repoUrl: project.repoUrl || null,
      demoUrl: project.demoUrl || null,
      image: project.image || null,
      featured: project.featured,
    };
  });

  const professional = getCaseStudies(i18n.language);

  const byFeaturedFirst = (a, b) => Number(b.featured) - Number(a.featured);

  return [...professional, ...personal].sort(byFeaturedFirst);
}
