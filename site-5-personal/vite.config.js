import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Сайт живёт в подпапке: без base все ссылки на ассеты дают 404 в проде.
export default defineConfig({
  base: '/mara/',
  plugins: [react(), tailwindcss()],
})
