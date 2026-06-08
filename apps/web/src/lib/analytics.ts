declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    fbq?: (event: string, name: string, params?: Record<string, unknown>) => void
  }
}

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

export function trackFormSubmit(formName: string) {
  trackEvent('form_submit', { form_name: formName })
  window.fbq?.('track', 'Lead', { form_name: formName })
}

export function trackCalendlyBooked() {
  trackEvent('calendly_booked', {})
  window.fbq?.('track', 'Lead', { source: 'calendly' })
}

export function initCalendlyTracking() {
  if (typeof window === 'undefined') return
  window.addEventListener('message', (e) => {
    if (e.data?.event === 'calendly.event_scheduled') {
      trackCalendlyBooked()
    }
  })
}
