import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '', '');
  return {
    plugins: [react()],
    base: '/InnerBloom/', // <--- LÍNEA AGREGADA
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './setupTests.ts',
    }
  }
});
