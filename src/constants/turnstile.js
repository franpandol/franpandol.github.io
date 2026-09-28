/** Public Turnstile sitekey (safe to ship in the client bundle). */
export const TURNSTILE_SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY || "0x4AAAAAAFFvRobekFZ4TFEB";

/** Must match siteverify expectedAction in functions/api/chat.js */
export const TURNSTILE_ACTION = "chat";
