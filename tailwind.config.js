/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#0f766e",
          DEFAULT: "#0f766e",
          dark: "#2dd4bf",
        },
        badge: {
          street: { light: "#0f766e", dark: "#2dd4bf" },
          bowl: { light: "#b45309", dark: "#fbbf24" },
          ramp: { light: "#7c3aed", dark: "#a78bfa" },
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "hatch-light":
          "repeating-linear-gradient(45deg, rgba(0,0,0,0.022) 0px, rgba(0,0,0,0.022) 1px, transparent 1px, transparent 9px)",
        "hatch-dark":
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 9px)",
      },
      aspectRatio: {
        "4/5": "4 / 5",
      },
      letterSpacing: {
        tighter: "-0.04em",
      },
    },
  },
  plugins: [],
};
