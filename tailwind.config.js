/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {
      fontFamily: {
        'tech-mono': ['Share Tech Mono', 'monospace'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
