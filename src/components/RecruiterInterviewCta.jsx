import React, { useMemo, useState } from "react";
import { usePostHog } from "posthog-js/react";
import { useTranslation } from "react-i18next";
import { EMAIL } from "../constants/contact";
import { dailyWindows } from "../data/availability";

const formatHm = (hhmm, locale) => {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }).format(d);
};

const RecruiterInterviewCta = () => {
  const { t, i18n } = useTranslation();
  const posthog = usePostHog();
  const locale = i18n.language === "es" ? "es-AR" : "en-US";
  const [copyFeedback, setCopyFeedback] = useState("");

  const windowLines = useMemo(
    () =>
      dailyWindows.map((w) => {
        const start = formatHm(w.start, locale);
        const end = formatHm(w.end, locale);
        return t("contact.recruiters.windowLine", { start, end });
      }),
    [t, locale]
  );

  const slotsSummary = useMemo(
    () => windowLines.map((line) => `- ${line}`).join("\n"),
    [windowLines]
  );

  const messageDraft = useMemo(() => {
    const subject = t("contact.recruiters.mailSubject");
    const body = t("contact.recruiters.mailBody", { email: EMAIL, slots: slotsSummary });
    return `${t("contact.recruiters.subjectLineLabel")} ${subject}\n\n${body}`;
  }, [t, slotsSummary]);

  const showFeedback = (key) => {
    setCopyFeedback(t(key));
    window.setTimeout(() => setCopyFeedback(""), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(
      () => {
        showFeedback("common.copied");
        posthog?.capture("recruiter_interview_email_copied");
      },
      () => showFeedback("common.copyFailed")
    );
  };

  const copyTemplate = () => {
    navigator.clipboard.writeText(messageDraft).then(
      () => {
        showFeedback("contact.recruiters.templateCopied");
        posthog?.capture("recruiter_interview_template_copied");
      },
      () => showFeedback("common.copyFailed")
    );
  };

  return (
    <section
      id="recruiters"
      className="mb-12 rounded-lg border border-surface-border bg-surface-raised p-6 shadow-sm md:p-8"
      aria-labelledby="recruiters-heading"
    >
      <h2
        id="recruiters-heading"
        className="font-display text-lg font-semibold tracking-tight text-content-primary md:text-xl"
      >
        {t("contact.recruiters.title")}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-content-secondary md:text-[15px]">
        {t("contact.recruiters.intro")}
      </p>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-accent-muted">
        {t("contact.recruiters.slotsHeading")}
      </p>
      <p className="mt-1 text-xs text-content-tertiary">{t("contact.recruiters.timezoneNote")}</p>
      <p className="mt-3 text-sm font-medium text-content-secondary md:text-[15px]">
        {t("contact.recruiters.dailyIntro")}
      </p>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-content-secondary md:text-[15px]">
        {dailyWindows.map((w, i) => (
          <li key={`${w.start}-${w.end}`}>{windowLines[i]}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-content-tertiary">{t("contact.recruiters.disclaimer")}</p>

      <p className="mt-8 text-sm leading-relaxed text-content-secondary md:text-[15px]">
        {t("contact.recruiters.ctaInstruction")}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono text-sm text-accent-muted">{EMAIL}</span>
        <button
          type="button"
          onClick={copyEmail}
          className="text-sm text-content-tertiary underline-offset-4 hover:text-content-primary hover:underline"
          aria-label={t("common.copyEmailAria")}
        >
          {t("common.copy")}
        </button>
        {copyFeedback ? (
          <span className="font-mono text-xs text-content-tertiary">{copyFeedback}</span>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="button"
          onClick={copyTemplate}
          className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t("contact.recruiters.copyTemplate")}
        </button>
      </div>
    </section>
  );
};

export default RecruiterInterviewCta;
