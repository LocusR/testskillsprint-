import type { IconCard as IconCardData } from '@/data/skillsprint'
import styles from './IconCard.module.css'

/**
 * Картка «зображення + текст».
 * stack — іконка в білій плитці зверху, текст під нею («Хто такий BIM спеціаліст»);
 * row — іконка ліворуч від тексту («Кому підійде курс»).
 */
export function IconCard({ img, text, tone, layout = 'row' }: IconCardData) {
  return (
    <div
      className={[styles.card, styles[tone], styles[layout], 'hover-lift'].join(' ')}
    >
      <span className={`${styles.imgWrap} hover-zoom`}>
        <img src={img} alt="" loading="lazy" className={styles.img} />
      </span>
      <span className={styles.text}>{text}</span>
    </div>
  )
}
