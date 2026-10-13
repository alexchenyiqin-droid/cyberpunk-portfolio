import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

const COOKIE = '__Secure-alex-admin'
const TTL = 3600

function equal(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string') return false
  const a = Buffer.from(left)
  const b = Buffer.from(right)
  return a.length === b.length && timingSafeEqual(a, b)
}

function signature(value) {
  // Reuse the server-only high-entropy GitHub secret unless a dedicated key is supplied.
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.GITHUB_CONTENT_TOKEN
  if (!secret || !process.env.ADMIN_PASSWORD) throw new Error('后台会话配置缺失。')
  return createHmac('sha256', `${secret}:${process.env.ADMIN_PASSWORD}`).update(value).digest('base64url')
}

export function validPassword(value) {
  return Boolean(process.env.ADMIN_PASSWORD) && equal(process.env.ADMIN_PASSWORD, value)
}

export function readSession(req) {
  const cookie = (req.headers.cookie || '').split(';').map((item) => item.trim()).find((item) => item.startsWith(`${COOKIE}=`))
  if (!cookie) return null
  const [payload, mac, extra] = cookie.slice(COOKIE.length + 1).split('.')
  if (!payload || !mac || extra) return null
  try {
    if (!equal(signature(payload), mac)) return null
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    const now = Math.floor(Date.now() / 1000)
    if (!Number.isInteger(session.exp) || session.exp <= now || session.exp > now + TTL || typeof session.csrf !== 'string') return null
    return session
  } catch { return null }
}

export function sameOrigin(req) {
  try {
    const origin = new URL(req.headers.origin)
    return origin.protocol === 'https:' && origin.host === req.headers.host
  } catch { return false }
}

export function validMutation(req, session) {
  return Boolean(session) && sameOrigin(req) && equal(session.csrf, req.headers['x-csrf-token'])
}

export function createSession(res) {
  const session = { exp: Math.floor(Date.now() / 1000) + TTL, csrf: randomBytes(32).toString('base64url') }
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url')
  res.setHeader('Set-Cookie', `${COOKIE}=${payload}.${signature(payload)}; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=${TTL}`)
  return session
}

export function clearSession(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=0`)
}
