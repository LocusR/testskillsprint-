import { Layout } from '@/components/layout/Layout'
import { usePageMeta } from '@/hooks/usePageMeta'
import { ROUTES } from '@/config/site'
import { PRIVACY_SECTIONS, PRIVACY_UPDATED, type PrivacyBlock } from '@/data/privacy'
import styles from './Privacy.module.css'

function renderBlock(block: PrivacyBlock, index: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} className={styles.paragraph}>
          {block.text}
        </p>
      )
    case 'list':
      return (
        <ul key={index} className={styles.list}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'email':
      return (
        <p key={index} className={styles.paragraph}>
          {block.label}:{' '}
          <a href={`mailto:${block.address}`} className={styles.link}>
            {block.address}
          </a>
        </p>
      )
  }
}

export default function PrivacyPage() {
  usePageMeta({
    title: 'Політика конфіденційності | SkillSprint · BES',
    description:
      'Як SkillSprint і BES збирають, використовують та захищають персональні дані користувачів сайту.',
  })

  return (
    <Layout headerLogo="bes" headerLogoHref={ROUTES.skillSprint}>
      <div className={styles.wrap}>
        <article className={styles.article}>
          <h1 className={styles.title}>Політика конфіденційності</h1>
          <p className={styles.updated}>Оновлено: {PRIVACY_UPDATED}</p>

          {PRIVACY_SECTIONS.map((section, i) => (
            <section key={section.heading ?? `intro-${i}`} className={styles.section}>
              {section.heading && <h2 className={styles.heading}>{section.heading}</h2>}
              {section.blocks.map(renderBlock)}
            </section>
          ))}
        </article>
      </div>
    </Layout>
  )
}
