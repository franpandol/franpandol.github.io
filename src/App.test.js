import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("posthog-js/react", () => ({
  usePostHog: () => ({ capture: jest.fn() }),
  PostHogProvider: ({ children }) => children,
}));

test("renders site title and hero", () => {
  render(<App />);
  expect(screen.getAllByText(/Francisco Pandol/i).length).toBeGreaterThanOrEqual(1);
  expect(
    screen.getByRole("heading", { name: /I design and lead scalable backend systems/i })
  ).toBeInTheDocument();
});
