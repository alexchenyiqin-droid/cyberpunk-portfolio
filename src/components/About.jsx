import { profile } from '../data/profile'
import SectionHeading from './common/SectionHeading'
import Reveal from './common/Reveal'

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container-base">
        <SectionHeading
          label="01"
          title="关于我"
          subtitle="从产品视角理解问题，用工程方式把它做出来。"
        />

        <div className="grid gap-12 md:grid-cols-[auto_1fr] md:items-start">
          <Reveal className="flex flex-col items-center gap-4">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border border-neon-cyan/25 bg-gradient-to-br from-violet-500/20 to-neon-cyan/10 font-display text-5xl font-black shadow-[0_18px_48px_rgb(0_0_0_/_0.2)]">
              <span className="text-gradient">{profile.alias.charAt(0)}</span>
            </div>
            <span className="font-mono text-xs text-slate-500">@{profile.alias}</span>
          </Reveal>

          {/* 右侧：简介 + 技能 */}
          <div>
            <Reveal>
              <div className="space-y-4">
                {profile.about.map((p, i) => (
                  <p key={i} className="leading-relaxed text-slate-400">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* 技能分组 */}
            <div className="mt-10 space-y-6">
              {profile.skills.map((group, gi) => (
                <Reveal key={group.category} delay={0.1 * gi}>
                  <div>
                    <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-neon-cyan">
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
