import type { ElementType, ReactNode } from 'react'
import styles from './Container.module.css'

type Size = 'default' | 'wide' | 'hero' | 'article'

type Props = {
  children: ReactNode
  /** Відповідає різним ширинам контейнерів у прототипі. */
  size?: Size
  as?: ElementType
  className?: string
}

export function Container({
  children,
  size = 'default',
  as: Tag = 'div',
  className,
}: Props) {
  return (
    <Tag className={[styles[size], className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}
