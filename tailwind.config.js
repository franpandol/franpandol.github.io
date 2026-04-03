/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#f4f4f5",
          raised: "#ffffff",
          overlay: "#e4e4e7",
          border: "rgba(0, 0, 0, 0.08)",
        },
        accent: {
          DEFAULT: "#0f766e",
          muted: "#0d9488",
          dim: "rgba(13, 148, 136, 0.18)",
          soft: "rgba(13, 148, 136, 0.09)",
        },
        content: {
          primary: "#18181b",
          secondary: "#52525b",
          tertiary: "#71717a",
        },
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        display: [
          "Outfit",
          "Plus Jakarta Sans",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "IBM Plex Mono",
          "ui-monospace",
          "monospace",
        ],
      },
      fontSize: {
        "display-lg": ["clamp(2rem,5vw,3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-sm": ["1.125rem", { lineHeight: "1.35", letterSpacing: "0.06em" }],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(13, 148, 136, 0.35)",
        card: "0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06)",
        page: "none",
      },
      maxWidth: {
        doc: "90rem",
      },
    },
  },
  plugins: [],
};
