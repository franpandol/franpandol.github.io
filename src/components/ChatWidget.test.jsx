import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, vi, beforeEach, afterEach } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import ChatWidget from "./ChatWidget";

const capture = vi.fn();

vi.mock("posthog-js/react", () => ({
  usePostHog: () => ({ capture }),
}));

function sseStreamFrom(chunks) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });
}

function mockChatFetch(chunks) {
  global.fetch = vi.fn().mockResolvedValue(
    new Response(sseStreamFrom(chunks), {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    })
  );
}

beforeEach(async () => {
  await i18n.changeLanguage("en");
  capture.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("renders a closed launcher button by default", () => {
  render(
    <I18nextProvider i18n={i18n}>
      <ChatWidget />
    </I18nextProvider>
  );

  expect(screen.getByRole("button", { name: /Open chat about Francisco's experience/i })).toBeInTheDocument();
  expect(screen.queryByText("Ask about Francisco")).not.toBeInTheDocument();
});

test("opening the launcher shows the panel and fires chat_opened once", () => {
  render(
    <I18nextProvider i18n={i18n}>
      <ChatWidget />
    </I18nextProvider>
  );

  fireEvent.click(screen.getByRole("button", { name: /Open chat about Francisco's experience/i }));

  expect(screen.getByText("Ask about Francisco")).toBeInTheDocument();
  expect(capture).toHaveBeenCalledWith("chat_opened");
  expect(capture).toHaveBeenCalledTimes(1);
});

test("sending a message streams the assistant reply into view", async () => {
  mockChatFetch([
    'data: {"response":"Hello"}\n\n',
    'data: {"response":" there"}\n\n',
    "data: [DONE]\n\n",
  ]);

  render(
    <I18nextProvider i18n={i18n}>
      <ChatWidget />
    </I18nextProvider>
  );

  fireEvent.click(screen.getByRole("button", { name: /Open chat about Francisco's experience/i }));
  fireEvent.change(screen.getByPlaceholderText("Ask a question…"), {
    target: { value: "What does he work with?" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Send" }));

  expect(capture).toHaveBeenCalledWith("chat_message_sent");
  expect(await screen.findByText("What does he work with?")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Hello there")).toBeInTheDocument();
  });

  expect(global.fetch).toHaveBeenCalledWith(
    "/api/chat",
    expect.objectContaining({ method: "POST" })
  );
});

test("shows an error message when the request fails", async () => {
  global.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 500 }));

  render(
    <I18nextProvider i18n={i18n}>
      <ChatWidget />
    </I18nextProvider>
  );

  fireEvent.click(screen.getByRole("button", { name: /Open chat about Francisco's experience/i }));
  fireEvent.change(screen.getByPlaceholderText("Ask a question…"), {
    target: { value: "Anything" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Send" }));

  expect(await screen.findByText(/Something went wrong/i)).toBeInTheDocument();
});

test("copying the email captures chat_cta_clicked", async () => {
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });

  render(
    <I18nextProvider i18n={i18n}>
      <ChatWidget />
    </I18nextProvider>
  );

  fireEvent.click(screen.getByRole("button", { name: /Open chat about Francisco's experience/i }));
  fireEvent.click(screen.getByRole("button", { name: "Copy" }));

  await waitFor(() => {
    expect(capture).toHaveBeenCalledWith("chat_cta_clicked");
  });
});
