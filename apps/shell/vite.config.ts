import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      federation({
        name: 'shell',
        remotes: {
          'analytics': 'https://tos-monorepo-analytics.vercel.app/assets/remoteEntry.js',
          'yard_ops': 'https://tos-yard-ops.vercel.app/assets/remoteEntry.js',
          'move_planning': 'https://tos-move-planning.vercel.app/assets/remoteEntry.js',
        },
        shared: {
          react: { singleton: true, requiredVersion: '19.2.5', eager: true },
          'react-dom': { singleton: true, requiredVersion: '19.2.5', eager: true },
          recharts: { singleton: true }
        },
      }),
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    server: {
      port: 3000,
      strictPort: true,
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
  }
});