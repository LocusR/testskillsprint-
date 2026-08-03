import { Link } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { usePageMeta } from '@/hooks/usePageMeta'
import { ROUTES } from '@/config/site'
import { formatDate, POSTS } from '@/data/blog'
import styles from './Blog.module.css'

export default function BlogPage() {
  usePageMeta({
    title: 'Блог BES — усі пости',
    description:
      'Статті про BIM, професію BIM-спеціаліста та кар’єру в інжиніринговій компанії BES.',
  })

  return (
    <Layout headerLogo="bes" headerLogoHref={ROUTES.bes} footerLogoHref={ROUTES.bes}>
      <div className={styles.wrap}>
        <h1 className={styles.title}>Всі пости</h1>

        <div className={styles.posts}>
          {POSTS.map((post) => (
            <article key={post.slug} className={styles.post}>
              <Link to={ROUTES.article(post.slug)} className={styles.coverLink}>
                <img src={post.cover} alt={post.title} className={styles.cover} />
              </Link>

              <div className={styles.body}>
                <div className={styles.meta}>
                  <img src={post.authorAvatar} alt="" className={styles.avatar} />
                  <div className={styles.metaText}>
                    <span className={styles.author}>{post.author}</span>
                    <div className={styles.metaRow}>
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                      {post.readingTime && (
                        <>
                          <span className={styles.dot} aria-hidden="true" />
                          <span>{post.readingTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <h2 className={styles.postTitle}>
                  <Link to={ROUTES.article(post.slug)}>{post.title}</Link>
                </h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  )
}
