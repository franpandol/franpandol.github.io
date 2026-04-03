/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#fafafa",
          raised: "#ffffff",
          overlay: "#f4f4f5",
          border: "#e5e5e5",
        },
        accent: {
          DEFAULT: "#171717",
          muted: "#404040",
          dim: "rgba(23, 23, 23, 0.06)",
          soft: "#f4f4f5",
        },
        content: {
          primary: "#171717",
          secondary: "#525252",
          tertiary: "#737373",
        },
      },
      fontFamily: {
        sans: [
          "IBM Plex Sans",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        display: ["IBM Plex Serif", "Georgia", "Times New Roman", "serif"],
        mono: [
          "IBM Plex Mono",
          "ui-monospace",
          "monospace",
        ],
      },
      fontSize: {
        "display-lg": ["clamp(1.75rem,4vw,2.25rem)", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "display-sm": ["1.125rem", { lineHeight: "1.35", letterSpacing: "0.08em" }],
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
        glow: "none",
        card: "0 1px 2px rgba(0, 0, 0, 0.04)",
        page: "0 0 0 1px #e5e5e5, 0 1px 3px rgba(0, 0, 0, 0.06)",
      },
      maxWidth: {
        doc: "42rem",
      },
    },
  },
  plugins: [],
};
