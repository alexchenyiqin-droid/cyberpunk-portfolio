import { profile } from '../data/profile'
import SectionHeading from './common/SectionHeading'
import Reveal from './common/Reveal'

export default function About() {
  const [lead, ...body] = profile.about

  return (
    <section className="panel">
      <SectionHeading label="03" en="About" title="关于" meta={profile.name.toUpperCase()} />

      <div className="flex flex-wrap items-start gap-x-16 gap-y-12">
        {/* 特写：把首屏照片放大裁出头像，外套路牌框 */}
        <Reveal className="w-full min-w-0 md:w-[380px] md:flex-none">
          <figure className="m-0">
            <div className="sign-frame !shadow-none p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src="/portrait.webp"
                  width="1000"
                  height="1808"
                  loading="lazy"
                  decoding="async"
                  alt="戴着墨镜、银灰色头发的人像特写，身后是路面上的 ONE WAY 字样"
                  className="block max-w-none"
                  style={{
                    width: '200%',
                    marginLeft: '-50%',
                    marginTop: '-45%',
                    filter: 'grayscale(1) contrast(1.08)',
                  }}
                />
              </div>
            </div>
            <figcaption className="mt-3.5 text-[13px] font-bold uppercase tracking-[0.22em] text-mute">
              {profile.name} · {profile.roles[0]}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="min-w-0 flex-1 basis-[460px]">
          <p className="m-0 text-[clamp(26px,3.2vw,46px)] font-black leading-[1.45] text-[#f4f4f2]">{lead}</p>
          <div className="mt-7 space-y-4">
            {body.map((p, i) => (
              <p key={i} className="m-0 text-[19px] leading-[1.95] text-silver">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* 技能：三块路牌 */}
      <div className="mt-16 grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
        {profile.skills.map((group, gi) => (
          <Reveal key={group.category} delay={0.1 * gi}>
            <div className="sign-frame h-full px-8 pb-7 pt-8">
              <h3 className="m-0 mb-3.5 text-[22px] font-black tracking-[0.08em] text-paint">{group.category}</h3>
              <ul className="m-0 list-none p-0 text-[17px] leading-[2] text-silver">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
