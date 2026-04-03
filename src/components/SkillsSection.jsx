import React from "react";
import { sectionTitleClass } from "../sectionTitles";

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

export const SkillsContent = () => (
  <div className="grid gap-10 border-t border-surface-border pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:pt-12">
    {skillGroups.map((group) => (
      <div key={group.title}>
        <h3 className={`${sectionTitleClass} mb-4`}>{group.title}</h3>
        <ul className="space-y-2 text-sm text-content-secondary md:text-[15px]">
          {group.items.map((item) => (
            <li key={item} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

