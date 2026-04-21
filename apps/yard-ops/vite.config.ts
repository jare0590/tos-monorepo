import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'yard_ops',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      shared: {
        react: {
          singleton: true,
          strictVersion: true, // Esto obliga a que la versión coincida exactamente
          requiredVersion: '19.2.5', // Usa el número exacto que viste en el root package.json
        },
        'react-dom': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '19.2.5',
        }
      },
    }),
  ],
  resolve: {
    alias: {
      '@tos/ui-config': path.resolve(__dirname, '../../packages/ui-config/src/index.ts'),
      '@tos/data-layer': path.resolve(__dirname, '../../packages/data-layer/src/index.ts'),
    },
    // Esto refuerza que use la misma copia de React incluso en desarrollo
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 3001,
    strictPort: true,
  },
  preview: {
    port: 3001,
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: 'esnext', // Crucial para que el plugin de federación pueda inyectar código
    minify: false,
    cssCodeSplit: false,
  },
});