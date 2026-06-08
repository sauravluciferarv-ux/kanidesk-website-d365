export const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es'] as const
export type Locale = typeof SUPPORTED_LOCALES[number]

export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split('/')[1] as Locale
  return SUPPORTED_LOCALES.includes(segment) ? segment : 'en'
}

export function localePath(locale: Locale, path: string): string {
  if (locale === 'en') return path
  return `/${locale}${path === '/' ? '' : path}`
}

export async function loadTranslations(locale: Locale) {
  try {
    const mod = await import(`./${locale}.json`)
    return mod.default as Record<string, Record<string, string>>
  } catch {
    const mod = await import('./en.json')
    return mod.default as Record<string, Record<string, string>>
  }
}
