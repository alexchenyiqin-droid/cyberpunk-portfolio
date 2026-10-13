import test from 'node:test'
import assert from 'node:assert/strict'
import handler from '../api/admin/content.js'
import sessionHandler from '../api/admin/session.js'
import { createSession, readSession } from '../server/admin-auth.js'

process.env.ADMIN_PASSWORD = 'test-only-password'
process.env.GITHUB_CONTENT_TOKEN = 'test-only-high-entropy-server-key'

function response() {
  return { headers: {}, statusCode: 0, setHeader(key, value) { this.headers[key] = value }, status(code) { this.statusCode = code; return this }, json(body) { this.body = body; return this } }
}

function authenticated() {
  const res = response()
  const session = createSession(res)
  return { cookie: res.headers['Set-Cookie'].split(';')[0], csrf: session.csrf }
}

test('login cookie is HttpOnly, secure, limited to one hour; wrong origin/password are rejected', () => {
  const req = { method: 'POST', headers: { origin: 'https://www.alex9527.xyz', host: 'www.alex9527.xyz' }, body: { password: process.env.ADMIN_PASSWORD } }
  const res = response()
  sessionHandler(req, res)
  assert.equal(res.statusCode, 200)
  assert.match(res.headers['Set-Cookie'], /HttpOnly; Secure; SameSite=Strict; Max-Age=3600/)
  assert.ok(res.body.csrf)
  assert.ok(!res.headers['Set-Cookie'].includes(process.env.ADMIN_PASSWORD))
  const badPassword = response()
  sessionHandler({ ...req, body: { password: 'wrong' } }, badPassword)
  assert.equal(badPassword.statusCode, 401)
  const badOrigin = response()
  sessionHandler({ ...req, headers: { ...req.headers, origin: 'https://other.example' } }, badOrigin)
  assert.equal(badOrigin.statusCode, 403)
})

test('forged and expired cookies and old password bearer headers cannot authorize', async () => {
  const session = authenticated()
  assert.ok(readSession({ headers: { cookie: session.cookie } }))
  assert.equal(readSession({ headers: { cookie: `${session.cookie}x` } }), null)
  const now = Date.now
  try {
    Date.now = () => now() + 3601000
    assert.equal(readSession({ headers: { cookie: session.cookie } }), null)
  } finally { Date.now = now }
  const res = response()
  await handler({ method: 'GET', headers: { authorization: `Bearer ${process.env.ADMIN_PASSWORD}` } }, res)
  assert.equal(res.statusCode, 401)
})

test('content writes reject missing CSRF and cross-origin requests', async () => {
  const session = authenticated()
  for (const extra of [{ origin: 'https://www.alex9527.xyz' }, { origin: 'https://other.example', 'x-csrf-token': session.csrf }]) {
    const res = response()
    await handler({ method: 'PUT', headers: { host: 'www.alex9527.xyz', cookie: session.cookie, ...extra }, body: {} }, res)
    assert.equal(res.statusCode, 403)
  }
})

test('saving projects retains image, rejects unsafe paths, and submits both content files atomically', async () => {
  const session = authenticated()
  const req = { method: 'PUT', headers: { host: 'www.alex9527.xyz', origin: 'https://www.alex9527.xyz', cookie: session.cookie, 'x-csrf-token': session.csrf }, body: { projects: [{ id: 'demo', title: 'Demo', summary: 'Demo summary', tech: [], image: '/projects/demo.webp' }], posts: [] } }
  const requests = []
  const previousFetch = globalThis.fetch
  globalThis.fetch = async (url, options = {}) => {
    const body = options.body ? JSON.parse(options.body) : null
    requests.push({ url, body })
    let json = { sha: 'test-sha' }
    if (url.includes('/git/ref/heads/')) json = { object: { sha: 'base' } }
    else if (url.endsWith('/git/commits/base')) json = { tree: { sha: 'base-tree' } }
    return { ok: true, json: async () => json }
  }
  try {
    const res = response()
    await handler(req, res)
    assert.equal(res.statusCode, 200)
    const blobs = requests.filter((request) => request.url.endsWith('/git/blobs'))
    assert.equal(blobs.length, 2)
    assert.equal(JSON.parse(blobs[0].body.content)[0].image, '/projects/demo.webp')
    assert.equal(requests.filter((request) => request.url.includes('/git/refs/')).length, 1)
    for (const image of ['//evil.example/a.webp', '/../a.webp', 'https://evil.example/a.webp', '/a.svg']) {
      const rejected = response()
      await handler({ ...req, body: { ...req.body, projects: [{ ...req.body.projects[0], image }] } }, rejected)
      assert.equal(rejected.statusCode, 400)
    }
  } finally { globalThis.fetch = previousFetch }
})

test('logout clears the cookie and requires CSRF for an active session', () => {
  const session = authenticated()
  const req = { method: 'DELETE', headers: { host: 'www.alex9527.xyz', origin: 'https://www.alex9527.xyz', cookie: session.cookie, 'x-csrf-token': session.csrf } }
  const res = response()
  sessionHandler(req, res)
  assert.equal(res.statusCode, 200)
  assert.match(res.headers['Set-Cookie'], /Max-Age=0/)
  const bad = response()
  sessionHandler({ ...req, headers: { ...req.headers, 'x-csrf-token': '' } }, bad)
  assert.equal(bad.statusCode, 403)
})
