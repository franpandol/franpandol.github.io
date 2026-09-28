import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("renders CV masthead and name", () => {
  render(<App />);
  expect(screen.getAllByText(/Francisco Pandol/i).length).toBeGreaterThanOrEqual(1);
  expect(
    screen.getByRole("heading", { level: 1, name: /Francisco Pandol/i })
  ).toBeInTheDocument();
});

test("redirects the old /work route to /projects", () => {
  window.history.pushState({}, "", "/work");
  render(<App />);
  expect(window.location.pathname).toBe("/projects");
  expect(screen.getByRole("heading", { level: 1, name: /Projects/i })).toBeInTheDocument();
});
