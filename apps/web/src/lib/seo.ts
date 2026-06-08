const SITE_URL = import.meta.env.SITE_URL || 'https://www.desk365.io'
const SITE_NAME = 'Desk365'

export interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogImageAlt?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
  lang?: string
}

export function buildSEO(props: SEOProps): Required<SEOProps> {
  const title = props.title || 'AI-powered helpdesk software for teams of all sizes'
  const description = props.description || 'A seamless AI-powered helpdesk solution built for businesses of all sizes.'
  return {
    title: title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`,
    description,
    canonical: props.canonical ?? SITE_URL,
    ogImage: props.ogImage ?? `${SITE_URL}/og-default.png`,
    ogImageAlt: props.ogImageAlt ?? title,
    ogType: props.ogType ?? 'website',
    noindex: props.noindex ?? false,
    lang: props.lang ?? 'en'
  }
}

export function buildHreflangLinks(
  path: string,
  locales: string[] = ['de', 'fr', 'es']
): { lang: string; href: string }[] {
  const links = [{ lang: 'en', href: `${SITE_URL}${path}` }]
  for (const locale of locales) {
    links.push({ lang: locale, href: `${SITE_URL}/${locale}${path}` })
  }
  links.push({ lang: 'x-default', href: `${SITE_URL}${path}` })
  return links
}
