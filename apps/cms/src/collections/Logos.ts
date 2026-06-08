import type { CollectionConfig } from 'payload'

export const Logos: CollectionConfig = {
  slug: 'logos',
  admin: { useAsTitle: 'name', group: 'Content' },
  fields: [
    { name: 'name',  type: 'text',   required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'url',   type: 'text',   admin: { description: 'Optional link to company website.' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } }
  ]
}
