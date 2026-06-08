import type { CollectionConfig } from 'payload'

export const Integrations: CollectionConfig = {
  slug: 'integrations',
  admin: { useAsTitle: 'title', group: 'Product' },
  versions: { drafts: true },
  fields: [
    { name: 'title',       type: 'text',   required: true },
    { name: 'slug',        type: 'text',   required: true, unique: true },
    { name: 'description', type: 'textarea', maxLength: 200 },
    { name: 'logo',        type: 'upload', relationTo: 'media' },
    {
      name: 'category',
      type: 'select',
      options: ['CRM', 'Communication', 'E-commerce', 'Analytics', 'DevOps', 'Other']
    },
    { name: 'websiteUrl',  type: 'text' },
    { name: 'content',     type: 'richText' },
    { name: 'featured',    type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order',       type: 'number',   defaultValue: 0,     admin: { position: 'sidebar' } }
  ]
}
