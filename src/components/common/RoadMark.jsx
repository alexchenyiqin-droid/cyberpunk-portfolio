/**
 * 板块之间的路面标记。
 *   kind="arrow"  向下的地面箭头（带油漆磨损）
 *   kind="zebra"  整幅斑马线，用在「关于」与「联系」之间
 * 纯装饰，对读屏隐藏。
 */
export default function RoadMark({ kind = 'arrow' }) {
  if (kind === 'zebra') {
    return (
      <div className="roadmark" aria-hidden="true">
        <div className="zebra">
          <div />
        </div>
      </div>
    )
  }
  return (
    <div className="roadmark" aria-hidden="true">
      <div className="roadmark-pad">
        <svg
          width="72"
          height="132"
          viewBox="0 0 72 132"
          fill="rgb(var(--paint))"
          style={{ display: 'block', filter: 'url(#worn-paint)' }}
        >
          <path d="M24 0h24v72h24L36 132 0 72h24z" />
        </svg>
      </div>
    </div>
  )
}
