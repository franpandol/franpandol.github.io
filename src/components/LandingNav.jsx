import React from "react";
import { Link } from "react-router-dom";

const items = [
  {
    to: "/experience",
    title: "Experience",
    description: "Roles, challenges, and outcomes across fintech and high-scale backends.",
  },
  {
    to: "/about",
    title: "About",
    description: "Background, focus, and how I partner with product and engineering.",
  },
  {
    to: "/skills",
    title: "Skills",
    description: "Python, Django, FastAPI, cloud, and delivery leadership.",
  },
  {
    to: "/work",
    title: "Selected work",
    description: "Highlighted projects with problem, solution, and impact.",
  },
  {
    to: "/projects",
    title: "All projects",
    description: "Full list of public repositories and demos.",
  },
  {
    to: "/blogs",
    title: "Writing",
    description: "Notes on backend engineering and career growth.",
  },
  {
    to: "/contact",
    title: "Contact",
    description: "Email, GitHub, and LinkedIn.",
  },
];

const LandingNav = () => (
  <section className="border-t border-surface-border px-6 py-12 md:px-12 md:py-16 lg:px-16">
    <div className="mx-auto w-full max-w-[90rem]">
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-muted">
        Explore
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="group flex h-full flex-col rounded-lg border border-surface-border bg-surface-raised p-5 shadow-card transition hover:border-accent-muted/45 hover:bg-surface md:p-6"
            >
              <span className="font-display text-lg font-semibold text-content-primary group-hover:text-accent md:text-xl">
                {item.title}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-content-secondary">{item.description}</span>
              <span className="mt-4 text-sm font-medium text-accent-muted group-hover:text-accent">
                View →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default LandingNav;
