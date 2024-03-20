/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        main: '#BB9A88',
        secondary: '#979D6E',
        focus: '#211E55',
        error: '#DB4D6D',
        background: '#CAC6BD',
        darkBackground: '#B5A8A0',
      },
      aspectRatio: {
        '5/4': '5/4',
      }
    },
  },
  plugins: [],
}

