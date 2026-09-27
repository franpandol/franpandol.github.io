import React, { useState } from "react";
import { usePostHog } from "posthog-js/react";
import { useTranslation } from "react-i18next";
import { EMAIL } from "../constants/contact";

// text-accent (#0f766e) ~5:1 on surface — passes WCAG AA
const linkClass = "text-base text-accent underline-offset-4 hover:underline";

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

  const onDownload = (format) => {
    posthog?.capture("download_cv", { format });
  };

  return (
    <section className="rounded-lg border border-surface-border bg-surface-raised p-6 shadow-sm md:p-8">
      <h2 className="font-display text-lg font-semibold tracking-tight text-content-primary md:text-xl">
        {t("contact.directTitle")}
      </h2>

      <div className="mt-4 space-y-4 text-base">
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

      <div className="mt-8 flex flex-wrap gap-x-4 gap-y-1">
        <a
          href="/CV_en_Francisco_Pandol.pdf"
          download
          className={linkClass}
          onClick={() => onDownload("pdf")}
        >
          {t("contact.downloadPdf")}
        </a>
        <span className="text-content-tertiary">·</span>
        <a
          href="/cv_markdown_en_Francisco_Pandol.md"
          download
          className={linkClass}
          onClick={() => onDownload("markdown")}
        >
          {t("contact.downloadMd")}
        </a>
      </div>

      <p className="mt-8 border-t border-surface-border pt-6 text-base leading-relaxed text-content-tertiary">
        {t("contact.footer")}
      </p>
    </section>
  );
};
