import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { MARQUEE_TOOLS, TOOL_GROUPS } from '../data/skills'
import { CLIENT_PROJECTS, PERSONAL_PROJECTS, STATION_PROJECTS } from '../data/projects'
import ScrollReveal from '../components/ScrollReveal'
import Parallax from '../components/Parallax'
import DepthSection from '../components/DepthSection'
import Card3D from '../components/Card3D'
import AnimatedFill from '../components/AnimatedFill'
import SplitReveal from '../components/SplitReveal'
import ProjectModal from '../components/ProjectModal'
import { useState } from 'react'

const FEATURED = STATION_PROJECTS.filter((p) => p.featured)
const STATION_MORE = STATION_PROJECTS.filter((p) => !p.featured)
const marquee = [...MARQUEE_TOOLS, ...MARQUEE_TOOLS]

export default function Home() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <Helmet>
        <title>Klyde Joseph Yabo — Information Technology | Malaybalay</title>
      </Helmet>

      <section className="hero" id="top">
        <Parallax className="hero-orb hero-orb-1" speed={0.32} scale={0.22} translateZ={-40} aria-hidden="true" />
        <Parallax className="hero-orb hero-orb-2" speed={0.5} scale={0.18} rotateY={6} aria-hidden="true" />
        <Parallax className="hero-orb hero-orb-3" speed={0.42} speedX={0.14} translateZ={20} aria-hidden="true" />
        <Parallax className="hero-bg-text" base="translateY(-50%)" speed={0.4} fade={0.45} rotateX={4} aria-hidden="true">
          Klyde
        </Parallax>
        <div className="wrap hero-inner">
          <ScrollReveal className="hero-copy" blur delay={80}>
            <h1 className="hero-h1">
              <span className="nameline">Klyde Joseph Yabo</span>
              <em><SplitReveal text="Information" delay={120} stagger={55} /></em>
              {' '}
              <br />
              <SplitReveal text="Technology" delay={280} stagger={50} />
            </h1>
            <p className="hero-sub">
              I build tools that keep a live radio station running. Web crawlers, mixer controls,
              transmitter monitors, and OBS automation—designed to solve real problems, deployed in production,
              and actively used at <strong>Bombo Radyo Malaybalay</strong>. I build for real-world use, not just
              for the tutorial folder.
            </p>
          </ScrollReveal>

          <Parallax className="hero-photo" speed={0.14} scale={0.07} rotateY={-4} translateZ={30} smooth={0.07}>
            <div className="photo-frame">
              <img src="/ID.png" alt="Klyde Joseph Yabo" className="photo-ph" />
            </div>
            <div className="photo-name">
              <p className="photo-name-main">Klyde Joseph Yabo</p>
              <p className="photo-name-role">IT / Technician · Bombo Radyo Malaybalay</p>
            </div>
          </Parallax>

          <ScrollReveal className="hero-actions" delay={160}>
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
          </ScrollReveal>
        </div>
      </section>

      <div className="marquee-wrap">
        <p className="mq-label">Tools I Use in Work</p>
        <div className="mq-track">
          <div className="mq-row">
            {marquee.map((tool, i) => (
              <div className="mq-item" key={`${tool.name}-${i}`}>
                <span className="mq-mark">
                  <img src={tool.icon} alt="" className="mq-icon" loading="lazy" decoding="async" />
                </span>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DepthSection className="section about-section" id="about" ambient>
        <div className="wrap about-grid">
          <ScrollReveal blur>
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

          <ScrollReveal delay={120} className="skill-panels" direction="right">
            <Card3D className="sp-card" intensity={6}>
              <p className="sp-ey">Automation</p>
              <ul className="sk-list">
                <li>Headline crawlers and news aggregation</li>
                <li>Document generation from broadcast logs</li>
                <li>Batch media renaming with regex safety</li>
                <li>Scheduled background monitors</li>
                <li>Playwright and PowerShell workflows</li>
              </ul>
            </Card3D>
            <Card3D className="sp-card" intensity={6}>
              <p className="sp-ey">Broadcast systems</p>
              <ul className="sk-list">
                <li>OBS scene sorting and media automators</li>
                <li>Behringer X32 OSC control over UDP</li>
                <li>Nautel transmitter AUI capture</li>
                <li>Discord alerts for breaking news</li>
                <li>Linux and Windows station machines</li>
              </ul>
            </Card3D>
            <Card3D className="sp-card" intensity={6}>
              <p className="sp-ey">Web and data</p>
              <ul className="sk-list">
                <li>React dashboards and Vite apps</li>
                <li>WebSockets and REST APIs</li>
                <li>Supabase and PostgreSQL</li>
                <li>HTML, CSS, and responsive layouts</li>
              </ul>
            </Card3D>
          </ScrollReveal>
        </div>
      </DepthSection>

      <DepthSection className="section tools-section" id="tools" ambient>
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
                        <AnimatedFill width={tool.level} />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </DepthSection>

      <div className="section-divider" aria-hidden="true"><span /></div>

      <div className="proj-banner-wrap" id="projects">
        <div className="wrap">
          <ScrollReveal>
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
          </ScrollReveal>
        </div>
      </div>

      {FEATURED.map((project) => (
        <DepthSection
          className={`cs-section${project.featuredNum === '02' ? ' cs-alt' : ''}`}
          id={project.featuredId}
          key={project.featuredId}
          ambient
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
              <Parallax className="cs-num" speed={0.34} rotate={9} fade={0.35}>{project.featuredNum}</Parallax>
            </div>

            <ScrollReveal className="cs-headline" blur>
              <h2 className="cs-h"><em>{project.title.replace('Bombo Radyo ', '')}</em></h2>
              <p className="cs-loc">{project.subtitle}</p>
            </ScrollReveal>

            {project.image && (
              <ScrollReveal delay={80}>
                <div className="cs-shot">
                  <div className="cs-shot-img">
                    <Parallax className="cs-shot-parallax" base="scale(1.24)" speed={0.07} smooth={0.06} rotateX={3}>
                      <img src={project.image} alt={project.title} />
                    </Parallax>
                  </div>
                  <p className="proof-cap">{project.screenshotCaption}</p>
                </div>
              </ScrollReveal>
            )}

            <div className="cs-ov">
              {['The situation', 'What I built', 'Where it sits now'].map((label, idx) => {
                const items = idx === 0 ? project.situation : idx === 1 ? project.built : project.outcome
                return (
                  <ScrollReveal key={label} delay={idx * 80} direction={idx === 1 ? 'none' : idx === 0 ? 'left' : 'right'}>
                    <Card3D className="cs-ov-card" intensity={5}>
                      <p className="sp-ey">{label}</p>
                      <ul>
                        {items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </Card3D>
                  </ScrollReveal>
                )
              })}
            </div>

            <ScrollReveal delay={200}>
              <div className="cs-nav-row">
              <button type="button" className="btn btn-dark" onClick={() => setSelected(project)}>
                Read full case study <span className="btn-arrow">→</span>
              </button>
              <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-outline">
                GitHub
              </a>
              </div>
            </ScrollReveal>
          </div>
        </DepthSection>
      ))}

      <DepthSection className="section more-section" ambient>
        <div className="wrap">
          <ScrollReveal>
            <div className="more-head">
              <div>
                <span className="label">More work</span>
                <h2 className="h2">The rest of the <em>station toolkit.</em></h2>
              </div>
              <Link to="/projects" className="more-all">
                Full archive <span className="btn-arrow">→</span>
              </Link>
            </div>
          </ScrollReveal>
          <div className="more-grid">
            {STATION_MORE.map((project, index) => (
              <ScrollReveal key={project.title} delay={Math.min(index * 50, 200)}>
                <Card3D
                  as="button"
                  type="button"
                  className="more-card"
                  intensity={8}
                  onClick={() => setSelected(project)}
                >
                  <div className="more-thumb">
                    {project.image && <img src={project.image} alt="" loading="lazy" />}
                  </div>
                  <span className="project-card-tag">{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </DepthSection>

      <DepthSection className="section client-projects-section" ambient>
        <div className="wrap">
          <ScrollReveal>
            <div className="more-head">
              <div>
                <span className="label">Client projects</span>
                <h2 className="h2">Built for <em>real clients.</em></h2>
              </div>
              <Link to="/projects" className="more-all">
                Full archive <span className="btn-arrow">→</span>
              </Link>
            </div>
          </ScrollReveal>
          <div className="more-grid">
            {CLIENT_PROJECTS.map((project, index) => (
              <ScrollReveal key={project.title} delay={Math.min(index * 50, 200)}>
                <Card3D
                  as="button"
                  type="button"
                  className="more-card"
                  intensity={8}
                  onClick={() => setSelected(project)}
                >
                  <div className="more-thumb">
                    {project.image && <img src={project.image} alt="" loading="lazy" />}
                  </div>
                  <span className="project-card-tag">{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </DepthSection>

      <DepthSection className="section personal-projects-section" ambient>
        <div className="wrap">
          <ScrollReveal>
            <div className="more-head">
              <div>
                <span className="label">Personal projects</span>
                <h2 className="h2">Built outside the <em>station.</em></h2>
              </div>
              <Link to="/projects" className="more-all">
                Full archive <span className="btn-arrow">→</span>
              </Link>
            </div>
          </ScrollReveal>
          <div className="more-grid">
            {PERSONAL_PROJECTS.map((project, index) => (
              <ScrollReveal key={project.title} delay={Math.min(index * 50, 200)}>
                <Card3D
                  as="button"
                  type="button"
                  className="more-card"
                  intensity={8}
                  onClick={() => setSelected(project)}
                >
                  <div className="more-thumb">
                    {project.image && <img src={project.image} alt="" loading="lazy" />}
                  </div>
                  <span className="project-card-tag">{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </DepthSection>

      <DepthSection className="data-section" id="process" ambient>
        <div className="wrap">
          <ScrollReveal className="data-header" blur>
            <div>
              <span className="label">How I work</span>
              <h2 className="h2">I do not just write scripts. <em>I ship them live.</em></h2>
            </div>
            <p>
              Broadcast software fails in public. I design for unattended hours, covered windows,
              and operators who do not have time to debug. Here is how that shows up in the work.
            </p>
          </ScrollReveal>

          <div className="data-main-grid">
            <div className="data-points">
              {[
                { ico: '⏱', title: 'Latency under live conditions', text: 'X32 toggles had to feel instant. OSC over UDP, not a round-trip through a UI layer, is why mute happens in under 50ms.' },
                { ico: '👁', title: 'Unattended observability', text: 'If a transmitter AUI is minimised, the monitor still captures it. Tools that only work when someone is looking are not tools.' },
                { ico: '🔗', title: 'Alerts where people already are', text: 'Breaking news goes to Discord. Operators should not open a second dashboard to find out the important thing already happened.' },
                { ico: '🛡', title: 'Safe defaults', text: 'Rename scripts dry-run. OBS sorts only targeted scenes. Automations that can destroy a live show need a fence around them.' },
                { ico: '📐', title: 'Measure the hours saved', text: 'Drama reports and OBS setup were timed against the old process. If it does not cut real work, it does not ship.' },
              ].map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 60} direction="left">
                  <div className="dp-item">
                    <div className="dp-item-ico">{item.ico}</div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal direction="right" delay={120}>
              <p className="data-ss-label">Live data from the work</p>
              <div className="data-screens">
                <Parallax as="figure" speed={0.13} smooth={0.08} rotateY={-3} translateZ={16}>
                  <img src="/projects/bombo.png" alt="News Intelligence Hub dashboard" />
                  <figcaption>News Intelligence Hub — live headline board</figcaption>
                </Parallax>
                <Parallax as="figure" speed={-0.13} smooth={0.08} rotateY={3} translateZ={16}>
                  <img src="/projects/nautel.png" alt="Nautel AUI monitor captures" />
                  <figcaption>Nautel AUI Monitor — unattended captures</figcaption>
                </Parallax>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </DepthSection>

      <div className="section-divider section-divider--dark" aria-hidden="true"><span /></div>

      <DepthSection className="section personal-section" id="personal" ambient>
        <div className="wrap personal-grid">
          <ScrollReveal>
            <span className="label">Outside the studio</span>
            <h2 className="h2">A little about <em>who I am.</em></h2>
            <p className="bp">
              The things I do outside of work shape the way I approach it. Football taught me to read situations quickly, adapt on the move, and work as part of a team. Being recognized as the{' '}
              <strong>College of Technologies – Athlete of the Year</strong> reinforced the discipline, commitment, and perseverance I bring to everything I do. Hardware repair taught me to diagnose problems carefully before replacing parts, while video editing sharpened my sense of timing, detail, and visual storytelling. Together, these experiences have shaped how I think, solve problems, and approach my work.
            </p>
            <p className="bp">
              I like building things that did not exist that morning and putting them in
              front of people who will actually use them.
            </p>
          </ScrollReveal>
          <div className="personal-cards">
            {[
              { ico: '⚽', title: 'Football', sub: 'College of Technologies Athlete of the Year, BukSU 2024.' },
              { ico: '🎬', title: 'Video editing', sub: 'Cuts and timing for station and personal work. Pace matters.' },
              { ico: '🔧', title: 'Hardware', sub: 'Freelance diagnostics, upgrades, and small-office networks.' },
              { ico: '⚙️', title: 'Building from scratch', sub: 'If the station needs it and it does not exist, I write it.' },
            ].map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 70}>
                <Card3D className="p-card" intensity={7}>
                  <div className="p-card-ico">{card.ico}</div>
                  <p className="p-card-title">{card.title}</p>
                  <p className="p-card-sub">{card.sub}</p>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </DepthSection>

      <DepthSection className="section education-section" id="education" ambient>
        <div className="wrap">
          <ScrollReveal>
            <span className="label">Education</span>
            <h2 className="h2">Academic <em>background.</em></h2>
          </ScrollReveal>
          <div className="edu-grid">
            {[
              { badge: 'College', deg: 'Bachelor of Science in Information Technology', school: 'Bukidnon State University', detail: '2020 – 2024', note: 'Graduated as College of Technologies — Athlete of the Year.' },
              { badge: 'Senior High School', deg: 'Technical Vocational Livelihood - Information Technology', school: 'STI Malaybalay', detail: '2018 - 2020' },
              { badge: 'Junior High School', deg: 'Special Program in Sports', school: 'Bukidnon National High School', detail: '2014 - 2018' },
            ].map((edu, index) => (
              <ScrollReveal key={edu.badge} delay={index * 80}>
                <Card3D as="article" className="edu-card" intensity={6}>
                  <span className="edu-badge">{edu.badge}</span>
                  <h3 className="edu-deg">{edu.deg}</h3>
                  <p className="edu-school">{edu.school}</p>
                  <p className="edu-detail">{edu.detail}</p>
                  {edu.note && <p className="edu-note">{edu.note}</p>}
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </DepthSection>

      <DepthSection className="contact-section" id="hire" ambient>
        <div className="wrap contact-inner">
          <ScrollReveal blur>
            <span className="label">Get in Touch</span>
            <h2 className="contact-h">Looking for an <em>automation role.</em></h2>
            <p className="contact-desc">
              I have real station systems, real data, and a drive to keep building. If you are
              hiring or know someone who is, reach out directly.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
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
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <div className="hero-btns contact-cta">
              <Link to="/contact" className="btn btn-accent">
                Send a message <span className="btn-arrow">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </DepthSection>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
