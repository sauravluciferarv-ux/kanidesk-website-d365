import type { GlobalConfig } from 'payload'

export const HeaderGlobal: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: { group: 'Settings' },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'nav',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href',  type: 'text', required: true },
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href',  type: 'text', required: true }
          ]
        }
      ]
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Request Demo' },
        { name: 'href',  type: 'text', defaultValue: '/request-demo' }
      ]
    }
  ]
}
