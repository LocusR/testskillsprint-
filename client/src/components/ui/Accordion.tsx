import { useId, useState } from 'react'
import { ChevronIcon } from '@/components/icons'
import styles from './Accordion.module.css'

export type FaqItem = {
  question: string
  /** Абзаци відповіді. У прототипі вони були розділені <br />. */
  answer: string[]
}

type Props = {
  items: FaqItem[]
  /** Індекс питання, відкритого при завантаженні (у прототипі — перше). */
  defaultOpenIndex?: number
}

/**
 * Контрольований акордеон замість нативного <details>: React перезаписує
 * атрибут `open` при ре-рендері, тож стан тримаємо в компоненті.
 * Кілька питань можуть бути відкриті одночасно — як у прототипі.
 */
export function Accordion({ items, defaultOpenIndex = 0 }: Props) {
  const baseId = useId()
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    () => new Set(defaultOpenIndex >= 0 ? [defaultOpenIndex] : []),
  )

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const isOpen = openIndexes.has(i)
        const panelId = `${baseId}-panel-${i}`
        const buttonId = `${baseId}-button-${i}`

        return (
          <div key={item.question} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={buttonId}
                className={styles.summary}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span>{item.question}</span>
                <span
                  className={[styles.chevron, isOpen ? '' : styles.closed]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <ChevronIcon size={12} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.answer}
              hidden={!isOpen}
            >
              {item.answer.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
