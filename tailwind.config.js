/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'github-gray': '#f6f8fa',
        'github-border': '#e1e4e8',
        'github-text': '#24292e',
      },
    },
  },
  plugins: [],
}
