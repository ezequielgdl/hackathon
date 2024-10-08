/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rick-blue': '#01AEC5',
        'space-blue': '#0077be',
        'dimension-gray': '#33335b',
        'futuristic-silver': '#c0c0c0',
      },
      backgroundColor: {
        'dark-matter': '#1a1a2e',
      },
      gradients: {
        'portal-swirl': 'linear-gradient(45deg, #39ff14, #0077be, #9932cc)',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

