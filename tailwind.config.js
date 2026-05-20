/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        background: 'var(--background)',

        primary: 'var(--primary)',

        muted: 'var(--muted)',

        accent: 'var(--accent)',

        destructive: 'var(--destructive)',

        border: 'var(--border)',
      },

      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],

        alternates: ['"Montserrat Alternates"', 'sans-serif'],
      },
    },
  },

  plugins: [],
}
