import React from "react";
import { Link } from "react-router-dom";

const Hero = () => (
  <header className="relative overflow-hidden border-b border-surface-border">
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      aria-hidden
      style={{
        background:
          "radial-gradient(ellipse 85% 55% at 50% -15%, rgba(63, 93, 74, 0.12), transparent 52%), radial-gradient(ellipse 70% 45% at 100% 0%, rgba(180, 160, 130, 0.14), transparent 48%)",
      }}
    />
    <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-16 md:max-w-4xl md:px-6 md:pb-28 md:pt-24">
      <p
        className="mb-4 font-mono text-sm text-accent animate-fade-in opacity-0"
        style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
      >
        Software Project Leader · Backend Tech Lead · 10+ years
      </p>
      <h1
        className="font-sans text-display-lg font-semibold tracking-tight text-balance text-content-primary animate-fade-up opacity-0"
        style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
      >
        I design and lead scalable backend systems.
      </h1>
      <p
        className="mt-6 max-w-2xl text-lg leading-relaxed text-content-secondary animate-fade-up opacity-0"
        style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
      >
        Backend Tech Lead with 10+ years of experience building high-concurrency systems in
        fintech and real-time environments. Strong in Python, Django, and FastAPI — with a track
        record of owning architecture, leading teams, and delivering measurable performance and
        scale outcomes.
      </p>
      <div
        className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center animate-fade-up opacity-0"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <a
          href="#experience"
          className="inline-flex items-center justify-center rounded-lg bg-content-primary px-5 py-3 text-sm font-medium text-surface-raised shadow-card transition hover:opacity-90"
        >
          View experience
        </a>
        <a
          href="#key-projects"
          className="inline-flex items-center justify-center rounded-lg border border-surface-border bg-surface-raised px-5 py-3 text-sm font-medium text-content-primary shadow-card transition hover:border-stone-400 hover:bg-surface"
        >
          View key projects
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-accent transition hover:text-content-primary"
        >
          Contact
        </a>
        <Link
          to="/projects"
          className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-content-tertiary transition hover:text-content-secondary sm:ml-0"
        >
          Full selected work →
        </Link>
      </div>
    </div>
  </header>
);

export default Hero;
