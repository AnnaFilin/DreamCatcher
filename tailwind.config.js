/** @type {import('tailwindcss').Config} */
import plugin from "@tailwindcss/line-clamp";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maskImage: {
        "fade-bottom":
          "linear-gradient(to bottom, black 80%, transparent 100%)",
      },
      colors: {
        background: "#2d2330",
        surface: "#1a1a22",
        text: "#e5e5f0",
        accent: "#bdaaff",
        muted: "#7b7b8e",
      },

      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.2)",
      },
      backdropBlur: {
        sm: "4px",
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        caveat: ["Caveat", "cursive"],
        patrick: ["Patrick Hand", "cursive"],
        labelle: ["La Belle Aurore", "cursive"],
        sacramento: ["Sacramento", "cursive"],
      },
    },
  },
  plugins: [
    plugin,
    function ({ addUtilities }) {
      addUtilities({
        ".mask-fade-bottom": {
          "-webkit-mask-image":
            "linear-gradient(to bottom, black 80%, transparent 100%)",
          "mask-image":
            "linear-gradient(to bottom, black 80%, transparent 100%)",
        },
      });
    },
  ],
};
