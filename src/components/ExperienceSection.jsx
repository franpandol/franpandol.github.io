import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { sectionTitleClass } from "../sectionTitles";
import { buildExperienceLists } from "../data/experience";

export const ExperienceContent = () => {
  const { t, i18n } = useTranslation();
  const { featuredRoles, earlierRoles } = useMemo(
    () => buildExperienceLists(i18n.language, t("common.present")),
    [i18n.language, t]
  );

  return (
    <>
      <div className="space-y-0 divide-y divide-surface-border">
        {featuredRoles.map((role) => (
          <article key={role.id} className="py-8 first:pt-6 md:py-10 md:first:pt-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <div>
                <h3 className="text-lg font-semibold text-content-primary md:text-xl">{role.title}</h3>
                <p className="text-sm text-content-secondary">{role.org}</p>
              </div>
              <time className="shrink-0 font-mono text-xs text-content-tertiary">{role.period}</time>
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-accent-muted">
                {t("experience.challenge")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary md:text-[15px]">
                {role.problem}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-accent-muted">
                {t("experience.designed")}
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-relaxed text-content-secondary md:text-[15px]">
                {role.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="mt-4 font-mono text-xs text-content-tertiary">{role.stack}</p>
          </article>
        ))}
      </div>
      <div className="mt-10 border-t border-surface-border pt-8 md:mt-12 md:pt-10">
        <h3 className={sectionTitleClass}>{t("experience.earlierTitle")}</h3>
        <p className="mt-4 text-sm leading-relaxed text-content-secondary md:text-[15px]">
          {t("experience.earlierIntro")}
        </p>
        <ul className="mt-8 space-y-6">
          {earlierRoles.map((role) => (
            <li key={role.id} className="text-sm md:text-[15px]">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                <span>
                  <span className="font-medium text-content-primary">{role.title}</span>
                  <span className="text-content-tertiary"> · {role.org}</span>
                </span>
                <time className="font-mono text-xs text-content-tertiary">{role.period}</time>
              </div>
              <p className="mt-1 leading-relaxed text-content-secondary">{role.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
