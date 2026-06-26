// Google Ads conversion tracking (gtag.js).
// The global tag is loaded in index.html; here we fire conversion events on
// the actual lead actions. This is an SPA, so there's no thank-you-page reload —
// conversions must be fired in JS at the moment the action succeeds.

// Google Ads conversion ID + labels (from Google Ads → Goals → Conversions).
export const ADS_ID = 'AW-18265475348'

// Google Analytics 4 Measurement ID (Analytics → Admin → Data streams).
export const GA_ID = 'G-RCHSQHB2ST'

// Send a GA4 page_view. Called on every route change because this is an SPA —
// gtag's automatic page_view (disabled in index.html) only fires on first load.
export function trackPageView() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_title: document.title,
  })
}

export const CONVERSIONS = {
  // "Submit lead form" — used for both the brochure download and contact forms.
  leadForm: 'AW-18265475348/niHsCKelxsUcEJSS1IVE',
}

// Fire a Google Ads conversion. `sendTo` is a full 'AW-xxxx/label' value.
export function trackConversion(sendTo, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'conversion', { send_to: sendTo, ...params })
}

// Generic dataLayer push — kept for non-conversion signals (e.g. WhatsApp clicks)
// that don't yet have a dedicated Google Ads conversion label.
export function trackEvent(event, params = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
