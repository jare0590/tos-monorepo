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
          // Asegúrate de que la URL sea la correcta y que Analytics esté corriendo (pnpm preview)
          'analytics': `${env.VITE_ANALYTICS_URL || 'http://localhost:3003'}/assets/remoteEntry.js`,
          'yard_ops': `${env.VITE_YARD_OPS_URL || 'http://localhost:3001'}/assets/remoteEntry.js`,
          'move_planning': `${env.VITE_PLANNING_URL || 'http://localhost:3002'}/assets/remoteEntry.js`,
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
      // ELIMINA la sección rollupOptions: { external: [...] } de aquí
    },
    resolve: {
      // ELIMINA los alias manuales y usa esto:
      dedupe: ['react', 'react-dom'],
    },
    server: {
      port: 3000,
      strictPort: true, // This avoids Vite jumps to another port if the 3001 is busy
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
  }
});