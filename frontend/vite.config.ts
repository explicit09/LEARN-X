import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0', // Allow connections from any IP
    strictPort: true, // Exit if port is in use
    hmr: {
      clientPort: 3000, // Important for HMR to work in Docker
    },
    watch: {
      usePolling: true, // Enable polling for file watching in Docker
    },
    proxy: {
      '/api': {
        target: 'http://backend:8000', // Use service name instead of localhost
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
  }
})
