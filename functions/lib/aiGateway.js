/**
 * Optional Cloudflare AI Gateway routing for every Workers AI call.
 * Enabled only when AI_GATEWAY_ID is set; otherwise callers pass `undefined`
 * and env.AI.run behaves as before.
 * @param {{ AI_GATEWAY_ID?: string }} env
 * @returns {{ gateway: { id: string, collectLog: true } } | undefined}
 */
export function gatewayOptions(env) {
  const id = String(env?.AI_GATEWAY_ID ?? "").trim();
  return id ? { gateway: { id, collectLog: true } } : undefined;
}
