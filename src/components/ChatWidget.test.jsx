import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, vi, beforeEach, afterEach } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import ChatWidget from "./ChatWidget";

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

function mockTurnstile(token = "test-turnstile-token") {
  window.turnstile = {
    render: vi.fn((_el, options) => {
      // Simulate a successful challenge shortly after mount.
      queueMicrotask(() => options?.callback?.(token));
      return "widget-1";
    }),
    reset: vi.fn(),
    remove: vi.fn(),
  };
}

beforeEach(async () => {
  await i18n.changeLanguage("en");
  mockTurnstile();
});

afterEach(() => {
  vi.restoreAllMocks();
  delete window.turnstile;
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

test("opening the launcher shows the panel", async () => {
  render(
    <I18nextProvider i18n={i18n}>
      <ChatWidget />
    </I18nextProvider>
  );

  fireEvent.click(screen.getByRole("button", { name: /Open chat about Francisco's experience/i }));

  expect(screen.getByText("Ask about Francisco")).toBeInTheDocument();
  await waitFor(() => {
    expect(window.turnstile.render).toHaveBeenCalled();
  });
});

test("sending a message streams the assistant reply into view", async () => {
  // Real Workers AI shape: OpenAI-compatible chat completion chunks.
  mockChatFetch([
    'data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n',
    'data: {"choices":[{"delta":{"content":" there"}}]}\n\n',
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

  await waitFor(() => {
    expect(screen.getByRole("button", { name: "Send" })).not.toBeDisabled();
  });
  fireEvent.click(screen.getByRole("button", { name: "Send" }));

  expect(await screen.findByText("What does he work with?")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Hello there/)).toBeInTheDocument();
  });

  // The contact nudge is appended deterministically, regardless of what
  // the model itself said, so it must always be present.
  expect(screen.getByText(/Email hire@franpandol\.com to schedule an interview/)).toBeInTheDocument();

  expect(global.fetch).toHaveBeenCalledWith(
    "/api/chat",
    expect.objectContaining({
      method: "POST",
      body: expect.stringContaining('"cf-turnstile-response":"test-turnstile-token"'),
    })
  );
  expect(window.turnstile.reset).toHaveBeenCalledWith("widget-1");
});

test("also parses the older flat {response} chunk shape as a fallback", async () => {
  mockChatFetch(['data: {"response":"Hi"}\n\n', "data: [DONE]\n\n"]);

  render(
    <I18nextProvider i18n={i18n}>
      <ChatWidget />
    </I18nextProvider>
  );

  fireEvent.click(screen.getByRole("button", { name: /Open chat about Francisco's experience/i }));
  fireEvent.change(screen.getByPlaceholderText("Ask a question…"), {
    target: { value: "Hey" },
  });

  await waitFor(() => {
    expect(screen.getByRole("button", { name: "Send" })).not.toBeDisabled();
  });
  fireEvent.click(screen.getByRole("button", { name: "Send" }));

  await waitFor(() => {
    expect(screen.getByText(/Hi/)).toBeInTheDocument();
  });
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

  await waitFor(() => {
    expect(screen.getByRole("button", { name: "Send" })).not.toBeDisabled();
  });
  fireEvent.click(screen.getByRole("button", { name: "Send" }));

  expect(await screen.findByText(/Something went wrong/i)).toBeInTheDocument();
});

test("copying the email uses the clipboard", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });

  render(
    <I18nextProvider i18n={i18n}>
      <ChatWidget />
    </I18nextProvider>
  );

  fireEvent.click(screen.getByRole("button", { name: /Open chat about Francisco's experience/i }));
  fireEvent.click(screen.getByRole("button", { name: "Copy" }));

  await waitFor(() => {
    expect(writeText).toHaveBeenCalledWith("hire@franpandol.com");
  });
});
