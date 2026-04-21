/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // 1. Escanea todos los archivos de las apps
    "../../apps/**/*.{js,ts,jsx,tsx}",
    // 2. Escanea todos los archivos de la propia librería (CRÍTICO)
    "./src/**/*.{js,ts,jsx,tsx}", 
    "../../packages/ui-config/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        port: {
          dark: '#0f172a',
          accent: '#f97316',
        }
      }
    },
  },
  safelist: [
    'bg-green-100', 'text-green-800', 'border-green-200',
    'bg-blue-100', 'text-blue-800', 'border-blue-200',
    'bg-red-100', 'text-red-800', 'border-red-200',
    'bg-amber-100', 'text-amber-800', 'border-amber-200',
  ],
  plugins: [],
}