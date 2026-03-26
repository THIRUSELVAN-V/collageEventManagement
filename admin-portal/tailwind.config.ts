import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: { 50:"#f8f7ff", 100:"#f0eeff", DEFAULT:"#ffffff" },
        ink: { DEFAULT:"#16112e", muted:"#4a4568", light:"#7c7a8e", faint:"#c5c3d4" },
        violet: {
          50:"#f5f3ff",100:"#ede9fe",200:"#ddd6fe",300:"#c4b5fd",
          400:"#a78bfa",500:"#8b5cf6",600:"#7c3aed",700:"#6d28d9",800:"#5b21b6",900:"#4c1d95",
        },
        amber: { 400:"#fbbf24",500:"#f59e0b",600:"#d97706" },
        emerald: { 400:"#34d399",500:"#10b981",600:"#059669" },
        rose: { 400:"#fb7185",500:"#f43f5e",600:"#e11d48" },
        sky: { 400:"#38bdf8",500:"#0ea5e9",600:"#0284c7" },
      },
      fontFamily: {
        heading: ["'Fraunces'", "serif"],
        body: ["'Outfit'", "sans-serif"],
      },
      animation: {
        "fade-in":   "fadeIn .5s ease both",
        "slide-up":  "slideUp .4s ease both",
        "slide-right":"slideRight .35s ease both",
        "scale-in":  "scaleIn .3s ease both",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        shimmer:     "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn:      { "0%":{opacity:"0"},                       "100%":{opacity:"1"} },
        slideUp:     { "0%":{opacity:"0",transform:"translateY(20px)"}, "100%":{opacity:"1",transform:"translateY(0)"} },
        slideRight:  { "0%":{opacity:"0",transform:"translateX(-12px)"},"100%":{opacity:"1",transform:"translateX(0)"} },
        scaleIn:     { "0%":{opacity:"0",transform:"scale(.94)"}, "100%":{opacity:"1",transform:"scale(1)"} },
        pulseDot:    { "0%,100%":{transform:"scale(1)",opacity:"1"}, "50%":{transform:"scale(1.5)",opacity:".5"} },
        shimmer:     { "0%":{backgroundPosition:"-200% 0"}, "100%":{backgroundPosition:"200% 0"} },
      },
    },
  },
  plugins: [],
};
export default config;
