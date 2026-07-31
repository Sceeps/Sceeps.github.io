import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Визитка стоит в корне домена, остальные пять сайтов — в подпапках со своим
// base. Токены Tailwind v4 лежат в src/index.css под @theme.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
