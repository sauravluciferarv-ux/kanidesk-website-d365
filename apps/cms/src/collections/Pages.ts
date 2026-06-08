import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt']
  },
  versions: { drafts: { autosave: true } },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL slug — e.g. "about" for /about' }
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText'
            }
          ]
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              maxLength: 160,
              admin: { description: 'Meta description (max 160 chars).' }
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Open Graph image (1200×630 recommended).' }
            },
            {
              name: 'noindex',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Prevent search engines from indexing this page.' }
            }
          ]
        }
      ]
    }
  ]
}
