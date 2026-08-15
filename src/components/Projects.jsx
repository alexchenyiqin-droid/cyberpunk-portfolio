import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { projects } from '../data/projects'
import SectionHeading from './common/SectionHeading'
import Reveal from './common/Reveal'
import { ExternalIcon, GithubIcon, CloseIcon } from './common/Icons'

// 不同项目卡片的左上角霓虹渐变条配色
const accentMap = {
  cyan: 'from-neon-cyan to-neon-cyan/0',
  pink: 'from-neon-pink to-neon-pink/0',
  violet: 'from-neon-purple to-neon-purple/0',
  mixed: 'from-neon-pink via-neon-purple to-neon-cyan',
}

function ProjectCard({ project, index, onOpen }) {
  const reduce = useReducedMotion()
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [hover, setHover] = useState(false)

  const handleMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ rx: -py * 10, ry: px * 10 })
  }

  const handleLeave = () => {
    setTilt({ rx: 0, ry: 0 })
    setHover(false)
  }

  return (
    <Reveal delay={(index % 2) * 0.1}>
      <motion.article
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={handleLeave}
        onClick={() => onOpen(project)}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${hover && !reduce ? -6 : 0}px)`,
          transition: 'transform 160ms ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="card card-corner group relative h-full cursor-pointer overflow-hidden"
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

          {/* 链接 + 详情入口 */}
          <div className="mt-6 flex items-center justify-between border-t border-void-600 pt-4">
            <div className="flex items-center gap-4">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-neon-cyan"
                >
                  <ExternalIcon className="h-4 w-4" /> 演示
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-neon-pink"
                >
                  <GithubIcon className="h-4 w-4" /> 源码
                </a>
              )}
            </div>
            <span className="font-mono text-[11px] text-neon-cyan/60 transition-colors group-hover:text-neon-cyan">
              查看详情 ↗
            </span>
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}

function ProjectModal({ project, onClose }) {
  // Esc 关闭 + 打开时锁定页面滚动
  const handleKey = (e) => {
    if (e.key === 'Escape') onClose()
  }
  // 用 ref 绑定 keydown，避免依赖闭包
  const ref = (el) => {
    if (el) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-void-950/85 backdrop-blur-sm" />
      <motion.div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="card card-corner relative z-10 w-full max-w-lg overflow-hidden"
      >
        {/* 顶部霓虹渐变条 */}
        <div
          className={`h-1 w-full bg-gradient-to-r ${
            accentMap[project.accent] || accentMap.mixed
          }`}
        />

        <button
          onClick={onClose}
          aria-label="关闭"
          className="absolute right-4 top-4 text-slate-400 transition-colors hover:text-neon-pink"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="p-7">
          <p className="font-mono text-xs uppercase tracking-widest text-neon-pink/70">
            // PROJECT_DETAIL
          </p>
          <h3 className="mt-2 font-display text-2xl font-black uppercase tracking-wider text-white">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            {project.summary}
          </p>

          {/* 技术栈标签 */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          {/* 链接 */}
          <div className="mt-7 flex flex-wrap gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalIcon className="h-4 w-4" /> 在线演示
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <GithubIcon className="h-4 w-4" /> 源代码
              </a>
            )}
            {!project.demo && !project.repo && (
              <p className="font-mono text-xs text-slate-500">
                // 该项目暂未公开仓库链接
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="container-base">
        <SectionHeading
          label="02"
          title="数据终端"
          subtitle="> 已部署项目 / 开源仓库 —— 悬停可 3D 倾斜，点击卡片调取详情"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.id}
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
