import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** SPA не скидає скрол при зміні маршруту — робимо це вручну. */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return null
}
