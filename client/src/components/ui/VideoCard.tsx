import { PlayIcon } from '@/components/icons'
import styles from './VideoCard.module.css'

type Props = {
  src: string
  alt: string
  /** Посилання на відео. Без нього рендериться просто як прев'ю. */
  href?: string
  radius?: 'md' | 'card'
  /** Прев'ю тягнеться на всю висоту клітинки сітки (object-fit: cover). */
  fill?: boolean
  playSize?: number
}

export function VideoCard({
  src,
  alt,
  href,
  radius = 'card',
  fill = false,
  playSize = 60,
}: Props) {
  const inner = (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={fill ? styles.imgFill : styles.img}
      />
      <span className={styles.overlay}>
        <PlayIcon size={playSize} className={styles.play} />
      </span>
    </>
  )

  const className = [
    styles.wrap,
    radius === 'md' ? styles.radiusMd : styles.radiusCard,
    fill ? styles.fill : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {inner}
        <span className="visually-hidden">Дивитись відео: {alt}</span>
      </a>
    )
  }

  return <div className={className}>{inner}</div>
}
