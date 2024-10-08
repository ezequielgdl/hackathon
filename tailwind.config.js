/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'portal-green': '#39ff14',
        'space-blue': '#0077be',
        'alien-purple': '#9932cc',
        'neon-pink': '#ff6ec7',
        'cosmic-orange': '#ff7f50',
        'dimension-gray': '#2f4f4f',
        'futuristic-silver': '#c0c0c0',
      },
      backgroundColor: {
        'dark-matter': '#1a1a2e',
      },
      gradients: {
        'portal-swirl': 'linear-gradient(45deg, #39ff14, #0077be, #9932cc)',
      },
    },
  },
  plugins: [],
}

