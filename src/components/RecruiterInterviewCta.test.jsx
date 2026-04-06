import { render, screen } from "@testing-library/react";
import { expect, test, vi, beforeEach } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import RecruiterInterviewCta from "./RecruiterInterviewCta";

vi.mock("posthog-js/react", () => ({
  usePostHog: () => ({ capture: vi.fn() }),
}));

beforeEach(async () => {
  await i18n.changeLanguage("en");
});

test("recruiter CTA shows email and copy draft control (no mailto)", () => {
  render(
    <I18nextProvider i18n={i18n}>
      <RecruiterInterviewCta />
    </I18nextProvider>
  );

  expect(screen.getByText("pandol.francisco@gmail.com")).toBeInTheDocument();
  expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
  expect(screen.getByRole("button", { name: /Copy draft message/i })).toBeInTheDocument();
});

test("section is anchor target for recruiters", () => {
  render(
    <I18nextProvider i18n={i18n}>
      <RecruiterInterviewCta />
    </I18nextProvider>
  );

  expect(document.getElementById("recruiters")).toBeTruthy();
});
