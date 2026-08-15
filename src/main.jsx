import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import App from './App'
import { initAnalytics, trackPageView } from './lib/analytics'
// 仅加载实际会显示的拉丁 woff2 子集；中文交由系统字体栈处理。
import '@fontsource/orbitron/latin-700.css'
import '@fontsource/orbitron/latin-900.css'
import '@fontsource/rajdhani/latin-400.css'
import '@fontsource/rajdhani/latin-500.css'
import '@fontsource/rajdhani/latin-600.css'
import '@fontsource/rajdhani/latin-700.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import '@fontsource/jetbrains-mono/latin-600.css'
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
