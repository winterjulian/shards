/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        shine: {
          '0%': { left: '-75%' },
          '100%': { left: '125%' },
        },
      },
      animation: {
        shine: 'shine 0.7s forwards',
      },
    },
  },
  plugins: [],
};
