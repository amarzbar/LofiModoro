/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation:{
              'spin-slow': 'spin 10s linear infinite',
              "loop-scroll" : "loop-scroll 20s linear infinite"
      },
      keyframes:{
          "loop-scroll":{
            from:{transform: "translateX(0)"},
            to:{transform: "translateX(100%)"},
          }
        
      }
    },
  },
  plugins: [],
}