import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './Button.module.css'

type Variant =
  | 'accent'
  | 'gradient'
  | 'gradientOrange'
  | 'orange'
  | 'dark'
  | 'teal'
type Width = 'wide' | 'full' | 'auto'
type Radius = 'md' | 'lg'

type CommonProps = {
  children: ReactNode
  variant?: Variant
  width?: Width
  radius?: Radius
  className?: string
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: never
    to?: never
  }

type ExternalLinkProps = CommonProps & {
  /** Зовнішнє посилання — <a target="_blank">. */
  href: string
  to?: never
}

type InternalLinkProps = CommonProps & {
  /** Внутрішній маршрут — <Link> без перезавантаження сторінки. */
  to: string
  href?: never
}

type Props = ButtonProps | ExternalLinkProps | InternalLinkProps

export function Button(props: Props) {
  const { children, variant = 'accent', width, radius = 'md', className } = props

  const cls = [
    styles.base,
    styles[variant],
    radius === 'lg' ? styles.radiusLg : styles.radiusMd,
    width ? styles[width] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  if ('to' in props && props.to) {
    const { to } = props
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    const { href } = props
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  const {
    children: _children,
    variant: _variant,
    width: _width,
    radius: _radius,
    className: _className,
    ...rest
  } = props as ButtonProps

  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
