import { z } from 'zod'

/**
 * Схема кандидата — дзеркалить контракт BES Center:
 * POST /skill-sprint/external/candidates
 */
export const candidateSchema = z.object({
  firstName: z.string().trim().min(2, "Ім'я закоротке").max(60),
  lastName: z.string().trim().min(2, 'Прізвище закоротке').max(60),
  middleName: z.string().trim().max(60).optional(),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^380\d{9}$/, 'Формат телефону: 380XXXXXXXXX'),
  email: z.string().trim().email('Некоректний email').max(120),
  age: z.number().int('Вік має бути цілим числом').min(16, 'Вік від 16').max(99),
  location: z.string().trim().min(2, 'Вкажіть місто').max(120),
  recaptchaToken: z.string().min(1, 'Підтвердіть, що ви не робот').max(4096),
})

export type CandidateInput = z.infer<typeof candidateSchema>

/** Те, що реально йде в BES Center — без токена капчі. */
export type Candidate = Omit<CandidateInput, 'recaptchaToken'>

/** Перетворює помилки zod у мапу «поле → повідомлення» для фронтенду. */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {}
  for (const issue of error.issues) {
    const field = issue.path[0]
    if (typeof field === 'string' && !result[field]) {
      result[field] = issue.message
    }
  }
  return result
}
