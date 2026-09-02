import { MARQUEE_TOOLS } from '../data/skills'

const ITEMS = [...MARQUEE_TOOLS, ...MARQUEE_TOOLS]

export default function TechMarquee() {
  return (
    <section className="tech-marquee" aria-label="Tools and technologies in use">
      <div className="tech-marquee-fade tech-marquee-fade--left" aria-hidden="true" />
      <div className="tech-marquee-fade tech-marquee-fade--right" aria-hidden="true" />
      <div className="tech-marquee-track">
        {ITEMS.map((tool, i) => (
          <div key={`${tool.name}-${i}`} className="tech-marquee-item">
            <img src={tool.icon} alt="" width={22} height={22} loading="lazy" decoding="async" />
            <span>{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
