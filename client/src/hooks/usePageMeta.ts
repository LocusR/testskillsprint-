import { useEffect } from 'react'

type Meta = {
  title: string
  description?: string
}

/**
 * Мінімальна заміна <helmet> із прототипу: оновлює <title> і meta description
 * при переході між сторінками SPA.
 */
export function usePageMeta({ title, description }: Meta) {
  useEffect(() => {
    document.title = title

    if (!description) return

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = description
  }, [title, description])
}
