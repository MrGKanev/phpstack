/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/script.js"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}