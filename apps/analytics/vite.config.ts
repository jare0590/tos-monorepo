import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'analytics',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      shared: {
        react: { 
          singleton: true, 
          requiredVersion: '19.2.5',
          strictVersion: true 
        },
        'react-dom': { 
          singleton: true, 
          requiredVersion: '19.2.5',
          strictVersion: true 
        },
        'recharts': { singleton: true }
      },
    }),
  ],
  resolve: {
    // ELIMINA los alias manuales y usa esto:
    dedupe: ['react', 'react-dom'],
    alias: {
      "@tos/data-layer": path.resolve(__dirname, "../../packages/data-layer/src"),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3003,
    strictPort: true,
  },
  preview: {
    port: 3003,
    strictPort: true,
  },
});