/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#5b7cfa',
          600: '#4668f3'
        }
      },
      boxShadow: {
        glow: '0 8px 28px rgba(91,124,250,0.28)'
      }
    }
  },
  plugins: []
};
