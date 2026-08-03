import { Panel } from '@/components/layout/Panel'
import { Button } from '@/components/ui/Button'
import { CardGrid } from '@/components/ui/CardGrid'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useApplicationModal } from '@/context/ApplicationModalContext'
import { METRICS } from '@/data/skillsprint'
import styles from './Pride.module.css'
import { asset } from '@/lib/asset'

export function Pride() {
  const { open } = useApplicationModal()

  return (
    <Panel tone="teal">
      <img src={asset('/assets/logo-footer.png')} alt="BES" className={styles.logo} />

      <div className={styles.head}>
        <SectionHeading tone="white">
          Ти будеш пишатися
          <br />
          своєю роботою
        </SectionHeading>
        <Reveal variant="mask" delay={1} as="p" className={styles.text}>
          Після SkillSprint на тебе чекає кар’єра в українській інжиніринговій
          компанії BES, яка співпрацює зі світовими брендами та реалізує масштабні
          міжнародні проєкти.
        </Reveal>
      </div>

      <Reveal variant="fade" className={styles.clientsWrap}>
        <img
          src={asset('/assets/ss/clients.png')}
          alt="Клієнти BES"
          loading="lazy"
          className={styles.clients}
        />
      </Reveal>

      <Button variant="gradientOrange" width="wide" onClick={open}>
        Залишити заявку
      </Button>

      <CardGrid cols={4} className={styles.metrics}>
        {METRICS.map((metric) => (
          <div
            key={metric.label}
            className={[styles.metricCard, styles[metric.tone ?? 'white']].join(' ')}
          >
            <div className={styles.metricValue}>{metric.value}</div>
            <div className={styles.metricLabel}>{metric.label}</div>
          </div>
        ))}
      </CardGrid>
    </Panel>
  )
}
