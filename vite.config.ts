import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['@porsche-design-system/components-react', '@porsche-design-system/components-js'],
  },
  base: process.env.PUBLIC_BASE_PATH || '',
  plugins: [react()],
})
