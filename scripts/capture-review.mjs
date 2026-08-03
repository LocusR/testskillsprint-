/**
 * Знімає всі сторінки сайту для ревʼю: повносторінкові PNG на заданій ширині.
 *
 *   node scripts/capture-review.mjs <тека> <desktop|mobile>
 *
 * Дев-сервер має бути запущений (npm run dev).
 *
 * Два нюанси, через які «в лоб» не працює:
 *  - reveal-анімації на IntersectionObserver: без прокрутки половина блоків
 *    лишається з opacity:0, тож перед знімком проходимо сторінку до кінця;
 *  - waitForLoadState('networkidle') не спрацьовує ніколи, бо Vite тримає
 *    відкритий HMR-websocket — чекаємо на декодування зображень напряму.
 */
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const BASE = 'http://localhost:5173'
const OUT = process.argv[2]
const PRESET = process.argv[3]

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
}

const PAGES = [
  { slug: '01-skillsprint', path: '/', name: 'SkillSprint — головна' },
  { slug: '02-bes', path: '/bes', name: 'BES — лендінг' },
  { slug: '03-blog', path: '/blog', name: 'Блог — список постів' },
  { slug: '04-article', path: '/blog/hto-takyi-bim-specialist', name: 'Блог — стаття' },
  { slug: '05-privacy', path: '/privacy-policy', name: 'Політика конфіденційності' },
]

const vp = VIEWPORTS[PRESET]
if (!vp) {
  console.error('Використання: node scripts/capture-review.mjs <тека> <desktop|mobile>')
  process.exit(1)
}

await mkdir(OUT, { recursive: true })
const log = (m) => process.stdout.write(m + '\n')

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: vp,
  // deviceScaleFactor лишаємо 1: на висоті ~8000px подвійний масштаб дає
  // знімок на 46 мегапікселів і Chromium фактично зависає
  deviceScaleFactor: 1,
  isMobile: PRESET === 'mobile',
  hasTouch: PRESET === 'mobile',
  locale: 'uk-UA',
})
const page = await context.newPage()

/**
 * Чекає на декодування зображень, але з обмеженням часу.
 *
 * Обовʼязково з таймаутом: у розмітці є loading="lazy", і зображення нижче
 * згину мають complete === false, поки до них не прокрутити. Без race()
 * Promise.all на них чекав би вічно.
 */
async function waitForImages(budgetMs = 6000) {
  await page
    .evaluate(async (budget) => {
      const pending = Array.from(document.images)
        .filter((i) => !i.complete)
        .map(
          (i) =>
            new Promise((res) => {
              i.onload = i.onerror = res
            }),
        )
      if (pending.length === 0) return
      await Promise.race([
        Promise.all(pending),
        new Promise((res) => setTimeout(res, budget)),
      ])
    }, budgetMs)
    .catch(() => {})
}

async function triggerReveals() {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6)
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 70))
    }
    window.scrollTo(0, 0)
  })
  // 0.6s анімація + до 0.7s стагер
  await page.waitForTimeout(1600)
}

const captured = []

for (const p of PAGES) {
  await page.goto(BASE + p.path, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForTimeout(400)
  // Спершу прокрутка: вона і запускає reveal, і змушує lazy-зображення
  // почати завантаження. Аж тоді має сенс на них чекати.
  await triggerReveals()
  await waitForImages()

  const file = `${OUT}/${p.slug}.png`
  await page.screenshot({ path: file, fullPage: true })
  const h = await page.evaluate(() => document.body.scrollHeight)
  captured.push({ slug: p.slug, file, name: p.name, path: p.path, height: h })
  log(`  ${p.slug.padEnd(14)} ${String(h).padStart(5)}px  ${p.name}`)
}

// --- Модалка заявки: чиста і з помилками валідації ---
await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 30000 })
await page.waitForTimeout(500)
await waitForImages()
await page
  .getByRole('button', { name: 'Забронювати місце' })
  .first()
  .click({ timeout: 15000 })
await page.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 15000 })
await page.waitForTimeout(4000) // капча домальовується

let file = `${OUT}/06-form.png`
await page.screenshot({ path: file })
captured.push({ slug: '06-form', file, name: 'Форма заявки', path: 'модалка' })
log('  06-form            —  Форма заявки')

await page.evaluate(() => document.querySelector('[role="dialog"] form')?.requestSubmit())
await page.waitForTimeout(700)
file = `${OUT}/07-form-errors.png`
await page.screenshot({ path: file })
captured.push({
  slug: '07-form-errors',
  file,
  name: 'Форма — перевірка полів',
  path: 'модалка',
})
log('  07-form-errors     —  Форма з помилками валідації')

await browser.close()

await writeFile(
  `${OUT}/manifest.json`,
  JSON.stringify({ preset: PRESET, viewport: vp, pages: captured }, null, 2),
  'utf8',
)
log(`\nГотово: ${captured.length} знімків`)
