/** @type {import('tailwindcss').Config} */

export default {
  mode: "jit",
  darkMode: ["class", "[data-theme='dark']"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
}
