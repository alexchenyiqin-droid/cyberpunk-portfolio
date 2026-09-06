import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { profile } from './data/profile'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LazySection from './components/common/LazySection'
import Seo from './components/common/Seo'
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
        页面不存在
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
    </div>
  )
}
