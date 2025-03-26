// vite-plugin-pwa
import { VitePWA } from 'vite-plugin-pwa';

// Configuração do service worker
const serviceWorkerOptions = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', '*.png', '*.svg'],
  manifest: {
    name: 'LegalFlux - Gestão Jurídica Simplificada',
    short_name: 'LegalFlux',
    description: 'Uma plataforma completa para advogados, solicitadores e agentes de execução gerir processos, clientes e documentos com eficiência.',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // 1 ano
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // 1 ano
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30 // 30 dias
          }
        }
      },
      {
        urlPattern: /^https:\/\/api\.legalflux\.com\/v1\/.*$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 // 24 horas
          },
          networkTimeoutSeconds: 10
        }
      }
    ]
  }
};

export { serviceWorkerOptions, VitePWA };
