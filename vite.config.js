import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

/**
 * 构建后给「首屏关键可视字体」注入 <link rel="preload">。
 *
 * 背景：字体是 @fontsource 通过 CSS 的 @font-face 引入的，浏览器必须先
 * 下载完 CSS、解析后才发现字体文件，形成「CSS → 字体」的串行瀑布，
 * 在跨境高延迟链路上要多等 1 个 RTT 以上。
 *
 * 注入 preload 后，字体与 CSS 并行下载，消除这段串行等待。
 * 只预载首屏确定会渲染的字体（标题 Orbitron 700 + 正文 Rajdhani 400/600），
 * 其余字重（等宽 JetBrains Mono、Orbitron 900 等）仍按需延迟加载，避免浪费带宽。
 */
function fontPreloadPlugin() {
  return {
    name: 'font-preload-inject',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, 'dist')
      const htmlPath = path.join(distDir, 'index.html')
      const assetsDir = path.join(distDir, 'assets')
      if (!fs.existsSync(htmlPath) || !fs.existsSync(assetsDir)) return

      const targets = fs
        .readdirSync(assetsDir)
        .filter((f) =>
          /^(orbitron-latin-700|rajdhani-latin-400|rajdhani-latin-600)-normal-.*\.woff2$/.test(f)
        )
      if (!targets.length) return

      let html = fs.readFileSync(htmlPath, 'utf-8')
      // 幂等：已注入过就不再重复写
      if (html.includes('rel="preload" as="font"')) return

      const links = targets
        .map(
          (f) =>
            `    <link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${f}" />`
        )
        .join('\n')
      html = html.replace('</head>', `${links}\n  </head>`)
      fs.writeFileSync(htmlPath, html)
      console.log(
        `\n[font-preload] 已注入 ${targets.length} 个首屏关键字体预载：${targets.join(', ')}`
      )
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fontPreloadPlugin()],
  build: {
    rollupOptions: {
      output: {
        // 把首屏必需的第三方库拆成独立 vendor chunk，利于浏览器长期缓存，
        // 同时避免单一 bundle 过大触发 Vite 的体积告警。
        // 注意：Vite 8 (rolldown) 的 manualChunks 只支持函数形式。
        // react-markdown 整条解析链仅被懒加载的 BlogPost 引用，会自然进入
        // 动态 chunk，不会进入首屏，故无需在此处理。
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
            return 'motion'
          }
          if (id.includes('react-router') || id.includes('@remix-run')) {
            return 'router'
          }
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/scheduler/') ||
            id.includes('react/jsx') ||
            id.includes('use-sync-external-store') ||
            id.includes('loose-envify')
          ) {
            return 'react'
          }
          // 其余 node_modules 不强制归块：
          // - 仅被懒加载 BlogPost 引用的 (react-markdown 整条解析链) 会自然进入
          //   动态 chunk，不在首屏加载
          // - 被首屏静态引用的少量工具库随主包加载，体积很小
        },
      },
    },
  },
})
