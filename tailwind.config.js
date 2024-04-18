const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./index.html",
     "./src/**/*.{js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
  mode: "jit",
  theme: {
        light: {
          layout: {}, 
          colors: { bg: "#FFF2D8"}, 
        },
    extend: {
      colors: {
        background: "#FFF2D8",
        primary: "#EAD7BB",
        secondary: "#113946",
        tertiary: "#113946",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "black",
        proj: "#020342",
        dgreen: "#072603",
        dpurp: "#170426",
        textgray: "#D3D3D3",
        goldtext: "#FFD700"
      },
      fontFamily: {
        carlson : ['Carlson', 'sans-serif'],
        serif : ['PT-Serif', 'serif'],  
        mutuka: ['Mukta', 'sans-serif'],
        lora: ['Lora','serif'],
        poppins:['Poppins','sans-serif'],
        raleway:['Raleway','sans-serif'],
        re:['Roboto Slab','serif'],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
   plugins: [nextui()],
};
