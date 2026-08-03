import { Container } from '@/components/layout/Container'
import { CardGrid } from '@/components/ui/CardGrid'
import { Pill } from '@/components/ui/Pill'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { VideoCard } from '@/components/ui/VideoCard'
import { STORIES } from '@/data/skillsprint'
import styles from './Stories.module.css'

export function Stories() {
  return (
    <section className={styles.section}>
      <Container>
        <Pill>відгуки</Pill>
        <div className={styles.head}>
          <SectionHeading>Історії успіху</SectionHeading>
          <p className={styles.subtitle}>
            Ти ще не з нами і вагаєшся?
            <br />
            Скоріше тицяй кнопку.
          </p>
        </div>

        <CardGrid cols={4}>
          {STORIES.map((story) => (
            <article key={story.name} className={styles.story}>
              <VideoCard src={story.img} alt={story.name} playSize={48} />
              {/* Підпис живе в окремій білій картці під відео */}
              <div className={`${styles.caption} hover-lift`}>
                <h3 className={styles.name}>{story.name}</h3>
                <p className={styles.role}>{story.role}</p>
              </div>
            </article>
          ))}
        </CardGrid>
      </Container>
    </section>
  )
}
