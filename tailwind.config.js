/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
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
      fontSize: {
        'title-h1': ['1.5rem', { lineHeight: '1.75rem', fontWeight: 700 }],
        'title-h2': ['1.25rem', { lineHeight: '1.5rem', fontWeight: 700 }],
        'subtitle-h1': ['1.125rem', { lineHeight: '1.25rem', fontWeight: 700 }],
        'subtitle-h2': ['1rem', { lineHeight: '1.25rem', fontWeight: 700 }],
        body: ['1rem', '1.25rem'],
        'label-bold': ['1rem', { lineHeight: '1rem', fontWeight: 700 }],
        'label-semibold': ['0.875rem', { lineHeight: '1rem', fontWeight: 600 }],
        'label-medium': ['0.875rem', { lineHeight: '1rem', fontWeight: 500 }],
        'caption-bold': ['0.875rem', { lineHeight: '1rem', fontWeight: 700 }],
        'caption-semibold': [
          '0.75rem',
          { lineHeight: '0.875rem', fontWeight: 600 },
        ],
        caption: ['0.75rem', { lineHeight: '0.875rem', fontWeight: 500 }],
        'caption-sm': ['0.625rem', { lineHeight: '0.75rem', fontWeight: 500 }],
        base: ['1rem', '1.25rem'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
