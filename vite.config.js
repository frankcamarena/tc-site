// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // AÑADE O MODIFICA ESTA LÍNEA
  // La base debe ser el nombre de tu repositorio, rodeado de barras diagonales.
  base: '/', 
})