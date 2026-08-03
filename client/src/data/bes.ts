export type Benefit = {
  img: string
  /** Рядки — переноси з прототипу (<br />). */
  lines: string[]
}

/** Власний тип: палітра метрик лендінгу BES відрізняється від SkillSprint. */
export type AboutMetric = {
  value: string
  label: string
  tone: 'dark' | 'teal' | 'orange'
}

export const ABOUT_METRICS: AboutMetric[] = [
  { value: '1000+', label: 'BIM - інженерів', tone: 'dark' },
  { value: '300+', label: 'проєктів', tone: 'teal' },
  { value: '50+', label: 'клієнтів', tone: 'orange' },
]

export const BENEFITS: Benefit[] = [
  { img: '/assets/benefit-1.png', lines: ['Віддалена робота або', 'робота в офісі'] },
  { img: '/assets/benefit-2.png', lines: ['Повне технічне', 'забезпечення'] },
  { img: '/assets/benefit-3.png', lines: ['Оплачувана відпустка', 'та лікарняні'] },
  { img: '/assets/benefit-4.png', lines: ['Приємні та корисні', 'подарунки на свята'] },
  { img: '/assets/benefit-5.png', lines: ['Компенсація на', 'дозвілля'] },
  { img: '/assets/benefit-6.png', lines: ['Бонуси за підвищення', 'рівня англійської'] },
]

/** Фрагмент тексту: рядок — звичайний, { b } — жирний акцент. */
export type RichSegment = string | { b: string }

/** Слайди каруселі «Наша команда». */
export const TEAM_SLIDES: { img: string; alt: string }[] = [
  { img: '/assets/team-1.png', alt: 'Команда BES в офісі' },
  { img: '/assets/team-2.png', alt: 'Команда BES на зустрічі' },
  { img: '/assets/team-3.png', alt: 'Команда BES на заході' },
]

export const TEAM_TEXT: RichSegment[][] = [
  [
    'У ',
    { b: 'BES' },
    ' ми віримо, що справжня сила компанії — ',
    { b: 'це люди, які їх створюють.' },
    ' Саме тому ми будуємо культуру, де кожен фахівець може проявити себе, впливати на результат і рости разом із командою.',
  ],
  [
    'Ми прагнемо створювати ',
    { b: 'середовище,' },
    ' де таланти розкриваються, а професіоналізм поєднується з людяністю та відповідальністю.',
  ],
]

export const ABOUT_TEXT: string[] = [
  'Серед клієнтів провідні світові бренди BES спеціалізується на проєктуванні електричних систем для промислових об’єктів, медичних та освітніх закладів тощо.',
  'Ми спеціалізуємося на BIM-проєктуванні електричних систем та створюємо інформаційні моделі для дата-центрів, заводів, медичних і навчальних закладів.',
]
