/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern minimalist grey and white theme with orange accents
        'primary': '#4A4A4A',
        'primary-dark': '#2D2D2D',
        'primary-light': '#6B6B6B',
        'accent': '#1A1A1A',
        'accent-light': '#2D2D2D',
        'orange': '#FF6B35',
        'orange-hover': '#E85A2A',
        'orange-light': '#FF8C5A',
        'grey-dark': '#1A1A1A',
        'grey-medium': '#4A4A4A',
        'grey': '#6B6B6B',
        'grey-light': '#9E9E9E',
        'grey-lighter': '#D0D0D0',
        'grey-bg': '#F9F9F9',
        'grey-bg-light': '#FFFFFF',
        'grey-border': '#E5E5E5',
        'grey-border-light': '#F0F0F0',
      },
      fontFamily: {
        'segoe': ['Segoe UI', 'sans-serif'],
        'sans': ['Inter', 'Open Sans', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

