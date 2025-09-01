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
  // Optimizaciones avanzadas para producción
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    reportCompressedSize: false, // Mejora velocidad de build
    chunkSizeWarningLimit: 1000,
    // Configuración mejorada para preservar animaciones
    esbuild: {
      // Preservar nombres de función para mejor debugging de animaciones
      keepNames: true,
      // Ser menos agresivo con Math.* para preservar precisión
      treeShaking: true
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React ecosystem
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor'
          }
          // Animation libraries
          if (id.includes('framer-motion')) {
            return 'animation-vendor'
          }
          // Three.js y dependencias 3D
          if (id.includes('three')) {
            return 'three-vendor'
          }
          // Radix UI components
          if (id.includes('@radix-ui')) {
            return 'ui-vendor'
          }
          // Utility libraries
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
            return 'utils-vendor'
          }
          // Lucide icons
          if (id.includes('lucide-react')) {
            return 'icons-vendor'
          }
          // Node modules (resto)
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        // Optimizar nombres de archivos para mejor caché
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  // Optimizaciones para desarrollo
  server: {
    host: true,
    port: 3000,
    open: true,
    hmr: {
      overlay: true
    },
    fs: {
      strict: false
    }
  },
  
  // Optimizaciones adicionales
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      'clsx',
      'tailwind-merge'
    ],
    // Incluir Three.js para mejor optimización de animaciones
    exclude: []
  },
  // Variables globales y configuración avanzada
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  },
  
  // Configuración de CSS
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  }
})
