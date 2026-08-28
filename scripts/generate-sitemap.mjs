import { mkdir, readFile, writeFile } from 'node:fs/promises'

const posts = JSON.parse(
  await readFile(new URL('../src/content/posts.json', import.meta.url), 'utf8'),
)

const siteUrl = 'https://www.alex9527.xyz'

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const urls = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  ...posts.map((post) => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'monthly',
    priority: '0.8',
  })),
]

const entries = urls.map(({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${escapeXml(`${siteUrl}${loc}`)}</loc>
${lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>\n` : ''}    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`

await mkdir('public', { recursive: true })
await writeFile('public/sitemap.xml', sitemap)
