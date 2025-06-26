/** @type {import('tailwindcss').Config} */
export default {
  ssr: false,
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      serif: ["ui-serif", "Times New Roman", "Times, serif"],
      spectral: ["Spectral", "ui-serif", "Times New Roman", "Times, serif"],
    },
    extend: {
      colors: {
        primary: "#eab308",
        accent: "",
        page: "#fdfcf5",
      },
      container: "px-8 lg:px-0 md:max-w-[600px]"
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
