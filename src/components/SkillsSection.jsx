import React from "react";
import Section, { sectionTitleClass } from "./Section";

const skillGroups = [
  {
    title: "Backend",
    items: ["Python", "Django", "FastAPI", "REST & API design"],
  },
  {
    title: "Systems",
    items: ["Distributed systems", "Async & event-driven patterns", "High concurrency"],
  },
  {
    title: "Cloud",
    items: ["AWS", "Google Cloud Platform", "Azure"],
  },
  {
    title: "Engineering",
    items: ["CI/CD (GitHub Actions)", "Architecture & tradeoffs", "Performance engineering"],
  },
];

const SkillsSection = () => (
  <Section id="skills">
    <h2 className={sectionTitleClass}>Skills</h2>
    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-content-secondary">
      Concise map of backend, systems, cloud, and delivery — aligned with senior technical
      leadership roles.
    </p>
    <div className="mt-8 space-y-8 border-t border-surface-border pt-8">
      {skillGroups.map((group) => (
        <div key={group.title}>
          <h3 className={`${sectionTitleClass} mb-3`}>{group.title}</h3>
          <ul className="space-y-1 text-sm text-content-secondary">
            {group.items.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

export default SkillsSection;
