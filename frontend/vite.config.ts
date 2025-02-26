import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    watch: {
      usePolling: true
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
