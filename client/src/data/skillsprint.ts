import type { FaqItem } from '@/components/ui/Accordion'
import { asset } from '@/lib/asset'

/** Кольорові теми карток — відповідають фонам живого bes.in.ua/skillsprint. */
export type CardTone = 'teal' | 'petrol' | 'dark' | 'orange' | 'white'

export type IconCard = {
  img: string
  text: string
  tone: CardTone
  /** stack — іконка зверху; row — іконка ліворуч (за замовчуванням). */
  layout?: 'stack' | 'row'
}

export type Feature = {
  img: string
  title: string
  text: string
}

export type CourseModule = {
  title: string
  week: string
  text: string
  img: string
  tone: Extract<CardTone, 'white' | 'petrol'>
}

export type Mentor = {
  img: string
  name: string
  role: string
}

export type Story = {
  img: string
  name: string
  role: string
}

export type Metric = {
  value: string
  label: string
  tone?: Extract<CardTone, 'dark' | 'white' | 'orange'> | 'light'
}

export type SalaryTier = {
  experience: string
  amount: string
  text: string
  img: string
  tone: Extract<CardTone, 'teal' | 'orange'> | 'light'
}

/**
 * «Хто такий BIM спеціаліст?»
 * На живому сайті всі три картки однакові — петроль #196c7e, іконка зверху.
 */
export const BIM_CARDS: IconCard[] = [
  {
    img: asset('/assets/ss/bim-1.png'),
    text: 'Працює в Autodesk Revit, Navisworks та інших програмах',
    tone: 'petrol',
    layout: 'stack',
  },
  {
    img: asset('/assets/ss/bim-2.png'),
    text: 'Моделює інженерні мережі',
    tone: 'petrol',
    layout: 'stack',
  },
  {
    img: asset('/assets/ss/bim-3.png'),
    text: 'Розробляє проєкти на замовлення клієнтів із США',
    tone: 'petrol',
    layout: 'stack',
  },
]

/** «Кому підійде курс» */
export const AUDIENCE_CARDS: IconCard[] = [
  {
    img: asset('/assets/ss/aud-1.png'),
    text: 'Студентам, які хочуть знайти перспективну професію',
    tone: 'teal',
  },
  {
    img: asset('/assets/ss/aud-2.png'),
    text: 'Тим, хто мріє працювати віддалено та отримувати стабільний дохід',
    tone: 'orange',
  },
  {
    img: asset('/assets/ss/aud-3.png'),
    text: 'Людям, які шукають новий напрямок у кар’єрі з можливістю зростання',
    tone: 'dark',
  },
]

/** «Що на тебе чекає?» */
export const FEATURES: Feature[] = [
  {
    img: asset('/assets/ss/f-1.png'),
    title: 'Онлайн навчання',
    text: 'Навчання у зручному форматі: відеоуроки, практичні завдання в Revit і підтримка менторів у чаті на кожному етапі',
  },
  {
    img: asset('/assets/ss/f-2.png'),
    title: 'Гнучкий графік',
    text: 'Проходь навчання у зручному часі — плануй свій графік самостійно. Всі уроки, завдання та матеріали доступні онлайн',
  },
  {
    img: asset('/assets/ss/f-3.png'),
    title: 'Допомога ментора',
    text: 'Наші ментори завжди поруч. Отримуй фідбек, відповіді на запитання та підтримку, коли вона тобі потрібна',
  },
  {
    img: asset('/assets/ss/f-4.png'),
    title: 'Оплата за здані модулі',
    text: 'Час, витрачений студентами на навчання оплачується після кожного успішного завершення модуля',
  },
  {
    img: asset('/assets/ss/f-5.png'),
    title: 'Стажування',
    text: 'Після вдалого завершення курсу на тебе чекає двотижневе стажування в топовій компанії BES',
  },
  {
    img: asset('/assets/ss/f-6.png'),
    title: 'Працевлаштування',
    text: 'Після проходження стажування ти отримуєш реальний офер на позицію BIM-спеціаліста та приєднаєшся до команди професіоналів',
  },
]

/** «Програма курсу» — на живому сайті модулі 1 і 3 виділені петролем. */
export const COURSE_MODULES: CourseModule[] = [
  {
    title: 'Модуль 0:',
    week: 'Тиждень 1',
    text: 'Ознайомлення з інтерфейсом та базові налаштування',
    img: asset('/assets/ss/m-0.png'),
    tone: 'white',
  },
  {
    title: 'Модуль 1:',
    week: 'Тиждень 1',
    text: 'Робота з налаштуваннями і деталізацією моделі',
    img: asset('/assets/ss/m-1.png'),
    tone: 'petrol',
  },
  {
    title: 'Модуль 2:',
    week: 'Тиждень 2',
    text: 'Робота з налаштуваннями і деталізацією моделі',
    img: asset('/assets/ss/m-2.png'),
    tone: 'white',
  },
  {
    title: 'Модуль 3:',
    week: 'Тиждень 3',
    text: 'Узгодження і робота з суміжними дисциплінами',
    img: asset('/assets/ss/m-3.png'),
    tone: 'petrol',
  },
  {
    title: 'Модуль 4:',
    week: 'Тиждень 4',
    text: 'Оформлення документації проекту',
    img: asset('/assets/ss/m-4.png'),
    tone: 'white',
  },
]

export const MENTORS: Mentor[] = [
  { img: asset('/assets/ss/mentor-1.png'), name: 'Валерій Дунда', role: 'BIM Engineer' },
  { img: asset('/assets/ss/mentor-2.png'), name: 'Роман Коломоєць', role: 'BIM Specialist' },
  { img: asset('/assets/ss/mentor-3.png'), name: 'Мирослав Періг', role: 'Team Lead' },
  { img: asset('/assets/ss/mentor-4.png'), name: 'Софія Ерліх', role: 'Team Lead' },
]

export const STORIES: Story[] = [
  { img: asset('/assets/ss/story-1.png'), name: 'Валід Маді', role: 'BIM-Спеціаліст' },
  { img: asset('/assets/ss/story-2.png'), name: 'Марія Гоц', role: 'BIM-Спеціалістка' },
  { img: asset('/assets/ss/story-3.png'), name: 'Катерина Голуб', role: 'BIM-Спеціалістка' },
  { img: asset('/assets/ss/story-4.png'), name: 'Юрій Затолочний', role: 'BIM-Спеціаліст' },
]

export const METRICS: Metric[] = [
  { value: '1000+', label: 'BIM - Інженерів в команді', tone: 'dark' },
  { value: '300+', label: 'завершених проєктів', tone: 'white' },
  { value: '130+', label: 'активних проєктів', tone: 'orange' },
  { value: '50+', label: 'клієнтів із США', tone: 'light' },
]

export const SALARY_TIERS: SalaryTier[] = [
  {
    experience: 'досвід 0+',
    amount: '~ $ 600',
    text: 'Це ти після SkillSprint. Володієш базовими знаннями з Revit і BIM та готовий(-а) братись за перші реальні задачі з підтримкою ментора в команді BES.',
    img: asset('/assets/ss/pay-1.png'),
    tone: 'teal',
  },
  {
    experience: 'досвід 6 міс+',
    amount: '~ $ 800',
    text: 'Ти впевнено працюєш у Revit, створюєш креслення, розумієш логіку BIM і береш на себе складніші проєкти та більше обов’язків.',
    img: asset('/assets/ss/pay-2.png'),
    tone: 'light',
  },
  {
    experience: 'досвід 1 рік+',
    amount: '$ 1 000 +',
    text: 'Ти ведеш проєкти, координуєш команду, консультуєш молодших спеціалістів і впевнено працюєш з клієнтами зі США.',
    img: asset('/assets/ss/pay-3.png'),
    tone: 'orange',
  },
]

export const FAQ: FaqItem[] = [
  {
    question: 'Чи потрібен досвід в BIM?',
    answer: [
      'Ні, не потрібен.',
      'Курс SkillSprint створений спеціально для новачків — ми навчаємо всьому з нуля. Тобі не потрібно мати попередній досвід у BIM або знати Revit.',
      'Ти отримаєш чітку структуру, навчальні матеріали, практичні завдання та підтримку менторів, які допоможуть розібратися на кожному етапі.',
    ],
  },
  {
    question: 'Чи зможу я поєднувати навчання або роботу та SkillSprint?',
    answer: [
      'Так. Навчання проходить онлайн у гнучкому графіку — ти сам плануєш, коли проходити модулі.',
    ],
  },
  {
    question: 'Чи потрібна технічна освіта?',
    answer: [
      'Ні. Профільна освіта може полегшити старт, але не є обов’язковою умовою.',
    ],
  },
  {
    question: 'Як відбувається оплата за проходження курсу?',
    answer: ['Компанія оплачує твій час після кожного успішно завершеного модуля.'],
  },
  {
    question: 'Чи є вікові обмеження для цього курсу?',
    answer: [
      'Вікових обмежень немає — головне бажання вчитися та наявність відповідної техніки.',
    ],
  },
  {
    question: 'Які характеристики техніки потрібні для проходження курсу?',
    answer: [
      'Потрібен комп’ютер, здатний працювати з Autodesk Revit. Точні вимоги надішлемо після заявки.',
    ],
  },
  {
    question: 'Як зрозуміти чи підходить моя техніка для програм?',
    answer: ['Надішли характеристики свого ПК менеджеру — ми перевіримо та підкажемо.'],
  },
  {
    question: 'Чому ви платите студентам за проходження курсу?',
    answer: [
      'Ми цінуємо твій час і зусилля — навіть на етапі навчання, адже готуємо майбутніх колег.',
    ],
  },
  {
    question: 'Чому ви активно набираєте людей на навчання?',
    answer: [
      'Кількість міжнародних проєктів BES зростає, тому команді постійно потрібні нові BIM-спеціалісти.',
    ],
  },
]
