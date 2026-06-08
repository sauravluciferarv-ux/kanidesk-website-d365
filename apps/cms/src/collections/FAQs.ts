import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: { useAsTitle: 'question', group: 'Content' },
  fields: [
    { name: 'question', type: 'text',     required: true },
    { name: 'answer',   type: 'textarea', required: true },
    {
      name: 'category',
      type: 'select',
      options: ['home', 'pricing', 'features', 'general'],
      defaultValue: 'general',
      admin: { position: 'sidebar' }
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } }
  ]
}
