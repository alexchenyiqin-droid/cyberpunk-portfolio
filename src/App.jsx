import { Routes, Route } from 'react-router-dom'
import { profile } from './data/profile'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Collection from './components/Collection'
import Contact from './components/Contact'
import BlogPost from './pages/BlogPost'

/**
 * 首页：单页滚动，由各区块组成
 */
function Home() {
  return (
    <>
      <Navbar name={profile.alias} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Collection />
        <Contact />
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
        className="pointer-events-none fixed inset-0 z-[99]"
        style={{ boxShadow: 'inset 0 0 200px 40px rgba(0,0,0,0.6)' }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* 博客文章详情页 —— 独立布局，不显示首页导航锚点 */}
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </div>
  )
}
