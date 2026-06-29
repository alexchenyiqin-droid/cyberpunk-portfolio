import { useNavigate } from 'react-router-dom'
import { posts } from '../data/posts'
import SectionHeading from './common/SectionHeading'
import Reveal from './common/Reveal'
import { ArrowIcon } from './common/Icons'

export default function Blog() {
  const navigate = useNavigate()

  return (
    <section id="blog" className="py-24 sm:py-32">
      <div className="container-base">
        <SectionHeading
          label="03"
          title="数据日志"
          subtitle="> 技术记录、项目复盘、碎片思考 —— 降序排列"
        />

        <div className="divide-y divide-void-600">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <button
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="group flex w-full flex-col gap-3 py-6 text-left transition-colors hover:bg-void-800/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white transition-colors group-hover:text-neon-pink">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-1 text-sm text-slate-400">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-neon-cyan/60">
                      [{post.date}]
                    </span>
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowIcon className="hidden h-5 w-5 shrink-0 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-neon-pink sm:block" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
