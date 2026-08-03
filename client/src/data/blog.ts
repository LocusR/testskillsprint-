import fm from 'front-matter'
import { Marked } from 'marked'

/**
 * Блог на Markdown-файлах.
 *
 * Статті лежать у client/src/content/blog/*.md. Vite забирає їх сировиною
 * на етапі збірки через import.meta.glob — жодного рантайм-запиту, бази
 * чи адмінки. Нова стаття = новий файл.
 *
 * Slug береться з імені файлу: hto-takyi-bim-specialist.md → /blog/hto-takyi-bim-specialist
 */

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  cover: string
  author: string
  authorAvatar: string
  /** ISO-дата з frontmatter. */
  publishedAt: string
  updatedAt?: string
  readingTime: string
  tags: string[]
  /** Готовий HTML тіла статті. */
  html: string
}

type Frontmatter = {
  title?: string
  excerpt?: string
  cover?: string
  author?: string
  authorAvatar?: string
  publishedAt?: string | Date
  updatedAt?: string | Date
  readingTime?: string
  tags?: string[]
  draft?: boolean
}

/**
 * Зображення з title="video" рендериться як прев'ю з кнопкою відтворення:
 *   ![Опис](/assets/art-video.jpg "video")
 * Звичайні зображення лишаються звичайними.
 */
const marked = new Marked({
  gfm: true,
  breaks: false,
  renderer: {
    image({ href, title, text }) {
      const alt = text ?? ''
      if (title === 'video') {
        return `<figure class="md-video"><img src="${href}" alt="${alt}" loading="lazy" /><span class="md-video-play" aria-hidden="true"></span></figure>`
      }
      return `<img src="${href}" alt="${alt}" loading="lazy" />`
    },
  },
})

function toISODate(value: string | Date | undefined): string {
  if (!value) return ''
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value).slice(0, 10)
}

const files = import.meta.glob<string>('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parse(path: string, raw: string): BlogPost | null {
  const { attributes, body } = fm<Frontmatter>(raw)

  if (attributes.draft) return null

  const slug = path.split('/').pop()!.replace(/\.md$/, '')

  return {
    slug,
    title: attributes.title ?? slug,
    excerpt: attributes.excerpt ?? '',
    cover: attributes.cover ?? '',
    author: attributes.author ?? 'BES',
    authorAvatar: attributes.authorAvatar ?? '/assets/avatar.png',
    publishedAt: toISODate(attributes.publishedAt),
    ...(attributes.updatedAt ? { updatedAt: toISODate(attributes.updatedAt) } : {}),
    readingTime: attributes.readingTime ?? '',
    tags: attributes.tags ?? [],
    html: marked.parse(body) as string,
  }
}

/** Опубліковані статті, найновіші зверху. */
export const POSTS: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .filter((post): post is BlogPost => post !== null)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug)
}

/** Дата у вигляді «15 липня 2026». */
export function formatDate(iso: string): string {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
