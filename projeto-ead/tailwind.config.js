/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}", // Certifique-se de que todos os arquivos são verificados
    "./pages/**/*.{html,js,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tradewinds: ['"Trade Winds"', "cursive"],
        gothic: ['"Special Gothic Expanded One"', "sans-serif"],
      },
    },
  },
};
