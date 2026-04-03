import React, { useState } from "react";
import { usePostHog } from "posthog-js/react";
import { MdContentCopy } from "react-icons/md";
import Section from "./Section";

const EMAIL = "pandol.francisco@gmail.com";

const ContactSection = () => {
  const posthog = usePostHog();
  const [copySuccess, setCopySuccess] = useState("");

  const handleContactClick = () => {
    posthog?.capture("contact_me_clicked");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(EMAIL).then(
      () => {
        setCopySuccess("Copied");
        setTimeout(() => setCopySuccess(""), 2000);
      },
      () => {
        setCopySuccess("Copy failed");
      }
    );
  };

  const linkClass =
    "text-content-primary underline decoration-surface-border underline-offset-4 transition hover:decoration-accent hover:text-accent";

  return (
    <Section id="contact" className="pb-24 md:pb-32">
      <h2 className="font-display text-display-sm font-semibold text-content-primary">Contact</h2>
      <p className="mt-4 max-w-xl text-lg text-content-secondary">
        Open to <strong className="font-medium text-content-primary">Software Project Leader</strong>{" "}
        and <strong className="font-medium text-content-primary">Backend Tech Lead</strong> roles
        where system design, high concurrency, and technical ownership define success.
      </p>
      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <a href={`mailto:${EMAIL}`} className={linkClass} onClick={handleContactClick}>
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-raised px-3 py-2 text-sm text-content-secondary transition hover:border-stone-400 hover:text-content-primary"
            aria-label="Copy email address"
          >
            <MdContentCopy className="text-base" />
            Copy
          </button>
          {copySuccess ? (
            <span className="font-mono text-xs text-accent">{copySuccess}</span>
          ) : null}
        </div>
        <span className="hidden text-content-tertiary sm:inline" aria-hidden>
          |
        </span>
        <a
          href="https://github.com/franpandol"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/franciscopandol/en/"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          LinkedIn
        </a>
      </div>
      <p className="mt-12 max-w-2xl border-t border-surface-border pt-10 text-sm leading-relaxed text-content-tertiary">
        Particularly interested in opportunities at the intersection of marketplaces, payments, and
        platform-scale backends 
      </p>
    </Section>
  );
};

export default ContactSection;
