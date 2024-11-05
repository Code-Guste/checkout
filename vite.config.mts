import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    port: 3000,
  },
  plugins: [
    tsconfigPaths(),
    react({
      jsxImportSource: '@emotion/react',
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
      include: '**/*.svg?react',
    }),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
