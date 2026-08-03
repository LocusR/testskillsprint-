import { Panel } from '@/components/layout/Panel'
import { CardGrid } from '@/components/ui/CardGrid'
import { Pill } from '@/components/ui/Pill'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MENTORS } from '@/data/skillsprint'
import styles from './Mentors.module.css'

export function Mentors() {
  return (
    <Panel tone="white">
      <Pill>ментори</Pill>
      <div className={styles.head}>
        <SectionHeading>Викладачі курсу</SectionHeading>
        <p className={styles.subtitle}>
          Твої ментори — досвідчені інженери компанії BES.
        </p>
      </div>

      <CardGrid cols={4}>
        {MENTORS.map((mentor) => (
          <article key={mentor.name} className={`${styles.card} hover-lift`}>
            <span className={`${styles.photoWrap} hover-zoom`}>
              <img
                src={mentor.img}
                alt={mentor.name}
                loading="lazy"
                className={styles.photo}
              />
            </span>
            <h3 className={styles.name}>{mentor.name}</h3>
            <p className={styles.role}>{mentor.role}</p>
          </article>
        ))}
      </CardGrid>
    </Panel>
  )
}
