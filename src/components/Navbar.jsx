import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'about', label: '关于', code: '/01' },
  { id: 'projects', label: '项目', code: '/02' },
  { id: 'collection', label: '收藏', code: '/03' },
  { id: 'contact', label: '联系', code: '/04' },
]

const ACCENTS = ['night', 'ice', 'toxic', 'ember']

export default function Navbar({ name }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('about')
  const [accent, setAccent] = useState(() => {
    if (typeof window === 'undefined') return 'night'
    return localStorage.getItem('cyber-accent') || 'night'
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 霓虹换肤：同步到 <html data-accent> 并持久化
  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent)
    try {
      localStorage.setItem('cyber-accent', accent)
    } catch (_) {}
  }, [accent])

  const cycleAccent = () => {
    const i = ACCENTS.indexOf(accent)
    setAccent(ACCENTS[(i + 1) % ACCENTS.length])
  }

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-neon-pink/30 bg-void-950/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="主导航" className="container-base flex h-16 items-center justify-between">
        {/* Logo —— 带方括号的终端风格 */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-base font-bold tracking-wider"
          aria-label="返回顶部"
        >
          <span className="text-neon-pink">[</span>
          <span className="text-slate-100">{name}</span>
          <span className="text-neon-cyan">]</span>
          <span className="cursor-blink ml-1 text-neon-pink">_</span>
        </button>

        {/* 桌面端导航 —— 带代号，当前区块高亮 + 霓虹换肤切换 */}
        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-7">
            {LINKS.map((l) => {
              const isActive = active === l.id
              return (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group font-mono text-sm transition-colors ${
                      isActive ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'
                    }`}
                  >
                    <span
                      className={
                        isActive
                          ? 'text-neon-pink'
                          : 'text-neon-pink/60 group-hover:text-neon-pink'
                      }
                    >
                      {l.code}
                    </span>{' '}
                    {l.label}
                    <span
                      className={`ml-1 inline-block h-px w-0 bg-neon-cyan align-middle transition-all duration-300 ${
                        isActive ? 'w-3' : 'group-hover:w-3'
                      }`}
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          {/* 霓虹换肤切换 */}
          <button
            onClick={cycleAccent}
            aria-label="切换霓虹配色"
            className="flex items-center gap-2 rounded-sm border border-void-600 bg-void-800/50 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-slate-300 transition-colors hover:border-neon-cyan/60 hover:text-neon-cyan"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: 'rgb(var(--neon-pink) / 1)' }}
            />
            {accent}
          </button>
        </div>

        {/* 移动端：汉堡 + 换肤切换 */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={cycleAccent}
            aria-label="切换霓虹配色"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-void-600 bg-void-800/50"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: 'rgb(var(--neon-pink) / 1)' }}
            />
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="text-neon-cyan"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <ul className="border-b border-neon-pink/30 bg-void-950/95 px-6 py-4 backdrop-blur-md md:hidden">
          {LINKS.map((l) => {
            const isActive = active === l.id
            return (
              <li key={l.id} className="py-2">
                <button
                  onClick={() => go(l.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`font-mono text-sm ${
                    isActive ? 'text-neon-cyan' : 'text-slate-300 hover:text-neon-cyan'
                  }`}
                >
                  <span className="text-neon-pink/60">{l.code}</span> {l.label}
                </button>
              </li>
            )
          })}
          <li className="py-2">
            <button
              onClick={cycleAccent}
              className="flex items-center gap-2 font-mono text-sm text-slate-300 hover:text-neon-cyan"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: 'rgb(var(--neon-pink) / 1)' }}
              />
              切换霓虹：{accent} →
            </button>
          </li>
        </ul>
      )}
    </header>
  )
}
