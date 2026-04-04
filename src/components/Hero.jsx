import React from "react";
import { Link } from "react-router-dom";
import { usePostHog } from "posthog-js/react";
import { useTranslation } from "react-i18next";

const textLink =
  "text-sm text-accent-muted underline-offset-4 hover:text-accent hover:underline";

const Hero = () => {
  const posthog = usePostHog();
  const { t } = useTranslation();

  const onDownload = (format) => {
    posthog?.capture("download_cv", { format });
  };

  return (
    <header className="relative overflow-hidden border-b border-surface-border">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(13,148,136,0.09),transparent)]"
        aria-hidden
      />
      <div className="relative w-full max-w-[90rem] px-6 pb-14 pt-12 md:px-12 md:pb-20 md:pt-16 lg:px-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-muted">
          {t("hero.kicker")}
        </p>
        <h1 className="font-display mt-4 text-display-lg font-semibold tracking-tight text-content-primary">
          {t("nav.brand")}
        </h1>
        <p className="mt-3 text-sm text-content-tertiary md:text-[15px]">{t("hero.subtitle")}</p>
        <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-content-secondary md:text-base md:leading-relaxed">
          {t("hero.intro")}
        </p>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-content-secondary md:text-base">
          <span className="font-medium text-content-primary">{t("hero.summaryLabel")}</span>{" "}
          {t("hero.summaryLine")}
        </p>
        <div className="mt-10 flex flex-wrap gap-x-3 gap-y-2 text-sm text-content-tertiary">
          <span className="text-content-secondary">{t("hero.goTo")}</span>
          <Link to="/experience" className={textLink}>
            {t("nav.experience")}
          </Link>
          <span aria-hidden className="text-content-tertiary">
            ·
          </span>
          <Link to="/about" className={textLink}>
            {t("nav.about")}
          </Link>
          <span aria-hidden className="text-content-tertiary">
            ·
          </span>
          <Link to="/skills" className={textLink}>
            {t("nav.skills")}
          </Link>
          <span aria-hidden className="text-content-tertiary">
            ·
          </span>
          <Link to="/work" className={textLink}>
            {t("nav.work")}
          </Link>
          <span aria-hidden className="text-content-tertiary">
            ·
          </span>
          <Link to="/projects" className={textLink}>
            {t("nav.projects")}
          </Link>
          <span aria-hidden className="text-content-tertiary">
            ·
          </span>
          <Link to="/blogs" className={textLink}>
            {t("nav.blogs")}
          </Link>
          <span aria-hidden className="text-content-tertiary">
            ·
          </span>
          <Link to="/contact" className={textLink}>
            {t("nav.contact")}
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <a
            href="/CV_en_Francisco_Pandol.pdf"
            download
            className={textLink}
            onClick={() => onDownload("pdf")}
          >
            {t("hero.downloadPdf")}
          </a>
          <span className="text-content-tertiary">·</span>
          <a
            href="/cv_markdown_en_Francisco_Pandol.md"
            download
            className={textLink}
            onClick={() => onDownload("markdown")}
          >
            {t("hero.downloadMd")}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
