import React from "react";
import { useTranslation } from "react-i18next";
import { sectionTitleClass } from "../sectionTitles";

const groupKeys = ["backend", "systems", "cloud", "engineering"];

export const SkillsContent = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
      {groupKeys.map((key) => {
        const items = t(`skills.groups.${key}.items`, { returnObjects: true });
        const list = Array.isArray(items) ? items : [];
        return (
          <div key={key}>
            <h3 className={`${sectionTitleClass} mb-4`}>{t(`skills.groups.${key}.title`)}</h3>
            <ul className="flex flex-wrap gap-2">
              {list.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-surface-border bg-surface-raised px-3 py-1.5 text-sm font-medium text-content-primary shadow-card"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
