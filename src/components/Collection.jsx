import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collections, categories } from '../data/collection'
import SectionHeading from './common/SectionHeading'
import Reveal from './common/Reveal'
import { ExternalIcon } from './common/Icons'

const tabOrder = ['tool', 'miniapp', 'video', 'music', 'image']

export default function Collection() {
  const [activeTab, setActiveTab] = useState('tool')
  const filtered = useMemo(
    () => collections.filter((item) => item.type === activeTab),
    [activeTab],
  )

  return (
    <section id="collection" className="py-24 sm:py-32">
      <div className="container-base">
        <SectionHeading
          label="04"
          title="收藏·信号塔"
          subtitle="> 大王随手标记的好东西 —— 工具 / 程序 / 影音 / 图像，分类陈列"
        />

        {/* 分类切换标签 */}
        <div className="mb-10 flex flex-wrap gap-3">
          {tabOrder.map((key) => {
            const cat = categories[key]
            const count = collections.filter((i) => i.type === key).length
            const active = activeTab === key
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
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
                <span className={`ml-0.5 font-mono text-[11px] ${active ? 'text-neon-pink/60' : 'text-slate-600'}`}>
                  ({count})
                </span>
              </button>
            )
          })}
        </div>

        {/* 当前分类副标题 */}
        <p className="-mt-6 mb-8 font-mono text-[13px] text-slate-500">
          {categories[activeTab].subtitle}
        </p>

        {/* 内容网格 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.length === 0 ? (
              <div className="col-span-full flex flex-col items-center py-20">
                <span className="text-5xl opacity-30">{categories[activeTab].icon}</span>
                <p className="mt-4 font-mono text-sm text-slate-600">
                  [ 该分类暂无内容，等待大王投喂 ]
                </p>
              </div>
            ) : (
              filtered.map((item, i) => (
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
                            <span className="font-mono text-[11px] text-slate-600">
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
