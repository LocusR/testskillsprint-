import type { ReactNode } from 'react'
import styles from './Panel.module.css'

type Props = {
  children: ReactNode
  /** Колір заливки скругленої панелі. */
  tone: 'white' | 'teal'
  /** full — панель на всю ширину екрана, inner-контейнер усередині. */
  bleed?: boolean
  className?: string
  id?: string
}

/** Скруглена секція-панель (border-radius 38px) — базовий блок обох лендінгів. */
export function Panel({ children, tone, bleed = false, className, id }: Props) {
  return (
    <section
      id={id}
      className={[
        styles.panel,
        styles[tone],
        bleed ? styles.bleed : styles.contained,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </section>
  )
}
