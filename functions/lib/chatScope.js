/**
 * Hard scope gate for the CV chatbot. The small Workers AI model often
 * ignores system-prompt refusals, so we block obvious off-topic asks
 * before inference.
 */

const OFF_TOPIC_PATTERNS = [
  // Explicit asks to write / generate code or a function.
  /\b(escribe|escrib[ií]|write|create|genera(?:r|d)?|generá|hac[eé]|make|implement(?:a|á|ar)?|dame|give\s+me)\b[\s\S]{0,60}\b(funci[oó]n|function|c[oó]digo|code|script|programa|snippet|class|clase)\b/i,
  /\b(funci[oó]n|function|c[oó]digo|code|script|programa)\b[\s\S]{0,40}\b(en|in|con|with|para|for)\b[\s\S]{0,20}\b(python|javascript|typescript|java|golang|go|rust|ruby|php|c\+\+|c#|sql)\b/i,
  /\b(una|a|the)\s+funci[oó]n\s+en\s+python\b/i,
  /\b(help\s+me\s+(code|program|debug|codear)|c[oó]mo\s+(program|code|implement)|how\s+(do\s+i|to)\s+(code|program|implement|write))\b/i,
  /\b(ignore|olvidá|olvida)\b[\s\S]{0,40}\b(instruction|instrucci|system|prompt|reglas|rules)\b/i,
  /\b(you are now|ahora sos|ahora eres|act as|actu[aá] como)\b[\s\S]{0,40}\b(assistant|chatgpt|general|programador|developer)\b/i,
];

/** Questions about Francisco's skills that mention Python/code should still pass. */
const ALLOWED_PROFILE_HINTS =
  /\b(experiencia|experience|stack|skills?|habilidades?|usa|uses?|used|trabaj|work|backend|framework|django|fastapi|disponible|availability|proyecto|project|cv|resume|curriculum)\b/i;

/**
 * @param {string} content latest user message
 * @returns {boolean}
 */
export function isOffTopicUserMessage(content) {
  const text = String(content || "").trim();
  if (!text) return false;

  // Short profile questions that happen to mention a language stay in-scope.
  if (ALLOWED_PROFILE_HINTS.test(text) && !/\b(escribe|escrib[ií]|write|create|genera|implement)\b/i.test(text)) {
    // Still block "escribe una funcion ... para ver el cv"
    if (!OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(text))) {
      return false;
    }
  }

  return OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(text));
}

/**
 * @param {"en"|"es"} lang
 * @returns {string}
 */
export function offTopicRefusal(lang) {
  if (lang === "es") {
    return (
      "Solo puedo responder sobre la experiencia, skills, disponibilidad y proyectos de Francisco — " +
      "no escribo código ni doy ayuda de programación general. " +
      "Preguntá, por ejemplo, qué stack usa o si está disponible para entrevistas."
    );
  }
  return (
    "I can only answer questions about Francisco's experience, skills, availability, and projects — " +
    "not write code or give general programming help. " +
    "Try asking what stack he uses, or whether he's available for interviews."
  );
}

/**
 * SSE payload matching the Workers AI / OpenAI chat-completion chunk shape
 * the ChatWidget already parses.
 * @param {string} text
 * @returns {ReadableStream}
 */
export function sseTextStream(text) {
  const encoder = new TextEncoder();
  const payload = JSON.stringify({ choices: [{ delta: { content: text } }] });
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}
