/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        heavyBlue: "#0060FF",
        lightBlue: "#3F80FF",
        lightGray: "#757575",
        defaultGray: "#AEB2BB",
        heavyGray: '#444444'
      },
    },
    fontFamily: {
      sans: ["Roboto", ...fontFamily.sans],
    },
    
    screens: {
      sm: "480px",
      // => @media (min-width: 480px) { Mobile }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1440px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
