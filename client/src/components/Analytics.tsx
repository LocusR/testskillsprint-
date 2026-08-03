import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, trackPageView } from '@/lib/analytics'

/**
 * Піднімає GA4 і відправляє перегляд на кожній зміні маршруту.
 * Без VITE_GA_MEASUREMENT_ID нічого не робить.
 */
export function Analytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    // Затримка на кадр — щоб usePageMeta встиг оновити document.title
    const id = setTimeout(() => trackPageView(pathname + search), 0)
    return () => clearTimeout(id)
  }, [pathname, search])

  return null
}
