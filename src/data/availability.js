/**
 * Update this file when your interview windows change.
 * Times are local to TIMEZONE_IANA (shown on the contact page).
 */

export const TIMEZONE_IANA = "America/Argentina/Buenos_Aires";

/**
 * Same windows every calendar day (local time).
 * start/end are "HH:mm" 24h.
 *
 * @typedef {{ start: string, end: string }} DailyWindow
 */

/** @type {DailyWindow[]} */
export const dailyWindows = [
  { start: "06:00", end: "10:00" },
  { start: "13:00", end: "14:00" },
  { start: "18:00", end: "20:00" },
];
