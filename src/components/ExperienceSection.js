import React from "react";
import Section from "./Section";
import { featuredRoles, earlierRoles } from "../data/experience";

const ExperienceSection = () => (
  <Section id="experience">
    <h2 className="font-display text-display-sm font-semibold text-content-primary">Experience</h2>
    <p className="mt-3 max-w-2xl text-content-secondary">
      System design, architecture decisions, scalability, and leadership — with direct relevance
      to high-traffic marketplaces and financial backends (including the Mercado Libre ecosystem).
    </p>
    <div className="mt-12 space-y-10">
      {featuredRoles.map((role) => (
        <article
          key={role.id}
          className="rounded-xl border border-surface-border bg-surface-raised p-6 shadow-card transition hover:border-stone-400 md:p-8"
        >
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-content-primary">{role.title}</h3>
              <p className="text-accent">{role.org}</p>
            </div>
            <time className="font-mono text-sm text-content-tertiary whitespace-nowrap">
              {role.period}
            </time>
          </div>
          <div className="mt-5">
            <p className="font-mono text-xs font-medium uppercase tracking-wider text-content-tertiary">
              Challenge
            </p>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">{role.problem}</p>
          </div>
          <div className="mt-5">
            <p className="font-mono text-xs font-medium uppercase tracking-wider text-content-tertiary">
              What I designed & led
            </p>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-content-secondary">
              {role.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 font-mono text-xs text-content-tertiary">{role.stack}</p>
        </article>
      ))}
    </div>
    <div className="mt-14">
      <h3 className="font-display text-lg font-semibold text-content-primary">Earlier career</h3>
      <p className="mt-2 text-sm text-content-secondary">
        Teaching, public-sector platforms, freelance delivery, and university engineering —
        foundation for technical breadth and leadership.
      </p>
      <ul className="mt-6 space-y-5">
        {earlierRoles.map((role) => (
          <li key={role.id} className="border-l-2 border-surface-border pl-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
              <div>
                <span className="font-medium text-content-primary">{role.title}</span>
                <span className="text-content-tertiary"> · {role.org}</span>
              </div>
              <time className="font-mono text-xs text-content-tertiary">{role.period}</time>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">{role.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  </Section>
);

export default ExperienceSection;
