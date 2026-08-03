import type { ReactNode } from 'react'
import styles from './Pill.module.css'

type Props = {
  children: ReactNode
  /** teal — бейдж секції («про курс», «ментори»); white — бейдж досвіду в тарифах. */
  tone?: 'teal' | 'white'
  size?: 'md' | 'lg'
}

export function Pill({ children, tone = 'teal', size = 'md' }: Props) {
  return (
    <span
      className={[styles.pill, styles[tone], styles[size]].join(' ')}
    >
      {children}
    </span>
  )
}
