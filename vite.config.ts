import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  return {
    // Base path for production (adjust if deploying to a subdirectory)
    base: '/', // Change this to '/your-subdirectory/' if deploying to a subdirectory

    // Plugins
    plugins: [react()],

    // Build configuration
    build: {
      outDir: 'dist', // Output directory for the production build
      assetsDir: 'assets', // Directory for static assets
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'), // Entry point
        },
      },
    },

    // Server configuration
    server: {
      port: 3000, // Development server port
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET, // Use environment variable for proxy target
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // Resolve aliases (optional, for cleaner imports)
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // Example alias for the src directory
      },
    },
  };
});