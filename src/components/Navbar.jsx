import { useEffect, useRef, useState } from 'react'

// 顺序即页面上板块的顺序：作品 → 现场 → 关于 → 联系
const LINKS = [
  { id: 'projects', label: '作品' },
  { id: 'collection', label: '现场' },
  { id: 'about', label: '关于' },
  { id: 'contact', label: '联系' },
]

export default function Navbar({ name }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const pendingNavigation = useRef(() => {})
  useEffect(() => () => pendingNavigation.current(), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 滚动高亮：区块由懒加载挂载，需在 DOM 新增后重新订阅。
  useEffect(() => {
    let observer
    const observeSections = () => {
      observer?.disconnect()
      const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
      if (!sections.length) return
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id)
          })
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
      )
      sections.forEach((section) => observer.observe(section))
    }

    observeSections()
    const main = document.getElementById('main')
    const mutations = main ? new MutationObserver(observeSections) : null
    mutations?.observe(main, { childList: true, subtree: true })

    return () => {
      observer?.disconnect()
      mutations?.disconnect()
    }
  }, [])

  // 移动端菜单：Esc 关闭 + 打开时锁定页面滚动
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const go = (id) => {
    setMenuOpen(false)
    pendingNavigation.current()
    const target = document.getElementById(id)
    if (!target) return
    // Mount the destination and preceding sections before measuring their positions.
    const sections = [...document.querySelectorAll('[data-lazy-section]')]
    const preceding = sections.slice(0, sections.indexOf(target) + 1)
    let timeout
    const observer = new MutationObserver(scrollWhenReady)
    function cleanup() { observer.disconnect(); window.clearTimeout(timeout) }
    function scrollWhenReady() {
      if (!preceding.every((section) => section.querySelector('section'))) return
      cleanup()
      target.scrollIntoView({ behavior: 'smooth' })
      setActive(id)
    }
    pendingNavigation.current = cleanup
    observer.observe(document.getElementById('main'), { childList: true, subtree: true })
    timeout = window.setTimeout(cleanup, 15000)
    window.dispatchEvent(new CustomEvent('load-section', { detail: id }))
    scrollWhenReady()
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.12] bg-void-950/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="主导航" className="flex h-[4.5rem] items-center justify-between px-[var(--gutter)]">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="giant inline-flex min-h-[44px] items-center text-[22px] leading-none text-paint"
          aria-label="返回顶部"
        >
          {name}
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const isActive = active === l.id
            return (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`inline-flex min-h-[44px] items-center border-b-2 px-4 text-[15px] font-bold transition-colors ${
                    isActive
                      ? 'border-paint text-paint'
                      : 'border-transparent text-silver hover:text-paint'
                  }`}
                >
                  {l.label}
                </button>
              </li>
            )
          })}
        </ul>

        {/* 移动端：汉堡 */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center text-paint md:hidden"
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={menuOpen}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <ul className="border-b border-white/[0.12] bg-void-950/95 px-[var(--gutter)] py-3 backdrop-blur-xl md:hidden">
          {LINKS.map((l) => {
            const isActive = active === l.id
            return (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex min-h-[48px] w-full items-center text-lg font-bold ${
                    isActive ? 'text-paint' : 'text-silver hover:text-paint'
                  }`}
                >
                  {l.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </header>
  )
}
