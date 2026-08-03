import 'dotenv/config'

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback
  if (!value) {
    throw new Error(
      `Відсутня змінна оточення ${name}. Скопіюйте server/.env.example у server/.env і заповніть її.`,
    )
  }
  return value
}

function number(name: string, fallback: number): number {
  const raw = process.env[name]
  if (!raw) return fallback
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: number('PORT', 4000),

  corsOrigins: (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),

  besCenter: {
    url: required(
      'BES_CENTER_API_URL',
      'https://bes-center.com/skill-sprint/external/candidates',
    ),
    /**
     * Секрет BES Center. Живе тільки на сервері — фронтенд його ніколи не бачить.
     * Порожній ключ не валить запуск, щоб можна було піднімати dev без секрета,
     * але POST /api/candidates тоді відповість 503.
     */
    apiKey: process.env.BES_CENTER_API_KEY ?? '',
    timeoutMs: number('BES_CENTER_TIMEOUT_MS', 10_000),
  },

  recaptcha: {
    /**
     * Секрет reCAPTCHA v2. Живе тільки тут — у браузер потрапляє лише site key.
     * Порожній: у проді заявки відхиляються, у dev перевірка пропускається.
     */
    secretKey: process.env.RECAPTCHA_SECRET_KEY ?? '',
  },

  rateLimit: {
    windowMs: number('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
    max: number('RATE_LIMIT_MAX', 10),
  },
} as const

export const isProduction = env.nodeEnv === 'production'
