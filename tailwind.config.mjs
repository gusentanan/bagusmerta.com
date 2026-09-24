/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Garamond", ...fontFamily.serif],
        code: ["DMMono", ...fontFamily.sans],
      },
      colors: {
        ink: "#f1efe8",
        muted: "#aaa8a2",
        faint: "#6e6d69",
        line: "rgba(255, 255, 255, 0.12)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
