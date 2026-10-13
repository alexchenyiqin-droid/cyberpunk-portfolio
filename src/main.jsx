import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import App from './App'
import { initAnalytics, trackPageView } from './lib/analytics'
// 字体：
//   Archivo 可变字体只装载「斜体 + 宽度轴」这一份（wdth-italic），拉丁子集按需下载。
//   整个站的大标题都是宽体斜体（font-stretch: 125%），不需要正体，所以不装正体。
//   中文交给系统字体栈（PingFang SC / 微软雅黑），零流量。
//   JetBrains Mono 仅供后台 / 博客代码块使用。
// ⚠️ 若要用正体的 Archivo（例如正文），需要另外 import '@fontsource-variable/archivo/wdth.css'，
//    并同步更新 vite.config.js 里的预载白名单。
import '@fontsource-variable/archivo/wdth-italic.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import './index.css'

function RouteTracker() {
  const location = useLocation()
  useEffect(() => {
    if (/^\/admin(?:\/|$)/.test(location.pathname)) {
      // A fresh document removes already-running analytics before admin login.
      if (document.getElementById('site-analytics')) window.location.reload()
      return
    }
    initAnalytics()
    trackPageView(location.pathname + location.search)
  }, [location])
  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RouteTracker />
      <App />
    </BrowserRouter>
  </StrictMode>
)
