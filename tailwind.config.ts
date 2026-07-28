import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0a",
        panel: "#121110",
        panel2: "#17140f",
        gold: "#b8863a",
        "gold-light": "#e6c583",
        "gold-dim": "#7a5c2a",
        ivory: "#f3efe7",
        muted: "#9a9488",
        line: "rgba(243,239,231,0.14)",
        "gold-line": "rgba(184,134,58,0.45)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-jost)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
        widest3: "0.32em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.16,.8,.24,1)",
      },
    },
  },
  plugins: [],
};
export default config;
