import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/logo.png', 'favicon.svg', 'robots.txt'],
      manifest: {
        name: '돌봄PWA',
        short_name: '돌봄다리',
        description: '돌봄PWA!',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icons/logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/logo.png',
            sizes: '180x180',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      },
    }),
  ] as PluginOption[],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: isDev
    ? {
        host: '0.0.0.0',
        port: 5173,
        https: {
          key: fs.readFileSync('./localhost-key.pem'),
          cert: fs.readFileSync('./localhost.pem'),
        },
      }
    : {
        host: '0.0.0.0',
        port: 5173,
      },
});
