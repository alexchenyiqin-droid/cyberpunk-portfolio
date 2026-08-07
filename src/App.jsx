import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { profile } from './data/profile'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LazySection from './components/common/LazySection'
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Blog = lazy(() => import('./components/Blog'))
const Collection = lazy(() => import('./components/Collection'))
const Contact = lazy(() => import('./components/Contact'))
const BlogPost = lazy(() => import('./pages/BlogPost'))

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
      <Navbar name={profile.alias} />
      <main>
        <Hero />
        <LazySection minHeight={420}><About /></LazySection>
        <LazySection minHeight={520}><Projects /></LazySection>
        <LazySection minHeight={760}><Blog /></LazySection>
        <LazySection minHeight={480}><Collection /></LazySection>
        <LazySection minHeight={420}><Contact /></LazySection>
      </main>
    </>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* 全屏 CRT 扫描线叠加层（固定在最上层，不影响交互） */}
      <div className="scanlines pointer-events-none fixed inset-0 z-[100] opacity-40" />
      {/* 全局微弱暗角，增强 CRT 显示器质感 */}
      <div
        className="pointer-events-none fixed inset-0 z-[98]"
        style={{ boxShadow: 'inset 0 0 200px 40px rgba(0,0,0,0.6)' }}
      />
      {/* 视口边缘霓虹光晕 —— 粉青双色明显呼吸，模拟霓虹灯管边框 */}
      <div
        className="animate-neon-breath pointer-events-none fixed inset-0 z-[99]"
        style={{
          boxShadow:
            'inset 0 0 200px 12px rgba(255,46,136,0.4), inset 0 0 200px 12px rgba(0,255,245,0.25)',
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
      </Routes>
    </div>
  )
}
