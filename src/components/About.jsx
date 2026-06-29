import { profile } from '../data/profile'
import SectionHeading from './common/SectionHeading'
import Reveal from './common/Reveal'

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container-base">
        <SectionHeading
          label="01"
          title="身份档案"
          subtitle="> 加载用户数据流 ..."
        />

        <div className="grid gap-12 md:grid-cols-[auto_1fr] md:items-start">
          {/* 左侧：头像方块 —— 终端 ID 卡风格 */}
          <Reveal className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* 霓虹辉光 */}
              <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-neon-pink to-neon-cyan opacity-40 blur-lg" />
              {/* 头像方块 + 四角装饰 */}
              <div className="card relative flex h-40 w-40 items-center justify-center font-display text-6xl font-black">
                <span className="text-gradient">{profile.alias.charAt(0)}</span>
                {/* 四角科幻装饰线 */}
                <span className="absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-neon-cyan" />
                <span className="absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-neon-cyan" />
                <span className="absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-neon-pink" />
                <span className="absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-neon-pink" />
              </div>
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
                      {'>'} {group.category}_modules
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
