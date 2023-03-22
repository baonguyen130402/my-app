/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        moveIn: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1'}
        }
      },
      animation: {
        'moveIn': 'moveIn linear .4s',
      }
    },
  },
  plugins: [],
};

module.exports = config;
