/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cashAppGreen: "#00D632",
        venmoBlue: "#008CFF",
        paypalYellow: "#FFC43A",
      },
    },
  },
  plugins: [],
};
