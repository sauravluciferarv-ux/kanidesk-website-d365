import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: { useAsTitle: 'title', group: 'Content' },
  versions: { drafts: true },
  fields: [
    { name: 'title',      type: 'text',    required: true },
    { name: 'slug',       type: 'text',    required: true, unique: true },
    { name: 'company',    type: 'text',    required: true },
    { name: 'excerpt',    type: 'textarea', maxLength: 200 },
    { name: 'coverImage', type: 'upload',  relationTo: 'media' },
    { name: 'logo',       type: 'upload',  relationTo: 'media' },
    {
      name: 'results',
      type: 'array',
      fields: [
        { name: 'metric', type: 'text', required: true },
        { name: 'value',  type: 'text', required: true }
      ]
    },
    { name: 'content', type: 'richText', required: true },
    {
      type: 'tabs',
      tabs: [{
        label: 'SEO',
        fields: [
          { name: 'metaTitle',       type: 'text',     maxLength: 60 },
          { name: 'metaDescription', type: 'textarea', maxLength: 160 }
        ]
      }]
    }
  ]
}
