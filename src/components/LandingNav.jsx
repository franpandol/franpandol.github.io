import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LandingNav = () => {
  const { t } = useTranslation();
  const items = [
    { to: "/experience", titleKey: "landing.experience.title", descKey: "landing.experience.description" },
    { to: "/about", titleKey: "landing.about.title", descKey: "landing.about.description" },
    { to: "/skills", titleKey: "landing.skills.title", descKey: "landing.skills.description" },
    { to: "/work", titleKey: "landing.work.title", descKey: "landing.work.description" },
    { to: "/projects", titleKey: "landing.projects.title", descKey: "landing.projects.description" },
    { to: "/blogs", titleKey: "landing.blogs.title", descKey: "landing.blogs.description" },
    { to: "/contact", titleKey: "landing.contact.title", descKey: "landing.contact.description" },
  ];

  return (
    <section className="px-6 py-12 md:px-12 md:py-16 lg:px-16">
      <div className="mx-auto w-full max-w-[90rem]">
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-muted">
          {t("landing.explore")}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="group flex h-full flex-col rounded-lg border border-surface-border bg-surface-raised p-5 shadow-card transition hover:border-accent-muted/45 hover:bg-surface md:p-6"
              >
                <span className="font-display text-lg font-semibold text-content-primary group-hover:text-accent md:text-xl">
                  {t(item.titleKey)}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-content-secondary">
                  {t(item.descKey)}
                </span>
                <span className="mt-4 text-sm font-medium text-accent-muted group-hover:text-accent">
                  {t("landing.view")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LandingNav;
