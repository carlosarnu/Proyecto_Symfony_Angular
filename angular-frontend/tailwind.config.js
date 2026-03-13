/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}" // Tailwind buscará todas las clases en HTML y TS
  ],
  darkMode: 'class', // 👈 habilita el modo oscuro usando la clase 'dark'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0EA5E9', // Azul cielo
          600: '#0284C7',     // Hover
          700: '#0369A1',     // Hover más oscuro
          dark: '#1E3A8A',    // Azul oscuro en modo dark
        },
        secondary: {
          DEFAULT: '#10B981', // Verde suave
          dark: '#047857',    // Verde oscuro en dark
        },
        accent: {
          DEFAULT: '#F97316', // Naranja
          dark: '#C2410C',    // Naranja oscuro en dark
        },
        background: {
          light: '#f5f7fa',   // Fondo claro
          dark: '#1f2937',    // Fondo oscuro
        },
        surface: {
          light: '#ffffff',   // Tarjetas claras
          dark: '#111827',    // Tarjetas oscuras
        },
        text: {
          light: '#1f2937',   // Texto claro
          dark: '#f9fafb',    // Texto oscuro
        },
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'], // Fuente principal
      },
    },
  },
  plugins: [],
};