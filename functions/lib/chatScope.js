/**
 * Shared chat helpers: scoped refusal copy + SSE shaping for ChatWidget.
 */

/**
 * @param {"en"|"es"} lang
 * @returns {string}
 */
export function outOfScopeRefusal(lang) {
  if (lang === "es") {
    return (
      "Solo puedo responder con información que esté en el CV de Francisco. " +
      "Esa pregunta no aparece en su perfil. Probá con su experiencia, stack, proyectos o disponibilidad."
    );
  }
  return (
    "I can only answer from Francisco's CV. " +
    "That question isn't covered in his profile. Try asking about his experience, stack, projects, or availability."
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
