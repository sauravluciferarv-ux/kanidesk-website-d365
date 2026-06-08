import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'author', group: 'Content' },
  fields: [
    { name: 'quote',   type: 'textarea', required: true },
    { name: 'author',  type: 'text',     required: true },
    { name: 'role',    type: 'text',     required: true },
    { name: 'company', type: 'text',     required: true },
    { name: 'avatar',  type: 'upload',   relationTo: 'media' },
    { name: 'rating',  type: 'number',   min: 1, max: 5, defaultValue: 5 },
    { name: 'featured',type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order',   type: 'number',   defaultValue: 0,     admin: { position: 'sidebar' } }
  ]
}
