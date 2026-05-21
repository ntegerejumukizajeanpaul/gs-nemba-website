export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#198754',
        accent: '#FFC107'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(14, 165, 233, 0.12)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
