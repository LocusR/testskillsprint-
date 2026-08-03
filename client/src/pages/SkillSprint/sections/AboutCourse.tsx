import { Container } from '@/components/layout/Container'
import { Pill } from '@/components/ui/Pill'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { VideoCard } from '@/components/ui/VideoCard'
import styles from './AboutCourse.module.css'
import { asset } from '@/lib/asset'

export function AboutCourse() {
  return (
    <section className={styles.section}>
      <Container>
        <Pill>про курс</Pill>
        <SectionHeading className={styles.title}>
          Чим унікальний курс
          <br />
          SkillSprint
        </SectionHeading>

        <div className={styles.grid}>
          <Reveal variant="fade">
            <VideoCard
              src={asset('/assets/ss/video-1.png')}
              alt="Про курс SkillSprint"
              radius="md"
            />
          </Reveal>
          <div className={styles.text}>
            <Reveal variant="mask" delay={1} as="p" className={styles.paragraph}>
              <strong>SkillSprint</strong> — це курс, розроблений інженерами компанії
              BES, який допоможе тобі освоїти професію BIM-Спеціаліста з нуля всього
              за місяць!
            </Reveal>
            <Reveal variant="mask" delay={2} as="p" className={styles.paragraph}>
              Під час навчання ти поступово входиш у робочий процес, а після
              завершення — готовий працювати в компанії BES над реальними проєктами.
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
