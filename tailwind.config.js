/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 10s linear infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg) scale(10)' },
          '100%': { transform: 'rotate(-360deg) scale(10)' },
        },
      },
      colors: {
        'primary': '#FF6363',
        'secondary': {
          100: '#E2E2D5',
          200: '#888883',
        },
      },
      fontFamily: {
        'custom': ["Jersey 15", 'sans-serif'],
        'Roboto': ['Roboto', 'sans-serif'],
      },
      textColor:{
        'gradient': 'linear-gradient(90deg, #F78F2F 0%, #F78F2F 50%, #F78F2F 100%)',
      }
    },
  },
  darkMode: "class",
  plugins: [
    require("tw-elements/plugin.cjs")
  ],
};