/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'resume-gray': '#f2f2f2',
          'resume-dark': '#333333',
        },
        fontFamily: {
          'sans': ['Arial', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }