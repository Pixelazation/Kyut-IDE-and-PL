/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/renderer/index.html',
    './src/renderer/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'pink-fade': '#FFD1DC',
        'pink-light': '#E973A2'
      }
    }
  },
  plugins: []
}
