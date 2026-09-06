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
          title="保持联系"
          subtitle="有项目想法、技术问题或合作机会，都欢迎来信交流。"
        />

        <Reveal>
          <div className="card p-8 sm:p-10">
            <p className="text-lg text-slate-300">
              无论是有趣的项目想法、技术问题，还是合作机会，期待收到你的消息。
            </p>

            {/* 社交链接卡片 */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {profile.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.icon === 'mail' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-white/[0.09] bg-void-700/35 p-4 transition-all hover:border-neon-cyan/35 hover:bg-void-700/60"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-void-800 text-neon-cyan transition-colors group-hover:border-neon-cyan/50 group-hover:text-neon-pink">
                    <SocialIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs uppercase tracking-wider text-slate-400">
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

      <footer className="container-base mt-24 border-t border-void-600 pt-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="font-mono text-xs text-slate-400">
            <span className="text-neon-pink/60">©</span> {year} {profile.name}
            <span className="mx-2 text-void-600">|</span>
            <span className="text-neon-cyan/40">BUILT WITH</span> React + Vite
            </p>
            <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
              <a href="/privacy.html" className="transition-colors hover:text-neon-cyan">隐私说明</a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="transition-colors hover:text-neon-cyan"
              >
                回到顶部 ↑
              </button>
            </div>
          </div>
      </footer>
    </section>
  )
}
