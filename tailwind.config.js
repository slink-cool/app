/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {},
      backgroundColor: {
        primary: '#201D24',
        secondary: '#2C2830',
      },
      textColor: {
        primary: '#958E9E',
        secondary: '#605A69',
      },
    },
  },
  plugins: [],
};
