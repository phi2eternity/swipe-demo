import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate', injectRegister: 'auto',
    includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
    manifest:{
      name: "Quicker Grooming App",
      short_name: "Quicker",
      description: "Designed to schedule for your furry companions",
      theme_color: "#faca86",
      icons: [
        {
          "src": "pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    }
  })], resolve: {
    alias: {
      '@data': '/src/data',
      '@utils': '/src/utils',
      '@domain': '/src/domain',
      '@features': '/src/features',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@assets': '/src/assets',
      '@pages': '/src/pages',
      '@quicker': '/src',
      '@styles': '/src/styles',
      '@common': '/src/common',
    },
  },
});
