module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: { 50:"#fff8eb",100:"#ffedc6",200:"#ffd988",300:"#ffc04a",400:"#ffab20",500:"#f59e0b",600:"#d97706",700:"#b45309",800:"#923c0e",900:"#78320f" },
        ink:   { 50:"#f6f7f9",100:"#eceef2",200:"#d4d9e3",300:"#aeb7c9",400:"#8290a9",500:"#62718d",600:"#4d5a74",700:"#3f4a5f",800:"#1c2638",900:"#121a28",950:"#0a0f1a" },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(245,158,11,0.15), 0 10px 40px -12px rgba(245,158,11,0.35)",
        card: "0 12px 40px -16px rgba(0,0,0,0.45)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};