import { profile } from '../data/profile'
import SectionHeading from './common/SectionHeading'
import SignButton from './common/SignButton'
import Reveal from './common/Reveal'
import { SocialIcon } from './common/Icons'

export default function Contact() {
  const mail = profile.socials.find((s) => s.icon === 'mail')
  const others = profile.socials.filter((s) => s !== mail)

  return (
    <section className="panel">
      <SectionHeading label="04" en="Contact" title="联系" meta="保持联系" />

      <Reveal>
        <p className="m-0 max-w-[760px] text-[clamp(24px,3vw,42px)] font-black leading-[1.5] text-[#f4f4f2]">
          有项目想法、技术问题或合作机会，都欢迎来信交流。
        </p>

        {mail && (
          <>
            <a className="giant mail mt-12" href={mail.href}>
              {mail.label}
            </a>
            <div className="mt-12">
              <SignButton href={mail.href}>写信给我</SignButton>
            </div>
          </>
        )}

        {/* 以后加了其它联系方式（GitHub 等）会出现在这里 */}
        {others.length > 0 && (
          <ul className="mt-12 flex list-none flex-wrap gap-x-8 gap-y-2 p-0">
            {others.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 text-base font-bold text-silver transition-colors hover:text-paint"
                >
                  <SocialIcon name={s.icon} className="h-5 w-5" /> {s.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  )
}
