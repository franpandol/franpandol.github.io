import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import App from "./App";

vi.mock("posthog-js/react", () => ({
  usePostHog: () => ({ capture: vi.fn() }),
  PostHogProvider: ({ children }) => children,
}));

test("renders CV masthead and name", () => {
  render(<App />);
  expect(screen.getAllByText(/Francisco Pandol/i).length).toBeGreaterThanOrEqual(1);
  expect(
    screen.getByRole("heading", { level: 1, name: /Francisco Pandol/i })
  ).toBeInTheDocument();
});
