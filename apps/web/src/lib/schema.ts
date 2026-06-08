const SITE_URL = import.meta.env.SITE_URL || 'https://www.desk365.io'

export const orgSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Desk365',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@desk365.io',
    contactType: 'customer support'
  },
  sameAs: [
    'https://twitter.com/desk365',
    'https://www.linkedin.com/company/desk365'
  ]
})

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Desk365',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
    'query-input': 'required name=search_term_string'
  }
})

export const softwareSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Desk365',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: SITE_URL,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free trial available' }
})

export const faqSchema = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a }
  }))
})

export const breadcrumbSchema = (crumbs: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map(({ name, url }, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: url
  }))
})

export const articleSchema = (post: {
  title: string
  description?: string
  publishedAt: string
  authorName?: string
  imageUrl?: string
  url: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.description,
  image: post.imageUrl,
  datePublished: post.publishedAt,
  author: { '@type': 'Person', name: post.authorName ?? 'Desk365 Team' },
  publisher: { '@type': 'Organization', name: 'Desk365', logo: `${SITE_URL}/logo.png` },
  url: post.url,
  mainEntityOfPage: { '@type': 'WebPage', '@id': post.url }
})

export const reviewSchema = (reviews: { author: string; rating: number; body: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Desk365 Helpdesk Software',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5
  },
  review: reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.author },
    reviewRating: { '@type': 'Rating', ratingValue: r.rating },
    reviewBody: r.body
  }))
})
