/**
 * Модель кандидата. Дзеркалить payload, який бекенд форвардить у
 * POST https://bes-center.com/skill-sprint/external/candidates
 */
export type CandidatePayload = {
  firstName: string
  lastName: string
  middleName?: string
  /** Тільки цифри, у форматі 380XXXXXXXXX. */
  phoneNumber: string
  email: string
  age: number
  location: string
  /** Токен reCAPTCHA v2. Бекенд перевіряє його перед форвардом заявки. */
  recaptchaToken: string
}

export type CandidateFormValues = {
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: string
  email: string
  age: string
  location: string
}

export type FieldErrors = Partial<
  Record<keyof CandidateFormValues | 'recaptchaToken' | 'consent', string>
>
