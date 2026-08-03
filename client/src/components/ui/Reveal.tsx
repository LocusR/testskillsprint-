import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'

type Variant = 'mask' | 'fade' | 'rise'

type Props = {
  children: ReactNode
  /**
   * mask — текст виїжджає з-під маски (як заголовки на bes.in.ua);
   * fade — просто проявляється (зображення, панелі);
   * rise — підіймається без обрізки, для блоків із тінню.
   */
  variant?: Variant
  /** Крок затримки: 1 = 0.1s, 2 = 0.2s… */
  delay?: number
  as?: ElementType
  className?: string
}

export function Reveal({
  children,
  variant = 'rise',
  delay = 0,
  as: Tag = 'div',
  className,
}: Props) {
  const { ref, revealProps } = useReveal<HTMLElement>()

  return (
    <Tag
      ref={ref}
      className={[`reveal-${variant}`, className].filter(Boolean).join(' ')}
      style={
        delay
          ? ({ '--reveal-delay': `${delay * 0.1}s` } as CSSProperties)
          : undefined
      }
      {...revealProps}
    >
      {children}
    </Tag>
  )
}
