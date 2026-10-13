import { profile } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-[2] flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-[var(--gutter)] pb-7 pt-5 text-sm text-mute">
      <span>
        © {year} {profile.name}
      </span>
      <span className="flex flex-wrap gap-x-2 gap-y-1">
        <a href="/privacy.html" className="inline-flex min-h-[44px] items-center px-3 transition-colors hover:text-paint">
          隐私说明
        </a>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex min-h-[44px] items-center px-3 transition-colors hover:text-paint"
        >
          回到顶部 ↑
        </button>
      </span>
    </footer>
  )
}
