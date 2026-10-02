import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Robot,
  Medal,
  EnvelopeSimple,
  SealCheck,
} from '@/components/slab'
import { gymFunnel, bookingFunnel } from '@/data/funnels'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { profile } from '@/data/profile'
import { funnelThumbSrc } from '@/lib/funnelThumb'
import { CONTACT_DETAILS } from '@/data/experience'

const thumbSrc = funnelThumbSrc

const PROJECT_SHOTS = [gymFunnel[0], bookingFunnel[0], gymFunnel[1], gymFunnel[2]].filter(Boolean)

const leaves = (n: StackNode): StackNode[] =>
  n.children?.length ? n.children.flatMap(leaves) : [n]
const AI_BUILDS = leaves(aiStack)

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const half = Math.ceil(AI_BUILDS.length / 2)
  const toolRows = [AI_BUILDS.slice(0, half), AI_BUILDS.slice(half)]

  return (
    <nav className="bento" aria-label="Explore the portfolio">
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Projects" desc="12+ builds — station, client, and personal — with live demos." />
        <div className="bento__media bento__reel" aria-hidden="true">
          <div className="bento__reel-track">
            {[...PROJECT_SHOTS, ...PROJECT_SHOTS].map((f, i) => (
              <span key={i} className="bento__shot">
                <img src={thumbSrc(f)} alt="" loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>
      </Link>

      <Link to="/projects" className="bento__card bento__card--ai">
        <CardHead Icon={Robot} title="Systems" desc="News hub, OBS automation, transmitters, and Supabase apps." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {toolRows.map((row, r) => (
            <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map((n, i) => (
                  <span key={`${n.id}-${i}`} className="bento__chip" data-status={n.status}>
                    <n.Icon size={15} weight="duotone" />
                    {n.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="Malaybalay-based IT building tools for live radio and client ops." />
        <div className="bento__media bento__glance" aria-hidden="true">
          <span className="bento__glance-line">{profile.location}</span>
          <span className="bento__glance-line">{profile.handle} · {profile.role}</span>
          <span className="bento__glance-pill">{profile.verifiedLabel}</span>
        </div>
      </Link>

      <Link to="/about" className="bento__card bento__card--creds">
        <CardHead Icon={Medal} title="Credentials" desc="BS Information Technology · BukSU · Athlete of the Year 2024." />
        <div className="bento__media bento__badge" aria-hidden="true">
          <span className="bento__badge-ring">
            <img src="/placeholders/badge.svg" alt="" width={72} height={72} />
          </span>
          <span className="bento__badge-tag">
            <SealCheck size={14} weight="fill" />
            BS IT · BukSU
          </span>
        </div>
      </Link>

      <Link to="/contact" className="bento__card bento__card--contact">
        <CardHead Icon={EnvelopeSimple} title="Contact" desc="Hiring for automation, broadcast, or full-stack work — I read every message." />
        <div className="bento__media bento__contact" aria-hidden="true">
          <span className="bento__contact-line">{profile.email}</span>
          <span className="bento__contact-line">{CONTACT_DETAILS.status}</span>
        </div>
      </Link>
    </nav>
  )
}
