import { Link, Navigate, useParams } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { InstagramIcon, LinkedInIcon } from '@/components/icons'
import { usePageMeta } from '@/hooks/usePageMeta'
import { EXTERNAL, ROUTES } from '@/config/site'
import { formatDate, getPostBySlug } from '@/data/blog'
import styles from './Article.module.css'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  usePageMeta({
    title: post ? `${post.title} | Блог BES` : 'Стаття не знайдена | Блог BES',
    description: post?.excerpt,
  })

  if (!post) {
    return <Navigate to={ROUTES.blog} replace />
  }

  return (
    <Layout headerLogo="bes" headerLogoHref={ROUTES.bes} footerLogoHref={ROUTES.bes}>
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label="Хлібні крихти">
          <Link to={ROUTES.blog}>Всі пости</Link>
        </nav>

        <article className={styles.article}>
          <div className={styles.inner}>
            <div className={styles.meta}>
              <img src={post.authorAvatar} alt="" className={styles.avatar} />
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.readingTime && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className={styles.readingTime}>{post.readingTime}</span>
                </>
              )}
            </div>

            <h1 className={styles.title}>{post.title}</h1>
            {post.updatedAt && (
              <div className={styles.updated}>
                Оновлено: {formatDate(post.updatedAt)}
              </div>
            )}

            {/*
              HTML зібраний із Markdown, який лежить у нашому репозиторії —
              джерело довірене, стороннього вводу тут немає.
            */}
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <Link key={tag} to={ROUTES.blog} className={styles.tag}>
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            <div className={styles.share}>
              <a
                href={EXTERNAL.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
                className={styles.shareLink}
              >
                <LinkedInIcon size={20} />
              </a>
              <a
                href={EXTERNAL.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className={styles.shareLink}
              >
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  )
}
