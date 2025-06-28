/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        barrio: ["Barrio-Regular", "serif"],
        rsthin: ["RobotoSlab-Thin", "serif"],
        rsextralight: ["RobotoSlab-ExtraLight", "serif"],
        rslight: ["RobotoSlab-Light", "serif"],
        rsregular: ["RobotoSlab-Regular", "serif"],
        rsmedium: ["RobotoSlab-Medium", "serif"],
        rssemibold: ["RobotoSlab-SemiBold", "serif"],
        rsbold: ["RobotoSlab-Bold", "serif"],
        rsextrabold: ["RobotoSlab-ExtraBold", "serif"],
        rsblack: ["RobotoSlab-Black", "serif"],
      },
      colors: {
        green: "#016938",
        grey: "#333333",
        beige: "#F5F2E9",
        lgreen: "#A4CFA5",
      },
    },
  },
  plugins: [],
};
