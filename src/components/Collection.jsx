import { collections } from '../data/collection'
import SectionHeading from './common/SectionHeading'
import Reveal from './common/Reveal'
import { ExternalIcon } from './common/Icons'

const MEDIA_TYPES = ['image', 'video']

/** 日期取最新一条，显示成 2026.06.30 */
const latestDate = (items) =>
  items
    .map((i) => i.date)
    .filter(Boolean)
    .sort()
    .at(-1)
    ?.replaceAll('-', '.')

/**
 * 「现场」：以照片和视频为主的内容区，数据仍来自 src/data/collection.js。
 *   image / video  → 单色处理后的大图 / 带控件的视频
 *   其余类型       → 一行文字链接（工具、小程序、音乐等）
 */
export default function Collection() {
  const media = collections.filter((i) => MEDIA_TYPES.includes(i.type))
  const others = collections.filter((i) => !MEDIA_TYPES.includes(i.type))
  // 视频没有单独封面时，借用同批次的第一张照片
  const fallbackPoster = media.find((i) => i.type === 'image')?.url

  return (
    <section className="panel">
      <SectionHeading label="02" en="Live" title="现场" meta={latestDate(collections)} />

      {collections.length === 0 && <p className="m-0 text-silver">暂时还没有内容。</p>}

      {media.length > 0 && (
        <div className="grid items-start gap-x-12 gap-y-14 md:grid-cols-2">
          {media.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <article>
                {item.type === 'video' ? (
                  <video
                    className="mono-media aspect-video"
                    src={item.url}
                    poster={item.poster || fallbackPoster}
                    controls
                    playsInline
                    preload="none"
                    aria-label={item.title}
                  />
                ) : (
                  <img
                    className="mono-media aspect-[1118/1080]"
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <p className="mb-0 mt-5 text-[13px] font-bold tracking-[0.24em] text-mute">
                  {[item.source, item.date?.replaceAll('-', '.')].filter(Boolean).join(' · ')}
                </p>
                <h3 className="m-0 mt-3 text-[clamp(32px,4.4vw,64px)] font-black italic leading-[1.1] tracking-[-0.02em] text-paint">
                  {item.title}
                </h3>
                <p className="mb-0 mt-4 text-[19px] leading-[1.8] text-silver">{item.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      {others.length > 0 && (
        <ul className={`m-0 list-none p-0 ${media.length > 0 ? 'mt-20' : ''}`}>
          {others.map((item) => (
            <li key={item.id}>
              <div className="dash-h" aria-hidden="true" />
              <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-7">
                <div className="min-w-0 flex-1 basis-80">
                  <h3 className="m-0 text-2xl font-black text-[#f4f4f2]">{item.title}</h3>
                  <p className="mb-0 mt-2 text-base leading-7 text-silver">{item.desc}</p>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-black tracking-[0.1em] text-paint hover:underline"
                  >
                    <ExternalIcon className="h-4 w-4" /> 访问
                  </a>
                )}
              </div>
            </li>
          ))}
          <li aria-hidden="true">
            <div className="dash-h" />
          </li>
        </ul>
      )}
    </section>
  )
}
