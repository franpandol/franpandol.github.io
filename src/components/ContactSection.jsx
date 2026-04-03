import React, { useState } from "react";
import { usePostHog } from "posthog-js/react";
import Section, { sectionTitleClass } from "./Section";

const EMAIL = "pandol.francisco@gmail.com";

const linkClass =
  "text-sm text-content-primary underline-offset-4 hover:underline";

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

  return (
    <Section id="contact" className="pb-16 md:pb-20">
      <h2 className={sectionTitleClass}>Contact</h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-content-secondary">
        Open to <strong className="font-medium text-content-primary">Software Project Leader</strong>{" "}
        and <strong className="font-medium text-content-primary">Backend Tech Lead</strong> roles
        where system design, high concurrency, and technical ownership matter.
      </p>
      <div className="mt-8 space-y-3 text-sm">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <a href={`mailto:${EMAIL}`} className={linkClass} onClick={handleContactClick}>
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copyToClipboard}
            className="text-sm text-content-tertiary underline-offset-4 hover:text-content-primary hover:underline"
            aria-label="Copy email address"
          >
            Copy
          </button>
          {copySuccess ? (
            <span className="font-mono text-xs text-content-tertiary">{copySuccess}</span>
          ) : null}
        </div>
        <p>
          <a
            href="https://github.com/franpandol"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
        </p>
        <p>
          <a
            href="https://www.linkedin.com/in/franciscopandol/en/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
        </p>
      </div>
      <p className="mt-10 border-t border-surface-border pt-8 text-sm leading-relaxed text-content-tertiary">
        Interested in marketplaces, payments, and platform-scale backends where engineering impact
        is measured in reliability and throughput.
      </p>
    </Section>
  );
};

export default ContactSection;
