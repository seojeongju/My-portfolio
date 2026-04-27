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
        mint: {
          DEFAULT: "#0D9488", // Teal 600
          light: "#14B8A6",   // Teal 500
          dark: "#0F766E",    // Teal 700
        },
        cyber: {
          white: "#F8FAF9",
        }
      },
    },
  },
  plugins: [],
};
export default config;
