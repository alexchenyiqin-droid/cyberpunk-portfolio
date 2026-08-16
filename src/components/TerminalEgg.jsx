import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * 终端彩蛋：右下角常驻入口，点击打开全屏终端 overlay。
 * 支持若干趣味指令 + 命令历史（上下键回溯）+ Esc 关闭。
 */
function runCommand(raw, scrollToSection) {
  const cmd = raw.trim()
  if (!cmd) return []
  const [name, ...args] = cmd.split(/\s+/)
  const lc = name.toLowerCase()
  switch (lc) {
    case 'help':
      return [
        '可用指令：',
        '  help              显示本帮助',
        '  whoami            你是谁',
        '  ls                列出站点区块',
        '  open <区块>       跳转：about / projects / blog / collection / contact',
        '  cat <文件>        读取：about.txt',
        '  neofetch          系统信息',
        '  date              当前时间',
        '  echo <文本>       回显',
        '  sudo              尝试提权（后果自负）',
        '  clear             清屏',
        '  exit / close      关闭终端',
      ]
    case 'whoami':
      return ['visitor // 未授权访客 —— 欢迎来到夜之城']
    case 'ls':
      return ['about.txt   projects/   blog/   collection/   contact.cfg']
    case 'cat': {
      const file = (args[0] || '').toLowerCase()
      if (file === 'about.txt')
        return [
          'Alex Chen —— 对赛博朋克充满热情的全栈开发者。',
          '平时探索新技术，把脑洞变成现实。',
        ]
      return [`cat: ${args[0] || ''}: 没有那个文件`]
    }
    case 'open': {
      const map = {
        about: 'about',
        projects: 'projects',
        blog: 'blog',
        collection: 'collection',
        contact: 'contact',
      }
      const target = map[(args[0] || '').toLowerCase()]
      if (target) {
        scrollToSection(target)
        return [`> 正在跳转至 ${target} ...`]
      }
      return [
        `open: 未知区块「${args[0] || ''}」。可用：about / projects / blog / collection / contact`,
      ]
    }
    case 'neofetch':
      return [
        '        ___         visitor@cyberdeck',
        '       /   \\        ------------------',
        '      | o o |       OS:     NIGHT_CITY 2.6',
        '      |  ^  |       Shell:  zsh 5.9',
        '       \\___/        Uptime: 很久了',
        '                   Theme:  NEON_DARK',
      ]
    case 'date':
      return [new Date().toString()]
    case 'echo':
      return [args.join(' ')]
    case 'sudo':
      return ['visitor 不在 sudoers 文件中。', '此事将被报告。 ;)']
    case 'clear':
      return ['__CLEAR__']
    case 'exit':
    case 'close':
    case 'q':
      return ['__CLOSE__']
    default:
      return [`command not found: ${name}  —— 输入 help 查看可用指令`]
  }
}

export default function TerminalEgg() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState([
    { t: 'sys', s: '// NEON_TERMINAL v2.6 —— 输入 help 查看指令' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const dialogRef = useRef(null)

  const scrollToSection = (id) => {
    setOpen(false)
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
      140,
    )
  }

  // 打开时聚焦输入框；输出变动后滚动到底
  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
    }
  }, [open, lines])

  // 弹层打开后锁定背景滚动，并将键盘焦点限制在终端内。
  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const focusableSelector = 'button, input, [href], [tabindex]:not([tabindex="-1"])'
    const onDocumentKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return
      const focusable = [...(dialogRef.current?.querySelectorAll(focusableSelector) || [])]
      if (!focusable.length) return
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

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onDocumentKeyDown)
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onDocumentKeyDown)
      previousFocus?.focus?.()
    }
  }, [open])

  const submit = () => {
    const raw = input
    const trimmed = raw.trim()
    const echo = { t: 'cmd', s: `visitor@cyberdeck:~$ ${raw}` }
    const out = runCommand(raw, scrollToSection)

    if (out.includes('__CLEAR__')) {
      setLines([])
      if (trimmed) {
        setHistory((h) => [...h, trimmed])
        setHistIdx(-1)
      }
      setInput('')
      return
    }
    if (out.includes('__CLOSE__')) {
      setOpen(false)
      if (trimmed) {
        setHistory((h) => [...h, trimmed])
        setHistIdx(-1)
      }
      setInput('')
      return
    }

    const outLines = out.map((s) => ({ t: 'out', s }))
    setLines((prev) => [...prev, echo, ...outLines])
    if (trimmed) {
      setHistory((h) => [...h, trimmed])
      setHistIdx(-1)
    }
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const ni = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(ni)
      setInput(history[ni])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx < 0) return
      const ni = histIdx + 1
      if (ni >= history.length) {
        setHistIdx(-1)
        setInput('')
      } else {
        setHistIdx(ni)
        setInput(history[ni])
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const lineColor = (t) => {
    if (t === 'cmd') return 'text-neon-cyan'
    if (t === 'sys') return 'text-neon-purple/70'
    if (t === 'err') return 'text-neon-pink'
    return 'text-slate-300'
  }

  return (
    <>
      {/* 常驻入口 */}
      <button
        onClick={() => setOpen(true)}
        aria-label="打开终端"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-lg border border-neon-cyan/40 bg-void-950/80 font-mono text-lg text-neon-cyan shadow-neon-cyan transition-all hover:bg-void-800 hover:shadow-glow-cyan"
      >
        {'>_'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-void-950/85 backdrop-blur-sm" />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="terminal-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="relative z-10 flex h-[70vh] max-h-[640px] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-neon-cyan/40 bg-void-950/95 shadow-glow-cyan"
            >
              {/* 标题栏 */}
              <div className="flex items-center justify-between border-b border-neon-cyan/30 px-4 py-2.5">
                <span id="terminal-title" className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
                  // NEON_TERMINAL
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="关闭终端"
                  className="font-mono text-sm text-slate-400 transition-colors hover:text-neon-pink"
                >
                  [ 关闭 ✕ ]
                </button>
              </div>

              {/* 输出区 */}
              <div
                ref={bodyRef}
                className="flex-1 overflow-y-auto px-4 py-3 font-mono text-sm leading-relaxed"
              >
                {lines.map((l, i) => (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap break-words ${lineColor(l.t)}`}
                  >
                    {l.s}
                  </div>
                ))}
              </div>

              {/* 输入行 */}
              <div className="flex items-center gap-2 border-t border-neon-cyan/30 px-4 py-3 font-mono text-sm">
                <span className="shrink-0 text-neon-cyan">visitor@cyberdeck:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="终端输入"
                  className="flex-1 bg-transparent text-slate-200 caret-neon-pink focus:outline-none"
                />
                <span className="cursor-blink shrink-0 text-neon-pink">▋</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
