/**
 * 百度统计接入模块
 * ───────────────────────────────────────────────
 * 使用方法：
 *   1. 到 https://tongji.baidu.com 注册账号，添加网站后会得到一个「统计 ID」
 *      （格式如 a1b2c3d4e5f67890，位于 完成获取代码 页面中）
 *   2. 把下面的 BAIDU_ID 替换为你的真实 ID
 *   3. 重新 git push，Vercel 会自动部署上线
 * ───────────────────────────────────────────────
 * 本模块做了两件事：
 *   - init()：注入百度统计的 hm.js 脚本
 *   - trackPageView(path)：SPA 路由切换时上报 PV（单页应用必须，否则只统计到首屏）
 */

// ⚠️ 替换为你的真实百度统计 ID（在 tongji.baidu.com 获取）
export const BAIDU_ID = 'YOUR_BAIDU_TONGJI_ID'

// 是否已成功加载百度统计脚本
let initialized = false

/**
 * 初始化百度统计：注入 hm.js 脚本
 * 在生产环境才加载，开发环境 (localhost) 跳过，避免污染统计数据。
 */
export function initAnalytics() {
  if (initialized) return
  if (!BAIDU_ID || BAIDU_ID === 'YOUR_BAIDU_TONGJI_ID') {
    console.info('[analytics] 百度统计 ID 未配置，跳过加载。请在 src/lib/analytics.js 填入 ID。')
    return
  }
  // 开发环境不加载，避免把本地访问计入统计
  if (import.meta.env.DEV) {
    console.info('[analytics] 开发环境，跳过百度统计加载')
    return
  }

  window._hmt = window._hmt || []
  const hm = document.createElement('script')
  hm.src = `https://hm.baidu.com/hm.js?${BAIDU_ID}`
  hm.async = true
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
  initialized = true
  console.info('[analytics] 百度统计已加载，ID:', BAIDU_ID)
}

/**
 * 上报一次页面访问（PV）
 * 单页应用切换路由时调用，确保每个子页面都被统计到。
 * @param {string} path 页面路径，如 '/blog/welcome-to-my-blog'
 */
export function trackPageView(path) {
  if (!window._hmt) return
  // _hmt 是百度统计的命令队列，push 一个数组即触发上报
  window._hmt.push(['_trackPageview', path])
}
