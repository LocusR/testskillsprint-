/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Базовий URL API. За замовчуванням /api через Vite-проксі. */
  readonly VITE_API_URL?: string
  /** Site key reCAPTCHA v2 — публічний, потрапляє у бандл. */
  readonly VITE_RECAPTCHA_SITE_KEY?: string
  /** Measurement ID Google Analytics 4, напр. G-XXXXXXXXXX. Порожній = вимкнено. */
  readonly VITE_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
