/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#5842E3',
        'light-bg': '#F1F5F9',
        'dark-bg': '#100E23',
        'light-card': '#FFFFFF',
        'dark-card': '#1E1B3A',
        'text-dark': '#1E1B3A',
        'text-light': '#FFFFFF',
        'text-muted': '#7E7B9A',
        'accent-pink': '#E94F89',
        'success': '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      }
    }
  },
  plugins: [],
}