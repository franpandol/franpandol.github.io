import React from "react";
import { useTranslation } from "react-i18next";

const btn =
  "rounded border border-surface-border px-2 py-1 text-xs font-medium transition hover:border-accent-muted hover:text-accent";
const active = "border-accent-muted bg-surface-raised text-accent";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const lng = (i18n.resolvedLanguage || i18n.language || "en").toLowerCase();

  return (
    <div className="flex items-center gap-1" role="group" aria-label={t("common.language")}>
      <button
        type="button"
        className={`${btn} ${lng.startsWith("en") ? active : "text-content-tertiary"}`}
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={`${btn} ${lng.startsWith("es") ? active : "text-content-tertiary"}`}
        onClick={() => i18n.changeLanguage("es")}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;
