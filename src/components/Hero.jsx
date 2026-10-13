import { profile } from '../data/profile'
import SignButton from './common/SignButton'

/** 把一句话里的重点词包成 <em>（重点词在 profile.taglineHighlight 里配置） */
function Tagline({ text, highlight }) {
  const at = highlight ? text.indexOf(highlight) : -1
  if (at < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <em>{highlight}</em>
      {text.slice(at + highlight.length)}
    </>
  )
}

/** 滚动字幕：内容重复 4 份，动画位移 -50%，首尾无缝衔接 */
function Marquee({ items }) {
  const line = `${items.join(' → ')} →`
  return (
    <div className="marquee" aria-hidden="true">
      <div className="dash-h" />
      <div className="marquee-track">
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>{line}</span>
        ))}
      </div>
      <div className="dash-h" />
    </div>
  )
}

export default function Hero() {
  const [first, ...rest] = profile.name.split(' ')
  const last = rest.join(' ')
  const email = profile.socials.find((s) => s.icon === 'mail')

  return (
    <section>
      <div className="hero-stage">
        <div className="hero-meta hero-meta-l">
          <p>FULL-STACK DEVELOPER</p>
          <p>{profile.roles.slice(0, 3).join(' / ')}</p>
        </div>
        <div className="hero-meta hero-meta-r">
          <p>OPEN TO WORK — {new Date().getFullYear()}</p>
          <p>{profile.status}</p>
        </div>

        <img
          className="hero-photo"
          src="/portrait.webp"
          width="1000"
          height="1808"
          alt="身穿黑色西装、戴着墨镜的人站在写有 ONE WAY 的柏油路面上"
          fetchpriority="high"
          decoding="async"
        />

        {/* 名字喷在脚边：左右各一半 */}
        <h1 className="hero-name" aria-label={profile.name}>
          <span className="giant hero-first" aria-hidden="true">{first}</span>
          {last && <span className="giant hero-last" aria-hidden="true">{last}</span>}
        </h1>
      </div>

      <div className="hero-foot">
        <p className="hero-tag">
          <Tagline text={profile.tagline} highlight={profile.taglineHighlight} />
        </p>
        {email && <SignButton href={email.href}>写信给我</SignButton>}
      </div>

      <Marquee items={profile.roles} />
    </section>
  )
}
