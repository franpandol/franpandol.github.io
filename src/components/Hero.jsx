import React from "react";
import { Link } from "react-router-dom";
import { usePostHog } from "posthog-js/react";

const textLink =
  "text-sm text-content-secondary underline-offset-4 hover:text-content-primary hover:underline";

const Hero = () => {
  const posthog = usePostHog();

  const onDownload = (format) => {
    posthog?.capture("download_cv", { format });
  };

  return (
    <header className="border-b border-surface-border px-6 pb-10 pt-8 md:px-8 md:pb-12 md:pt-10">
      <h1 className="text-2xl font-semibold tracking-tight text-content-primary md:text-3xl">
        Francisco Pandol
      </h1>
      <p className="mt-2 text-sm text-content-tertiary">
        Software Project Leader · Backend Tech Lead · 10+ years
      </p>
      <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-content-secondary">
        Backend Tech Lead with 10+ years building high-concurrency systems in fintech and real-time
        environments. Strong in Python, Django, and FastAPI — owning architecture, leading teams,
        and delivering measurable performance and scale outcomes.
      </p>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-content-secondary">
        <span className="text-content-primary">Summary:</span> I design and lead scalable backend
        systems for product and platform teams.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2 text-sm text-content-tertiary">
        <span>Jump to:</span>
        <a href="#experience" className={textLink}>
          Experience
        </a>
        <span aria-hidden className="text-content-tertiary">
          ·
        </span>
        <a href="#about" className={textLink}>
          About
        </a>
        <span aria-hidden className="text-content-tertiary">
          ·
        </span>
        <a href="#skills" className={textLink}>
          Skills
        </a>
        <span aria-hidden className="text-content-tertiary">
          ·
        </span>
        <a href="#key-projects" className={textLink}>
          Selected work
        </a>
        <span aria-hidden className="text-content-tertiary">
          ·
        </span>
        <a href="#contact" className={textLink}>
          Contact
        </a>
        <span aria-hidden className="text-content-tertiary">
          ·
        </span>
        <Link to="/projects" className={textLink}>
          All projects
        </Link>
      </div>
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <a
          href="/CV_en_Francisco_Pandol.pdf"
          download
          className={textLink}
          onClick={() => onDownload("pdf")}
        >
          Download CV (PDF)
        </a>
        <span className="text-content-tertiary">·</span>
        <a
          href="/cv_markdown_en_Francisco_Pandol.md"
          download
          className={textLink}
          onClick={() => onDownload("markdown")}
        >
          Download CV (Markdown)
        </a>
      </div>
    </header>
  );
};

export default Hero;
