import { Panel } from '@/components/layout/Panel'
import { Button } from '@/components/ui/Button'
import { CardGrid } from '@/components/ui/CardGrid'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useApplicationModal } from '@/context/ApplicationModalContext'
import { FEATURES } from '@/data/skillsprint'
import styles from './Features.module.css'

export function Features() {
  const { open } = useApplicationModal()

  return (
    <Panel tone="teal">
      <SectionHeading tone="white" className={styles.title}>
        Що на тебе чекає?
      </SectionHeading>

      <CardGrid cols={3}>
        {FEATURES.map((feature, i) => (
          <article
            key={feature.title}
            /* Шахівниця темна/світла — як на живому сайті */
            className={[
              styles.card,
              i % 2 === 0 ? styles.dark : styles.light,
              'hover-lift',
            ].join(' ')}
          >
            <span className={styles.iconTile}>
              <img src={feature.img} alt="" loading="lazy" className={styles.icon} />
            </span>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardText}>{feature.text}</p>
          </article>
        ))}
      </CardGrid>

      <Button
        variant="gradientOrange"
        width="wide"
        className={styles.cta}
        onClick={open}
      >
        Хочу навчатися
      </Button>
    </Panel>
  )
}
