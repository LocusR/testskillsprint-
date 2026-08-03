import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'
import styles from './SectionHeading.module.css'

type Props = {
  children: ReactNode
  /** lg — більший масштаб із лендінгу BES (clamp до 55.5px). */
  size?: 'md' | 'lg'
  tone?: 'dark' | 'white'
  className?: string
  id?: string
  /** Вимкнути анімацію появи (наприклад, для заголовка над згорнутим блоком). */
  animate?: boolean
}

export function SectionHeading({
  children,
  size = 'md',
  tone = 'dark',
  className,
  id,
  animate = true,
}: Props) {
  const { ref, revealProps } = useReveal<HTMLHeadingElement>()

  return (
    <h2
      id={id}
      ref={animate ? ref : undefined}
      className={[
        styles.h2,
        styles[size],
        styles[tone],
        animate ? 'reveal-mask' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(animate ? revealProps : {})}
    >
      {children}
    </h2>
  )
}
