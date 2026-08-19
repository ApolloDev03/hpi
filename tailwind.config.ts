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
            background: "var(--background)",
        foreground: "var(--foreground)",

        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",

        ivory: "var(--ivory)",
        muted: "var(--muted)",
        border: "var(--border)",

        "green-soft": "var(--green-soft)",
      },

      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
        logo: ["var(--font-logo-script)", "cursive"],
        condensed: ["var(--font-condensed)", "sans-serif"],
      },
    },
  },

  plugins: [],
};

export default config;