import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: "#020202",
        abyss: "#0a0e13",
        steel: "#1c2836",
        glacier: "#5c92b8",
        candy: "#b2d5e5",
        fog: "#eef4f8",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "liquid-glow":
          "radial-gradient(60% 60% at 50% 40%, rgba(178,213,229,0.16) 0%, rgba(92,146,184,0.08) 45%, rgba(2,2,2,0) 75%)",
      },
    },
  },
  plugins: [],
};
export default config;
