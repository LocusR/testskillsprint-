import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'
import styles from './CardGrid.module.css'

type Props = {
  children: ReactNode
  /** Кількість колонок на десктопі. Нижче брейкпоїнтів згортається автоматично. */
  cols: 2 | 3 | 4
  className?: string
  /** Вимкнути почергову появу карток. */
  animate?: boolean
}

/**
 * Сітка карток. У прототипі колонки були жорстко зафіксовані
 * (repeat(3,1fr) / repeat(4,1fr)) без жодного @media — тут вони згортаються:
 * 4 → 2 → 1, 3 → 2 → 1, 2 → 1.
 *
 * Спостерігач вішається на саму сітку, а картки анімуються по черзі
 * через :nth-child у animations.css — без обгорток навколо кожної.
 */
export function CardGrid({ children, cols, className, animate = true }: Props) {
  const { ref, revealProps } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={animate ? ref : undefined}
      className={[
        styles.grid,
        styles[`cols${cols}`],
        animate ? 'reveal-stagger' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(animate ? revealProps : {})}
    >
      {children}
    </div>
  )
}
