import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Analytics } from '@/components/Analytics'
import { ApplicationModal } from '@/components/forms/ApplicationModal'
import { ApplicationModalProvider } from '@/context/ApplicationModalContext'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { ROUTES } from '@/config/site'

// Лендінг SkillSprint — головна, тож вантажимо його одразу.
import SkillSprintPage from '@/pages/SkillSprint'

const BesLandingPage = lazy(() => import('@/pages/BesLanding'))
const BlogPage = lazy(() => import('@/pages/Blog'))
const ArticlePage = lazy(() => import('@/pages/Article'))
const PrivacyPage = lazy(() => import('@/pages/Privacy'))

export function App() {
  return (
    <ApplicationModalProvider>
      <ScrollToTop />
      <Analytics />
      <Suspense fallback={null}>
        <Routes>
          <Route path={ROUTES.skillSprint} element={<SkillSprintPage />} />
          <Route path={ROUTES.bes} element={<BesLandingPage />} />
          <Route path={ROUTES.blog} element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path={ROUTES.privacy} element={<PrivacyPage />} />
          <Route path="*" element={<Navigate to={ROUTES.skillSprint} replace />} />
        </Routes>
      </Suspense>
      <ApplicationModal />
    </ApplicationModalProvider>
  )
}
