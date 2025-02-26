import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    allowedHosts: ['full-stack-developer-task-1.onrender.com'],
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
