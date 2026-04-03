import React from "react";
import Section, { sectionTitleClass } from "./Section";
import { featuredRoles, earlierRoles } from "../data/experience";

const ExperienceSection = () => (
  <Section id="experience">
    <h2 className={sectionTitleClass}>Experience</h2>
    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-content-secondary">
      System design, architecture, scalability, and leadership — marketplaces, fintech, and
      high-traffic backends (including the Mercado Libre ecosystem at RealTrends).
    </p>
    <div className="mt-8 space-y-0 divide-y divide-surface-border border-t border-surface-border">
      {featuredRoles.map((role) => (
        <article key={role.id} className="py-8 first:pt-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <div>
              <h3 className="text-base font-semibold text-content-primary">{role.title}</h3>
              <p className="text-sm text-content-secondary">{role.org}</p>
            </div>
            <time className="shrink-0 font-mono text-xs text-content-tertiary">{role.period}</time>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-content-tertiary">
              Challenge
            </p>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">{role.problem}</p>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-content-tertiary">
              What I designed &amp; led
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-relaxed text-content-secondary">
              {role.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p className="mt-4 font-mono text-xs text-content-tertiary">{role.stack}</p>
        </article>
      ))}
    </div>
    <div className="mt-10 border-t border-surface-border pt-8">
      <h3 className={sectionTitleClass}>Earlier career</h3>
      <p className="mt-4 text-sm leading-relaxed text-content-secondary">
        Teaching, public-sector platforms, freelance delivery, and university engineering.
      </p>
      <ul className="mt-6 space-y-5">
        {earlierRoles.map((role) => (
          <li key={role.id} className="text-sm">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
              <span>
                <span className="font-medium text-content-primary">{role.title}</span>
                <span className="text-content-tertiary"> · {role.org}</span>
              </span>
              <time className="font-mono text-xs text-content-tertiary">{role.period}</time>
            </div>
            <p className="mt-1 leading-relaxed text-content-secondary">{role.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  </Section>
);

export default ExperienceSection;
