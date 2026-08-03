import { Container } from '@/components/layout/Container'
import { Pill } from '@/components/ui/Pill'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { VideoCard } from '@/components/ui/VideoCard'
import { useReveal } from '@/hooks/useReveal'
import { COURSE_MODULES } from '@/data/skillsprint'
import styles from './Program.module.css'

export function Program() {
  const modules = useReveal<HTMLDivElement>()

  return (
    <section className={styles.section}>
      <Container>
        <Pill>про курс</Pill>
        <SectionHeading className={styles.title}>Програма курсу</SectionHeading>

        <div
          ref={modules.ref}
          className={`${styles.modules} reveal-stagger`}
          {...modules.revealProps}
        >
          {COURSE_MODULES.map((module) => (
            <article
              key={module.title}
              className={[styles.card, styles[module.tone], 'hover-lift'].join(' ')}
            >
              <div className={styles.cardText}>
                <div className={styles.moduleTitle}>{module.title}</div>
                <div className={styles.week}>{module.week}</div>
                <p className={styles.moduleText}>{module.text}</p>
              </div>
              <img src={module.img} alt="" loading="lazy" className={styles.img} />
            </article>
          ))}
        </div>

        <SectionHeading className={styles.secondTitle}>
          Що ти зможеш створювати
          <br />
          після проходження{' '}
          <span className={styles.brand}>SkillSprint</span>
        </SectionHeading>

        <div className={styles.showcase}>
          <Reveal variant="fade" className={styles.showcaseCell}>
            <VideoCard src="/assets/ss/video-2.png" alt="Роботи випускників" fill />
          </Reveal>
          <Reveal variant="rise" delay={1} className={styles.payCard}>
            <span className={styles.payTile}>
              <img src="/assets/ss/pay.png" alt="" loading="lazy" className={styles.payImg} />
            </span>
            <p className={styles.payTitle}>
              Отримуй оплату після успішного завершення кожного модуля
            </p>
            <p className={styles.payText}>
              Ми цінуємо твій час і зусилля — навіть на етапі навчання
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
