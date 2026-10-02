import { ArrowUpRight } from '@/components/slab'
import { STATION_PROJECTS } from '@/data/projectArchive'

const FLAGSHIP = STATION_PROJECTS.find((p) => p.featuredId === 'bombo')

/**
 * Flagship case study — Bombo Radyo News Intelligence Hub (replaces template Flagship mock).
 */
export default function ShowcaseCaseStudy() {
  if (!FLAGSHIP) return null

  return (
    <div className="case-study">
      <header className="case-study__head">
        <span className="case-study__eyebrow">Flagship · {FLAGSHIP.subtitle}</span>
        <h2 className="case-study__title">{FLAGSHIP.title}</h2>
        <p className="case-study__lede">{FLAGSHIP.longDesc}</p>
        <div className="case-study__actions">
          <a className="case-study__cta" href={FLAGSHIP.liveUrl} target="_blank" rel="noopener noreferrer">
            Open live board
            <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          </a>
          <a className="case-study__cta case-study__cta--ghost" href={FLAGSHIP.link} target="_blank" rel="noopener noreferrer">
            View repository
          </a>
        </div>
      </header>

      <figure className="case-study__hero">
        <img src={FLAGSHIP.image} alt={FLAGSHIP.screenshotCaption ?? FLAGSHIP.title} loading="lazy" decoding="async" />
        {FLAGSHIP.screenshotCaption && <figcaption>{FLAGSHIP.screenshotCaption}</figcaption>}
      </figure>

      <div className="case-study__grid">
        {(['situation', 'built', 'outcome'] as const).map((key) => {
          const items = FLAGSHIP[key]
          if (!items?.length) return null
          const title = key === 'situation' ? 'Situation' : key === 'built' ? 'Built' : 'Outcome'
          return (
            <section key={key} className="case-study__col">
              <h3>{title}</h3>
              <ul>
                {items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      <section className="case-study__tech">
        <h3>Stack</h3>
        <p>{FLAGSHIP.tech.join(' · ')}</p>
      </section>
    </div>
  )
}
