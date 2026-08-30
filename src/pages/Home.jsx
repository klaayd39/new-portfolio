import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { MARQUEE_TOOLS, TOOL_GROUPS } from '../data/skills'
import { PROJECTS } from '../data/projects'
import ScrollReveal from '../components/ScrollReveal'
import ProjectModal from '../components/ProjectModal'
import { useState } from 'react'

const FEATURED = PROJECTS.filter((p) => p.featured)
const MORE = PROJECTS.filter((p) => !p.featured)
const marquee = [...MARQUEE_TOOLS, ...MARQUEE_TOOLS]
const STATS = [
  { value: '50+', label: 'news sources watched' },
  { value: '<50ms', label: 'mixer mute latency' },
  { value: '~70%', label: 'less OBS setup time' },
  { value: '2025', label: 'live at Bombo Radyo' },
]

export default function Home() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <Helmet>
        <title>Klyde Joseph Yabo — Information Technology | Malaybalay</title>
      </Helmet>

      <section className="hero" id="top">
        <div className="hero-bg-text" aria-hidden="true">Klyde</div>
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="hero-tag">
              <span className="hero-dot" />
              Malaybalay, Philippines · Available for hire
            </p>
            <h1 className="hero-h1">
              <span className="nameline">Klyde Joseph Yabo</span>
              <em>Information</em>
              {' '}
              <br />
              Technology
            </h1>
            <p className="hero-sub">
              I build tools that keep a live radio station running. Crawlers, mixer control,
              transmitter monitors, and OBS scripts — shipped into production at{' '}
              <strong>Bombo Radyo Malaybalay</strong>, not left in a tutorial folder.
            </p>
          </div>

          <div className="hero-photo">
            <div className="photo-frame">
              <img src="/ID.png" alt="Klyde Joseph Yabo" className="photo-ph" />
              <span className="photo-avail">
                <span className="hero-dot" /> Open to work
              </span>
            </div>
            <div className="photo-name">
              <p className="photo-name-main">Klyde Joseph Yabo</p>
              <p className="photo-name-role">Information Technology · Malaybalay</p>
            </div>
          </div>

          <div className="hero-actions">
            <div className="hero-btns">
              <Link to="/projects" className="btn btn-dark">
                View My Projects <span className="btn-arrow">→</span>
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Get in Touch
              </Link>
            </div>
            <div className="hero-creds">
              <p className="hcred">
                <strong>Station work:</strong> IT / Technician at Bombo Radyo Malaybalay, 2025 – present
              </p>
              <p className="hcred">
                <strong>Systems built:</strong> News Intelligence Hub, Nautel AUI Monitor, X32 Remote Toggle
              </p>
              <p className="hcred">
                <strong>Studied:</strong> BS Information Technology, Bukidnon State University
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="stat-bar">
        <div className="wrap stat-row">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-wrap">
        <p className="mq-label">Tools I work with</p>
        <div className="mq-track">
          <div className="mq-row">
            {marquee.map((name, i) => (
              <div className="mq-item" key={`${name}-${i}`}>
                <span
                  className="mq-mark"
                  aria-hidden="true"
                  style={{ '--h': name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 360 }}
                >
                  {name.slice(0, 1)}
                </span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section about-section" id="about">
        <div className="wrap about-grid">
          <ScrollReveal>
            <span className="label">About Me</span>
            <h2 className="h2">Real station. <em>Real tools.</em></h2>
            <p className="about-quote">I do not wait for a perfect stack. I automate the job in front of me.</p>
            <p className="bp">
              I grew up in Bukidnon and studied Information Technology at Bukidnon State University.
              After graduating I joined Bombo Radyo Malaybalay as an IT technician — and started
              writing the software the station actually needed.
            </p>
            <p className="bp">
              Newsrooms were tab-hopping for headlines. Transmitter sites went unchecked.
              Mixer mutes needed a walk across the studio. I built crawlers, monitors, OSC
              control, and OBS scripts so those jobs happen in the background. The tools run
              on live broadcasts, not sample data.
            </p>
            <p className="bp">
              I use AI the same way I use a search: to draft structure and generate starting
              code I can read, change, and own. The systems that matter are the ones that
              still work at 5am when a transmitter window is covered and nobody is watching.
            </p>
            <div className="open-box">
              <span className="label">What I am looking for</span>
              <h4>A full-time automation, software, or broadcast-systems role</h4>
              <p>
                Agency, in-house, or a station that wants someone who ships. I show up
                having already built the kind of work you would hand me on day one.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="skill-panels">
            <div className="sp-card">
              <p className="sp-ey">Automation</p>
              <ul className="sk-list">
                <li>Headline crawlers and news aggregation</li>
                <li>Document generation from broadcast logs</li>
                <li>Batch media renaming with regex safety</li>
                <li>Scheduled background monitors</li>
                <li>Playwright and PowerShell workflows</li>
              </ul>
            </div>
            <div className="sp-card">
              <p className="sp-ey">Broadcast systems</p>
              <ul className="sk-list">
                <li>OBS scene sorting and media automators</li>
                <li>Behringer X32 OSC control over UDP</li>
                <li>Nautel transmitter AUI capture</li>
                <li>Discord alerts for breaking news</li>
                <li>Linux and Windows station machines</li>
              </ul>
            </div>
            <div className="sp-card">
              <p className="sp-ey">Web and data</p>
              <ul className="sk-list">
                <li>React dashboards and Vite apps</li>
                <li>WebSockets and REST APIs</li>
                <li>Supabase and PostgreSQL</li>
                <li>HTML, CSS, and responsive layouts</li>
              </ul>
            </div>
            <div className="sp-card sp-card-dark">
              <p className="sp-ey">Still building</p>
              <ul className="sk-list">
                <li>Deeper TypeScript across products</li>
                <li>Operator-facing reporting dashboards</li>
                <li>Tighter test coverage on automations</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section tools-section" id="tools">
        <div className="wrap">
          <ScrollReveal>
            <span className="label">Skills and Tools</span>
            <h2 className="h2">What I use and <em>how I actually use it.</em></h2>
            <p className="bp">
              Every tool listed has been used on a live station workflow or a shipped project. Not just in a tutorial.
            </p>
          </ScrollReveal>

          <div className="tg-list">
            {TOOL_GROUPS.map((group) => (
              <ScrollReveal key={group.num}>
                <div className="tg">
                  <div className="tg-hd">
                    <span className="tg-num">{group.num}</span>
                    <span className="tg-title">{group.title}</span>
                  </div>
                  {group.tools.map((tool) => (
                    <div className="tr" key={tool.name}>
                      <span className="tr-name">{tool.name}</span>
                      <p className="tr-desc">{tool.desc}</p>
                      <div className="tr-lv">
                        <span className="lv-lbl">Confidence</span>
                        <div className="lv-bar" aria-hidden="true">
                          <div className="lv-fill" style={{ width: `${tool.level}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="proj-banner-wrap" id="projects">
        <div className="wrap">
          <div className="proj-banner">
            <div>
              <span className="label">My Projects</span>
              <h2>Two systems from the station. <em>Everything I did.</em></h2>
            </div>
            <p className="proj-banner-note">
              <strong>A note on these projects</strong>
              Built on the job at Bombo Radyo Malaybalay. Live environments, real operators, real failure modes.
            </p>
          </div>
        </div>
      </div>

      {FEATURED.map((project) => (
        <section
          className={`cs-section${project.featuredNum === '02' ? ' cs-alt' : ''}`}
          id={project.featuredId}
          key={project.featuredId}
        >
          <div className="wrap">
            <div className="cs-kicker">
              <div className="cs-tags">
                {project.featuredTags.map((tag) => (
                  <span
                    key={tag}
                    className={`cs-tag${tag === project.featuredTags[0] ? ' ct-accent' : tag === project.featuredTags[project.featuredTags.length - 1] ? ' ct-dark' : ' ct-gray'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="cs-num">{project.featuredNum}</span>
            </div>

            <div className="cs-headline">
              <h2 className="cs-h"><em>{project.title.replace('Bombo Radyo ', '')}</em></h2>
              <p className="cs-loc">{project.subtitle}</p>
            </div>

            {project.image && (
              <div className="cs-shot">
                <div className="cs-shot-img">
                  <img src={project.image} alt={project.title} />
                </div>
                <p className="proof-cap">{project.screenshotCaption}</p>
              </div>
            )}

            <div className="cs-ov">
              <div className="cs-ov-card">
                <p className="sp-ey">The situation</p>
                <ul>
                  {project.situation.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="cs-ov-card">
                <p className="sp-ey">What I built</p>
                <ul>
                  {project.built.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="cs-ov-card">
                <p className="sp-ey">Where it sits now</p>
                <ul>
                  {project.outcome.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="cs-nav-row">
              <button type="button" className="btn btn-dark" onClick={() => setSelected(project)}>
                Read full case study <span className="btn-arrow">→</span>
              </button>
              <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-outline">
                GitHub
              </a>
            </div>
          </div>
        </section>
      ))}

      <section className="section more-section">
        <div className="wrap">
          <div className="more-head">
            <div>
              <span className="label">More work</span>
              <h2 className="h2">The rest of the <em>station toolkit.</em></h2>
            </div>
            <Link to="/projects" className="more-all">
              Full archive <span className="btn-arrow">→</span>
            </Link>
          </div>
          <div className="more-grid">
            {MORE.map((project) => (
              <button
                type="button"
                className="more-card"
                key={project.title}
                onClick={() => setSelected(project)}
              >
                <div className="more-thumb">
                  {project.image && <img src={project.image} alt="" loading="lazy" />}
                </div>
                <span className="project-card-tag">{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="data-section" id="process">
        <div className="wrap">
          <div className="data-header">
            <div>
              <span className="label">How I work</span>
              <h2 className="h2">I do not just write scripts. <em>I ship them live.</em></h2>
            </div>
            <p>
              Broadcast software fails in public. I design for unattended hours, covered windows,
              and operators who do not have time to debug. Here is how that shows up in the work.
            </p>
          </div>

          <div className="data-main-grid">
            <div className="data-points">
              <div className="dp-item">
                <div className="dp-item-ico">⏱</div>
                <h4>Latency under live conditions</h4>
                <p>X32 toggles had to feel instant. OSC over UDP, not a round-trip through a UI layer, is why mute happens in under 50ms.</p>
              </div>
              <div className="dp-item">
                <div className="dp-item-ico">👁</div>
                <h4>Unattended observability</h4>
                <p>If a transmitter AUI is minimised, the monitor still captures it. Tools that only work when someone is looking are not tools.</p>
              </div>
              <div className="dp-item">
                <div className="dp-item-ico">🔗</div>
                <h4>Alerts where people already are</h4>
                <p>Breaking news goes to Discord. Operators should not open a second dashboard to find out the important thing already happened.</p>
              </div>
              <div className="dp-item">
                <div className="dp-item-ico">🛡</div>
                <h4>Safe defaults</h4>
                <p>Rename scripts dry-run. OBS sorts only targeted scenes. Automations that can destroy a live show need a fence around them.</p>
              </div>
              <div className="dp-item">
                <div className="dp-item-ico">📐</div>
                <h4>Measure the hours saved</h4>
                <p>Drama reports and OBS setup were timed against the old process. If it does not cut real work, it does not ship.</p>
              </div>
            </div>
            <div>
              <p className="data-ss-label">Live data from the work</p>
              <div className="data-screens">
                <figure>
                  <img src="/projects/bombo.png" alt="News Intelligence Hub dashboard" />
                  <figcaption>News Intelligence Hub — live headline board</figcaption>
                </figure>
                <figure>
                  <img src="/projects/nautel.png" alt="Nautel AUI monitor captures" />
                  <figcaption>Nautel AUI Monitor — unattended captures</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section personal-section" id="personal">
        <div className="wrap personal-grid">
          <ScrollReveal>
            <span className="label">Outside the studio</span>
            <h2 className="h2">A little about <em>who I am.</em></h2>
            <p className="bp">
              The things I do outside of work shape how I work. Basketball taught me to read
              a situation fast and move with a team. Hardware repair taught me to diagnose
              before swapping parts. Video editing gave me an eye for timing.
            </p>
            <p className="bp">
              I like building things that did not exist that morning and putting them in
              front of people who will actually use them.
            </p>
          </ScrollReveal>
          <div className="personal-cards">
            <div className="p-card">
              <div className="p-card-ico">🏀</div>
              <p className="p-card-title">Basketball</p>
              <p className="p-card-sub">College of Technologies Athlete of the Year, BukSU 2024.</p>
            </div>
            <div className="p-card">
              <div className="p-card-ico">🎬</div>
              <p className="p-card-title">Video editing</p>
              <p className="p-card-sub">Cuts and timing for station and personal work. Pace matters.</p>
            </div>
            <div className="p-card">
              <div className="p-card-ico">🔧</div>
              <p className="p-card-title">Hardware</p>
              <p className="p-card-sub">Freelance diagnostics, upgrades, and small-office networks.</p>
            </div>
            <div className="p-card">
              <div className="p-card-ico">⚙️</div>
              <p className="p-card-title">Building from scratch</p>
              <p className="p-card-sub">If the station needs it and it does not exist, I write it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section education-section" id="education">
        <div className="wrap">
          <ScrollReveal>
            <span className="label">Education</span>
            <h2 className="h2">Academic <em>background.</em></h2>
          </ScrollReveal>
          <div className="edu-grid">
            <article className="edu-card edu-main">
              <span className="edu-badge eb-lt">Degree</span>
              <h3 className="edu-deg">Bachelor of Science in Information Technology</h3>
              <p className="edu-school">Bukidnon State University</p>
              <p className="edu-detail">Malaybalay, Bukidnon · 2020 – 2024</p>
              <p className="edu-note">
                Built the programming and systems foundation I now use on live broadcast tools.
              </p>
            </article>
            <article className="edu-card edu-normal">
              <span className="edu-badge eb-accent">Internship</span>
              <h3 className="edu-deg">IT Intern — Cash Unit</h3>
              <p className="edu-school">Department of Education, Malaybalay City</p>
              <p className="edu-detail">Troubleshooting, data encoding, loan and voucher processing.</p>
            </article>
            <article className="edu-card edu-normal">
              <span className="edu-badge eb-accent">On the job</span>
              <h3 className="edu-deg">IT / Technician</h3>
              <p className="edu-school">Bombo Radyo Malaybalay</p>
              <p className="edu-detail">2025 – present · Station systems and custom automation.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-section" id="hire">
        <div className="wrap contact-inner">
          <span className="label">Get in Touch</span>
          <h2 className="contact-h">Looking for an <em>automation role.</em></h2>
          <p className="contact-desc">
            I have real station systems, real data, and a drive to keep building. If you are
            hiring or know someone who is, reach out directly.
          </p>
          <div className="contact-list">
            <a className="cl-row" href="mailto:klydejosephy@gmail.com">
              <span className="cl-lbl">Email</span>
              <span className="cl-val">klydejosephy@gmail.com</span>
            </a>
            <a className="cl-row" href="tel:+639455927782">
              <span className="cl-lbl">Phone</span>
              <span className="cl-val">+63 945 592 7782</span>
            </a>
            <a className="cl-row" href="https://github.com/klaayd39" target="_blank" rel="noreferrer">
              <span className="cl-lbl">GitHub</span>
              <span className="cl-val">github.com/klaayd39</span>
            </a>
            <a className="cl-row" href="https://www.linkedin.com/in/klyde-joseph-yabo-a38286373/" target="_blank" rel="noreferrer">
              <span className="cl-lbl">LinkedIn</span>
              <span className="cl-val">klyde-joseph-yabo</span>
            </a>
            <div className="cl-row">
              <span className="cl-lbl">Location</span>
              <span className="cl-val">Malaybalay City, Bukidnon, Philippines</span>
            </div>
            <div className="cl-row">
              <span className="cl-lbl">Status</span>
              <span className="cl-val cl-avail">Available now · Actively looking</span>
            </div>
          </div>
          <div className="hero-btns contact-cta">
            <Link to="/contact" className="btn btn-accent">
              Send a message <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
