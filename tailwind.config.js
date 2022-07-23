/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', ...defaultTheme.fontFamily.sans],
      },
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
        accent: '#0094FF',
      },
      backgroundColor: {
        primary: '#201D24',
        secondary: '#2C2830',
      },
      textColor: {
        primary: '#958E9E',
        secondary: '#605A69',
      },
      // fontSize: {
      //   xxs: ['0.625rem', '0.75rem'],
      //   xs: ['0.75rem', '0.875rem'],
      //   sm: ['0.875rem', '1rem'],
      //   base: ['1rem', '1rem'],
      // },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
