/**
 * Google Analytics 4.
 *
 * Заглушка: поки `VITE_GA_MEASUREMENT_ID` порожній, скрипт не вантажиться
 * і жоден запит нікуди не йде — усі функції стають no-op. Щойно ключ зʼявиться
 * у client/.env, аналітика підніметься сама, без правок у коді.
 */

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? ''

/** Чи налаштована аналітика. Зручно для умовного рендеру в UI. */
export const isAnalyticsEnabled = () => Boolean(GA_MEASUREMENT_ID)

type GtagArgs =
  | ['js', Date]
  | ['config', string, Record<string, unknown>?]
  | ['event', string, Record<string, unknown>?]
  | ['set', Record<string, unknown>]

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: GtagArgs) => void
  }
}

const SCRIPT_ID = 'ga4'
let initialized = false

function gtag(...args: GtagArgs) {
  // gtag.js читає саме arguments-обʼєкт, тож пушимо args, а не масив
  window.dataLayer?.push(args)
}

/** Вставляє gtag.js один раз. Без ключа не робить нічого. */
export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || initialized) return
  if (typeof document === 'undefined') return
  if (document.getElementById(SCRIPT_ID)) return

  initialized = true
  window.dataLayer = window.dataLayer ?? []
  window.gtag = gtag

  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    // Переходи в SPA відправляємо вручну з trackPageView
    send_page_view: false,
    anonymize_ip: true,
  })
}

/** Перегляд сторінки. У SPA викликається на кожній зміні маршруту. */
export function trackPageView(path: string, title?: string) {
  if (!GA_MEASUREMENT_ID) return
  gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: title ?? document.title,
  })
}

/** Довільна подія. Без ключа мовчки ігнорується. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!GA_MEASUREMENT_ID) return
  gtag('event', name, params)
}

/** Стандартна подія GA4 для відправленої заявки. */
export function trackLead(source: string) {
  trackEvent('generate_lead', { form: 'application', source })
}
