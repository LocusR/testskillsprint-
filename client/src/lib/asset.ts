/**
 * Шлях до файлу з public/ з урахуванням базового шляху збірки.
 *
 * Навіщо: на GitHub Pages без власного домену сайт лежить у підпапці
 * (locusr.github.io/testskillsprint-/). Абсолютний '/assets/hero.png'
 * браузер шукав би в корені домену і не знаходив — сторінка відкривалась
 * би без жодної картинки.
 *
 * Vite підставляє base у BASE_URL на етапі збірки: '/' для кореня домену
 * або '/testskillsprint-/' для Pages. Сам він переписує лише те, що
 * імпортовано через JS, а наші шляхи лежать у рядках — тому хелпер.
 */
const BASE = import.meta.env.BASE_URL

export function asset(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return BASE.replace(/\/$/, '') + clean
}
