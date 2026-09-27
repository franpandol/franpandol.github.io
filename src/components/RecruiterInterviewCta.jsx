import React, { useMemo, useState } from "react";
import { usePostHog } from "posthog-js/react";
import { useTranslation } from "react-i18next";
import { EMAIL } from "../constants/contact";
import { dailyWindows, TIMEZONE_IANA } from "../data/availability";

// Parse "HH:mm" as Argentina time (always UTC-3, no DST) → UTC Date
const argHmToDate = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return new Date(
    `2000-01-01T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00-03:00`
  );
};

const formatInTz = (hhmm, tz, locale) =>
  new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone: tz }).format(
    argHmToDate(hhmm)
  );

const RecruiterInterviewCta = () => {
  const { t, i18n } = useTranslation();
  const posthog = usePostHog();
  const locale = i18n.language === "es" ? "es-AR" : "en-US";
  const [copyFeedback, setCopyFeedback] = useState("");

  const windowLines = useMemo(
    () =>
      dailyWindows.map((w) => {
        const start = formatInTz(w.start, TIMEZONE_IANA, locale);
        const end = formatInTz(w.end, TIMEZONE_IANA, locale);
        const utcStart = formatInTz(w.start, "UTC", "en-US");
        const utcEnd = formatInTz(w.end, "UTC", "en-US");
        return t("contact.recruiters.windowLine", { start, end, utcStart, utcEnd });
      }),
    [t, locale]
  );

  const slotsSummary = useMemo(
    () => windowLines.map((line) => `- ${line}`).join("\n"),
    [windowLines]
  );

  const mailSubject = useMemo(() => t("contact.recruiters.mailSubject"), [t]);

  const mailBody = useMemo(
    () => t("contact.recruiters.mailBody", { email: EMAIL, slots: slotsSummary }),
    [t, slotsSummary]
  );

  const messageDraft = useMemo(
    () => `${t("contact.recruiters.subjectLineLabel")} ${mailSubject}\n\n${mailBody}`,
    [t, mailSubject, mailBody]
  );

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
      <p className="mt-3 text-base leading-relaxed text-content-secondary">
        {t("contact.recruiters.intro")}
      </p>

      {/* Availability block */}
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-accent-muted">
        {t("contact.recruiters.slotsHeading")}
      </p>
      <p className="mt-1 text-xs text-content-tertiary">{t("contact.recruiters.timezoneNote")}</p>
      <p className="mt-3 text-base font-medium text-content-secondary">
        {t("contact.recruiters.dailyIntro")}
      </p>
      <ul className="mt-2 list-inside list-disc space-y-1 text-base text-content-secondary">
        {dailyWindows.map((w, i) => (
          <li key={`${w.start}-${w.end}`}>{windowLines[i]}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-content-tertiary">
        {t("contact.recruiters.disclaimer")}
      </p>

      {/* Action zone */}
      <div className="mt-6 rounded-md border border-surface-border bg-surface p-4">
        <p className="text-base leading-relaxed text-content-secondary">
          {t("contact.recruiters.ctaInstruction")}
        </p>

        {/* Send-to row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-xs text-content-tertiary">{t("contact.recruiters.sendToLabel")}</span>
          <span className="font-mono text-sm text-accent-muted">{EMAIL}</span>
          <button
            type="button"
            onClick={copyEmail}
            className="text-sm text-content-tertiary underline-offset-4 hover:text-content-primary hover:underline"
            aria-label={t("common.copyEmailAria")}
          >
            {t("common.copy")}
          </button>
        </div>

        {/* Subject line row */}
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-xs text-content-tertiary">{t("contact.recruiters.subjectLineLabel")}</span>
          <span className="font-mono text-sm text-content-secondary">{mailSubject}</span>
        </div>

        {/* Draft preview */}
        <details className="mt-4">
          <summary className="cursor-pointer select-none text-sm text-content-tertiary hover:text-content-secondary">
            {t("contact.recruiters.previewDraft")}
          </summary>
          <pre className="mt-2 overflow-x-auto rounded border border-surface-border bg-surface-raised p-3 font-mono text-xs leading-relaxed text-content-tertiary whitespace-pre-wrap">
            {messageDraft}
          </pre>
        </details>

        {/* Primary CTA */}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={copyTemplate}
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t("contact.recruiters.copyTemplate")}
          </button>
          {copyFeedback ? (
            <span className="font-mono text-xs text-content-tertiary">{copyFeedback}</span>
          ) : null}
        </div>

        {/* Next steps */}
        <p className="mt-3 text-xs leading-relaxed text-content-tertiary">
          {t("contact.recruiters.nextSteps")}
        </p>
      </div>
    </section>
  );
};

export default RecruiterInterviewCta;
