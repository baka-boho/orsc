import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code from app code
          'particles': ['./particles.js'],
          'enhanced': ['./enhanced.js'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Generate sourcemaps for debugging (optional)
    sourcemap: false,
  },
  // CSS optimization
  css: {
    devSourcemap: false,
  },
  // Server configuration for development
  server: {
    port: 5173,
    open: true, // Auto-open browser
  },
});
