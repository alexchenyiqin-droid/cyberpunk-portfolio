import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { posts } from '../data/posts'
import { ArrowIcon } from '../components/common/Icons'

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = posts.find((p) => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-display text-6xl font-black text-neon-pink animate-pulse-neon">404</p>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
          信号丢失 — 文档不存在
        </h1>
        <button onClick={() => navigate('/')} className="btn-secondary">
          返回首页
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      {/* 返回链接 */}
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-slate-400 transition-colors hover:text-neon-cyan"
      >
        <ArrowIcon className="h-4 w-4 rotate-180" /> 返回日志
      </Link>

      {/* 文章头部 */}
      <header className="mb-10 border-b border-void-600 pb-6">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-white sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-neon-cyan/60">
            [{post.date}]
          </span>
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* 正文 —— Markdown 渲染（赛博朋克配色） */}
      <article>
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => (
              <h2 className="font-display mt-10 mb-4 text-xl font-bold uppercase tracking-wider text-neon-cyan" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="font-display mt-8 mb-3 text-lg font-bold uppercase tracking-wider text-neon-pink" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="my-4 leading-relaxed text-slate-300" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="my-4 list-disc space-y-2 pl-6 text-slate-300 marker:text-neon-pink" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="my-4 list-decimal space-y-2 pl-6 text-slate-300 marker:text-neon-cyan" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="my-6 border-l-2 border-neon-purple bg-void-800/60 py-2 pl-4 italic text-slate-400"
                {...props}
              />
            ),
            code: ({ node, className, children, ...props }) => {
              const isBlock = /language-/.test(className || '')
              return isBlock ? (
                <code className="block overflow-x-auto rounded-sm border border-void-600 bg-void-900 p-4 font-mono text-sm text-neon-cyan" {...props}>
                  {children}
                </code>
              ) : (
                <code className="rounded-sm bg-void-700 px-1.5 py-0.5 font-mono text-sm text-neon-pink" {...props}>
                  {children}
                </code>
              )
            },
            a: ({ node, href, ...props }) => {
              // 阻止 javascript: / data: 等危险协议
              const safe = /^(https?:|\/|#|mailto:)/.test(href || '')
              return safe ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-neon-cyan underline underline-offset-2 hover:text-neon-pink" {...props} />
              ) : (
                <span className="text-neon-cyan underline underline-offset-2 hover:text-neon-pink" {...props} />
              )
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  )
}
