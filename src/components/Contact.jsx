import { profile } from '../data/profile'
import SectionHeading from './common/SectionHeading'
import Reveal from './common/Reveal'
import { SocialIcon } from './common/Icons'

export default function Contact() {
  const year = new Date().getFullYear()

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container-base">
        <SectionHeading
          label="04"
          title="通信频道"
          subtitle="> 建立连接 —— 频道已开启，等待信号..."
        />

        <Reveal>
          <div className="card card-corner p-8 sm:p-10">
            <p className="text-lg text-slate-300">
              无论是有趣的项目想法、技术问题，还是合作机会，信号不会丢失。
            </p>

            {/* 社交链接卡片 */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {profile.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.icon === 'mail' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-sm border border-void-600 bg-void-700/40 p-4 transition-all hover:border-neon-pink/50 hover:bg-void-700/70 hover:shadow-neon-pink"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-void-600 bg-void-800 text-neon-cyan transition-colors group-hover:border-neon-cyan/50 group-hover:text-neon-pink">
                    <SocialIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs uppercase tracking-wider text-neon-pink/60">
                      {s.name}
                    </span>
                    <span className="block truncate text-sm text-slate-200">
                      {s.label}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* 页脚 —— 赛博终端风格 */}
      <footer className="container-base mt-24 border-t border-void-600 pt-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-mono text-xs text-slate-500">
            <span className="text-neon-pink/60">©</span> {year} {profile.name}
            <span className="mx-2 text-void-600">|</span>
            <span className="text-neon-cyan/40">POWERED BY</span> React + Vite
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-xs text-slate-500 transition-colors hover:text-neon-cyan"
          >
            {'>'} 回到顶部 ↑
          </button>
        </div>
      </footer>
    </section>
  )
}
