const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'body-textured': 'url(/src/assets/background-texture.png)'
      })
    },
    colors: {
      gray: colors.coolGray,
      red: colors.rose,
      purple: colors.purple,
      white: colors.white,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
