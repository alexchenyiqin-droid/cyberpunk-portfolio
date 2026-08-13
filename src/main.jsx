import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import App from './App'
import { initAnalytics, trackPageView } from './lib/analytics'
// 字体自托管：本地化 woff2，彻底摆脱 Google Fonts CDN（国内访问慢/阻塞渲染）
// 拉丁显示/等宽字体（按需字重，去掉未使用的 400/500 以减负）
import '@fontsource/orbitron/700.css'
import '@fontsource/orbitron/900.css'
import '@fontsource/rajdhani/400.css'
import '@fontsource/rajdhani/500.css'
import '@fontsource/rajdhani/600.css'
import '@fontsource/rajdhani/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/jetbrains-mono/600.css'
// 中文不引入 woff2：直接走系统字体栈（PingFang SC / Microsoft YaHei 等），零流量且观感统一
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
