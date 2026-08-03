/**
 * Завантажувач reCAPTCHA v2 (чекбокс «Я не робот»).
 *
 * Скрипт вантажиться один раз на застосунок — модульний проміс не дає
 * повторно вставити <script> при кожному відкритті модалки.
 */

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? ''

type RenderOptions = {
  sitekey: string
  callback: (token: string) => void
  'expired-callback': () => void
  'error-callback': () => void
  hl?: string
}

type Grecaptcha = {
  render: (container: HTMLElement, options: RenderOptions) => number
  reset: (widgetId?: number) => void
  getResponse: (widgetId?: number) => string
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha
    onRecaptchaLoaded?: () => void
  }
}

const SCRIPT_ID = 'recaptcha-v2'
let loader: Promise<Grecaptcha> | null = null

export function loadRecaptcha(): Promise<Grecaptcha> {
  if (loader) return loader

  loader = new Promise<Grecaptcha>((resolve, reject) => {
    if (window.grecaptcha?.render) {
      resolve(window.grecaptcha)
      return
    }

    if (document.getElementById(SCRIPT_ID)) {
      // Скрипт уже вставлено іншим викликом — чекаємо на його onload
      const existing = window.onRecaptchaLoaded
      window.onRecaptchaLoaded = () => {
        existing?.()
        if (window.grecaptcha) resolve(window.grecaptcha)
      }
      return
    }

    window.onRecaptchaLoaded = () => {
      if (window.grecaptcha) resolve(window.grecaptcha)
      else reject(new Error('grecaptcha недоступний після завантаження'))
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src =
      'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit&hl=uk'
    script.async = true
    script.defer = true
    script.onerror = () => {
      loader = null
      reject(new Error('Не вдалося завантажити reCAPTCHA'))
    }
    document.head.appendChild(script)
  })

  return loader
}
