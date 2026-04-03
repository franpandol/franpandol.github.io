import React from "react";
import Section from "./Section";

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
    <h2 className="font-display text-display-sm font-semibold text-content-primary">Skills</h2>
    <p className="mt-3 max-w-2xl text-content-secondary">
      High-level map aligned with senior backend and technical leadership expectations — concise,
      not a keyword dump.
    </p>
    <div className="mt-10 grid gap-8 sm:grid-cols-2">
      {skillGroups.map((group) => (
        <div key={group.title}>
          <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-accent">
            {group.title}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-content-secondary">
            {group.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-content-tertiary" aria-hidden>
                  ·
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

export default SkillsSection;
