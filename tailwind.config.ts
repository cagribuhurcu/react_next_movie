import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#090b0e",
        secondary: "#1b1c21",
        textColor: "#646464",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
