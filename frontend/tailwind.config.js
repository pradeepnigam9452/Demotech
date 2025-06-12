module.exports = {
  content: [
    // your content paths here, e.g.
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        eduvic: ["'Edu VIC WA NT Hand Pre'", "cursive"],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
