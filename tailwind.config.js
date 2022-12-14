/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      'xs': '360px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
  variants: {
    extend: {
      textColor: ['disabled'],
    }
  },
}
