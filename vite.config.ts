import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // Relative asset paths so the built site works at a domain root
    // (nuvonixlabs.com) AND under a sub-path (username.github.io/nuvonixlabsweb/).
    base: './',
    plugins: [react(), tailwindcss()],
    build: {
      // Two pages: the home page and the small-business services page
      // (served at nuvonixlabs.com/services/).
      rollupOptions: {
        input: {
          main: path.resolve(import.meta.dirname, 'index.html'),
          services: path.resolve(import.meta.dirname, 'services/index.html'),
        },
      },
    },
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
