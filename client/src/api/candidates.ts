import type { CandidatePayload } from '@/types/candidate'

const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export type SubmitResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Record<string, string> }

/**
 * Відправляє заявку на власний Express-бекенд.
 * Бекенд валідує дані ще раз і форвардить їх у BES Center з X-Api-Key —
 * ключ ніколи не потрапляє у браузер.
 */
export async function submitCandidate(
  payload: CandidatePayload,
): Promise<SubmitResult> {
  try {
    const response = await fetch(`${API_BASE}/candidates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (response.ok) return { ok: true }

    const data = (await response.json().catch(() => null)) as {
      message?: string
      fieldErrors?: Record<string, string>
    } | null

    if (response.status === 429) {
      return {
        ok: false,
        message: 'Забагато заявок з цієї адреси. Спробуйте, будь ласка, пізніше.',
      }
    }

    return {
      ok: false,
      message: data?.message ?? 'Не вдалося надіслати заявку. Спробуйте ще раз.',
      ...(data?.fieldErrors ? { fieldErrors: data.fieldErrors } : {}),
    }
  } catch {
    return {
      ok: false,
      message: 'Немає зв’язку з сервером. Перевірте інтернет і спробуйте ще раз.',
    }
  }
}
