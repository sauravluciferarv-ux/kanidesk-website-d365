import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

const SITE_URL = process.env.SITE_URL || 'https://www.desk365.io'

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  compressHTML: true,

  image: {
    domains: [
      new URL(process.env.PAYLOAD_API_URL || 'https://cms.desk365.io').hostname
    ],
    remotePatterns: [{ protocol: 'https' }]
  },

  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) =>
        !page.includes('/api/') &&
        !page.includes('/admin'),
      changefreq: 'weekly',
      priority: 0.7,
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          de: 'de-DE',
          fr: 'fr-FR',
          es: 'es-ES'
        }
      }
    })
  ],

  build: {
    inlineStylesheets: 'auto'
  },

  vite: {
    build: {
      cssCodeSplit: true
    }
  }
})
