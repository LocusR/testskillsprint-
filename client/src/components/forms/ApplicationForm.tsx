import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { submitCandidate } from '@/api/candidates'
import { trackLead } from '@/lib/analytics'
import { normalizePhone, validateCandidate } from '@/lib/validateCandidate'
import { EXTERNAL, ROUTES } from '@/config/site'
import type { CandidateFormValues, FieldErrors } from '@/types/candidate'
import { Recaptcha } from './Recaptcha'
import styles from './ApplicationForm.module.css'

const EMPTY: CandidateFormValues = {
  firstName: '',
  lastName: '',
  middleName: '',
  phoneNumber: '',
  email: '',
  age: '',
  location: '',
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

type Props = {
  onSuccess?: () => void
}

export function ApplicationForm({ onSuccess }: Props) {
  const formId = useId()
  const [values, setValues] = useState<CandidateFormValues>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  // Інкремент скидає чекбокс: токен одноразовий і згорає після перевірки
  const [captchaReset, setCaptchaReset] = useState(0)
  const [consent, setConsent] = useState(false)

  const setField = (field: keyof CandidateFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Прибираємо помилку поля щойно користувач почав його виправляти
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const validationErrors = validateCandidate(values)
    if (!consent) {
      validationErrors.consent = 'Потрібна згода на обробку персональних даних'
    }
    if (!captchaToken) {
      validationErrors.recaptchaToken = 'Підтвердіть, що ви не робот'
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus('idle')
      return
    }

    setStatus('submitting')
    setServerMessage('')

    const result = await submitCandidate({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      ...(values.middleName.trim() ? { middleName: values.middleName.trim() } : {}),
      phoneNumber: normalizePhone(values.phoneNumber),
      email: values.email.trim(),
      age: Number(values.age),
      location: values.location.trim(),
      recaptchaToken: captchaToken!,
    })

    // Токен одноразовий — після будь-якого результату чекбокс скидається
    setCaptchaToken(null)
    setCaptchaReset((n) => n + 1)

    if (result.ok) {
      setStatus('success')
      setValues(EMPTY)
      setConsent(false)
      trackLead(window.location.pathname)
      onSuccess?.()
      return
    }

    setStatus('error')
    setServerMessage(result.message)
    if (result.fieldErrors) {
      setErrors(result.fieldErrors as FieldErrors)
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <div className={styles.successIcon} aria-hidden="true">
          ✓
        </div>
        <h3 className={styles.successTitle}>Заявку надіслано!</h3>
        <p className={styles.successText}>
          Наш менеджер зв’яжеться з вами найближчим часом. Якщо хочете пришвидшити —
          напишіть нам у{' '}
          <a href={EXTERNAL.telegramBot} target="_blank" rel="noreferrer">
            Telegram
          </a>
          .
        </p>
        <button
          type="button"
          className={styles.resetButton}
          onClick={() => setStatus('idle')}
        >
          Надіслати ще одну заявку
        </button>
      </div>
    )
  }

  const field = (
    name: keyof CandidateFormValues,
    label: string,
    options: {
      type?: string
      placeholder?: string
      required?: boolean
      inputMode?: 'text' | 'numeric' | 'tel' | 'email'
      autoComplete?: string
    } = {},
  ) => {
    const id = `${formId}-${name}`
    const errorId = `${id}-error`
    const error = errors[name]

    return (
      <div className={styles.field}>
        <label htmlFor={id} className={styles.label}>
          {label}
          {options.required !== false && <span aria-hidden="true"> *</span>}
        </label>
        <input
          id={id}
          name={name}
          type={options.type ?? 'text'}
          value={values[name]}
          placeholder={options.placeholder}
          inputMode={options.inputMode}
          autoComplete={options.autoComplete}
          className={[styles.input, error ? styles.inputError : '']
            .filter(Boolean)
            .join(' ')}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => setField(name, e.target.value)}
          disabled={status === 'submitting'}
        />
        {error && (
          <span id={errorId} className={styles.error}>
            {error}
          </span>
        )}
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <p className={styles.intro}>
        Залиште контакти — менеджер зв’яжеться з вами і розкаже деталі запуску
        найближчої групи.
      </p>

      {/* Плейсхолдери — один узгоджений приклад, щоб форма читалась цілісно */}
      <div className={styles.row}>
        {field('lastName', 'Прізвище', {
          placeholder: 'Петренко',
          autoComplete: 'family-name',
        })}
        {field('firstName', "Ім'я", {
          placeholder: 'Іван',
          autoComplete: 'given-name',
        })}
      </div>

      {field('middleName', 'По батькові', {
        required: false,
        placeholder: 'Олегович',
        autoComplete: 'additional-name',
      })}

      <div className={styles.row}>
        {field('phoneNumber', 'Телефон', {
          type: 'tel',
          inputMode: 'tel',
          placeholder: '380670000000',
          autoComplete: 'tel',
        })}
        {field('age', 'Вік', { inputMode: 'numeric', placeholder: '18' })}
      </div>

      {field('email', 'Email', {
        type: 'email',
        inputMode: 'email',
        placeholder: 'ivan.petrenko@example.com',
        autoComplete: 'email',
      })}

      {field('location', 'Місто', {
        placeholder: 'Львів',
        autoComplete: 'address-level2',
      })}

      <div className={styles.consentBox}>
        <label className={styles.consentLabel}>
          <input
            type="checkbox"
            className={styles.consentInput}
            checked={consent}
            disabled={status === 'submitting'}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
            onChange={(e) => {
              setConsent(e.target.checked)
              if (e.target.checked) {
                setErrors((prev) => {
                  if (!prev.consent) return prev
                  const next = { ...prev }
                  delete next.consent
                  return next
                })
              }
            }}
          />
          <span>
            Я погоджуюся на обробку персональних даних згідно з{' '}
            <Link to={ROUTES.privacy} target="_blank">
              політикою конфіденційності
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <span id={`${formId}-consent-error`} className={styles.error}>
            {errors.consent}
          </span>
        )}
      </div>

      <div className={styles.captcha}>
        <Recaptcha
          onChange={(token) => {
            setCaptchaToken(token)
            if (token) {
              setErrors((prev) => {
                if (!prev.recaptchaToken) return prev
                const next = { ...prev }
                delete next.recaptchaToken
                return next
              })
            }
          }}
          resetSignal={captchaReset}
        />
        {errors.recaptchaToken && (
          <span className={styles.error}>{errors.recaptchaToken}</span>
        )}
      </div>

      {status === 'error' && serverMessage && (
        <p className={styles.formError} role="alert">
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        className={styles.submit}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Надсилаємо…' : 'Надіслати заявку'}
      </button>
    </form>
  )
}
