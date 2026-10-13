/**
 * 路牌式按钮：双线圆角框 + 长箭头，悬停 / 聚焦时反白。
 * @param {string} href   链接地址
 * @param {boolean} back  箭头朝左（用于「返回」）
 */
export default function SignButton({ href, children, back = false, className = '' }) {
  const arrow = back ? 'M56 8H20V0L0 12l20 12v-8h36z' : 'M0 8h36V0l20 12-20 12v-8H0z'
  return (
    <a href={href} className={`sign sign-frame ${className}`}>
      {back && (
        <svg aria-hidden="true" width="56" height="24" viewBox="0 0 56 24" fill="currentColor">
          <path d={arrow} />
        </svg>
      )}
      <span>{children}</span>
      {!back && (
        <svg aria-hidden="true" width="56" height="24" viewBox="0 0 56 24" fill="currentColor">
          <path d={arrow} />
        </svg>
      )}
    </a>
  )
}
