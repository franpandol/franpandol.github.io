import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

/** Syncs <html lang>, document title, and meta description with the active locale. */
const DocumentMeta = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language.toLowerCase().startsWith("es") ? "es" : "en";
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t("meta.description"));
    }
  }, [i18n.language, t]);

  return null;
};

export default DocumentMeta;
