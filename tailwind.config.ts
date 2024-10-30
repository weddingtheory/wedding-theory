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
        'gotu': ['Gotu', 'sans-serif'],
        // Keep these for backward compatibility if needed
        sans: ['Gotu', 'sans-serif'],
        serif: ['Gotu', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
