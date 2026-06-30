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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-neon-pink/30 bg-void-950/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="container-base flex h-16 items-center justify-between">
        {/* Logo —— 带方括号的终端风格 */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-base font-bold tracking-wider"
        >
          <span className="text-neon-pink">[</span>
          <span className="text-slate-100">{name}</span>
          <span className="text-neon-cyan">]</span>
          <span className="cursor-blink ml-1 text-neon-pink">_</span>
        </button>

        {/* 桌面端导航 —— 带代号 */}
        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="group font-mono text-sm text-slate-400 transition-colors hover:text-neon-cyan"
              >
                <span className="text-neon-pink/60 group-hover:text-neon-pink">
                  {l.code}
                </span>{' '}
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* 移动端汉堡按钮 */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="text-neon-cyan md:hidden"
          aria-label="切换菜单"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <ul className="border-b border-neon-pink/30 bg-void-950/95 px-6 py-4 backdrop-blur-md md:hidden">
          {LINKS.map((l) => (
            <li key={l.id} className="py-2">
              <button
                onClick={() => go(l.id)}
                className="font-mono text-sm text-slate-300 hover:text-neon-cyan"
              >
                <span className="text-neon-pink/60">{l.code}</span> {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
