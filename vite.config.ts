import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure base is set to root for Vercel
  build: {
    outDir: 'dist', // Output directory for the production build
    assetsDir: 'assets', // Directory for static assets
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Entry point
      },
    },
  },
  server: {
    port: 3000, // Development server port
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET, // Use environment variable for proxy target
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Optional alias for cleaner imports
    },
  },
});