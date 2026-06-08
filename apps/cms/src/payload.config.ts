import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'

import { Pages }        from './collections/Pages'
import { Posts }        from './collections/Posts'
import { Features }     from './collections/Features'
import { Integrations } from './collections/Integrations'
import { CaseStudies }  from './collections/CaseStudies'
import { Testimonials } from './collections/Testimonials'
import { Logos }        from './collections/Logos'
import { FAQs }         from './collections/FAQs'
import { Media }        from './collections/Media'
import { Users }        from './collections/Users'

import { SiteSettings } from './globals/SiteSettings'
import { HeaderGlobal } from './globals/Header'
import { FooterGlobal } from './globals/Footer'
import { SEODefaults }  from './globals/SEODefaults'

const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK_URL

async function triggerVercelDeploy() {
  if (!VERCEL_DEPLOY_HOOK) return
  await fetch(VERCEL_DEPLOY_HOOK, { method: 'POST' }).catch((err) =>
    console.error('Vercel deploy hook failed:', err)
  )
}

export default buildConfig({
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-in-production',

  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Desk365 CMS',
      favicon: '/favicon.svg',
      ogImage: '/og-admin.png'
    }
  },

  cors: (process.env.CORS_URLS || 'http://localhost:4321').split(','),

  collections: [
    Pages,
    Posts,
    Features,
    Integrations,
    CaseStudies,
    Testimonials,
    Logos,
    FAQs,
    Media,
    Users
  ],

  globals: [
    SiteSettings,
    HeaderGlobal,
    FooterGlobal,
    SEODefaults
  ],

  editor: lexicalEditor({}),

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' }
  }),

  upload: {
    limits: { fileSize: 10_000_000 }
  },

  plugins: [
    ...(process.env.S3_BUCKET ? [
      s3Storage({
        collections: { media: true },
        bucket: process.env.S3_BUCKET!,
        config: {
          credentials: {
            accessKeyId:     process.env.S3_ACCESS_KEY_ID!,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
          },
          region: process.env.S3_REGION || 'us-east-1',
          endpoint: process.env.S3_ENDPOINT
        }
      })
    ] : [])
  ],

  hooks: {
    afterOperation: [
      async ({ operation, collection }) => {
        const publishTriggers = ['update', 'create', 'delete']
        if (publishTriggers.includes(operation)) {
          await triggerVercelDeploy()
        }
      }
    ]
  },

  typescript: {
    outputFile: '../web/src/payload-types.ts'
  }
})
