// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'remove-html-comments',
      transformIndexHtml(html) {
        // Remove os comentários HTML
        return html.replace(/<!--[\s\S]*?-->/g, '');
      }
    }
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false
      }
    }
  }
})