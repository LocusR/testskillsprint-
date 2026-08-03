import { env, isProduction } from '../config/env.js'
import { logger } from '../lib/logger.js'

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'

export type CaptchaResult =
  | { ok: true }
  | { ok: false; reason: string; codes?: string[] }

type SiteVerifyResponse = {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}

/**
 * Перевіряє токен reCAPTCHA v2 у Google.
 *
 * Якщо секрет не заданий:
 *  - у проді відмовляємо (fail-closed) — інакше капча була б декорацією;
 *  - у розробці пропускаємо з гучним попередженням, щоб форму можна було
 *    тестувати локально без ключа.
 */
export async function verifyRecaptcha(token: string): Promise<CaptchaResult> {
  if (!env.recaptcha.secretKey) {
    if (isProduction) {
      return { ok: false, reason: 'RECAPTCHA_SECRET_KEY не налаштований' }
    }
    logger.warn(
      'RECAPTCHA_SECRET_KEY не заданий — перевірку капчі пропущено (тільки для розробки)',
    )
    return { ok: true }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: env.recaptcha.secretKey,
        response: token,
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      return { ok: false, reason: `Google відповів ${response.status}` }
    }

    const data = (await response.json()) as SiteVerifyResponse

    if (data.success) return { ok: true }

    return {
      ok: false,
      reason: 'Google відхилив токен',
      ...(data['error-codes'] ? { codes: data['error-codes'] } : {}),
    }
  } catch (error) {
    const aborted = error instanceof Error && error.name === 'AbortError'
    return {
      ok: false,
      reason: aborted ? 'Google не відповів вчасно' : 'Помилка звернення до Google',
    }
  } finally {
    clearTimeout(timeout)
  }
}
