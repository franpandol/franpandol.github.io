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
      <div className="relative space-y-8 border-l-2 border-surface-border pl-7 md:space-y-10 md:pl-10">
        {featuredRoles.map((role) => (
          <article key={role.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[2.15rem] top-7 h-3.5 w-3.5 rounded-full border-[3px] border-surface bg-accent md:-left-[2.9rem]"
            />
            <div className="rounded-xl border border-surface-border bg-surface-raised p-6 shadow-card md:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-content-primary md:text-2xl">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-base font-semibold text-accent-secondary">{role.org}</p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {role.current ? (
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                      {t("experience.current")}
                    </span>
                  ) : null}
                  <time className="rounded-full bg-surface-overlay px-3 py-1.5 font-mono text-sm text-content-secondary">
                    {role.period}
                  </time>
                </div>
              </div>

              <div className="mt-5">
                <p className="inline-block rounded bg-accent-soft px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-accent">
                  {t("experience.challenge")}
                </p>
                <p className="mt-2 max-w-3xl text-base leading-relaxed text-content-secondary">
                  {role.problem}
                </p>
              </div>

              <div className="mt-5">
                <p className="inline-block rounded bg-accent-secondary-soft px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-accent-secondary">
                  {t("experience.designed")}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {role.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-relaxed text-content-secondary">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {role.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-surface-border bg-surface-overlay px-2.5 py-1 font-mono text-xs text-content-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 border-t border-surface-border pt-8 md:mt-14 md:pt-10">
        <h3 className={sectionTitleClass}>{t("experience.earlierTitle")}</h3>
        <p className="mt-4 text-base leading-relaxed text-content-secondary">
          {t("experience.earlierIntro")}
        </p>
        <ul className="mt-8 space-y-6">
          {earlierRoles.map((role) => (
            <li key={role.id} className="text-base">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                <span>
                  <span className="font-semibold text-content-primary">{role.title}</span>
                  <span className="text-content-tertiary"> · {role.org}</span>
                </span>
                <time className="font-mono text-sm text-content-tertiary">{role.period}</time>
              </div>
              <p className="mt-1 leading-relaxed text-content-secondary">{role.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
