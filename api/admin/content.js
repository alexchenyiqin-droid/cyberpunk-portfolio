import { timingSafeEqual } from 'node:crypto'

const owner = process.env.GITHUB_REPOSITORY_OWNER || 'alexchenyiqin-droid'
const repo = process.env.GITHUB_REPOSITORY_NAME || 'cyberpunk-portfolio'
const branch = process.env.GITHUB_CONTENT_BRANCH || 'main'
const paths = {
  projects: 'src/content/projects.json',
  posts: 'src/content/posts.json',
}

function send(res, status, payload) {
  res.setHeader('Cache-Control', 'no-store')
  return res.status(status).json(payload)
}

function isAuthorized(req) {
  const expected = process.env.ADMIN_PASSWORD
  const supplied = req.headers.authorization?.replace(/^Bearer\s+/i, '') || ''
  if (!expected || !supplied) return false
  const left = Buffer.from(expected)
  const right = Buffer.from(supplied)
  return left.length === right.length && timingSafeEqual(left, right)
}

function github(path, options = {}) {
  const token = process.env.GITHUB_CONTENT_TOKEN
  if (!token) throw new Error('服务端尚未配置 GITHUB_CONTENT_TOKEN。')
  return fetch(`https://api.github.com/repos/${owner}/${repo}${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'alex9527-content-admin',
      ...(options.headers || {}),
    },
  })
}

async function githubJson(path, options) {
  const response = await github(path, options)
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.message || 'GitHub 请求失败。')
  return result
}

async function readContent(path) {
  const item = await githubJson(`/contents/${path}?ref=${encodeURIComponent(branch)}`)
  return { sha: item.sha, data: JSON.parse(Buffer.from(item.content, 'base64').toString('utf8')) }
}

function validUrl(value) {
  if (!value) return true
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch { return false }
}

function cleanText(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function unique(values) {
  return [...new Set(values)]
}

function validateProjects(items) {
  if (!Array.isArray(items) || items.length > 30) throw new Error('作品数量无效。')
  const ids = new Set()
  return items.map((item) => {
    const id = cleanText(item.id, 60)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || ids.has(id)) throw new Error('每个作品需要唯一的小写 ID。')
    ids.add(id)
    const title = cleanText(item.title, 100)
    const summary = cleanText(item.summary, 500)
    const demo = cleanText(item.demo, 500)
    const repoUrl = cleanText(item.repo, 500)
    if (!title || !summary || !validUrl(demo) || !validUrl(repoUrl)) throw new Error('请补全作品信息，并确认链接以 http 或 https 开头。')
    const tech = unique((Array.isArray(item.tech) ? item.tech : []).map((tag) => cleanText(tag, 40)).filter(Boolean)).slice(0, 12)
    return { id, title, summary, tech, demo, repo: repoUrl, accent: ['cyan', 'pink', 'violet', 'mixed'].includes(item.accent) ? item.accent : 'cyan' }
  })
}

function validatePosts(items) {
  if (!Array.isArray(items) || items.length > 100) throw new Error('文章数量无效。')
  const slugs = new Set()
  return items.map((item) => {
    const slug = cleanText(item.slug, 100)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slugs.has(slug)) throw new Error('每篇文章需要唯一的小写链接标识。')
    slugs.add(slug)
    const title = cleanText(item.title, 160)
    const excerpt = cleanText(item.excerpt, 500)
    const date = cleanText(item.date, 10)
    const content = typeof item.content === 'string' ? item.content.trim().slice(0, 50000) : ''
    if (!title || !excerpt || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !content) throw new Error('请完整填写文章标题、摘要、日期和正文。')
    const tags = unique((Array.isArray(item.tags) ? item.tags : []).map((tag) => cleanText(tag, 40)).filter(Boolean)).slice(0, 12)
    return { slug, title, excerpt, date, tags, content }
  })
}

async function saveContent(projects, posts) {
  const head = await githubJson(`/git/ref/heads/${encodeURIComponent(branch)}`)
  const commit = await githubJson(`/git/commits/${head.object.sha}`)
  const files = [
    [paths.projects, projects],
    [paths.posts, posts],
  ]
  const tree = []
  for (const [path, data] of files) {
    const blob = await githubJson('/git/blobs', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `${JSON.stringify(data, null, 2)}\n`, encoding: 'utf-8' }),
    })
    tree.push({ path, mode: '100644', type: 'blob', sha: blob.sha })
  }
  const nextTree = await githubJson('/git/trees', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base_tree: commit.tree.sha, tree }),
  })
  const nextCommit = await githubJson('/git/commits', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'content: update projects and posts from admin', tree: nextTree.sha, parents: [head.object.sha] }),
  })
  await githubJson(`/git/refs/heads/${encodeURIComponent(branch)}`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sha: nextCommit.sha, force: false }),
  })
  return nextCommit.sha
}

export default async function handler(req, res) {
  if (!isAuthorized(req)) return send(res, 401, { error: '未授权。' })
  if (req.method === 'GET') {
    try {
      const [projects, posts] = await Promise.all([readContent(paths.projects), readContent(paths.posts)])
      return send(res, 200, { projects: projects.data, posts: posts.data })
    } catch (error) { return send(res, 500, { error: error.message || '读取内容失败。' }) }
  }
  if (req.method === 'PUT') {
    try {
      const projects = validateProjects(req.body?.projects)
      const posts = validatePosts(req.body?.posts)
      const sha = await saveContent(projects, posts)
      return send(res, 200, { sha })
    } catch (error) { return send(res, 400, { error: error.message || '保存内容失败。' }) }
  }
  res.setHeader('Allow', 'GET, PUT')
  return send(res, 405, { error: '不支持的请求方式。' })
}
