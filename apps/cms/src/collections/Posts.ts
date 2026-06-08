import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
    defaultColumns: ['title', 'categories', '_status', 'publishedAt']
  },
  versions: { drafts: { autosave: true } },
  fields: [
    { name: 'title',       type: 'text',     required: true },
    { name: 'slug',        type: 'text',     required: true, unique: true },
    { name: 'excerpt',     type: 'textarea', maxLength: 200 },
    { name: 'coverImage',  type: 'upload',   relationTo: 'media' },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users'
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Product',        value: 'product' },
        { label: 'Customer Story', value: 'customer-story' },
        { label: 'How-to',         value: 'how-to' },
        { label: 'News',           value: 'news' },
        { label: 'Best Practices', value: 'best-practices' }
      ]
    },
    { name: 'content',    type: 'richText', required: true },
    { name: 'publishedAt', type: 'date',   admin: { position: 'sidebar' } },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle',       type: 'text',     maxLength: 60 },
            { name: 'metaDescription', type: 'textarea', maxLength: 160 },
            { name: 'ogImage',         type: 'upload',   relationTo: 'media' }
          ]
        }
      ]
    }
  ]
}
