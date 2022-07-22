/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          500: '#FFFFFF',
          400: '#958E9E',
          300: '#605A69',
        },
        dark: {
          500: '#16131A',
          400: '#201D24',
          300: '#2C2830',
        },
      },
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
