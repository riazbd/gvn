/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      animation: {
      },
      keyframes: {
      },
      backgroundImage: {
      }
    },
  },
  plugins: [],
}