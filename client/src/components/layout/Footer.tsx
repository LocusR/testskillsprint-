import { Link } from 'react-router-dom'
import { InstagramIcon, LinkedInIcon } from '@/components/icons'
import { useApplicationModal } from '@/context/ApplicationModalContext'
import { EXTERNAL, FOOTER_LINKS, ROUTES, type NavLink } from '@/config/site'
import styles from './Footer.module.css'
import { asset } from '@/lib/asset'

type Props = {
  /** SkillSprint має власний логотип у футері. */
  logo?: 'bes' | 'skillsprint'
  logoHref?: string
}

export function Footer({ logo = 'bes', logoHref = ROUTES.skillSprint }: Props) {
  const { open: openApplication } = useApplicationModal()

  const renderLink = (link: NavLink) => {
    if ('to' in link) {
      return (
        <Link key={link.label} to={link.to} className={styles.link}>
          {link.label}
        </Link>
      )
    }

    if ('action' in link) {
      return (
        <button
          key={link.label}
          type="button"
          className={[styles.link, styles.linkButton].join(' ')}
          onClick={openApplication}
        >
          {link.label}
        </button>
      )
    }

    return (
      <a
        key={link.label}
        href={link.href}
        className={styles.link}
        target="_blank"
        rel="noreferrer"
      >
        {link.label}
      </a>
    )
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Link to={logoHref} className={styles.logoLink}>
          <img
            src={
              logo === 'skillsprint'
                ? asset('/assets/ss/logo-ss-footer.png')
                : asset('/assets/logo-footer.png')
            }
            alt={logo === 'skillsprint' ? 'SkillSprint' : 'BES'}
            className={styles.logo}
          />
        </Link>

        <div className={styles.right}>
          <nav className={styles.links} aria-label="Навігація у футері">
            {FOOTER_LINKS.map(renderLink)}
          </nav>

          <div className={styles.socials}>
            <a
              href={EXTERNAL.linkedin}
              aria-label="LinkedIn"
              className={styles.social}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon size={50} />
            </a>
            <a
              href={EXTERNAL.instagramTeam}
              aria-label="Instagram"
              className={styles.social}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon size={50} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} усі права захищені.</span>
        <Link to={ROUTES.privacy} className={styles.link}>
          Політика конфіденційності
        </Link>
      </div>
    </footer>
  )
}
