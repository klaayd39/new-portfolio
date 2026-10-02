import { useEffect, useRef, type CSSProperties } from 'react'
import { ArrowUpRight, MapPin } from '@/components/slab'
import { profile } from '@/data/profile'
import { ABOUT_HEADLINE, ABOUT_PARAGRAPHS, ABOUT_PULL_QUOTE, ABOUT_GOAL, EXPLORING_INTRO } from '@/data/about'
import { EXPERIENCE, EDUCATION, EXPLORING, CONTACT_DETAILS } from '@/data/experience'
import { SKILLS, TOOL_GROUPS, getSkillTier } from '@/data/skills'

const N8N = { src: '/icons/ai/n8n.svg', name: 'n8n' }
const ZAPIER = { src: '/icons/ai/zapier.svg', name: 'Zapier' }
const DOCKER = { src: '/icons/ai/docker.svg', name: 'Docker' }
const CLAUDE = { src: '/icons/ai/claude-color.svg', name: 'Claude' }
const CODEX = { src: '/icons/ai/codex.svg', name: 'Codex' }
const QWEN = { src: '/icons/ai/qwen.svg', name: 'Qwen' }
const HERMES = { src: '/icons/ai/hermes.svg', name: 'Hermes' }
const GITHUB = { src: '/icons/ai/github.svg', name: 'GitHub' }
const SLACK = { src: '/icons/ai/slack-color.svg', name: 'Slack' }
const REACT = { src: '/icons/ai/react.svg', name: 'React' }
const VITE = { src: '/icons/ai/vite.svg', name: 'Vite' }
const SUPABASE = { src: '/icons/ai/postgresql.svg', name: 'Supabase' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  { index: '01', title: 'Broadcast automation', marks: [DOCKER, N8N, ZAPIER] },
  { index: '02', title: 'Web apps & dashboards', marks: [REACT, VITE, SUPABASE, CLAUDE] },
  { index: '03', title: 'News & station intelligence', marks: [CLAUDE, CODEX, SLACK, GITHUB] },
  { index: '04', title: 'AI-assisted delivery', marks: [CLAUDE, CODEX, HERMES, QWEN] },
]

export default function AboutGrid() {
  const copyRef = useRef<HTMLDivElement>(null)

  // Lenis listens on the shell panel; keep wheel/touch scroll inside this column.
  useEffect(() => {
    const el = copyRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el
      if (scrollHeight <= clientHeight) return
      const dy = e.deltaY
      const atTop = scrollTop <= 0
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1
      if ((dy < 0 && !atTop) || (dy > 0 && !atBottom)) e.stopPropagation()
    }
    el.addEventListener('wheel', onWheel, { passive: true })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">{ABOUT_HEADLINE}</p>
      </header>

      <div className="home__glass agrid__glass">
        <div
          ref={copyRef}
          className="agrid__copy agrid__copy--scroll"
          data-lenis-prevent
          tabIndex={0}
          aria-label="About me — scroll for more"
        >
          <p className="agrid__lead">{ABOUT_PULL_QUOTE}</p>

          {ABOUT_PARAGRAPHS.map((para) => (
            <p key={para.slice(0, 24)} className="agrid__note">
              {para}
            </p>
          ))}

          <p className="agrid__note agrid__note--callout">{ABOUT_GOAL}</p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          <section className="agrid__block" aria-labelledby="exp-heading">
            <h2 className="agrid__block-title" id="exp-heading">
              Experience
            </h2>
            <ul className="agrid__timeline" role="list">
              {EXPERIENCE.map((e) => (
                <li key={e.org + e.period}>
                  <span className="agrid__time">{e.period}</span>
                  <strong>{e.role}</strong>
                  <span className="agrid__org">{e.org}</span>
                  <p>{e.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="agrid__block" aria-labelledby="edu-heading">
            <h2 className="agrid__block-title" id="edu-heading">
              Education
            </h2>
            <ul className="agrid__timeline" role="list">
              {EDUCATION.map((e) => (
                <li key={e.org + e.period}>
                  <span className="agrid__time">{e.period}</span>
                  <strong>{e.role}</strong>
                  <span className="agrid__org">{e.org}</span>
                  {e.detail && <p>{e.detail}</p>}
                </li>
              ))}
            </ul>
          </section>

          <section className="agrid__block" aria-labelledby="skills-heading">
            <h2 className="agrid__block-title" id="skills-heading">
              Skills & technologies
            </h2>
            <p className="agrid__block-sub">Every tool listed has been used on a live station workflow or a shipped project.</p>
            <ul className="agrid__skill-groups" role="list">
              {SKILLS.map((g) => (
                <li key={g.category}>
                  <h3>{g.category}</h3>
                  <p>{g.items.join(' · ')}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="agrid__block" aria-labelledby="tools-heading">
            <h2 className="agrid__block-title" id="tools-heading">
              Production confidence
            </h2>
            {TOOL_GROUPS.map((group) => (
              <div key={group.num} className="agrid__tool-group">
                <h3>
                  <span className="agrid__tool-num">{group.num}</span> {group.title}
                </h3>
                <ul role="list">
                  {group.tools.map((t) => (
                    <li key={t.name}>
                      <span className="agrid__tool-top">
                        <strong>{t.name}</strong>
                        <span className="agrid__tier" data-tier={getSkillTier(t.level).toLowerCase()}>
                          {getSkillTier(t.level)}
                        </span>
                      </span>
                      <p>{t.desc}</p>
                      <p className="agrid__tool-used">Used in {t.used}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="agrid__block" aria-labelledby="explore-heading">
            <h2 className="agrid__block-title" id="explore-heading">
              Outside the studio
            </h2>
            <p className="agrid__block-sub">{EXPLORING_INTRO}</p>
            <ul className="agrid__explore" role="list">
              {EXPLORING.map((item) => (
                <li key={item.title}>
                  <span className="agrid__explore-emoji" aria-hidden="true">
                    {item.emoji}
                  </span>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark agrid__cell-mark--img">
                <img src="/placeholders/badge.svg" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">BS Information Technology</span>
                <span className="agrid__cell-meta">Bukidnon State University · 2024</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">{CONTACT_DETAILS.status}</span>
              </span>
            </span>

            <a className="agrid__cell agrid__cell--wide" href={CONTACT_DETAILS.phoneHref}>
              <span className="agrid__cell-mark agrid__cell-mark--plain">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{CONTACT_DETAILS.phone}</span>
                <span className="agrid__cell-meta">Call or message</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src={profile.hero.portraitSrc}
            alt={profile.hero.portraitAlt}
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
