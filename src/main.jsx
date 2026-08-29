import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import App from './App'
import { initAnalytics, trackPageView } from './lib/analytics'
// 仅加载实际会显示的拉丁 woff2 子集；中文交由系统字体栈处理。
//
// 字重按「代码里真实用到」精简（2026-08-29），砍掉 4 个零使用的字重，字体体积 136KB → 61.5KB：
//   - Rajdhani 500/600：全项目 font-medium / font-semibold 共 3 处，且全部搭配 font-display
//     （属 Orbitron，非 Rajdhani），故 Rajdhani 的 500/600 无任何使用 → 砍
//   - JetBrains Mono 500/600：45 处 font-mono 全部为默认字重，无一搭配字重类 → 砍
// 保留的 5 个字重覆盖全部实际用例：Orbitron 700/900、Rajdhani 400/700、JetBrains Mono 400。
import '@fontsource/orbitron/latin-700.css'
import '@fontsource/orbitron/latin-900.css'
import '@fontsource/rajdhani/latin-400.css'
import '@fontsource/rajdhani/latin-700.css'
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
