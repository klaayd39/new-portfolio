import ShowcaseCaseStudy from '@/components/ShowcaseCaseStudy'

export default function ShowcaseGrid() {
  return (
    <section className="pgrid ktools" aria-labelledby="showcase-title">
      <header className="pgrid__head ktools__head">
        <div className="ktools__head-copy">
          <span className="pgrid__eyebrow">Showcase</span>
          <h1 className="pgrid__title" id="showcase-title">
            Flagship build: Bombo Radyo News Intelligence Hub.
          </h1>
          <p className="pgrid__lede">
            The station newsroom&apos;s single board for 50+ sources — with breaking-news alerts in Discord where the team already works.
          </p>
        </div>

        <div className="ktools__vote">
          <p className="ktools__vote-label">
            Live at
            <span aria-hidden="true" className="ktools__vote-dot" />
            <span className="ktools__vote-ask">bombo-radyo.vercel.app</span>
          </p>
          <a
            className="ktools__vote-frame ktools__vote-card"
            href="https://bombo-radyo.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/projects/bombo.png" alt="" width={48} height={48} />
            <span className="ktools__vote-text">Open the live intelligence board</span>
          </a>
        </div>
      </header>

      <div className="home__glass ktools__glass">
        <ShowcaseCaseStudy />
      </div>
    </section>
  )
}
