import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePostHog } from "posthog-js/react";
import { useTranslation } from "react-i18next";
import { EMAIL } from "../constants/contact";

// text-accent (#0f766e) ~5:1 on surface — passes WCAG AA
const textLink = "text-sm text-accent underline-offset-4 hover:underline";

const Hero = () => {
  const posthog = usePostHog();
  const { t } = useTranslation();
  const [copyFeedback, setCopyFeedback] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(
      () => {
        setCopyFeedback(t("common.copied"));
        posthog?.capture("recruiter_interview_email_copied");
        window.setTimeout(() => setCopyFeedback(""), 2000);
      },
      () => {
        setCopyFeedback(t("common.copyFailed"));
        window.setTimeout(() => setCopyFeedback(""), 2000);
      }
    );
  };

  return (
    <header className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(13,148,136,0.09),transparent)]"
        aria-hidden
      />
      <div className="relative w-full px-6 pb-10 pt-12 md:px-12 md:pb-14 md:pt-16 lg:px-16">
        <div className="mx-auto w-full max-w-[90rem]">
        {/* Always full-width: kicker, name, subtitle */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-muted">
          {t("hero.kicker")}
        </p>
        <h1 className="font-display mt-4 flex animate-fade-up items-center gap-3 text-display-lg font-semibold tracking-tight text-content-primary">
          <img src="/logo-mark.svg" alt="" aria-hidden="true" className="h-9 w-9 shrink-0 md:h-11 md:w-11" />
          {t("nav.brand")}
        </h1>
        <p className="mt-3 animate-fade-up text-sm text-content-tertiary opacity-0 [animation-delay:80ms] md:text-[15px]">
          {t("hero.subtitle")}
        </p>

        {/* Two-column layout from intro onwards */}
        <div className="mt-8 md:flex md:items-start md:gap-x-12 lg:gap-x-16">
          {/* Left column: description + links */}
          <div className="min-w-0 flex-1">
            <p className="text-[15px] leading-relaxed text-content-secondary md:text-base md:leading-relaxed">
              {t("hero.intro")}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-content-secondary md:text-base">
              <span className="font-medium text-content-primary">{t("hero.summaryLabel")}</span>{" "}
              {t("hero.summaryLine")}
            </p>
            <div className="mt-10 flex flex-wrap gap-x-3 gap-y-2 text-sm">
              <span className="text-content-secondary">{t("hero.goTo")}</span>
              <Link to="/experience" className={textLink}>{t("nav.experience")}</Link>
              <span aria-hidden className="text-content-tertiary">·</span>
              <Link to="/skills" className={textLink}>{t("nav.skills")}</Link>
              <span aria-hidden className="text-content-tertiary">·</span>
              <Link to="/projects" className={textLink}>{t("nav.projects")}</Link>
              <span aria-hidden className="text-content-tertiary">·</span>
              <Link to="/contact" className={textLink}>{t("nav.contact")}</Link>
            </div>
          </div>

          {/* Right column: compact contact card */}
          <aside className="mt-8 w-full md:mt-0 md:w-56 md:shrink-0 lg:w-64">
            <div className="rounded-lg border border-surface-border bg-surface-raised p-5 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-muted">
                {t("hero.contactLabel")}
              </p>
              <div className="mt-4">
                <p className="break-all font-mono text-sm text-content-primary">{EMAIL}</p>
                <div className="mt-1 flex items-center gap-x-2">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="text-xs text-content-tertiary underline-offset-4 hover:text-content-primary hover:underline"
                    aria-label={t("common.copyEmailAria")}
                  >
                    {t("common.copy")}
                  </button>
                  {copyFeedback ? (
                    <span className="font-mono text-xs text-content-tertiary">{copyFeedback}</span>
                  ) : null}
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <a
                  href="https://github.com/franpandol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={textLink}
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/franciscopandol/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={textLink}
                >
                  LinkedIn
                </a>
                <Link to="/contact#recruiters" className={textLink}>
                  {t("hero.recruitersLink")}
                </Link>
              </div>
            </div>
          </aside>
        </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
