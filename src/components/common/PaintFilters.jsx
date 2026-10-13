/**
 * 油漆磨损滤镜：用噪点在笔画上抠出细小缺口，像喷在旧路面上的漆。
 * 参数：频率 0.35 / 3 层 / 阈值 10.4 —— 想要更旧就把 10.4 调小（9.6 很旧），更新就调大。
 * 全站只需要挂一次（App 根部）；样式里通过 filter: url(#worn-paint) 引用。
 * 零尺寸、不可见，对读屏透明。
 */
export default function PaintFilters() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute' }}>
      <filter id="worn-paint" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="3" seed="7" result="noise" />
        <feColorMatrix
          in="noise"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -12 10.4"
          result="holes"
        />
        <feComposite in="SourceGraphic" in2="holes" operator="in" />
      </filter>
    </svg>
  )
}
