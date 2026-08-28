import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/common/Seo'

const emptyProject = () => ({
  id: '', title: '', summary: '', tech: [], demo: '', repo: '', accent: 'cyan',
})
const emptyPost = () => ({
  slug: '', title: '', excerpt: '', date: new Date().toISOString().slice(0, 10), tags: [], content: '',
})

function tagsToText(tags) {
  return (tags || []).join(', ')
}

function textToTags(value) {
  return value.split(',').map((item) => item.trim()).filter(Boolean)
}

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-wider text-neon-cyan/80">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  )
}

const inputClass = 'mt-2 w-full rounded-sm border border-void-600 bg-void-950/70 px-3 py-2.5 text-sm text-white outline-none transition focus:border-neon-cyan'

function Login({ onLogin, error, busy }) {
  const [password, setPassword] = useState('')
  const submit = (event) => {
    event.preventDefault()
    onLogin(password)
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6 py-16">
      <Seo title="内容后台" description="网站内容管理入口" noindex />
      <form onSubmit={submit} className="card card-corner w-full p-8">
        <p className="font-mono text-xs tracking-[0.2em] text-neon-cyan">// ADMIN_CONSOLE</p>
        <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-wider text-white">内容后台</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">验证后可更新作品与文章；保存会创建一次 GitHub 提交并自动部署。</p>
        <Field label="管理密码">
          <input className={inputClass} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Field>
        {error && <p role="alert" className="mt-4 text-sm text-neon-pink">{error}</p>}
        <button className="btn-primary mt-6 w-full" disabled={busy}>{busy ? '验证中…' : '进入后台'}</button>
        <Link to="/" className="mt-5 block text-center text-sm text-slate-500 hover:text-neon-cyan">返回网站首页</Link>
      </form>
    </main>
  )
}

function ProjectEditor({ item, onChange }) {
  const set = (key, value) => onChange({ ...item, [key]: value })
  return <div className="space-y-5">
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="项目名称"><input className={inputClass} value={item.title} onChange={(e) => set('title', e.target.value)} /></Field>
      <Field label="标识 ID" hint="小写英文、数字与连字符；发布后不要随意改动。"><input className={inputClass} value={item.id} onChange={(e) => set('id', e.target.value)} /></Field>
    </div>
    <Field label="一句话介绍"><textarea className={inputClass} rows="3" value={item.summary} onChange={(e) => set('summary', e.target.value)} /></Field>
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="技术栈" hint="用英文逗号分隔"><input className={inputClass} value={tagsToText(item.tech)} onChange={(e) => set('tech', textToTags(e.target.value))} /></Field>
      <Field label="主题色"><select className={inputClass} value={item.accent} onChange={(e) => set('accent', e.target.value)}><option value="cyan">青色</option><option value="violet">紫色</option><option value="mixed">混合色</option><option value="pink">粉色</option></select></Field>
    </div>
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="在线演示链接"><input className={inputClass} type="url" placeholder="https://" value={item.demo} onChange={(e) => set('demo', e.target.value)} /></Field>
      <Field label="源码链接"><input className={inputClass} type="url" placeholder="https://github.com/..." value={item.repo} onChange={(e) => set('repo', e.target.value)} /></Field>
    </div>
  </div>
}

function PostEditor({ item, onChange }) {
  const set = (key, value) => onChange({ ...item, [key]: value })
  return <div className="space-y-5">
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="文章标题"><input className={inputClass} value={item.title} onChange={(e) => set('title', e.target.value)} /></Field>
      <Field label="发布日期"><input className={inputClass} type="date" value={item.date} onChange={(e) => set('date', e.target.value)} /></Field>
    </div>
    <Field label="链接标识" hint="将生成 /blog/这里的内容"><input className={inputClass} value={item.slug} onChange={(e) => set('slug', e.target.value)} /></Field>
    <Field label="摘要"><textarea className={inputClass} rows="3" value={item.excerpt} onChange={(e) => set('excerpt', e.target.value)} /></Field>
    <Field label="标签" hint="用英文逗号分隔"><input className={inputClass} value={tagsToText(item.tags)} onChange={(e) => set('tags', textToTags(e.target.value))} /></Field>
    <Field label="正文（Markdown）"><textarea className={`${inputClass} font-mono leading-6`} rows="16" value={item.content} onChange={(e) => set('content', e.target.value)} /></Field>
  </div>
}

export default function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('admin-password') || '')
  const [data, setData] = useState(null)
  const [active, setActive] = useState('projects')
  const [selected, setSelected] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const request = async (method, body) => {
    const response = await fetch('/api/admin/content', {
      method,
      headers: { Authorization: `Bearer ${password}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.error || '请求失败，请稍后重试。')
    return result
  }

  const load = async (candidate = password) => {
    setBusy(true); setError(''); setMessage('')
    try {
      const previous = password
      if (candidate !== previous) setPassword(candidate)
      const response = await fetch('/api/admin/content', { headers: { Authorization: `Bearer ${candidate}` } })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || '验证失败。')
      sessionStorage.setItem('admin-password', candidate)
      setData(result); setSelected(0)
    } catch (err) {
      sessionStorage.removeItem('admin-password'); setPassword(''); setError(err.message)
    } finally { setBusy(false) }
  }

  useEffect(() => { if (password && !data) load(password) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const items = useMemo(() => data?.[active] || [], [data, active])
  const current = items[selected]
  const updateCurrent = (value) => setData((old) => ({ ...old, [active]: old[active].map((item, index) => index === selected ? value : item) }))
  const add = () => {
    setData((old) => ({ ...old, [active]: [...old[active], active === 'projects' ? emptyProject() : emptyPost()] }))
    setSelected(items.length)
  }
  const remove = () => {
    if (!current || !window.confirm(`确定删除“${current.title || current.id || current.slug}”吗？`)) return
    setData((old) => ({ ...old, [active]: old[active].filter((_, index) => index !== selected) }))
    setSelected(Math.max(0, selected - 1))
  }
  const save = async () => {
    setBusy(true); setError(''); setMessage('')
    try {
      await request('PUT', data)
      setMessage('已保存至 GitHub，网站正在自动部署。')
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  const logout = () => { sessionStorage.removeItem('admin-password'); setPassword(''); setData(null); setMessage('') }

  if (!data) return <Login onLogin={load} error={error} busy={busy} />

  return <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6">
    <Seo title="内容后台" description="网站内容管理入口" noindex />
    <header className="flex flex-col gap-5 border-b border-void-600 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="font-mono text-xs tracking-[0.2em] text-neon-cyan">// CONTENT_CONTROL</p><h1 className="mt-2 font-display text-3xl font-black uppercase text-white">内容后台</h1><p className="mt-2 text-sm text-slate-400">保存后自动提交并触发部署。</p></div>
      <div className="flex gap-3"><Link className="btn-secondary px-4 py-2 text-sm" to="/">查看网站</Link><button className="btn-secondary px-4 py-2 text-sm" onClick={logout}>退出</button></div>
    </header>
    <div className="mt-7 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="card h-fit p-3"><button className={`w-full rounded-sm px-4 py-3 text-left font-display ${active === 'projects' ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-slate-400'}`} onClick={() => { setActive('projects'); setSelected(0) }}>作品 <span className="float-right font-mono text-xs">{data.projects.length}</span></button><button className={`mt-1 w-full rounded-sm px-4 py-3 text-left font-display ${active === 'posts' ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-slate-400'}`} onClick={() => { setActive('posts'); setSelected(0) }}>文章 <span className="float-right font-mono text-xs">{data.posts.length}</span></button><button className="btn-secondary mt-4 w-full px-3 py-2 text-sm" onClick={add}>+ 新增{active === 'projects' ? '作品' : '文章'}</button><div className="mt-4 max-h-72 space-y-1 overflow-y-auto">{items.map((item, index) => <button key={item.id || item.slug || index} className={`w-full rounded-sm px-3 py-2 text-left text-sm ${selected === index ? 'bg-void-700 text-white' : 'text-slate-500 hover:bg-void-800 hover:text-slate-300'}`} onClick={() => setSelected(index)}>{item.title || '未命名内容'}</button>)}</div></aside>
      <section className="card card-corner min-w-0 p-5 sm:p-7"><div className="mb-6 flex items-center justify-between gap-4"><div><p className="font-mono text-xs text-neon-pink">// EDITOR</p><h2 className="mt-1 font-display text-xl font-bold text-white">{current?.title || '新内容'}</h2></div>{current && <button className="text-sm text-slate-500 hover:text-neon-pink" onClick={remove}>删除</button>}</div>{current ? (active === 'projects' ? <ProjectEditor item={current} onChange={updateCurrent} /> : <PostEditor item={current} onChange={updateCurrent} />) : <p className="py-16 text-center text-slate-500">暂无内容，点击左侧按钮新建。</p>}<div className="mt-8 flex flex-wrap items-center gap-4 border-t border-void-600 pt-5"><button className="btn-primary px-5 py-2.5 text-sm" onClick={save} disabled={busy}>{busy ? '保存中…' : '保存并部署'}</button>{message && <p role="status" className="text-sm text-neon-cyan">{message}</p>}{error && <p role="alert" className="text-sm text-neon-pink">{error}</p>}</div></section>
    </div>
  </main>
}
