import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { CardGrid } from '@/components/ui/CardGrid'
import { Carousel } from '@/components/ui/Carousel'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { VideoCard } from '@/components/ui/VideoCard'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useReveal } from '@/hooks/useReveal'
import { EXTERNAL, ROUTES } from '@/config/site'
import {
  ABOUT_METRICS,
  ABOUT_TEXT,
  BENEFITS,
  TEAM_SLIDES,
  TEAM_TEXT,
} from '@/data/bes'
import styles from './BesLanding.module.css'
import { asset } from '@/lib/asset'

type Props = {
  /** Тумблери секцій із <sc-if> прототипу — керуються пропсами. */
  showTeam?: boolean
  showBenefits?: boolean
}

export default function BesLandingPage({
  showTeam = true,
  showBenefits = true,
}: Props) {
  const heroActions = useReveal<HTMLDivElement>()
  const metrics = useReveal<HTMLDivElement>()
  const ctaGrid = useReveal<HTMLDivElement>()

  usePageMeta({
    title: 'BES — 1000+ інженерів на міжнародних проєктах',
    description:
      'BES — українська інжинірингова компанія. За 5 років виросла з 8 до 1000+ співробітників та реалізувала понад 300 проєктів BIM-проєктування електричних систем.',
  })

  return (
    <Layout
      headerLogo="bes-teal"
      headerLogoHref={ROUTES.bes}
      footerLogo="bes"
      footerLogoHref={ROUTES.bes}
    >
      {/* --- Hero --- */}
      <section className={styles.hero}>
        <Container size="wide" className={styles.heroGrid}>
          <div>
            <Reveal variant="mask" as="h1" className={styles.heroTitle}>
              BES — це 1000+ інженерів,
              <br />
              що працюють на міжнародних
              <br />
              проєктах. Стань одним із нас.
            </Reveal>
            <Reveal variant="mask" delay={1} as="p" className={styles.heroLead}>
              Обери свій початок кар’єри в BES
            </Reveal>
            <div
              ref={heroActions.ref}
              className={`${styles.heroActions} reveal-stagger`}
              {...heroActions.revealProps}
            >
              <Button variant="accent" radius="lg" href={EXTERNAL.careers}>
                Маю досвід
              </Button>
              <Button variant="dark" radius="lg" to={ROUTES.skillSprint}>
                Немає досвіду
              </Button>
            </div>
          </div>
          <Reveal variant="fade" delay={1}>
            <VideoCard src={asset('/assets/hero-video.png')} alt="BES" radius="md" />
          </Reveal>
        </Container>
      </section>

      {/* --- Про нас --- */}
      <section className={styles.about}>
        <Container size="wide">
          <div className={styles.twoCol}>
            <SectionHeading size="lg">Про нас</SectionHeading>
            <Reveal variant="mask" delay={1} as="p" className={styles.aboutLead}>
              BES – українська інжинірингова компанія.
              <br />
              За 5 років вона виросла з 8 до 1000+ співробітників
              <br />
              та реалізувала понад 300 проєктів.
            </Reveal>
          </div>

          <Reveal variant="fade">
            <img
              src={asset('/assets/clients.png')}
              alt="Клієнти BES"
              loading="lazy"
              className={styles.clients}
            />
          </Reveal>

          <div className={[styles.twoCol, styles.aboutText].join(' ')}>
            {ABOUT_TEXT.map((text, i) => (
              <Reveal
                key={text}
                variant="mask"
                delay={i}
                as="p"
                className={styles.aboutLead}
              >
                {text}
              </Reveal>
            ))}
          </div>

          <div
            ref={metrics.ref}
            className={`${styles.metrics} reveal-stagger`}
            {...metrics.revealProps}
          >
            {ABOUT_METRICS.map((metric) => (
              <div
                key={metric.label}
                className={[styles.metricCard, styles[metric.tone]].join(' ')}
              >
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={styles.metricLabel}>{metric.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* --- Наші проєкти --- */}
      <section className={styles.projects}>
        <Container size="wide" className={styles.projectsGrid}>
          <div>
            <SectionHeading size="lg" className={styles.projectsTitle}>
              Наші проєкти
            </SectionHeading>
            <Reveal variant="mask" delay={1} as="p" className={styles.aboutLead}>
              BES створює BIM-моделі електричних систем для дата-центрів, заводів,
              логістичних хабів і комерційних об’єктів, співпрацюючи зі світовими
              брендами та американськими девелоперами.
            </Reveal>
          </div>
          <Reveal variant="fade" delay={1} className="hover-zoom">
            <img
              src={asset('/assets/project-1.png')}
              alt="BIM-модель"
              loading="lazy"
              className={styles.projectImg}
            />
          </Reveal>
        </Container>
      </section>

      {/* --- Наша команда --- */}
      {showTeam && (
        <section className={styles.team}>
          <Container size="wide">
            <SectionHeading size="lg" tone="white" className={styles.teamTitle}>
              Наша команда
            </SectionHeading>
            <div className={styles.teamGrid}>
              <Reveal variant="fade" className={styles.teamCarousel}>
                <Carousel ariaLabel="Фотографії команди BES">
                  {TEAM_SLIDES.map((slide) => (
                    <img
                      key={slide.img}
                      src={slide.img}
                      alt={slide.alt}
                      loading="lazy"
                    />
                  ))}
                </Carousel>
              </Reveal>
              <div className={styles.teamText}>
                {TEAM_TEXT.map((segments, i) => (
                  <Reveal key={i} variant="mask" delay={i + 1} as="p">
                    {segments.map((segment, j) =>
                      typeof segment === 'string' ? (
                        segment
                      ) : (
                        <strong key={j}>{segment.b}</strong>
                      ),
                    )}
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* --- Що ми пропонуємо --- */}
      {showBenefits && (
        <section className={styles.benefits}>
          <Container size="wide">
            <SectionHeading size="lg" className={styles.benefitsTitle}>
              Що ми пропонуємо
            </SectionHeading>
            <CardGrid cols={3}>
              {BENEFITS.map((benefit) => (
                <article
                  key={benefit.lines.join(' ')}
                  className={`${styles.benefitCard} hover-lift`}
                >
                  <div className={`${styles.benefitImgWrap} hover-zoom`}>
                    <img src={benefit.img} alt="" loading="lazy" className={styles.benefitImg} />
                  </div>
                  <p className={styles.benefitText}>
                    {benefit.lines.map((line, i) => (
                      <span key={line}>
                        {line}
                        {i < benefit.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </article>
              ))}
            </CardGrid>
          </Container>
        </section>
      )}

      {/* --- Корпоративні заходи / спорт / SkillSprint --- */}
      <section className={styles.events}>
        <Container size="wide">
          <div className={styles.twoCol}>
            <SectionHeading size="lg">Корпоративні онлайн заходи</SectionHeading>
            <p className={styles.eventsText}>
              Організовуємо інтерактивні онлайн-зустрічі та активності, які сприяють
              командній взаємодії, підсилюють мотивацію та створюють атмосферу
              залученості у щоденній роботі.
            </p>
          </div>

          <img
            src={asset('/assets/online-events.png')}
            alt="Онлайн заходи BES"
            loading="lazy"
            className={styles.eventsImg}
          />

          <div className={styles.eventsBottom}>
            <div>
              <SectionHeading size="lg" className={styles.eventsSubTitle}>
                Активна підтримка
                <br />
                розвитку спорту
              </SectionHeading>
              <p className={styles.eventsSubText}>
                BES підтримує активний спосіб життя співробітників: компенсуємо
                тренування, об’єднуємо команду у спортивних ініціативах та створюємо
                середовище, де легко тримати баланс.
              </p>
              <img
                src={asset('/assets/sport.png')}
                alt="Спорт у BES"
                loading="lazy"
                className={styles.eventsSubImg}
              />
            </div>
            <div>
              <SectionHeading size="lg" className={styles.eventsSubTitle}>
                Програма навчання для
                <br />
                кандидатів без досвіду
              </SectionHeading>
              <p className={styles.eventsSubText}>
                Немає досвіду в BIM? Наша програма SkillSprint допоможе стати
                професіоналом. 300+ випускників вже розпочали успішну кар’єру у BES
                завдяки SkillSprint. Компанія оплачує вам навчання.
              </p>
              <Link to={ROUTES.skillSprint}>
                <img
                  src={asset('/assets/skillsprint.png')}
                  alt="Програма SkillSprint"
                  loading="lazy"
                  className={styles.eventsSubImg}
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* --- Цитата --- */}
      <section className={styles.quote}>
        <div className={styles.quoteInner}>
          <img
            src={asset('/assets/quote-bg.png')}
            alt=""
            loading="lazy"
            className={styles.quoteBg}
          />
          <h2 className={styles.quoteText}>
            BES – це місце, де ви зможете працювати над проєктами світового рівня,
            розвиватися професійно та будувати стабільну кар’єру.
          </h2>
        </div>
      </section>

      {/* --- Два CTA --- */}
      <section className={styles.cta}>
        <div
          ref={ctaGrid.ref}
          className={`${styles.ctaGrid} reveal-stagger`}
          {...ctaGrid.revealProps}
        >
          <div className={styles.ctaCard}>
            <div className={styles.ctaKicker}>Приєднуйся до нас!</div>
            <h2 className={styles.ctaTitle}>
              Маєш досвід
              <br />в BIM?
            </h2>
            <Button
              variant="accent"
              radius="lg"
              width="wide"
              href={EXTERNAL.careers}
              className={styles.ctaButton}
            >
              Переглянути вакансії
            </Button>
          </div>

          <div className={[styles.ctaCard, styles.ctaCardDark].join(' ')}>
            <div className={styles.ctaKicker}>Приєднуйся до нас!</div>
            <h2 className={styles.ctaTitle}>
              Поки не маєш
              <br />
              досвіду?
            </h2>
            <Button
              variant="teal"
              radius="lg"
              width="wide"
              to={ROUTES.skillSprint}
              className={styles.ctaButton}
            >
              Програма SkillSprint
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}
