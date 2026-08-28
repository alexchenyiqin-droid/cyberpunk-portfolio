import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { profile } from './data/profile'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LazySection from './components/common/LazySection'
import Seo from './components/common/Seo'
import TerminalEgg from './components/TerminalEgg'
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Collection = lazy(() => import('./components/Collection'))
const Contact = lazy(() => import('./components/Contact'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Admin = lazy(() => import('./pages/Admin'))

/**
 * 路由懒加载占位：进入博客详情页时短暂显示，避免白屏
 */
function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <span className="animate-pulse-neon font-mono text-sm text-neon-cyan">// 加载中...</span>
    </div>
  )
}

/**
 * 首页：单页滚动，由各区块组成
 */
function Home() {
  return (
    <>
      <Seo />
      <Navbar name={profile.alias} />
      <main id="main">
        <Hero />
        <LazySection minHeight={420}><About /></LazySection>
        <LazySection minHeight={520}><Projects /></LazySection>
        <LazySection minHeight={480}><Collection /></LazySection>
        <LazySection minHeight={420}><Contact /></LazySection>
      </main>
    </>
  )
}

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Seo title="页面不存在" description="你访问的页面不存在。" noindex />
      <p className="font-display text-6xl font-black text-neon-pink animate-pulse-neon">404</p>
      <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
        信号丢失 — 页面不存在
      </h1>
      <a href="/" className="btn-secondary">返回首页</a>
    </main>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* 跳到主内容（键盘/读屏用户可跳过导航） */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:border focus:border-neon-cyan focus:bg-void-950 focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-neon-cyan"
      >
        跳到主内容
      </a>

      {/* 全屏 CRT 扫描线叠加层（固定在最上层，不影响交互） */}
      <div className="scanlines pointer-events-none fixed inset-0 z-[100] opacity-10" />
      {/* 全局微弱暗角，增强 CRT 显示器质感 */}
      <div
        className="pointer-events-none fixed inset-0 z-[98]"
        style={{ boxShadow: 'inset 0 0 140px 0px rgba(0,0,0,0.35)' }}
      />
      {/* 视口边缘霓虹光晕 —— 粉青双色轻微呼吸，模拟霓虹灯管边框（已收敛强度） */}
      <div
        className="animate-neon-breath pointer-events-none fixed inset-0 z-[99]"
        style={{
          boxShadow:
            'inset 0 0 160px 8px rgb(var(--neon-pink) / 0.16), inset 0 0 160px 8px rgb(var(--neon-cyan) / 0.10)',
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* 博客文章详情页 —— 独立布局，不显示首页导航锚点 */}
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BlogPost />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Admin />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* 全局终端彩蛋入口（右下角常驻 >_） */}
      <TerminalEgg />
    </div>
  )
}
