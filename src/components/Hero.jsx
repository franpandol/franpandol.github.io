import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { EMAIL } from "../constants/contact";

// text-accent (#0f766e) ~5:1 on surface — passes WCAG AA
const textLink = "text-sm text-accent underline-offset-4 hover:underline";
const strongClass = "font-medium text-content-primary";

const Hero = () => {
  const { t } = useTranslation();
  const [copyFeedback, setCopyFeedback] = useState("");
  const badges = t("hero.badges", { returnObjects: true });
  const badgeList = Array.isArray(badges) ? badges : [];

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(
      () => {
        setCopyFeedback(t("common.copied"));
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
          {/* Two-column layout: kicker through CTAs on the left, contact card on the right */}
          <div className="md:flex md:items-start md:gap-x-12 lg:gap-x-16">
            {/* Left column: identity + bio + CTAs */}
            <div className="min-w-0 flex-1">
              <span className="inline-flex animate-fade-up items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                {t("hero.kicker")}
              </span>
              <h1 className="font-display mt-4 flex animate-fade-up items-center gap-3 text-display-lg font-semibold tracking-tight text-content-primary">
                <img src="/logo-mark.svg" alt="" aria-hidden="true" className="h-9 w-9 shrink-0 md:h-11 md:w-11" />
                {t("nav.brand")}
              </h1>
              <p className="mt-3 animate-fade-up text-sm text-content-tertiary opacity-0 [animation-delay:80ms] md:text-[15px]">
                {t("hero.subtitle")}
              </p>

              {badgeList.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {badgeList.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-surface-border bg-surface-raised px-3 py-1 text-xs font-medium text-content-secondary shadow-card"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 max-w-2xl space-y-4 text-[15px] leading-relaxed text-content-secondary md:text-base md:leading-relaxed">
                <p>
                  <Trans
                    i18nKey="about.p1"
                    components={[
                      <strong key="s1" className={strongClass} />,
                      <strong key="s2" className={strongClass} />,
                      <strong key="s3" className={strongClass} />,
                      <strong key="s4" className={strongClass} />,
                      <strong key="s5" className={strongClass} />,
                    ]}
                  />
                </p>
                <p>
                  <Trans i18nKey="about.p2" components={[<strong key="s1" className={strongClass} />]} />
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t("hero.ctaContact")}
                </Link>
                <Link
                  to="/experience"
                  className="inline-flex items-center justify-center rounded-md border border-surface-border bg-surface-raised px-5 py-2.5 text-sm font-medium text-content-primary shadow-sm transition-colors hover:border-accent-muted hover:text-accent"
                >
                  {t("hero.ctaExperience")}
                </Link>
              </div>
            </div>

            {/* Right column: compact contact card, top-aligned with the name */}
            <aside className="mt-8 w-full md:mt-0 md:w-64 md:shrink-0 lg:w-72">
              <div className="rounded-lg border border-surface-border bg-surface-raised p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-semibold text-accent"
                  >
                    FP
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-muted">
                    {t("hero.contactLabel")}
                  </p>
                </div>

                <div className="mt-5 border-t border-surface-border pt-5">
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

                <div className="mt-5 flex flex-col gap-2 border-t border-surface-border pt-5">
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
                </div>

                <div className="mt-5 border-t border-surface-border pt-5">
                  <Link
                    to="/contact#recruiters"
                    className="flex items-center justify-center rounded-md border border-accent-muted/40 bg-accent-soft px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent-dim"
                  >
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
