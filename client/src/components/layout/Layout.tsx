import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import styles from './Layout.module.css'

type Props = {
  children: ReactNode
  headerLogo?: 'bes' | 'bes-teal'
  headerLogoHref?: string
  footerLogo?: 'bes' | 'skillsprint'
  footerLogoHref?: string
}

export function Layout({
  children,
  headerLogo,
  headerLogoHref,
  footerLogo,
  footerLogoHref,
}: Props) {
  return (
    <div className={styles.page}>
      <Header logo={headerLogo} logoHref={headerLogoHref} />
      <main className={styles.main}>{children}</main>
      <Footer logo={footerLogo} logoHref={footerLogoHref} />
    </div>
  )
}
