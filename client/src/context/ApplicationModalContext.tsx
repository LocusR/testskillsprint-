import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type ApplicationModalValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ApplicationModalContext = createContext<ApplicationModalValue | null>(null)

/**
 * Тримає стан модалки заявки глобально, щоб будь-яка CTA-кнопка
 * на будь-якій сторінці могла її відкрити.
 */
export function ApplicationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

  return (
    <ApplicationModalContext.Provider value={value}>
      {children}
    </ApplicationModalContext.Provider>
  )
}

export function useApplicationModal() {
  const context = useContext(ApplicationModalContext)
  if (!context) {
    throw new Error(
      'useApplicationModal має викликатись усередині <ApplicationModalProvider>',
    )
  }
  return context
}
