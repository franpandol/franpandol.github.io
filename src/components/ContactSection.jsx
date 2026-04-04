import React, { useState } from "react";
import { usePostHog } from "posthog-js/react";
import { useTranslation } from "react-i18next";

const EMAIL = "pandol.francisco@gmail.com";

const linkClass =
  "text-sm text-accent-muted underline-offset-4 hover:text-accent hover:underline";

export const ContactContent = () => {
  const posthog = usePostHog();
  const { t } = useTranslation();
  const [copySuccess, setCopySuccess] = useState("");

  const handleContactClick = () => {
    posthog?.capture("contact_me_clicked");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(EMAIL).then(
      () => {
        setCopySuccess(t("common.copied"));
        setTimeout(() => setCopySuccess(""), 2000);
      },
      () => {
        setCopySuccess(t("common.copyFailed"));
      }
    );
  };

  return (
    <>
      <div className="space-y-4 text-sm md:text-[15px]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <a href={`mailto:${EMAIL}`} className={linkClass} onClick={handleContactClick}>
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copyToClipboard}
            className="text-sm text-content-tertiary underline-offset-4 hover:text-content-primary hover:underline"
            aria-label={t("common.copyEmailAria")}
          >
            {t("common.copy")}
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
      <p className="mt-12 border-t border-surface-border pt-10 text-sm leading-relaxed text-content-tertiary md:text-[15px]">
        {t("contact.footer")}
      </p>
    </>
  );
};
