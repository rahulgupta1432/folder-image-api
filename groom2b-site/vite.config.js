import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    // Inline the (small, already optimised) brand photos so the preview
    // can also be shared as a single self-contained HTML file.
    assetsInlineLimit: 100000,
  },
});
