/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      boxShadow: {
        "inner-strong": "inset 0 4px 6px rgba(0,0,0,0.6)",
        "inner-xl": "inset 0 8px 12px rgba(0,0,0,0.8)",
      },
      colors: {
        // Eigene Farbreihe namens "brand"
        brand: {
          50:  '#f5faff',
          100: '#e0f0ff',
          200: '#b3d8ff',
          300: '#80bfff',
          400: '#4da6ff',
          500: '#1a8cff',
          600: '#006ed6',
          700: '#005bb3',
          800: '#004080',
          900: '#00264d',
        }
      }
    },
  },
  plugins: [],
};
