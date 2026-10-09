import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'gh-pages-html-fallbacks',
        closeBundle() {
          try {
            const distPath = path.resolve(import.meta.dirname, 'dist');
            const indexPath = path.join(distPath, 'index.html');
            if (fs.existsSync(indexPath)) {
              // Create 404.html for GitHub Pages SPA routing fallback
              fs.copyFileSync(indexPath, path.join(distPath, '404.html'));
              // Create DonateSupport.html for legacy / direct URL requests
              fs.copyFileSync(indexPath, path.join(distPath, 'DonateSupport.html'));
            }
          } catch (err) {
            console.error('Failed to create GitHub Pages fallbacks:', err);
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
