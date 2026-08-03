import { env } from '../config/env.js'
import type { Candidate } from '../validation/candidate.js'

export type ForwardResult =
  | { ok: true; status: number }
  | { ok: false; status: number; message: string; body?: unknown }

/**
 * Форвардить заявку в BES Center.
 * X-Api-Key додається тут — це єдине місце, де секрет використовується.
 */
export async function forwardCandidate(
  candidate: Candidate,
): Promise<ForwardResult> {
  if (!env.besCenter.apiKey) {
    return {
      ok: false,
      status: 503,
      message:
        'BES_CENTER_API_KEY не налаштований на сервері — заявку неможливо передати.',
    }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), env.besCenter.timeoutMs)

  try {
    const response = await fetch(env.besCenter.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': env.besCenter.apiKey,
      },
      body: JSON.stringify(candidate),
      signal: controller.signal,
    })

    if (response.ok) {
      return { ok: true, status: response.status }
    }

    const body = await response.text().catch(() => '')
    return {
      ok: false,
      status: response.status,
      message: `BES Center відповів ${response.status}`,
      body,
    }
  } catch (error) {
    const aborted = error instanceof Error && error.name === 'AbortError'
    return {
      ok: false,
      status: aborted ? 504 : 502,
      message: aborted
        ? 'BES Center не відповів вчасно'
        : 'Не вдалося зв’язатися з BES Center',
    }
  } finally {
    clearTimeout(timeout)
  }
}
