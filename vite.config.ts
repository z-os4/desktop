import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  resolve: {
    alias: {
      '@z-os/apps': path.resolve(__dirname, '../apps/src'),
      '@z-os/sdk': path.resolve(__dirname, '../sdk/src'),
      '@z-os/ui': path.resolve(__dirname, '../ui/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
