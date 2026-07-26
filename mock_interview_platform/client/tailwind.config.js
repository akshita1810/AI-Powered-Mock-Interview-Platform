/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#7c6ff7',
          light: '#a898ff',
          dark: '#5a4ed1',
        },
        accent: '#f5576c',
        success: '#43e97b',
        warning: '#ffd166',
        danger: '#ef233c',
        bg: {
          DEFAULT: '#050816',
          secondary: '#0d1117',
        },
      },
    },
  },
  plugins: [],
}
