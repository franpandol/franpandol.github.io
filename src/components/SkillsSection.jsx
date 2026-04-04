import React from "react";
import { useTranslation } from "react-i18next";
import { sectionTitleClass } from "../sectionTitles";

const groupKeys = ["backend", "systems", "cloud", "engineering"];

export const SkillsContent = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-10 border-t border-surface-border pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:pt-12">
      {groupKeys.map((key) => {
        const items = t(`skills.groups.${key}.items`, { returnObjects: true });
        const list = Array.isArray(items) ? items : [];
        return (
          <div key={key}>
            <h3 className={`${sectionTitleClass} mb-4`}>{t(`skills.groups.${key}.title`)}</h3>
            <ul className="space-y-2 text-sm text-content-secondary md:text-[15px]">
              {list.map((item) => (
                <li key={item} className="leading-relaxed">
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
