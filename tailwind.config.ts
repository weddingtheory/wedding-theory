import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'eb-garamond': ['EB Garamond', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        // Keep these for backward compatibility
        sans: ['Montserrat', 'sans-serif'],
        serif: ['EB Garamond', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
