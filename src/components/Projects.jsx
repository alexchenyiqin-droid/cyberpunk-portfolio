import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import SectionHeading from './common/SectionHeading'
import Reveal from './common/Reveal'
import { ExternalIcon, GithubIcon } from './common/Icons'

// 不同项目卡片的左上角霓虹渐变条配色
const accentMap = {
  cyan: 'from-neon-cyan to-neon-cyan/0',
  pink: 'from-neon-pink to-neon-pink/0',
  mixed: 'from-neon-pink via-neon-purple to-neon-cyan',
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="container-base">
        <SectionHeading
          label="02"
          title="数据终端"
          subtitle="> 已部署项目 / 开源仓库 —— 扫描下方条目获取详情"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="card card-corner group relative h-full overflow-hidden"
              >
                {/* 顶部霓虹渐变条 */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${
                    accentMap[project.accent] || accentMap.mixed
                  }`}
                />

                <div className="p-6">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white transition-colors group-hover:text-neon-cyan">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {project.summary}
                  </p>

                  {/* 技术栈标签 */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* 链接 */}
                  <div className="mt-6 flex items-center gap-4 border-t border-void-600 pt-4">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-neon-cyan"
                      >
                        <ExternalIcon className="h-4 w-4" /> 演示
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-neon-pink"
                      >
                        <GithubIcon className="h-4 w-4" /> 源码
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
