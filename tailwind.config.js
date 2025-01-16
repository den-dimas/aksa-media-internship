/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream: "#FFFEFA",
        yellow: "#FFF6D2",
        "light-blue": "#799CF0",
        "dark-blue": "#132FBA",
        black: "#242424",
        "dark-purple": "#524f5a",
        "darker-purple": "#282532",
      },
    },
  },
  plugins: [],
};

