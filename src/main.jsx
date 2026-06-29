import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import App from './App'
import { initAnalytics, trackPageView } from './lib/analytics'
import './index.css'

/**
 * 监听路由变化，在 SPA 切换页面时上报百度统计 PV。
 * （单页应用默认只统计首屏，必须手动上报子页面访问）
 */
function RouteTracker() {
  const location = useLocation()
  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])
  return null
}

// 初始化百度统计脚本
initAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RouteTracker />
      <App />
    </BrowserRouter>
  </StrictMode>
)
