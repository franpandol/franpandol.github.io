import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EMAIL } from "../constants/contact";
import { TURNSTILE_ACTION, TURNSTILE_SITEKEY } from "../constants/turnstile";

const MAX_HISTORY = 12;
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstileApi() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("No window"));
  }
  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-cf-turnstile]");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.turnstile), { once: true });
      existing.addEventListener("error", () => reject(new Error("Turnstile script failed")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.dataset.cfTurnstile = "1";
    script.onload = () => resolve(window.turnstile);
    script.onerror = () => reject(new Error("Turnstile script failed"));
    document.head.appendChild(script);
  });
}

async function streamChatResponse({ messages, lang, turnstileToken, onToken, signal }) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages,
      lang,
      "cf-turnstile-response": turnstileToken,
    }),
    signal,
  });

  if (!response.ok || !response.body) {
    throw new Error(`Chat request failed: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      const line = part.trim();
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (payload === "[DONE]") continue;

      try {
        const parsed = JSON.parse(payload);
        // Workers AI streams OpenAI-compatible chat completion chunks
        // (choices[0].delta.content); `response` is kept as a fallback
        // for models/binding versions that use the older flat shape.
        const token = parsed.choices?.[0]?.delta?.content ?? parsed.response;
        if (typeof token === "string" && token) {
          onToken(token);
        }
      } catch {
        // Ignore partial/malformed SSE chunks.
      }
    }
  }
}

const ChatWidget = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const scrollRef = useRef(null);
  const turnstileHostRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node && typeof node.scrollTo === "function") {
      node.scrollTo({ top: node.scrollHeight });
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    let cancelled = false;

    const mount = async () => {
      try {
        const turnstile = await loadTurnstileApi();
        if (cancelled || !turnstileHostRef.current || !turnstile) return;

        if (turnstileWidgetIdRef.current != null) {
          turnstile.remove(turnstileWidgetIdRef.current);
          turnstileWidgetIdRef.current = null;
        }

        setTurnstileToken("");
        turnstileWidgetIdRef.current = turnstile.render(turnstileHostRef.current, {
          sitekey: TURNSTILE_SITEKEY,
          action: TURNSTILE_ACTION,
          callback: (token) => {
            setTurnstileToken(typeof token === "string" ? token : "");
          },
          "expired-callback": () => {
            setTurnstileToken("");
          },
          "error-callback": () => {
            setTurnstileToken("");
          },
        });
      } catch {
        if (!cancelled) {
          setError(t("chat.turnstileError"));
        }
      }
    };

    mount();

    return () => {
      cancelled = true;
      const widgetId = turnstileWidgetIdRef.current;
      if (widgetId != null && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
      turnstileWidgetIdRef.current = null;
      setTurnstileToken("");
    };
  }, [isOpen, t]);

  const resetTurnstile = () => {
    setTurnstileToken("");
    const widgetId = turnstileWidgetIdRef.current;
    if (widgetId != null && window.turnstile) {
      window.turnstile.reset(widgetId);
    }
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || isStreaming || !turnstileToken) return;

    const history = [...messages, { role: "user", content }].slice(-MAX_HISTORY);
    const tokenForRequest = turnstileToken;
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError("");
    setIsStreaming(true);
    // Token is single-use; clear immediately so a retry requires a fresh challenge.
    setTurnstileToken("");

    let assistantContent = "";

    try {
      await streamChatResponse({
        messages: history,
        lang: i18n.language,
        turnstileToken: tokenForRequest,
        onToken: (token) => {
          assistantContent += token;
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", content: assistantContent };
            return next;
          });
        },
      });

      // Appended deterministically rather than left to the model, so the
      // contact nudge always shows regardless of instruction-following.
      assistantContent += `\n\n${t("chat.ctaLine", { email: EMAIL })}`;
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", content: assistantContent };
        return next;
      });
    } catch (err) {
      const status = typeof err?.message === "string" && err.message.includes("403") ? 403 : 0;
      setError(status === 403 ? t("chat.turnstileError") : t("chat.errorMessage"));
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsStreaming(false);
      resetTurnstile();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={toggleOpen}
          aria-label={t("chat.launcherAria")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg hover:bg-accent-muted"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex h-[28rem] w-80 flex-col rounded-lg border border-surface-border bg-surface-raised shadow-lg sm:w-96">
        <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
          <p className="font-display text-sm font-semibold text-content-primary">
            {t("chat.title")}
          </p>
          <button
            type="button"
            onClick={toggleOpen}
            aria-label={t("chat.closeAria")}
            className="text-content-tertiary hover:text-content-primary"
          >
            &times;
          </button>
        </div>

        <p className="border-b border-surface-border px-4 py-2 text-xs text-content-tertiary">
          {t("chat.intro")}
        </p>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
          {messages.length === 0 ? (
            <p className="text-xs text-content-tertiary">{t("chat.emptyState")}</p>
          ) : (
            messages.map((message, index) => (
              <p
                key={index}
                className={
                  message.role === "user"
                    ? "ml-auto max-w-[85%] rounded-md bg-accent px-3 py-2 text-sm text-white"
                    : "mr-auto max-w-[85%] rounded-md bg-surface px-3 py-2 text-sm text-content-secondary"
                }
              >
                {message.content || (isStreaming && index === messages.length - 1 ? "…" : "")}
              </p>
            ))
          )}
          {error ? <p className="text-xs text-red-500">{error}</p> : null}
        </div>

        <div className="flex items-center gap-2 border-t border-surface-border px-4 py-2 text-xs text-content-tertiary">
          <span className="font-mono">{EMAIL}</span>
          <button
            type="button"
            onClick={copyEmail}
            className="underline-offset-4 hover:text-content-primary hover:underline"
          >
            {t("common.copy")}
          </button>
        </div>

        <div className="border-t border-surface-border px-3 pt-3">
          <div ref={turnstileHostRef} className="flex justify-center" />
        </div>

        <form onSubmit={sendMessage} className="flex items-center gap-2 p-3">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={t("chat.placeholder")}
            className="flex-1 rounded-md border border-surface-border bg-surface px-3 py-2 text-sm text-content-primary focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            disabled={isStreaming}
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim() || !turnstileToken}
            className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {t("chat.send")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;
