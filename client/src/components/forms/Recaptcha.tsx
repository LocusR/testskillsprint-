import { useEffect, useRef, useState } from 'react'
import { loadRecaptcha, RECAPTCHA_SITE_KEY } from '@/lib/recaptcha'
import styles from './Recaptcha.module.css'

type Props = {
  /** Токен або null, коли чекбокс не пройдений / протермінувався. */
  onChange: (token: string | null) => void
  /** Змінюється ззовні, щоб скинути віджет після відправки. */
  resetSignal?: number
}

export function Recaptcha({ onChange, resetSignal = 0 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)
  const onChangeRef = useRef(onChange)
  const [failed, setFailed] = useState(false)

  // Тримаємо свіжий колбек у ref — grecaptcha.render приймає його лише раз
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return

    let cancelled = false

    loadRecaptcha()
      .then((grecaptcha) => {
        if (cancelled || !containerRef.current) return
        // Повторний render у той самий контейнер кидає помилку
        if (widgetIdRef.current !== null) return

        widgetIdRef.current = grecaptcha.render(containerRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          hl: 'uk',
          callback: (token) => onChangeRef.current(token),
          'expired-callback': () => onChangeRef.current(null),
          'error-callback': () => onChangeRef.current(null),
        })
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  // Скидання після успішної або невдалої відправки
  useEffect(() => {
    if (resetSignal === 0 || widgetIdRef.current === null) return
    window.grecaptcha?.reset(widgetIdRef.current)
    onChangeRef.current(null)
  }, [resetSignal])

  if (!RECAPTCHA_SITE_KEY) {
    return (
      <p className={styles.notice}>
        reCAPTCHA не налаштована: задайте <code>VITE_RECAPTCHA_SITE_KEY</code> у{' '}
        <code>client/.env</code>.
      </p>
    )
  }

  if (failed) {
    return (
      <p className={styles.notice}>
        Не вдалося завантажити reCAPTCHA. Перевірте зʼєднання і оновіть сторінку.
      </p>
    )
  }

  return <div ref={containerRef} className={styles.widget} />
}
