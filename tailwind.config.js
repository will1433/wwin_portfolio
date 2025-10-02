/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enables dark mode using "class"
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        brand: {
          DEFAULT: '#6366f1', // Indigo 500
          pink: '#ec4899',
          cyan: '#06b6d4'
        }
      },
      boxShadow: {
        glass: '0 10px 30px rgba(0,0,0,.08)',
      }
    }
  },
  plugins: [],
}
