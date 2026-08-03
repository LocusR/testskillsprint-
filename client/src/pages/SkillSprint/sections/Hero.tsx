import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { GraduateIcon, TeamIcon } from '@/components/icons'
import { useApplicationModal } from '@/context/ApplicationModalContext'
import { useReveal } from '@/hooks/useReveal'
import styles from './Hero.module.css'
import { asset } from '@/lib/asset'

export function Hero() {
  const { open } = useApplicationModal()
  const stats = useReveal<HTMLDivElement>()

  return (
    <section className={styles.section}>
      <Container size="hero" className={styles.grid}>
        <div className={styles.left}>
          <Reveal variant="mask" as="p" className={styles.kicker}>
            запуск груп кожного тижня
          </Reveal>

          <Reveal variant="mask" delay={1} as="h1" className={styles.title}>
            Ви навчаєтесь
            <br />
            <span className={styles.titleAccent}>— ми платимо!</span>
          </Reveal>

          <Reveal variant="mask" delay={2} as="p" className={styles.lead}>
            SkillSprint — оплачувана програма від інжинірингової компанії BES, яка
            готує та працевлаштовує BIM-спеціалістів.
          </Reveal>

          <Reveal variant="rise" delay={3} className={styles.ctaWrap}>
            <Button variant="gradient" width="wide" onClick={open}>
              Забронювати місце
            </Button>
          </Reveal>

          <div
            ref={stats.ref}
            className={`${styles.stats} reveal-stagger`}
            {...stats.revealProps}
          >
            <div className={`${styles.numberCard} hover-lift`}>
              <span className={styles.number}>4</span>
              <span className={styles.numberLabel}>
                тижні
                <br />
                навчання
              </span>
            </div>

            <div
              className={`${styles.featureCard} ${styles.featureCardRaised} hover-lift`}
            >
              <span className={styles.featureIcon}>
                <GraduateIcon size={19} />
              </span>
              <div>
                <div className={styles.featureTitle}>Вхід у професію з нуля</div>
                <div className={styles.featureText}>
                  не потрібен досвід чи технічна освіта
                </div>
              </div>
            </div>

            <div className={`${styles.numberCard} hover-lift`}>
              <span className={styles.number}>2</span>
              <span className={styles.numberLabel}>
                тижні
                <br />
                стажування
              </span>
            </div>

            <div className={`${styles.featureCard} hover-lift`}>
              <span className={styles.featureIcon}>
                <TeamIcon size={25} />
              </span>
              <div>
                <div className={styles.featureTitle}>Гарантоване стажування</div>
                <div className={styles.featureText}>
                  після успішного завершення курсу
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <Reveal variant="fade" className={styles.heroImgWrap}>
            <img
              src={asset('/assets/ss/hero.png')}
              alt="Команда SkillSprint"
              className={styles.heroImg}
              fetchPriority="high"
            />
          </Reveal>

          <Reveal variant="rise" delay={2} className={styles.darkCard}>
            <p className={styles.darkCardTitle}>
              1000 + учасників вже взяли участь у програмі
            </p>
            <img src={asset('/assets/ss/avatars.png')} alt="" className={styles.avatars} />
            <p className={styles.darkCardText}>
              Після успішного проходження курсу — працевлаштування в компанії та
              робота над американськими проєктами.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
