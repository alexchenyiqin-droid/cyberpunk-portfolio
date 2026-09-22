import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import App from './App'
import { initAnalytics, trackPageView } from './lib/analytics'
// 仅加载实际会显示的拉丁 woff2 子集；中文交由系统字体栈处理。
//
// 字重按「代码里真实用到」精简，逐轮剔除零使用字重：
//   第一轮（2026-08-29，136KB → 72KB）：砍 Rajdhani 500/600、JetBrains Mono 500/600
//     - Rajdhani 500/600：font-medium / font-semibold 全部搭配 font-display（属 Orbitron，非 Rajdhani）
//     - JetBrains Mono 500/600：font-mono 元素全部为默认字重，无一搭配字重类
//   第二轮（2026-09-22，72KB → 56KB）：砍 Rajdhani 700
//     - 午夜界面改版后所有 font-bold 均搭配 font-display（Orbitron 700），Rajdhani 700 零使用
// 保留 4 个字重覆盖全部用例：Orbitron 700/900、Rajdhani 400、JetBrains Mono 400。
// ⚠️ 维护提醒：若后续新增「非 font-display 的 font-bold」用法，需补回 Rajdhani 700，
//    否则该处会回退到 Rajdhani 400（浏览器合成加粗），视觉会偏糊。
import '@fontsource/orbitron/latin-700.css'
import '@fontsource/orbitron/latin-900.css'
import '@fontsource/rajdhani/latin-400.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import './index.css'

function RouteTracker() {
  const location = useLocation()
  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])
  return null
}

// 应用上次选择的霓虹配色（在渲染前设置，避免换肤闪烁）
try {
  const savedAccent = localStorage.getItem('cyber-accent')
  if (savedAccent) document.documentElement.setAttribute('data-accent', savedAccent)
} catch (_) {}

initAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RouteTracker />
      <App />
    </BrowserRouter>
  </StrictMode>
)
