import { Container } from '@/components/layout/Container'
import { Panel } from '@/components/layout/Panel'
import { CardGrid } from '@/components/ui/CardGrid'
import { IconCard } from '@/components/ui/IconCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AUDIENCE_CARDS, BIM_CARDS } from '@/data/skillsprint'
import styles from './WhoIsBim.module.css'

export function WhoIsBim() {
  return (
    <Panel tone="white" bleed>
      <Container>
        <div className={styles.intro}>
          <SectionHeading>Хто такий BIM спеціаліст?</SectionHeading>
          <Reveal variant="mask" delay={1} as="p" className={styles.introText}>
            BIM-спеціаліст у BES — це фахівець, який проєктує та координує цифрові
            3D-моделі електричних та слабкострумних систем.
          </Reveal>
        </div>

        <CardGrid cols={3} className={styles.cards}>
          {BIM_CARDS.map((card) => (
            <IconCard key={card.text} {...card} />
          ))}
        </CardGrid>

        <SectionHeading className={styles.secondTitle}>
          Кому підійде курс
        </SectionHeading>

        <CardGrid cols={3}>
          {AUDIENCE_CARDS.map((card) => (
            <IconCard key={card.text} {...card} />
          ))}
        </CardGrid>
      </Container>
    </Panel>
  )
}
