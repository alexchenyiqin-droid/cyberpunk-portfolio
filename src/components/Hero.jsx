import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import useTypewriter from '../hooks/useTypewriter'
import { ArrowIcon } from './common/Icons'

export default function Hero() {
  const { text } = useTypewriter(profile.roles)

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero-surface relative flex min-h-[92svh] items-center overflow-hidden pt-16">
      <div className="hero-orbit hero-orbit-large" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-small" aria-hidden="true" />
      <div className="container-base relative z-10 grid items-center gap-16 py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)] lg:py-32">
        <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-neon-cyan/25 bg-void-800/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-45" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
          </span>
          {profile.status}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl font-display text-5xl font-black leading-[0.94] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl"
        >
          <span className="block text-slate-300">你好，我是</span>
          <span className="mt-3 block text-gradient">{profile.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 flex items-center gap-3 font-mono text-sm uppercase tracking-[0.18em] text-neon-cyan sm:text-base"
        >
          <span className="h-px w-8 bg-neon-cyan/60" />
          <span>{text}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400 sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <button onClick={() => scrollTo('projects')} className="btn-primary">
            查看项目 <ArrowIcon className="h-4 w-4" />
          </button>
          <button onClick={() => scrollTo('contact')} className="btn-secondary">
            联系我
          </button>
        </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="relative max-w-md justify-self-end border-l border-neon-cyan/30 pl-7 lg:mr-8"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neon-cyan">Selected focus</p>
          <p className="mt-4 font-display text-3xl font-bold leading-tight text-white">产品体验<br />与全栈工程</p>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">从界面到服务端，把技术选择落实为易用、稳定且便于持续迭代的体验。</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Node.js', 'Open source'].map((item) => (
              <span key={item} className="tag">{item}</span>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
