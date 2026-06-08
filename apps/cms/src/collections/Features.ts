import type { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
  slug: 'features',
  admin: { useAsTitle: 'title', group: 'Product' },
  versions: { drafts: true },
  fields: [
    { name: 'title',      type: 'text',     required: true },
    { name: 'slug',       type: 'text',     required: true, unique: true },
    { name: 'tagline',    type: 'text',     maxLength: 80 },
    { name: 'description',type: 'textarea', maxLength: 200 },
    { name: 'icon',       type: 'text',     admin: { description: 'Emoji or icon name.' } },
    { name: 'coverImage', type: 'upload',   relationTo: 'media' },
    { name: 'content',    type: 'richText' },
    { name: 'order',      type: 'number',   defaultValue: 0, admin: { position: 'sidebar' } },
    {
      type: 'tabs',
      tabs: [{
        label: 'SEO',
        fields: [
          { name: 'metaTitle',       type: 'text',     maxLength: 60 },
          { name: 'metaDescription', type: 'textarea', maxLength: 160 },
          { name: 'ogImage',         type: 'upload',   relationTo: 'media' }
        ]
      }]
    }
  ]
}
