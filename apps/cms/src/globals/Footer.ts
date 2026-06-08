import type { GlobalConfig } from 'payload'

export const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Settings' },
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href',  type: 'text', required: true }
          ]
        }
      ]
    },
    {
      name: 'social',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: ['Twitter', 'LinkedIn', 'YouTube', 'Facebook', 'Instagram']
        },
        { name: 'url',  type: 'text', required: true },
        { name: 'icon', type: 'text' }
      ]
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2025 Desk365. All rights reserved.'
    }
  ]
}
