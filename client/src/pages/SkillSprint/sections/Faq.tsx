import { Panel } from '@/components/layout/Panel'
import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useApplicationModal } from '@/context/ApplicationModalContext'
import { FAQ } from '@/data/skillsprint'
import styles from './Faq.module.css'

export function Faq() {
  const { open } = useApplicationModal()

  return (
    <Panel tone="white">
      <Pill>FAQ</Pill>
      <SectionHeading className={styles.title}>Нас часто запитують</SectionHeading>

      <Accordion items={FAQ} />

      <Button
        variant="gradient"
        width="wide"
        className={styles.cta}
        onClick={open}
      >
        Записатись на курс
      </Button>
    </Panel>
  )
}
