import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Vite configuration for the Tools app.
 *
 * Note: tsconfig.json includes both "src" and "tests" for type checking and IDE support,
 * but Vite's build only bundles code reachable from the entry point (index.html → src/main.tsx).
 * Test files are never imported by app code, so they are automatically excluded from production builds.
 */
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/tools/' : '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 3007,
    open: false,
  },
}));

