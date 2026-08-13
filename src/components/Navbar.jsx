import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'about', label: '关于', code: '/01' },
  { id: 'projects', label: '项目', code: '/02' },
  { id: 'blog', label: '博客', code: '/03' },
  { id: 'collection', label: '收藏', code: '/04' },
  { id: 'contact', label: '联系', code: '/05' },
]

export default function Navbar({ name }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('about')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 滚动高亮（scrollspy）：标记当前所在区块
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (sections.length === 0) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
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

        {/* 桌面端导航 —— 带代号，当前区块高亮 */}
        <ul className="hidden items-center gap-7 md:flex">
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

        {/* 移动端汉堡按钮 */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="text-neon-cyan md:hidden"
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={menuOpen}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
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
        </ul>
      )}
    </header>
  )
}
