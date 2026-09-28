import { describe, expect, test } from "vitest";
import {
  chunkProfile,
  cosineSimilarity,
  lexicalOverlap,
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
