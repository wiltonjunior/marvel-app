const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./src/**/*.{html,js}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        bangers: ['"Bangers"', "sans-serif"],
      },
      boxShadow: {
        '1md': '0 6px 6px -6px #000',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}