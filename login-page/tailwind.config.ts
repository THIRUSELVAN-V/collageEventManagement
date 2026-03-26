import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in":    "fadeIn .6s ease both",
        "slide-up":   "slideUp .5s ease both",
        "scale-in":   "scaleIn .4s ease both",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "float-med":  "floatMed 4s ease-in-out infinite",
        "spin-slow":  "spin 20s linear infinite",
        "pulse-ring": "pulseRing 2s ease-in-out infinite",
        "shimmer":    "shimmer 2s linear infinite",
        "slide-in-left": "slideInLeft .5s ease both",
      },
      keyframes: {
        fadeIn:      { "0%":{opacity:"0"},                             "100%":{opacity:"1"} },
        slideUp:     { "0%":{opacity:"0",transform:"translateY(24px)"},"100%":{opacity:"1",transform:"translateY(0)"} },
        scaleIn:     { "0%":{opacity:"0",transform:"scale(.92)"},      "100%":{opacity:"1",transform:"scale(1)"} },
        floatSlow:   { "0%,100%":{transform:"translateY(0) rotate(0deg)"},  "50%":{transform:"translateY(-20px) rotate(3deg)"} },
        floatMed:    { "0%,100%":{transform:"translateY(0) rotate(0deg)"},  "50%":{transform:"translateY(-12px) rotate(-2deg)"} },
        pulseRing:   { "0%,100%":{boxShadow:"0 0 0 0 rgba(99,102,241,0.4)"},"50%":{boxShadow:"0 0 0 16px rgba(99,102,241,0)"} },
        shimmer:     { "0%":{backgroundPosition:"-200% 0"},           "100%":{backgroundPosition:"200% 0"} },
        slideInLeft: { "0%":{opacity:"0",transform:"translateX(-20px)"},"100%":{opacity:"1",transform:"translateX(0)"} },
      },
    },
  },
  plugins: [],
};
export default config;
