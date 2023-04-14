const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'base-title': '#272221',
        'base-sub-title': '#403937',
        'base-text': '#574f4d',
        'base-label': '#8d8686',
        'base-hover': '#d7d5d5',
        'base-button': '#e6e5e5',
        'base-input': '#ededed',
        'base-card': '#f3f2f2',
        background: '#fafafa'
      }
    },
    fontFamily: {
      sans: ['var(--font-Fira_Code )']
    }
  },
  plugins: []
}
