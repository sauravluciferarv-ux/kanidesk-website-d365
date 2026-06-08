import type { GlobalConfig } from 'payload'

export const SEODefaults: GlobalConfig = {
  slug: 'seo-defaults',
  label: 'SEO Defaults',
  admin: {
    group: 'Settings',
    description: 'Default SEO values used when page-specific values are not set.'
  },
  fields: [
    {
      name: 'titleSuffix',
      type: 'text',
      defaultValue: '| Desk365',
      admin: { description: 'Appended to page titles. e.g. "| Desk365"' }
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      maxLength: 160
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'twitterHandle',
      type: 'text',
      defaultValue: '@desk365'
    },
    {
      name: 'schemaOrg',
      type: 'group',
      fields: [
        { name: 'organizationName', type: 'text', defaultValue: 'Desk365' },
        { name: 'organizationUrl',  type: 'text', defaultValue: 'https://www.desk365.io' },
        { name: 'organizationLogo', type: 'upload', relationTo: 'media' }
      ]
    }
  ]
}
