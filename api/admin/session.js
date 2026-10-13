import { clearSession, createSession, readSession, sameOrigin, validMutation, validPassword } from '../../server/admin-auth.js'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method === 'GET') {
    const session = readSession(req)
    return session ? res.status(200).json({ csrf: session.csrf }) : res.status(401).json({ error: '请登录后台。' })
  }
  if (!sameOrigin(req)) return res.status(403).json({ error: '请求来源无效。' })
  if (req.method === 'POST') {
    if (!validPassword(req.body?.password)) return res.status(401).json({ error: '密码不正确。' })
    try {
      return res.status(200).json({ csrf: createSession(res).csrf })
    } catch { return res.status(503).json({ error: '后台会话配置缺失。' }) }
  }
  if (req.method === 'DELETE') {
    const session = readSession(req)
    if (session && !validMutation(req, session)) return res.status(403).json({ error: '请求验证失败。' })
    clearSession(res)
    return res.status(200).json({ ok: true })
  }
  res.setHeader('Allow', 'GET, POST, DELETE')
  return res.status(405).json({ error: '不支持的请求方式。' })
}
