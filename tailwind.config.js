/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#f5f3ef",
          raised: "#fffcf8",
          overlay: "#ebe6de",
          border: "#ddd6cb",
        },
        accent: {
          DEFAULT: "#3f5d4a",
          muted: "#2d4334",
          dim: "rgba(63, 93, 74, 0.14)",
          soft: "#e8efe9",
        },
        content: {
          primary: "#1c1917",
          secondary: "#57534e",
          tertiary: "#78716c",
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
        "display-lg": ["clamp(2.25rem,5vw,3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.5rem,3vw,2rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
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
        glow: "0 0 0 1px rgba(63, 93, 74, 0.08), 0 20px 40px -16px rgba(28, 25, 23, 0.12)",
        card: "0 1px 0 rgba(255, 255, 255, 0.8) inset, 0 4px 24px -6px rgba(28, 25, 23, 0.08)",
      },
    },
  },
  plugins: [],
};
