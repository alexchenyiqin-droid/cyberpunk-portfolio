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
      {/* Hero 几何全息层 —— 纯 SVG 绘制，无图片，跟随霓虹配色 */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* 右侧全息环 HUD */}
        <div className="absolute right-[6%] top-1/2 hidden aspect-square h-[58vh] max-h-[640px] -translate-y-1/2 lg:block xl:h-[78vh] xl:max-h-[820px]">
          {/* 外环：刻度 */}
          <svg viewBox="0 0 400 400" className="h-full w-full animate-[spin_70s_linear_infinite]" style={{ color: 'rgb(var(--neon-cyan))' }}>
            <circle cx="200" cy="200" r="192" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 9" />
            <circle cx="200" cy="200" r="176" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="46 14" />
          </svg>
          {/* 中环：反向旋转，粉 */}
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-[spin_44s_linear_infinite_reverse]" style={{ color: 'rgb(var(--neon-pink))' }}>
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="3 10" />
            <path d="M200 36 L200 64 M200 336 L200 364 M36 200 L64 200 M336 200 L364 200" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2" />
          </svg>
          {/* 内环：快速旋转，青 + 节点 */}
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]" style={{ color: 'rgb(var(--neon-cyan))' }}>
            <circle cx="200" cy="200" r="118" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="118" fill="none" stroke="rgb(var(--neon-pink))" strokeOpacity="0.55" strokeWidth="3" strokeDasharray="5 16" />
            <circle cx="200" cy="82" r="4" fill="currentColor" />
            <circle cx="289" cy="245" r="4" fill="currentColor" />
            <circle cx="111" cy="245" r="4" fill="currentColor" />
          </svg>
          {/* 中心脉冲节点 + 状态字 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono">
            <div className="mx-auto h-3 w-3 rounded-full bg-neon-cyan shadow-neon-cyan animate-pulse-neon" />
            <div className="mt-2 text-[10px] tracking-[0.3em] text-neon-cyan/70">SYS//ONLINE</div>
            <div className="text-[10px] tracking-[0.3em] text-neon-pink/60">v2.077</div>
          </div>
        </div>

        {/* 左侧浮动几何碎片 —— 填充页左留白，呼应 HUD */}
        <svg viewBox="0 0 100 100" className="absolute left-[7%] top-[16%] h-24 w-24 animate-float" style={{ color: 'rgb(var(--neon-purple))' }}>
          <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="2" transform="rotate(45 50 50)" />
          <circle cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.7" />
        </svg>
        <svg viewBox="0 0 100 100" className="absolute bottom-[18%] left-[12%] h-14 w-14 animate-float [animation-delay:1.4s]" style={{ color: 'rgb(var(--neon-cyan))' }}>
          <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 6" />
          <line x1="50" y1="16" x2="50" y2="84" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <line x1="16" y1="50" x2="84" y2="50" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 透视网格地板 —— 赛博朋克标志元素 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] overflow-hidden">
        <div
          className="animate-grid-flow absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgb(var(--neon-pink) / 0.35) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--neon-cyan) / 0.25) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(400px) rotateX(60deg)',
            transformOrigin: 'bottom',
            maskImage: 'linear-gradient(to top, black 10%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 90%)',
          }}
        />
      </div>

      {/* 霓虹辉光雾 —— 四色错落闪烁，远处城市招牌感 */}
      <div className="animate-flicker pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-neon-pink/16 hero-blob" />
      <div className="animate-flicker-fast pointer-events-none absolute -right-32 bottom-1/4 h-72 w-72 rounded-full bg-neon-cyan/15 hero-blob" />
      <div className="animate-flicker-slow pointer-events-none absolute left-1/3 top-0 h-64 w-64 rounded-full bg-neon-purple/13 hero-blob" />
      <div className="animate-flicker pointer-events-none absolute right-1/4 top-1/3 h-56 w-56 rounded-full bg-neon-yellow/10 hero-blob" />

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
          <span className="block text-white">你好，我是</span>
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
