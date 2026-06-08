import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '../public/media',
    imageSizes: [
      { name: 'thumbnail', width: 400,  height: 300,  position: 'centre' },
      { name: 'card',      width: 768,  height: 432,  position: 'centre' },
      { name: 'hero',      width: 1440, height: 810,  position: 'centre' },
      { name: 'og',        width: 1200, height: 630,  position: 'centre' }
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf', 'video/*']
  },
  admin: { group: 'Media' },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe this image for screen readers and SEO.' }
    },
    {
      name: 'caption',
      type: 'text'
    }
  ]
}
