import { describe, expect, test, vi } from "vitest";
import {
  chunkProfile,
  cosineSimilarity,
  lexicalOverlap,
  retrieveCvContext,
} from "./cvRetrieve.js";
import { outOfScopeRefusal } from "./chatScope.js";

describe("chunkProfile", () => {
  test("splits on markdown headings", () => {
    const chunks = chunkProfile(`# Title

Intro paragraph about Francisco that is long enough to keep.

## Experience

Backend lead at Dexter with Django and FastAPI work across several years.

## Skills

Python, Node.js, system design, and AI-agent engineering experience.
`);
    expect(chunks.length).toBeGreaterThanOrEqual(2);
    expect(chunks.some((c) => /Experience/i.test(c))).toBe(true);
    expect(chunks.some((c) => /Skills/i.test(c))).toBe(true);
  });
});

describe("cosineSimilarity", () => {
  test("returns 1 for identical vectors", () => {
    expect(cosineSimilarity([1, 0, 0], [1, 0, 0])).toBeCloseTo(1);
  });

  test("returns 0 for orthogonal vectors", () => {
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
  });
});

describe("lexicalOverlap", () => {
  test("scores shared skill tokens", () => {
    expect(lexicalOverlap("django fastapi stack", "Built APIs with Django and FastAPI")).toBeGreaterThan(0.5);
  });

  test("is low for unrelated text", () => {
    expect(lexicalOverlap("write a python function", "Interview availability Monday morning")).toBe(0);
  });
});

describe("outOfScopeRefusal", () => {
  test("mentions CV grounding", () => {
    expect(outOfScopeRefusal("en")).toMatch(/CV/);
    expect(outOfScopeRefusal("es")).toMatch(/CV/);
  });
});

describe("retrieveCvContext gateway routing", () => {
  const markdown = `# Gateway routing fixture

Francisco builds backend systems with Django and FastAPI for a living.
`;

  function makeEnv(extra = {}) {
    const run = vi.fn(async (_model, input) => ({
      data: input.text.map(() => [1, 0]),
    }));
    return { env: { AI: { run }, ...extra }, run };
  }

  test("sends embedding calls through the gateway when configured", async () => {
    const { env, run } = makeEnv({ AI_GATEWAY_ID: "default" });
    await retrieveCvContext({ env, profileMarkdown: `${markdown}\ngateway-on`, query: "django" });

    expect(run).toHaveBeenCalled();
    for (const call of run.mock.calls) {
      expect(call[2]).toEqual({ gateway: { id: "default", collectLog: true } });
    }
  });

  test("does not pass gateway options when not configured", async () => {
    const { env, run } = makeEnv();
    await retrieveCvContext({ env, profileMarkdown: `${markdown}\ngateway-off`, query: "django" });

    expect(run).toHaveBeenCalled();
    for (const call of run.mock.calls) {
      expect(call[2]).toBeUndefined();
    }
  });
});
