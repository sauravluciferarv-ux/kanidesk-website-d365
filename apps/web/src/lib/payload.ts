const API_URL = import.meta.env.PAYLOAD_API_URL || 'http://localhost:3000'

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) throw new Error(`Payload API error: ${res.status} ${path}`)
  const json = await res.json()
  return json
}

// ─── Collections ─────────────────────────────────────────────────────────────

export async function getPages() {
  return fetchAPI<{ docs: Page[] }>('/pages?depth=2&limit=100')
}

export async function getPageBySlug(slug: string) {
  const data = await fetchAPI<{ docs: Page[] }>(`/pages?where[slug][equals]=${slug}&depth=2&limit=1`)
  return data.docs[0] ?? null
}

export async function getPosts(page = 1, limit = 12) {
  return fetchAPI<{ docs: Post[]; totalDocs: number; totalPages: number }>(
    `/posts?depth=1&limit=${limit}&page=${page}&sort=-publishedAt`
  )
}

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI<{ docs: Post[] }>(`/posts?where[slug][equals]=${slug}&depth=2&limit=1`)
  return data.docs[0] ?? null
}

export async function getFeatures() {
  return fetchAPI<{ docs: Feature[] }>('/features?depth=1&limit=100')
}

export async function getFeatureBySlug(slug: string) {
  const data = await fetchAPI<{ docs: Feature[] }>(`/features?where[slug][equals]=${slug}&depth=2&limit=1`)
  return data.docs[0] ?? null
}

export async function getIntegrations() {
  return fetchAPI<{ docs: Integration[] }>('/integrations?depth=1&limit=100')
}

export async function getIntegrationBySlug(slug: string) {
  const data = await fetchAPI<{ docs: Integration[] }>(`/integrations?where[slug][equals]=${slug}&depth=2&limit=1`)
  return data.docs[0] ?? null
}

export async function getLogos() {
  return fetchAPI<{ docs: Logo[] }>('/logos?depth=1&limit=100&sort=order')
}

export async function getTestimonials() {
  return fetchAPI<{ docs: Testimonial[] }>('/testimonials?depth=1&limit=50&sort=order')
}

export async function getFAQs(category?: string) {
  const filter = category ? `&where[category][equals]=${category}` : ''
  return fetchAPI<{ docs: FAQ[] }>(`/faqs?depth=0&limit=100&sort=order${filter}`)
}

export async function getCaseStudies() {
  return fetchAPI<{ docs: CaseStudy[] }>('/case-studies?depth=1&limit=50')
}

export async function getCaseStudyBySlug(slug: string) {
  const data = await fetchAPI<{ docs: CaseStudy[] }>(`/case-studies?where[slug][equals]=${slug}&depth=2&limit=1`)
  return data.docs[0] ?? null
}

// ─── Globals ──────────────────────────────────────────────────────────────────

export async function getHeader() {
  return fetchAPI<HeaderGlobal>('/globals/header?depth=1')
}

export async function getFooter() {
  return fetchAPI<FooterGlobal>('/globals/footer?depth=1')
}

export async function getSiteSettings() {
  return fetchAPI<SiteSettings>('/globals/site-settings?depth=1')
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MediaItem {
  id: string
  url: string
  alt: string
  width: number
  height: number
  mimeType: string
}

export interface Page {
  id: string
  title: string
  slug: string
  description?: string
  ogImage?: MediaItem
  noindex?: boolean
  content?: Block[]
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  author?: { name: string }
  coverImage?: MediaItem
  categories?: string[]
  content?: unknown
}

export interface Feature {
  id: string
  title: string
  slug: string
  tagline?: string
  description?: string
  icon?: string
  coverImage?: MediaItem
  content?: unknown
}

export interface Integration {
  id: string
  title: string
  slug: string
  description?: string
  logo?: MediaItem
  category?: string
}

export interface Logo {
  id: string
  name: string
  image: MediaItem
  url?: string
  order: number
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  avatar?: MediaItem
  rating?: number
  order: number
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order: number
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  company: string
  excerpt?: string
  coverImage?: MediaItem
  results?: { metric: string; value: string }[]
}

export interface Block {
  blockType: string
  [key: string]: unknown
}

export interface HeaderGlobal {
  logo?: MediaItem
  nav: { label: string; href: string; children?: { label: string; href: string }[] }[]
  cta?: { label: string; href: string }
}

export interface FooterGlobal {
  columns: { heading: string; links: { label: string; href: string }[] }[]
  social: { platform: string; url: string }[]
  copyright: string
}

export interface SiteSettings {
  siteName: string
  tagline?: string
  logo?: MediaItem
  favicon?: MediaItem
  defaultOgImage?: MediaItem
  googleSiteVerification?: string
}
