/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Aquí migramos tus colores de global.css
      colors: {
        navy: '#1D3557',        // Tu --color-navy
        lavender: '#D3D3FF',    // Tu --color-lavender
        'yellow-accent': '#FFC300', // Tu --color-yellow-accent
        'light-gray': '#F8F8F8',    // Tu --color-light-gray
        'text-dark': '#333333',     // Tu --color-text-dark
        'text-muted': '#666666',    // Tu --color-text-muted
        // Mantén la configuración de Tremor aquí abajo...
        tremor: {
           // ... (mantén lo que ya tenías de tremor)
        }
      },
      // 2. Aquí migramos tu fuente
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      // 3. Aquí migramos tu animación de scroll (Testimonios)
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-33.33%, 0, 0)' },
        }
      },
      animation: {
        'scroll-left': 'scroll-left 50s linear infinite',
      }
    },
  },
  plugins: [],
}