import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import SectionHeading from './common/SectionHeading'
import Reveal from './common/Reveal'
import { ExternalIcon, GithubIcon, CloseIcon } from './common/Icons'

const numberOf = (index) => String(index + 1).padStart(2, '0')

function ProjectLinks({ project, compact = false }) {
  if (!project.demo && !project.repo) {
    return <span className="rt text-[11px] font-bold uppercase tracking-[0.14em] text-mute">Concept project · links in progress</span>
  }

  return (
    <div className={`flex flex-wrap ${compact ? 'gap-4' : 'gap-x-6 gap-y-2'}`}>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="rt inline-flex items-center gap-1.5 text-sm text-silver transition-colors hover:text-paint"
        >
          <ExternalIcon className="h-4 w-4" /> 在线演示
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="rt inline-flex items-center gap-1.5 text-sm text-silver transition-colors hover:text-paint"
        >
          <GithubIcon className="h-4 w-4" /> 源码
        </a>
      )}
    </div>
  )
}

/** 一条「车道」：描边大号数字 + 标题 + 技术栈 + 简介；悬停整行反白 */
function ProjectRow({ project, index, onOpen }) {
  return (
    <li>
      <div className="dash-h" aria-hidden="true" />
      <Reveal delay={(index % 2) * 0.08}>
        <article className="lane-row">
          <span className="lane-num giant" aria-hidden="true">
            {numberOf(index)}
          </span>
          <div className="min-w-0 flex-1 basis-80">
            <h3 className="lane-title rt">{project.title}</h3>
            <p className="lane-tech rt">{project.tech.join(' / ')}</p>
            <p className="lane-sum rt">{project.summary}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
              <button
                type="button"
                onClick={(event) => onOpen(project, event.currentTarget)}
                aria-haspopup="dialog"
                aria-label={`查看 ${project.title} 详情`}
                className="rt inline-flex min-h-[44px] items-center text-sm font-black tracking-[0.1em] text-paint"
              >
                详情 →
              </button>
              <ProjectLinks project={project} />
            </div>
          </div>
          {/* 有截图才显示：在 projects.json 里给项目加 "image": "/projects/xxx.webp" */}
          {project.image && (
            <div className="lane-thumb">
              <img src={project.image} alt={`${project.title} 截图`} loading="lazy" decoding="async" />
            </div>
          )}
        </article>
      </Reveal>
    </li>
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
      <div className="absolute inset-0 bg-void-950/90 backdrop-blur-md" />
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
        className="sign-frame relative z-10 my-auto max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto bg-void-900"
      >
        <button
          type="button"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="关闭项目详情"
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-paint/60 text-paint transition-colors hover:bg-paint hover:text-void-900"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
        <div className="p-8 sm:p-10">
          <span className="plate">{numberOf(index)}</span>
          <h3 className="mt-5 pr-12 text-3xl font-black leading-tight text-[#f4f4f2]">{project.title}</h3>
          <p className="mt-2 text-sm tracking-[0.1em] text-mute">{project.tech.join(' / ')}</p>
          <p className="mt-6 text-base leading-8 text-silver">{project.summary}</p>
          <div className="dash-h mt-8" aria-hidden="true" />
          <div className="pt-5">
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
    <section id="projects" className="panel">
      <SectionHeading label="01" en="Work" title="作品" meta={`SELECTED — ${String(projects.length).padStart(2, '0')}`} />
      <ul className="m-0 list-none p-0">
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} onOpen={openProject} />
        ))}
        <li aria-hidden="true">
          <div className="dash-h" />
        </li>
      </ul>
      <AnimatePresence>
        {selected && <ProjectModal project={selected} index={selectedIndex} onClose={closeProject} triggerRef={triggerRef} />}
      </AnimatePresence>
    </section>
  )
}
