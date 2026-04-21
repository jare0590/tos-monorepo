import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'move_planning',
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
        }
      },
    }),
  ],
  resolve: {
    alias: {
      '@tos/ui-config': path.resolve(__dirname, '../../packages/ui-config/src/index.ts'),
      '@tos/data-layer': path.resolve(__dirname, '../../packages/data-layer/src/index.ts'),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 3002,
    strictPort: true,
  },
  preview: {
    port: 3002,
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});