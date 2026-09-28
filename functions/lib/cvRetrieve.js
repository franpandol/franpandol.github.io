/**
 * CV-grounded retrieval for the portfolio chatbot.
 * Allowlist by evidence: only answer when the question matches profile
 * excerpts. No off-topic phrase lists to maintain.
 */

import { gatewayOptions } from "./aiGateway.js";

const EMBED_MODEL = "@cf/baai/bge-m3";
const TOP_K = 4;
/** Cosine similarity floor; below this we refuse without calling the LLM. */
const MIN_SCORE = 0.32;

/** @type {{ hash: string, chunks: { text: string, vector: number[] }[] } | null} */
let cachedIndex = null;

/**
 * Split profile markdown into retrieval chunks (headers keep their body).
 * @param {string} markdown
 * @returns {string[]}
 */
export function chunkProfile(markdown) {
  const text = String(markdown || "").trim();
  if (!text) return [];

  const parts = text.split(/\n(?=#{1,3}\s)/);
  const chunks = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.length < 40) continue;

    // Oversized sections → paragraph slices so one job doesn't dominate.
    if (trimmed.length <= 1200) {
      chunks.push(trimmed);
      continue;
    }
    const paras = trimmed.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    let buffer = "";
    for (const para of paras) {
      if ((buffer + "\n\n" + para).length > 1200 && buffer.length >= 40) {
        chunks.push(buffer);
        buffer = para;
      } else {
        buffer = buffer ? `${buffer}\n\n${para}` : para;
      }
    }
    if (buffer.length >= 40) chunks.push(buffer);
  }

  return chunks;
}

/**
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 */
export function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length === 0 || a.length !== b.length) {
    return 0;
  }
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Cheap lexical overlap so exact skill names still boost a match.
 * @param {string} query
 * @param {string} chunk
 * @returns {number} 0..1
 */
export function lexicalOverlap(query, chunk) {
  const qTokens = tokenize(query);
  const cTokens = new Set(tokenize(chunk));
  if (qTokens.size === 0 || cTokens.size === 0) return 0;
  let hits = 0;
  for (const token of qTokens) {
    if (cTokens.has(token)) hits += 1;
  }
  return hits / qTokens.size;
}

function tokenize(text) {
  return new Set(
    String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .split(/[^\p{L}\p{N}]+/u)
      .filter((token) => token.length >= 3)
  );
}

function simpleHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return `${text.length}:${hash.toString(16)}`;
}

/**
 * @param {any} env Workers AI binding host
 * @param {string[]} texts
 * @returns {Promise<number[][]>}
 */
async function embedTexts(env, texts) {
  if (texts.length === 0) return [];
  const result = await env.AI.run(EMBED_MODEL, { text: texts }, gatewayOptions(env));
  const data = result?.data;
  if (!Array.isArray(data) || data.length !== texts.length) {
    throw new Error("Unexpected embedding response shape");
  }
  return data;
}

/**
 * @param {any} env
 * @param {string} profileMarkdown
 */
async function ensureProfileIndex(env, profileMarkdown) {
  const hash = simpleHash(profileMarkdown);
  if (cachedIndex?.hash === hash) return cachedIndex;

  const texts = chunkProfile(profileMarkdown);
  const vectors = await embedTexts(env, texts);
  cachedIndex = {
    hash,
    chunks: texts.map((text, index) => ({ text, vector: vectors[index] })),
  };
  return cachedIndex;
}

/**
 * Rank CV chunks for a user question. Empty `chunks` ⇒ out of scope.
 * @param {object} options
 * @param {any} options.env
 * @param {string} options.profileMarkdown
 * @param {string} options.query
 * @param {number} [options.minScore]
 * @param {number} [options.topK]
 * @returns {Promise<{ chunks: string[], topScore: number }>}
 */
export async function retrieveCvContext({
  env,
  profileMarkdown,
  query,
  minScore = MIN_SCORE,
  topK = TOP_K,
}) {
  const q = String(query || "").trim();
  if (!q || !profileMarkdown) {
    return { chunks: [], topScore: 0 };
  }

  const index = await ensureProfileIndex(env, profileMarkdown);
  if (index.chunks.length === 0) {
    return { chunks: [], topScore: 0 };
  }

  const [queryVector] = await embedTexts(env, [q]);
  const scored = index.chunks.map((chunk) => {
    const semantic = cosineSimilarity(queryVector, chunk.vector);
    const lexical = lexicalOverlap(q, chunk.text);
    // Embeddings dominate; lexical helps exact skill/company hits.
    const score = 0.75 * semantic + 0.25 * lexical;
    return { text: chunk.text, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topScore = scored[0]?.score ?? 0;
  if (topScore < minScore) {
    return { chunks: [], topScore };
  }

  return {
    chunks: scored.slice(0, topK).map((item) => item.text),
    topScore,
  };
}

export { MIN_SCORE, TOP_K, EMBED_MODEL };
