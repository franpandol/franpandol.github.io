import { render, screen } from "@testing-library/react";
import { expect, test, beforeEach } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import ProjectCard from "./ProjectCard";

beforeEach(async () => {
  await i18n.changeLanguage("en");
});

const baseProject = {
  id: "test-project",
  type: "personal",
  name: "Test Project",
  problem: "A problem.",
  solution: "A solution.",
  impact: "An impact.",
  stack: ["React", "Node.js"],
  repoUrl: "https://github.com/example/test",
  demoUrl: "https://example.com",
  image: null,
};

const renderCard = (project) =>
  render(
    <I18nextProvider i18n={i18n}>
      <ProjectCard project={project} />
    </I18nextProvider>
  );

test("renders both GitHub and live links when both URLs are present", () => {
  renderCard(baseProject);
  expect(screen.getByRole("link", { name: /GitHub/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Live demo/i })).toBeInTheDocument();
});

test("omits the GitHub link for professional case studies without a public repo", () => {
  renderCard({ ...baseProject, type: "professional", repoUrl: null });
  expect(screen.queryByRole("link", { name: /GitHub/i })).toBeNull();
  expect(screen.getByText("Case study")).toBeInTheDocument();
});

test("omits the live demo link when no demoUrl is set", () => {
  renderCard({ ...baseProject, demoUrl: null });
  expect(screen.queryByRole("link", { name: /Live demo/i })).toBeNull();
});

test("renders a richer placeholder when no image is set", () => {
  renderCard(baseProject);
  expect(screen.queryByRole("img")).toBeNull();
  // Monogram + title both appear in the header band (title also in h3)
  expect(screen.getAllByText("Test Project").length).toBeGreaterThanOrEqual(2);
  expect(screen.getByText("TP")).toBeInTheDocument();
  expect(screen.getAllByText("React").length).toBeGreaterThanOrEqual(1);
});

test("renders the image when one is provided", () => {
  renderCard({ ...baseProject, image: "/images/projects/test.png" });
  expect(screen.getByRole("img")).toHaveAttribute("src", "/images/projects/test.png");
});
