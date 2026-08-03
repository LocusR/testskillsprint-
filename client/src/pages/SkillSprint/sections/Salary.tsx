import { Panel } from '@/components/layout/Panel'
import { BraceIcon } from '@/components/icons'
import { Pill } from '@/components/ui/Pill'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useReveal } from '@/hooks/useReveal'
import { SALARY_TIERS } from '@/data/skillsprint'
import styles from './Salary.module.css'
import { asset } from '@/lib/asset'

export function Salary() {
  const grid = useReveal<HTMLDivElement>()

  return (
    <Panel tone="white">
      <SectionHeading className={styles.title}>
        Скільки платять BIM-Спеціалістам?
      </SectionHeading>

      <div
        ref={grid.ref}
        className={`${styles.grid} reveal-stagger`}
        {...grid.revealProps}
      >
        {SALARY_TIERS.map((tier) => (
          <article
            key={tier.experience}
            className={[styles.card, styles[tier.tone]].join(' ')}
          >
            <Pill tone="white" size="lg">
              {tier.experience}
            </Pill>
            <img src={tier.img} alt="" loading="lazy" className={styles.img} />
            <div className={styles.amount}>{tier.amount}</div>
            <p className={styles.text}>{tier.text}</p>
          </article>
        ))}

        <aside className={styles.note}>
          <BraceIcon side="left" className={styles.brace} />

          <div className={styles.noteBody}>
            <div className={styles.noteRow}>
              <img src={asset('/assets/ss/info.png')} alt="" className={styles.infoIcon} />
              <p className={styles.noteText}>
                Цей карʼєрний шлях є <strong>орієнтовним</strong> і може змінюватись
                залежно від ваших <strong>темпів розвитку.</strong>
              </p>
            </div>
            <p className={[styles.noteText, styles.noteIndent].join(' ')}>
              Ваше зростання залежить від{' '}
              <strong>
                особистої ініціативи, амбіцій і прагнення до професійного розвитку.
              </strong>
            </p>
          </div>

          <BraceIcon side="right" className={styles.brace} />
        </aside>
      </div>
    </Panel>
  )
}
