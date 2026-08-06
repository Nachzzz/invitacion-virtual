/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 60px rgba(134, 239, 172, 0.25)',
      },
    },
  },
  plugins: [],
};
