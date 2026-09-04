import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      includeAssets: ['vite.svg'],
      manifest: {
        name: 'Curioo - Understand How Anything Works',
        short_name: 'Curioo',
        description: 'An AI-powered app that explains how everyday things work.',
        theme_color: '#0b3d5c',
        background_color: '#faf8f2',
        display: 'standalone',
        icons: [
          {
            src: 'vite.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
})

