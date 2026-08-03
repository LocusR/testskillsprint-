import type { CandidateFormValues, FieldErrors } from '@/types/candidate'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
/** 380 + 9 цифр — український мобільний у форматі, який очікує BES Center. */
const PHONE_RE = /^380\d{9}$/

export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, '')
  if (digits.startsWith('380')) return digits
  if (digits.startsWith('80')) return `3${digits}`
  if (digits.startsWith('0')) return `38${digits}`
  return digits
}

export function validateCandidate(values: CandidateFormValues): FieldErrors {
  const errors: FieldErrors = {}

  if (!values.firstName.trim()) {
    errors.firstName = "Вкажіть ім'я"
  } else if (values.firstName.trim().length < 2) {
    errors.firstName = "Ім'я закоротке"
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Вкажіть прізвище'
  } else if (values.lastName.trim().length < 2) {
    errors.lastName = 'Прізвище закоротке'
  }

  const phone = normalizePhone(values.phoneNumber)
  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'Вкажіть номер телефону'
  } else if (!PHONE_RE.test(phone)) {
    errors.phoneNumber = 'Формат: 380XXXXXXXXX'
  }

  if (!values.email.trim()) {
    errors.email = 'Вкажіть email'
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Некоректний email'
  }

  const age = Number(values.age)
  if (!values.age.trim()) {
    errors.age = 'Вкажіть вік'
  } else if (!Number.isInteger(age) || age < 16 || age > 99) {
    errors.age = 'Вік від 16 до 99'
  }

  if (!values.location.trim()) {
    errors.location = 'Вкажіть місто'
  }

  return errors
}
