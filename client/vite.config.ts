import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['assets/images/pwa-icon.svg', 'assets/images/sarthi-dashboard.png'],
      manifest: {
        id: 'sarthi-pwa',
        name: 'Sarthi',
        short_name: 'Sarthi',
        description: 'Your Career Guide',
        theme_color: '#0D9488',
        background_color: '#ffffff',
        display: 'standalone',
        display_override: ['standalone', 'window-controls-overlay'],
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'assets/images/sarthi-mobile-logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'assets/images/sarthi-mobile-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'assets/images/sarthi-mobile-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: 'assets/images/sarthi-dashboard.png',
            sizes: '1200x400',
            type: 'image/png',
            label: 'Sarthi Dashboard'
          },
          {
            src: 'assets/images/sarthi-dashboard.png',
            sizes: '1200x400',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Sarthi Dashboard Wide'
          }
        ]
      },
      workbox: {
        navigateFallbackAllowlist: [/^\/$/], // Simplified for now to avoid complexity
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});