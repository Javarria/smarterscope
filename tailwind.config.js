/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // make sure this matches your source files
  theme: {
    extend: {
      screens: {
        md: "987px", // your new breakpoint
      },
    },
  },
  plugins: [],
};
