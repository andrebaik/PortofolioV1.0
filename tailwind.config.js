/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', '"Clash Display"', "system-ui", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "Geist", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: "#0A0A0A",
        paper: "#FAFAF9",
        lime: "#D6FF2A",
        cream: "#FDFBF7",
        brand: {
          lavender: "#F5F5F5",
          blush: "#FAFAFA",
          violet: "#737373",
          electric: "#A3A3A3",
          deep: "#404040",
          navy: "#171717",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 8px 32px rgba(0,0,0,0.06)",
        card: "0 16px 48px rgba(0,0,0,0.08)",
        inner: "inset 0 1px 1px rgba(255,255,255,0.15)",
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
        "glow-violet": "0 0 32px rgba(255, 255, 255, 0.12)",
        "glow-electric": "0 0 32px rgba(255, 255, 255, 0.08)",
        "glow-soft": "0 0 60px rgba(255, 255, 255, 0.06)",
        "glow-card": "0 4px 32px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "brand-gradient": "linear-gradient(135deg, #262626 0%, #0a0a0a 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, #FAFAFA 0%, #E5E5E5 50%, #D4D4D4 100%)",
        "brand-gradient-radial": "radial-gradient(ellipse at center, #262626 0%, #171717 60%, #0a0a0a 100%)",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 16px rgba(255, 255, 255, 0.08)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 255, 255, 0.15)" },
        },
      },
      animation: {
        slide: "slide 40s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
