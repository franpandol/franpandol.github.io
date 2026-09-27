import { render, screen } from "@testing-library/react";
import { expect, test, beforeEach } from "vitest";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18n from "../i18n";
import Navbar from "./Navbar";

beforeEach(async () => {
  await i18n.changeLanguage("en");
});

test("has a single Projects link and no Work link", () => {
  render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </I18nextProvider>
  );

  expect(screen.getAllByRole("link", { name: /^Projects$/i })).toHaveLength(1);
  expect(screen.queryByRole("link", { name: /^Selected work$/i })).toBeNull();
});
