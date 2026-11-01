import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function expressApiPlugin() {
  return {
    name: 'express-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          try {
            const { default: app } = await import('./backend/server.js');
            return app(req, res, next);
          } catch (err) {
            console.error('[Vite Express Middleware Error]:', err);
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), expressApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
