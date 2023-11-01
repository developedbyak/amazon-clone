/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // darkMode is media now 
  media: false,
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        bgColor: {
          first: "#efe6da",
          second: "#ffdb68",
          third: "#f6f2f1",
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  // plugins: [require("@tailwindcss/line-clamp")],
  // line-clamp is by-default in tailwind now
}
