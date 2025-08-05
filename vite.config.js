import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
  // Optimizaciones para producción
  build: {
    target: 'esnext',
    minify: 'esbuild', // Cambiado de terser a esbuild para mejor compatibilidad
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  },
  // Optimizaciones para desarrollo
  server: {
    host: true,
    port: 3000,
    open: true
  },
  // Prevenir problemas de caché
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
})
