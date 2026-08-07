import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
