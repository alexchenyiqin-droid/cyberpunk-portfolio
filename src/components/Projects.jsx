import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import SectionHeading from './common/SectionHeading'
import Reveal from './common/Reveal'
import { ExternalIcon, GithubIcon, CloseIcon } from './common/Icons'

const toneByAccent = {
  cyan: 'cyan',
  pink: 'mixed',
  violet: 'violet',
  mixed: 'mixed',
}

function ProjectVisual({ project, index }) {
  const tone = toneByAccent[project.accent] || 'cyan'
  return (
    <div className="project-visual flex items-end justify-between p-6" data-tone={tone}>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-300/70">
        Selected work / {String(index + 1).padStart(2, '0')}
      </span>
      <span className="font-display text-5xl font-black tracking-[-0.08em] text-white/[0.09]">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  )
}

function ProjectLinks({ project, compact = false }) {
  if (!project.demo && !project.repo) {
    return <span className="font-mono text-[11px] uppercase tracking-wide text-slate-500">Concept project · links in progress</span>
  }

  return (
    <div className={`flex flex-wrap ${compact ? 'gap-4' : 'gap-3'}`}>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-neon-cyan"
        >
          <ExternalIcon className="h-4 w-4" /> 在线演示
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-neon-cyan"
        >
          <GithubIcon className="h-4 w-4" /> 源码
        </a>
      )}
    </div>
  )
}

function ProjectCard({ project, index, onOpen }) {
  return (
    <Reveal delay={(index % 2) * 0.08}>
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ duration: 0.22 }}
        className="card group h-full overflow-hidden"
      >
        <ProjectVisual project={project} index={index} />
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-5">
            <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-white transition-colors group-hover:text-neon-cyan">
              {project.title}
            </h3>
            <button
              type="button"
              onClick={(event) => onOpen(project, event.currentTarget)}
              aria-haspopup="dialog"
              aria-label={`查看 ${project.title} 详情`}
              className="mt-0.5 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-neon-cyan"
            >
              Details ↗
            </button>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-400">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => <span key={tech} className="tag">{tech}</span>)}
          </div>
        </div>
        <div className="mx-6 border-t border-white/[0.07] py-4 sm:mx-7">
          <ProjectLinks project={project} />
        </div>
      </motion.article>
    </Reveal>
  )
}

function ProjectModal({ project, onClose, index, triggerRef }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const focusTimer = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.cancelAnimationFrame(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      window.requestAnimationFrame(() => triggerRef.current?.focus())
    }
  }, [onClose, triggerRef])

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="presentation"
    >
      <div className="absolute inset-0 bg-void-950/85 backdrop-blur-md" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} 项目详情`}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
        initial={{ scale: 0.97, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.98, y: 12, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="card relative z-10 my-auto w-full max-w-xl max-h-[calc(100dvh-2rem)] overflow-y-auto"
      >
        <ProjectVisual project={project} index={index} />
        <button
          type="button"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="关闭项目详情"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-void-950/50 text-slate-300 transition-colors hover:border-neon-cyan hover:text-neon-cyan"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
        <div className="p-7 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neon-cyan">Project overview</p>
          <h3 className="mt-3 font-display text-3xl font-black tracking-[-0.04em] text-white">{project.title}</h3>
          <p className="mt-5 text-sm leading-7 text-slate-300">{project.summary}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.tech.map((tech) => <span key={tech} className="tag">{tech}</span>)}
          </div>
          <div className="mt-8 border-t border-white/[0.08] pt-5">
            <ProjectLinks project={project} compact />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const triggerRef = useRef(null)
  const selectedIndex = selected ? projects.findIndex((project) => project.id === selected.id) : 0
  const closeProject = useCallback(() => setSelected(null), [])
  const openProject = useCallback((project, trigger) => {
    triggerRef.current = trigger
    setSelected(project)
  }, [])

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="container-base">
        <SectionHeading
          label="02"
          title="精选项目"
          subtitle="围绕产品体验与工程实现的持续探索。点击卡片查看技术构成与可用链接。"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={openProject} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && <ProjectModal project={selected} index={selectedIndex} onClose={closeProject} triggerRef={triggerRef} />}
      </AnimatePresence>
    </section>
  )
}
