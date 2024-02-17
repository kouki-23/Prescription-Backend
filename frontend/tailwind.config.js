/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "primary-blue": "#233368",
      "secondary-blue": "#0096DC",
      "light-blue": "#699BF7",
      "primary-gray": "#F2F2F3",
      "secondary-gray": "#D9D9D9",
      "dark-gray": "#CFD7E8",
      "gray-button": "#8F8989",
      "gray-table": "#F3F3F5",
      "placeholder-gray": "#777171",
      "light-black": "#04060C",
      "white-shade": "#FFFFFF",
      "primary-red": "#FF3A00",
      "secondary-red": "#FF3636",
      "orange-shade": "#FCA119",
      "green-shade": "#00FF1A",
    },
    fontFamily: {
      montserrat: ["Montserrat"],
      lato: ["Lato"],
    },
    extend: {
      opacity: {
        38: ".38",
        40: ".40",
        85: ".85",
        87: ".87",
      },
    },
  },
  plugins: [],
}
