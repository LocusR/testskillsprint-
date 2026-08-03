import { useEffect, useState } from 'react'
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { BurgerIcon, CloseIcon, InstagramIcon, LinkedInIcon } from '@/components/icons'
import { useApplicationModal } from '@/context/ApplicationModalContext'
import { EXTERNAL, NAV_LINKS, ROUTES, type NavLink } from '@/config/site'
import styles from './Header.module.css'
import { asset } from '@/lib/asset'

type Props = {
  /** Логотип відрізняється між сторінками: SkillSprint/Blog — logo-bes, лендінг BES — logo-bes-teal. */
  logo?: 'bes' | 'bes-teal'
  logoHref?: string
}

export function Header({ logo = 'bes', logoHref = ROUTES.skillSprint }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { open: openApplication } = useApplicationModal()
  const location = useLocation()

  // Закриваємо мобільне меню при переході на іншу сторінку
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [menuOpen])

  /**
   * Підкреслення scaleX — тільки в десктопній навігації;
   * у мобільному меню пункти вже розділені рамкою.
   */
  const renderLink = (link: NavLink, className: string, underline = false) => {
    const label = underline ? (
      <span className="hover-underline">{link.label}</span>
    ) : (
      link.label
    )

    if ('to' in link) {
      return (
        <RouterNavLink
          key={link.label}
          to={link.to}
          end={link.to === ROUTES.skillSprint}
          className={({ isActive }) =>
            [className, isActive ? styles.active : ''].filter(Boolean).join(' ')
          }
        >
          {label}
        </RouterNavLink>
      )
    }

    if ('action' in link) {
      return (
        <button
          key={link.label}
          type="button"
          className={[className, styles.linkButton].join(' ')}
          onClick={() => {
            setMenuOpen(false)
            openApplication()
          }}
        >
          {label}
        </button>
      )
    }

    return (
      <a
        key={link.label}
        href={link.href}
        className={className}
        target="_blank"
        rel="noreferrer"
      >
        {label}
      </a>
    )
  }

  const socials = (size: number) => (
    <>
      <a
        href={EXTERNAL.linkedin}
        aria-label="LinkedIn"
        className={styles.social}
        target="_blank"
        rel="noreferrer"
      >
        <LinkedInIcon size={size} />
      </a>
      <a
        href={EXTERNAL.instagram}
        aria-label="Instagram"
        className={styles.social}
        target="_blank"
        rel="noreferrer"
      >
        <InstagramIcon size={size} />
      </a>
    </>
  )

  return (
    <header className={styles.header}>
      <Link to={logoHref} className={styles.logoLink}>
        <img
          src={logo === 'bes-teal' ? asset('/assets/logo-bes-teal.png') : asset('/assets/logo-bes.png')}
          alt="BES"
          className={logo === 'bes-teal' ? styles.logoTeal : styles.logo}
        />
      </Link>

      {/* Десктопна навігація */}
      <nav className={styles.nav} aria-label="Головна навігація">
        {NAV_LINKS.map((link) => renderLink(link, styles.navLink, true))}
      </nav>

      <div className={styles.socials}>{socials(24)}</div>

      <Button
        variant="accent"
        radius="lg"
        width="auto"
        className={styles.cta}
        onClick={openApplication}
      >
        Залишити заявку
      </Button>

      {/* Мобільний тригер */}
      <button
        type="button"
        className={styles.burger}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        {menuOpen ? <CloseIcon size={24} /> : <BurgerIcon size={24} />}
      </button>

      {/* Мобільне меню */}
      <div
        id="mobile-menu"
        className={[styles.mobileMenu, menuOpen ? styles.mobileMenuOpen : '']
          .filter(Boolean)
          .join(' ')}
        hidden={!menuOpen}
      >
        <nav className={styles.mobileNav} aria-label="Мобільна навігація">
          {NAV_LINKS.map((link) => renderLink(link, styles.mobileLink))}
        </nav>
        <div className={styles.mobileSocials}>{socials(28)}</div>
        <Button
          variant="accent"
          radius="lg"
          width="full"
          onClick={() => {
            setMenuOpen(false)
            openApplication()
          }}
        >
          Залишити заявку
        </Button>
      </div>
    </header>
  )
}
