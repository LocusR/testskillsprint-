import { useEffect, useRef, useState } from 'react'

type Options = {
  /** Частка елемента у вьюпорті, після якої запускається анімація. */
  threshold?: number
  /** Зсув нижньої межі — щоб анімація стартувала трохи раніше за появу. */
  rootMargin?: string
  /** Анімувати щоразу при поверненні у вьюпорт (за замовчуванням — один раз). */
  repeat?: boolean
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Ставить на елемент data-reveal="out" → "in", коли той потрапляє у вьюпорт.
 * CSS у styles/animations.css підхоплює атрибут і програє анімацію.
 *
 * Для сіток вішається на контейнер разом із класом .reveal-stagger —
 * тоді нащадки анімуються по черзі без окремих рефів.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  // threshold 0 + відʼємний нижній rootMargin: спрацьовує, щойно верхня межа
  // елемента перетне ~88% висоти вьюпорта. Частка тут не годиться — блок,
  // вищий за екран, ніколи не набрав би потрібного відсотка видимості.
  threshold = 0,
  rootMargin = '0px 0px -12% 0px',
  repeat = false,
}: Options = {}) {
  const ref = useRef<T>(null)
  const [state, setState] = useState<'out' | 'in'>('out')

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Без анімацій показуємо одразу і не витрачаємо спостерігач
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setState('in')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState('in')
            if (!repeat) observer.disconnect()
          } else if (repeat) {
            setState('out')
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, repeat])

  return { ref, revealProps: { 'data-reveal': state } }
}
