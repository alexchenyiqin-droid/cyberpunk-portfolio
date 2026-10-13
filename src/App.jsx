import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { profile } from './data/profile'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import LazySection from './components/common/LazySection'
import PaintFilters from './components/common/PaintFilters'
import RoadMark from './components/common/RoadMark'
import SignButton from './components/common/SignButton'
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
      <span className="font-mono text-sm text-mute">// 加载中...</span>
    </div>
  )
}

/**
 * 首页：单页滚动。
 * 首屏之后是一条「车道」：中线从上到下贯穿，各板块是盖在中线上的沥青块，
 * 板块之间露出中线，并喷有地面箭头 / 斑马线。
 * 板块顺序要和 Navbar 的 LINKS 保持一致：作品 → 现场 → 关于 → 联系。
 */
function Home() {
  return (
    <>
      <Seo />
      <Navbar name={profile.alias} />
      <main id="main">
        <Hero />
        <div className="lane">
          <div className="lane-line" aria-hidden="true" />
          <RoadMark kind="arrow" />
          <LazySection minHeight={520}><Projects /></LazySection>
          <RoadMark kind="arrow" />
          <LazySection minHeight={480}><Collection /></LazySection>
          <RoadMark kind="arrow" />
          <LazySection minHeight={420}><About /></LazySection>
          <RoadMark kind="zebra" />
          <LazySection minHeight={420}><Contact /></LazySection>
        </div>
      </main>
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <main className="notfound">
      <Seo title="页面不存在" description="你访问的页面不存在。" noindex />
      <div className="lane-line" aria-hidden="true" />
      <p className="giant cover px-10" style={{ margin: 0, fontSize: 'clamp(120px, 26vw, 380px)', lineHeight: 0.85, color: 'rgb(var(--paint))' }}>
        404
      </p>
      <div className="cover px-6 py-2">
        <div
          className="sign-frame px-12 py-5 font-display text-[clamp(28px,4vw,56px)] font-black italic leading-none tracking-[0.02em] text-paint"
          style={{ fontStretch: '125%' }}
        >
          WRONG WAY
        </div>
      </div>
      <div className="cover px-10 py-2">
        <h1 className="m-0 text-[clamp(32px,3.6vw,52px)] font-black leading-[1.3] text-[#f4f4f2]">页面不存在</h1>
        <p className="mb-0 mt-3 text-lg text-silver">你访问的页面不存在。</p>
      </div>
      <div className="cover px-10 py-2">
        <SignButton href="/" back>返回首页</SignButton>
      </div>
    </main>
  )
}

export default function App() {
  return (
    // 尊重系统「减少动态效果」：framer-motion 的位移动画会自动降级
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen">
        <PaintFilters />
        {/* 跳到主内容（键盘/读屏用户可跳过导航） */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:border-2 focus:border-paint focus:bg-void-950 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-paint"
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
    </MotionConfig>
  )
}
