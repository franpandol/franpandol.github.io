import { render, screen } from "@testing-library/react";
import { expect, test, beforeEach } from "vitest";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18n from "../i18n";
import FeaturedProjects from "./FeaturedProjects";
import { selectedProjects } from "../data/projects";

beforeEach(async () => {
  await i18n.changeLanguage("en");
});

test("renders only featured projects, capped at 3", () => {
  render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <FeaturedProjects />
      </MemoryRouter>
    </I18nextProvider>
  );

  const featuredCount = selectedProjects.filter((p) => p.featured).length;
  expect(featuredCount).toBeGreaterThan(0);

  const headings = screen.getAllByRole("heading", { level: 3 });
  expect(headings.length).toBeLessThanOrEqual(3);
  expect(headings.length).toBeGreaterThan(0);
});

test("links to the full projects page", () => {
  render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <FeaturedProjects />
      </MemoryRouter>
    </I18nextProvider>
  );

  expect(screen.getByRole("link", { name: /View all projects/i })).toHaveAttribute(
    "href",
    "/projects"
  );
});
