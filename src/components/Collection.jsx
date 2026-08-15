import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collections, categories } from '../data/collection'
import SectionHeading from './common/SectionHeading'
import Reveal from './common/Reveal'
import { ExternalIcon, SearchIcon } from './common/Icons'

const tabOrder = ['tool', 'miniapp', 'video', 'music', 'image']

export default function Collection() {
  const [activeTab, setActiveTab] = useState('tool')
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const searching = query.trim().length > 0

  const displayed = useMemo(() => {
    const q = query.trim().toLowerCase()
    // 搜索时跨分类匹配；否则按当前分类过滤
    if (!q) return collections.filter((i) => i.type === activeTab)
    return collections.filter((i) =>
      (i.title + ' ' + i.desc + ' ' + (i.source || '') + ' ' + i.type)
        .toLowerCase()
        .includes(q),
    )
  }, [query, activeTab])

  return (
    <section id="collection" className="py-24 sm:py-32">
      <div className="container-base">
        <SectionHeading
          label="04"
          title="收藏·信号塔"
          subtitle="> 大王随手标记的好东西 —— 工具 / 程序 / 影音 / 图像，分类陈列"
        />

        {/* 实时搜索框 */}
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-void-600 bg-void-800/60 px-4 py-3 transition-all focus-within:border-neon-cyan/60 focus-within:shadow-neon-cyan">
          <SearchIcon className="h-5 w-5 shrink-0 text-neon-cyan/70" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setQuery('')
                inputRef.current?.blur()
              }
            }}
            placeholder="检索信号 // 标题 · 描述 · 来源"
            aria-label="搜索收藏"
            className="w-full bg-transparent font-mono text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none"
          />
          {searching && (
            <button
              onClick={() => setQuery('')}
              aria-label="清除搜索"
              className="shrink-0 font-mono text-xs text-slate-500 transition-colors hover:text-neon-pink"
            >
              [ 清除 ]
            </button>
          )}
        </div>

        {/* 分类切换标签 */}
        <div className="mb-4 flex flex-wrap gap-3">
          {tabOrder.map((key) => {
            const cat = categories[key]
            const count = collections.filter((i) => i.type === key).length
            const active = !searching && activeTab === key
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key)
                  setQuery('')
                }}
                className={`group flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-all duration-200
                  ${active
                    ? 'bg-neon-pink/15 text-neon-pink shadow-[0_0_12px_rgba(236,72,153,0.2)]'
                    : 'bg-void-800 text-slate-400 hover:bg-void-700 hover:text-slate-200'
                  }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span className="font-display text-xs font-semibold uppercase tracking-widest">
                  {cat.label}
                </span>
                <span className={`ml-0.5 font-mono text-[11px] ${active ? 'text-neon-pink/60' : 'text-slate-500'}`}>
                  ({count})
                </span>
              </button>
            )
          })}
        </div>

        {/* 状态说明 */}
        <p className="mb-8 font-mono text-[13px] text-slate-500">
          {searching
            ? `// 检索「${query.trim()}」 —— 命中 ${displayed.length} 条信号`
            : categories[activeTab].subtitle}
        </p>

        {/* 内容网格 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={searching ? 'search:' + query : activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayed.length === 0 ? (
              <div className="col-span-full flex flex-col items-center py-20">
                <span className="text-5xl opacity-30">📡</span>
                <p className="mt-4 font-mono text-sm text-slate-600">
                  {searching
                    ? '[ 未捕获到匹配信号，换个关键词试试 ]'
                    : '[ 该分类暂无内容，等待大王投喂 ]'}
                </p>
              </div>
            ) : (
              displayed.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.06}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="card card-corner group relative flex h-full flex-col overflow-hidden"
                  >
                    {/* 图标区域 */}
                    <div className="flex h-28 items-center justify-center bg-void-900/60 text-5xl transition-colors group-hover:bg-void-800/60">
                      {item.icon}
                    </div>

                    {/* 内容 */}
                    <div className="flex flex-1 flex-col p-5">
                      {searching && (
                        <span className="mb-2 inline-flex w-fit items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-neon-purple/70">
                          {categories[item.type].icon} {categories[item.type].label}
                        </span>
                      )}
                      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white transition-colors group-hover:text-neon-cyan">
                        {item.title}
                      </h3>
                      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-400">
                        {item.desc}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-void-600 pt-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-neon-cyan/60">
                            [{item.date}]
                          </span>
                          {item.source && (
                            <span className="font-mono text-[11px] text-slate-500">
                              via {item.source}
                            </span>
                          )}
                        </div>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[11px] text-slate-500 transition-colors hover:text-neon-pink"
                          >
                            <ExternalIcon className="h-3.5 w-3.5" />
                            访问
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </Reveal>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
