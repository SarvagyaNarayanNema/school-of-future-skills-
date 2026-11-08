import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'public-fallback-middleware',
      configureServer(server) {
        // Transparently route requests made without the base path to the base path
        server.middlewares.use((req, res, next) => {
          const publicPrefixes = ['/builders/', '/faculty/', '/fsit-', '/bot-avatar', '/images__6_'];
          if (publicPrefixes.some(p => req.url.startsWith(p))) {
            req.url = '/school-of-future-skills' + req.url;
          }
          next();
        });
      }
    }
  ],
  base: '/school-of-future-skills/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'vendor-three';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('gsap')) {
              return 'vendor-motion';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            return 'vendor-deps';
          }
        }
      }
    }
  }
});
