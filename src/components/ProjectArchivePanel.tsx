import { useMemo, useState } from 'react'
import { ArrowUpRight } from '@/components/slab'
import {
  PROJECT_ARCHIVE,
  type PortfolioProject,
  type ProjectGroup,
  type ProjectTag,
} from '@/data/projectArchive'

type Filter = 'all' | ProjectGroup | ProjectTag

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'station', label: 'Station' },
  { key: 'client', label: 'Client' },
  { key: 'personal', label: 'Personal' },
  { key: 'Web App', label: 'Web App' },
  { key: 'Intelligence', label: 'Intelligence' },
  { key: 'Automation', label: 'Automation' },
  { key: 'Broadcast Systems', label: 'Broadcast' },
]

function matchesFilter(p: PortfolioProject, filter: Filter) {
  if (filter === 'all') return true
  if (filter === 'station' || filter === 'client' || filter === 'personal') return p.group === filter
  return p.tag === filter
}

function ProjectDetail({ p }: { p: PortfolioProject }) {
  return (
    <article className="archive-detail">
      {p.image && (
        <figure className="archive-detail__shot">
          <img src={p.image} alt="" loading="lazy" decoding="async" />
          {p.screenshotCaption && <figcaption>{p.screenshotCaption}</figcaption>}
        </figure>
      )}

      <p className="archive-detail__desc">{p.longDesc}</p>

      {p.situation && (
        <>
          <h3 className="archive-detail__h">Situation</h3>
          <ul className="archive-detail__list">
            {p.situation.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </>
      )}
      {p.built && (
        <>
          <h3 className="archive-detail__h">Built</h3>
          <ul className="archive-detail__list">
            {p.built.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </>
      )}
      {p.outcome && (
        <>
          <h3 className="archive-detail__h">Outcome</h3>
          <ul className="archive-detail__list">
            {p.outcome.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </>
      )}

      {!p.situation && (
        <>
          <h3 className="archive-detail__h">Problem</h3>
          <p className="archive-detail__p">{p.problem}</p>
          <h3 className="archive-detail__h">Solution</h3>
          <p className="archive-detail__p">{p.solution}</p>
        </>
      )}

      <h3 className="archive-detail__h">Features</h3>
      <ul className="archive-detail__list">
        {p.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <h3 className="archive-detail__h">Tech</h3>
      <p className="archive-detail__tags">{p.tech.join(' · ')}</p>

      <h3 className="archive-detail__h">Challenges</h3>
      <p className="archive-detail__p">{p.challenges}</p>

      <div className="archive-detail__links">
        <a href={p.link} target="_blank" rel="noopener noreferrer" className="archive-detail__link">
          GitHub <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
        </a>
        {p.liveUrl && (
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="archive-detail__link">
            Live demo <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}

export default function ProjectArchivePanel() {
  const [filter, setFilter] = useState<Filter>('all')
  const [active, setActive] = useState<string>(PROJECT_ARCHIVE[0]?.title ?? '')

  const visible = useMemo(() => PROJECT_ARCHIVE.filter((p) => matchesFilter(p, filter)), [filter])
  const selected = visible.find((p) => p.title === active) ?? visible[0] ?? null

  return (
    <div className="ppanel ppanel--window archive">
      <div className="ppanel__bar">
        <span className="ppanel__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ppanel__url">
          <span className="ppanel__url-host">klydeyabo.vercel.app</span>
          <span className="ppanel__url-path">/projects/archive</span>
        </span>
      </div>
      <div className="ppanel__scroll archive__body">
        <header className="archive__head">
          <h2 className="archive__title">Full project archive</h2>
          <p className="archive__sub">
            {PROJECT_ARCHIVE.length} projects — station systems, client products, and personal tools. Filter by
            context or category.
          </p>
          <div className="archive__filters" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className="archive__filter"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </header>

        <div className="archive__layout">
          <ul className="archive__list" role="list">
            {visible.map((p) => (
              <li key={p.title}>
                <button
                  type="button"
                  className={`archive__item${selected?.title === p.title ? ' is-active' : ''}`}
                  onClick={() => setActive(p.title)}
                >
                  <span className="archive__item-top">
                    <strong>{p.title}</strong>
                    <span className="archive__badge">{p.tag}</span>
                  </span>
                  <span className="archive__item-desc">{p.desc}</span>
                </button>
              </li>
            ))}
          </ul>
          {selected && (
            <div className="archive__detail">
              <header className="archive__detail-head">
                <h3>{selected.title}</h3>
                {selected.subtitle && <p>{selected.subtitle}</p>}
              </header>
              <ProjectDetail p={selected} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
