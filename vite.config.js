import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: match your repo name for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/wwin_portfolio',
})

