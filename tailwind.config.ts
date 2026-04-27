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
          DEFAULT: "#00FFCC",
          dark: "#2ECC71",
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
