import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import useTypewriter from '../hooks/useTypewriter'
import { ArrowIcon } from './common/Icons'

export default function Hero() {
  const { text } = useTypewriter(profile.roles)

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* 透视网格地板 —— 赛博朋克标志元素 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 42, 109, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(5, 217, 232, 0.25) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(400px) rotateX(60deg)',
            transformOrigin: 'bottom',
            maskImage: 'linear-gradient(to top, black 10%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 90%)',
          }}
        />
      </div>

      {/* 霓虹辉光雾 */}
      <div className="animate-flicker pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-neon-pink/20 blur-[120px]" />
      <div className="animate-flicker pointer-events-none absolute -right-32 bottom-1/4 h-72 w-72 rounded-full bg-neon-cyan/20 blur-[120px]" />

      <div className="container-base relative z-10">
        {/* 终端状态行 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-sm border border-void-600 bg-void-800/60 px-4 py-1.5 font-mono text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="text-green-400">{profile.status}</span>
        </motion.p>

        {/* 主标题 —— 故障效果 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-5xl font-black leading-tight sm:text-6xl lg:text-7xl"
        >
          <span className="block text-slate-200">你好，我是</span>
          <span
            className="glitch mt-2 inline-block"
            data-text={profile.name}
          >
            {profile.name}
          </span>
        </motion.h1>

        {/* 终端打字机行 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 font-mono text-lg sm:text-xl"
        >
          <span className="text-neon-pink">root@cyber</span>
          <span className="text-slate-500">:~$ </span>
          <span className="text-neon-cyan">{text}</span>
          <span className="cursor-blink text-neon-cyan">▋</span>
        </motion.div>

        {/* 一句话简介 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 max-w-xl text-lg text-slate-400"
        >
          {profile.tagline}
        </motion.p>

        {/* CTA 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button onClick={() => scrollTo('projects')} className="btn-primary">
            进入矩阵 <ArrowIcon className="h-4 w-4" />
          </button>
          <button onClick={() => scrollTo('contact')} className="btn-secondary">
            建立连接
          </button>
        </motion.div>
      </div>

      {/* 底部滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-sm border border-neon-cyan/50 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-neon-cyan" />
        </div>
      </motion.div>
    </section>
  )
}
