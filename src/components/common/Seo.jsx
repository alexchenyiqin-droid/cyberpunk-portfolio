import { useEffect } from 'react'

const siteName = 'Alex Chen · 个人博客与作品集'
const defaultDescription = 'Alex Chen 的个人博客与作品集，记录技术、项目与思考。'

function upsertMeta(attribute, key, content) {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

export default function Seo({ title, description = defaultDescription, type = 'website', noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteName}` : siteName
    const url = window.location.href
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', url)
    upsertMeta('name', 'twitter:card', 'summary')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, follow')
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove()
    }
  }, [description, noindex, title, type])

  return null
}
