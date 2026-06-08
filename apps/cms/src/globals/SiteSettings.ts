import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  fields: [
    { name: 'siteName',               type: 'text',     defaultValue: 'Desk365' },
    { name: 'tagline',                type: 'text' },
    { name: 'logo',                   type: 'upload',   relationTo: 'media' },
    { name: 'favicon',                type: 'upload',   relationTo: 'media' },
    { name: 'defaultOgImage',         type: 'upload',   relationTo: 'media' },
    { name: 'googleSiteVerification', type: 'text',     admin: { description: 'Google Search Console verification meta content value.' } },
    { name: 'googleAnalyticsId',      type: 'text',     admin: { description: 'GA4 Measurement ID (managed in GTM instead if used).' } }
  ]
}
