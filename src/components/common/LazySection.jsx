import { Suspense, useEffect, useRef, useState } from 'react'

function SectionFallback({ minHeight }) {
  // 占位：懒加载完成前保持高度，避免布局跳动
  return <div style={{ minHeight }} aria-hidden="true" />
}

/**
 * 基于视口的区块懒加载容器。
 * 区块进入视口附近（rootMargin 提前量）时才挂载并加载其代码 chunk，
 * 从而把非首屏区块（及其数据，如博客 posts、收藏数据）从初始 JS 中剥离，
 * 减小首屏体积。不支持 IntersectionObserver 时直接激活，避免白屏。
 */
export default function LazySection({ children, minHeight = 480, rootMargin = '400px' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (active) return
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true)
            io.disconnect()
            break
          }
        }
      },
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [active, rootMargin])

  return (
    <div ref={ref} style={{ minHeight }}>
      {active ? (
        <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
          {children}
        </Suspense>
      ) : (
        <SectionFallback minHeight={minHeight} />
      )}
    </div>
  )
}
