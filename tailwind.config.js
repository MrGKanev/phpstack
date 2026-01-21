/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/script.js"],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}