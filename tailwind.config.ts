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
        chimjoy: {
          navy: "#0B192C",
          blue: "#003366",
          lemon: "#9BC800",
          lemonHover: "#8CB800",
          dark: "#070F1E",
          heading: "#0E1726",
          body: "#475569",
          light: "#F4F6F9",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      boxShadow: {
        corporate: "0 15px 35px -10px rgba(11, 25, 44, 0.12)",
        lemon: "0 10px 25px -5px rgba(155, 200, 0, 0.45)",
        navy: "0 12px 30px -8px rgba(11, 25, 44, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
