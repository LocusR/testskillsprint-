import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRightIcon } from '@/components/icons'
import styles from './Carousel.module.css'

type Props = {
  children: ReactNode[]
  ariaLabel: string
  /** Скільки наступного слайда визирає праворуч, у відсотках ширини контейнера. */
  peek?: number
}

/**
 * Карусель на scroll-snap: свайп пальцем і трекпадом працює нативно,
 * а стрілки просто прокручують контейнер на ширину слайда.
 */
export function Carousel({ children, ariaLabel, peek = 6 }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const syncEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    setAtStart(track.scrollLeft <= 4)
    setAtEnd(track.scrollLeft >= max - 4)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    syncEdges()
    track.addEventListener('scroll', syncEdges, { passive: true })
    window.addEventListener('resize', syncEdges)

    /*
     * Перший замір трапляється до завантаження зображень, коли scrollWidth
     * ще дорівнює clientWidth — тоді кнопка «далі» помилково вимикається.
     * ResizeObserver переміряє, щойно слайди наберуть реальну ширину.
     */
    const observer = new ResizeObserver(syncEdges)
    observer.observe(track)
    for (const slide of Array.from(track.children)) observer.observe(slide)

    return () => {
      observer.disconnect()
      track.removeEventListener('scroll', syncEdges)
      window.removeEventListener('resize', syncEdges)
    }
  }, [syncEdges, children.length])

  const scrollBySlide = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    const slide = track.firstElementChild as HTMLElement | null
    const step = slide ? slide.offsetWidth + 16 : track.clientWidth
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <div className={styles.wrap} role="region" aria-roledescription="карусель" aria-label={ariaLabel}>
      <div
        ref={trackRef}
        className={styles.track}
        style={{ '--peek': `${peek}%` } as React.CSSProperties}
        tabIndex={0}
      >
        {children.map((child, i) => (
          <div
            key={i}
            className={styles.slide}
            role="group"
            aria-roledescription="слайд"
            aria-label={`${i + 1} з ${children.length}`}
          >
            {child}
          </div>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={() => scrollBySlide(-1)}
        disabled={atStart}
        aria-label="Попередній слайд"
      >
        <ArrowRightIcon size={12} />
      </button>

      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        onClick={() => scrollBySlide(1)}
        disabled={atEnd}
        aria-label="Наступний слайд"
      >
        <ArrowRightIcon size={12} />
      </button>
    </div>
  )
}
