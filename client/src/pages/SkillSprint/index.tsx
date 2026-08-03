import { Layout } from '@/components/layout/Layout'
import { usePageMeta } from '@/hooks/usePageMeta'
import { ROUTES } from '@/config/site'
import { AboutCourse } from './sections/AboutCourse'
import { Faq } from './sections/Faq'
import { Features } from './sections/Features'
import { Hero } from './sections/Hero'
import { Mentors } from './sections/Mentors'
import { Pride } from './sections/Pride'
import { Program } from './sections/Program'
import { Salary } from './sections/Salary'
import { Stories } from './sections/Stories'
import { WhoIsBim } from './sections/WhoIsBim'

export default function SkillSprintPage() {
  usePageMeta({
    title: 'SkillSprint — Ви навчаєтесь, ми платимо! | BES',
    description:
      'SkillSprint — оплачувана програма від інжинірингової компанії BES, яка готує та працевлаштовує BIM-спеціалістів. 4 тижні навчання + 2 тижні стажування.',
  })

  return (
    <Layout
      headerLogo="bes"
      headerLogoHref={ROUTES.skillSprint}
      footerLogo="skillsprint"
      footerLogoHref={ROUTES.skillSprint}
    >
      <Hero />
      <WhoIsBim />
      <AboutCourse />
      <Features />
      <Program />
      <Mentors />
      <Stories />
      <Pride />
      <Salary />
      <Faq />
    </Layout>
  )
}
