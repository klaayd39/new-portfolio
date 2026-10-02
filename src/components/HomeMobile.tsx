import { Link } from 'react-router-dom'
import { SealCheck, CaretRight, FolderOpen, User, EnvelopeSimple } from '@/components/slab'
import { profile } from '@/data/profile'
import QuickMenu from './QuickMenu'

export function HomeProfile() {
  return (
    <header className="hprofile">
      <img className="hprofile__avatar" src={profile.avatarSrc} alt="" width={56} height={56} />
      <div className="hprofile__who">
        <span className="hprofile__name">
          {profile.name}
          <SealCheck size={16} weight="fill" className="hprofile__verified" aria-label={profile.verifiedLabel} />
        </span>
        <span className="hprofile__handle">
          {profile.handle} · {profile.role}
        </span>
      </div>
      <QuickMenu className="hprofile__menu" />
    </header>
  )
}

export function HomeStats() {
  return (
    <ul className="hstats" role="list">
      {profile.stats.map(({ value, label, Icon }, i) => (
        <li key={i}>
          <Icon className="hstats__icon" size={18} weight="duotone" aria-hidden="true" />
          <b className="hstats__value">{value}</b>
          <span className="hstats__label">{label}</span>
        </li>
      ))}
    </ul>
  )
}

const TILES = [
  {
    n: '01',
    label: 'Projects',
    to: '/projects',
    title: "Work I've shipped.",
    desc: 'Archive, screenshots, and live demos.',
    img: '/projects/bombo.png',
  },
  {
    n: '02',
    label: 'About',
    to: '/about',
    title: `Hi, I'm ${profile.firstName}.`,
    desc: 'Experience, education, skills.',
    Icon: User,
  },
  {
    n: '03',
    label: 'Contact',
    to: '/contact',
    title: "Let's build something useful.",
    desc: 'Message, email, or call.',
    Icon: EnvelopeSimple,
    accent: true,
  },
] as const

export function HomeExplore() {
  return (
    <>
      <div className="hsec">
        <h2 className="hsec__title">Explore</h2>
      </div>
      <ul className="htiles" role="list">
        {TILES.map((t) => (
          <li key={t.to}>
            <Link to={t.to} className={`htile${'accent' in t && t.accent ? ' htile--accent' : ''}`}>
              {'img' in t ? (
                <span className="htile__media">
                  <img className="htile__img" src={t.img} alt="" loading="lazy" />
                </span>
              ) : (
                <span className="htile__media htile__glyph">
                  <t.Icon size={52} weight="duotone" aria-hidden="true" />
                </span>
              )}
              <span className="htile__body">
                <span className="htile__n">
                  {t.n} {t.label}
                </span>
                <span className="htile__title">{t.title}</span>
                <span className="htile__desc">{t.desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hsec">
        <h2 className="hsec__title">
          <Link to="/projects" className="hsec__link">
            Featured work
            <CaretRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </h2>
      </div>
      <Link to="/projects" className="hproof" aria-label="Open projects — Bombo Radyo News Intelligence Hub.">
        <span className="hproof__stage">
          <img src="/projects/bombo.png" alt="" loading="lazy" />
          <span className="hproof__play" aria-hidden="true">
            <FolderOpen size={20} weight="fill" />
          </span>
          <span className="hproof__dur" aria-hidden="true">
            Live
          </span>
        </span>
        <span className="hproof__copy">
          <span className="hproof__title">Bombo Radyo News Intelligence Hub — 50+ sources, Discord alerts.</span>
          <span className="hproof__meta">Open the full project archive</span>
        </span>
      </Link>
    </>
  )
}
