module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "black",
        proj: "#020342",
        dgreen: "#072603",
        dpurp: "#170426"
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
  plugins: [],
};
