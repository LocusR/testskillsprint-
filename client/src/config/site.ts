/** Маршрути, зовнішні посилання та навігація — одне джерело для хедера й футера. */

export const ROUTES = {
  skillSprint: '/',
  bes: '/bes',
  blog: '/blog',
  article: (slug: string) => `/blog/${slug}`,
  privacy: '/privacy-policy',
} as const

export const EXTERNAL = {
  telegramBot: 'https://t.me/b_eng_s_bot',
  careers: 'https://bengs.peopleforce.io/careers',
  linkedin: 'https://www.linkedin.com/company/b-eng-s',
  instagram: 'https://www.instagram.com/bes.bim.vdc/',
  instagramTeam: 'https://www.instagram.com/bes.team.bim',
  site: 'https://www.bes.in.ua',
  /* Політика конфіденційності тепер живе на нашій сторінці — ROUTES.privacy. */
} as const

export type NavLink =
  | { label: string; to: string }
  | { label: string; href: string }
  /** Відкриває модалку заявки замість переходу за посиланням. */
  | { label: string; action: 'apply' }

export const NAV_LINKS: NavLink[] = [
  { label: 'SkillSprint', to: ROUTES.skillSprint },
  { label: 'BES', to: ROUTES.bes },
  { label: 'Заявка на навчання', action: 'apply' },
  { label: 'Відкриті вакансії', href: EXTERNAL.careers },
  { label: 'Блог', to: ROUTES.blog },
]

/** У футері прототипу «Блог» відсутній. */
export const FOOTER_LINKS: NavLink[] = NAV_LINKS.filter(
  (link) => link.label !== 'Блог',
)
