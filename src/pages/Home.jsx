import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS, STATION_PROJECTS, CLIENT_PROJECTS, PERSONAL_PROJECTS } from '../data/projects'
import { TOOL_GROUPS, SKILLS } from '../data/skills'
import MotionReveal from '../components/MotionReveal'
import FeaturedProject, { ProjectCard } from '../components/FeaturedProject'
import ProjectModal from '../components/ProjectModal'
import CountUp from '../components/CountUp'

const FEATURED = STATION_PROJECTS.filter((p) => p.featured)
const HIGHLIGHTS = [...FEATURED, ...CLIENT_PROJECTS.slice(0, 2), ...PERSONAL_PROJECTS.slice(0, 1)]

const STATS = [
  { value: PROJECTS.length, suffix: '+', label: 'Projects shipped', note: 'Station tools, client apps, and personal builds.' },
  { value: 50, suffix: '+', label: 'Live feeds monitored', note: 'Aggregated in the News Intelligence Hub.' },
  { value: 15, suffix: '+', label: 'Technologies in production', note: 'From Python crawlers to React dashboards.' },
  { value: 1, suffix: '+', label: 'Years on live broadcast', note: 'Building software Bombo Radyo Malaybalay runs daily.' },
]

const EXPERIENCE = [
  {
    period: '2025 – Present',
    role: 'IT / Technician',
    org: 'Bombo Radyo Malaybalay',
    detail: 'Built news intelligence, transmitter monitoring, OBS automation, and mixer control systems used during live broadcasts.',
  },
  {
    period: '2024',
    role: 'IT Intern – Cash Unit (OJT)',
    org: 'Department of Education, Malaybalay City',
    detail: 'Computer troubleshooting, data encoding, and loan and voucher processing.',
  },
  {
    period: '2020 – 2024',
    role: 'BS Information Technology',
    org: 'Bukidnon State University',
    detail: 'College of Technologies Athlete of the Year, 2024.',
  },
]

const EXPLORING = [
  { emoji: '⚽', title: 'Football', text: 'College of Technologies Athlete of the Year, BukSU 2024.' },
  { emoji: '🎬', title: 'Video editing', text: 'Timing and pacing for station and personal work.' },
  { emoji: '🔧', title: 'Hardware repair', text: 'Freelance diagnostics, upgrades, and small-office networks.' },
  { emoji: '🛠', title: 'Building from scratch', text: 'If the station needs it and it does not exist, I write it.' },
]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/klaayd39' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/klyde-joseph-yabo-a38286373/' },
  { label: 'Email', href: 'mailto:klydejosephy@gmail.com' },
]

export default function Home() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <Helmet>
        <title>Klyde Joseph Yabo — Developer & Automation Engineer</title>
        <meta name="description" content="Klyde Joseph Yabo builds automation, broadcast systems, and web apps for live radio — based in Malaybalay, Philippines." />
      </Helmet>

      {/* ── HERO ── */}
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <motion.span
              className="status-pill"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Open to work · Malaybalay, Philippines
            </motion.span>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              Hey, I&apos;m <span className="text-accent">Klyde</span>
            </motion.h1>

            <motion.p
              className="hero-role"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
            >
              Automation Developer &amp; IT Technician
            </motion.p>

            <motion.p
              className="hero-lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
            >
              I build tools that keep a live radio station running — web crawlers, mixer controls,
              transmitter monitors, and OBS automation. Designed for real problems, deployed in production,
              and actively used at <strong>Bombo Radyo Malaybalay</strong>.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32 }}
            >
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <Link to="/contact" className="btn btn-secondary">Contact Me</Link>
            </motion.div>

            <motion.div
              className="hero-socials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.42 }}
            >
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
              ))}
            </motion.div>

            <p className="hero-status">📻 probably automating something at the station</p>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-photo-wrap">
              <img src="/ID.png" alt="Klyde Joseph Yabo" className="hero-photo" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section" id="about">
        <div className="container">
          <MotionReveal>
            <p className="section-label">About Me</p>
            <h2 className="section-title">I automate the job in front of me.</h2>
          </MotionReveal>

          <div className="about-layout">
            <MotionReveal delay={0.1}>
              <blockquote className="about-pull">
                Real station. Real tools. Not tutorial folder projects.
              </blockquote>
              <p className="body-text">
                I grew up in Bukidnon and studied Information Technology at Bukidnon State University.
                After graduating I joined Bombo Radyo Malaybalay as an IT technician — and started
                writing the software the station actually needed.
              </p>
              <p className="body-text">
                Newsrooms were tab-hopping for headlines. Transmitter sites went unchecked.
                Mixer mutes needed a walk across the studio. I built crawlers, monitors, OSC
                control, and OBS scripts so those jobs happen in the background.
              </p>
              <p className="body-text">
                I use AI the same way I use a search: to draft structure and generate starting
                code I can read, change, and own. The systems that matter are the ones that
                still work at 5am when a transmitter window is covered and nobody is watching.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="about-callout">
                <p className="section-label">What I&apos;m looking for</p>
                <h3>A full-time automation, software, or broadcast-systems role</h3>
                <p className="body-text body-text--light">
                  Agency, in-house, or a station that wants someone who ships. I show up
                  having already built the kind of work you would hand me on day one.
                </p>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE / STATS ── */}
      <section className="section section--muted" id="experience">
        <div className="container">
          <MotionReveal>
            <p className="section-label">Experience</p>
            <h2 className="section-title">Numbers from the work.</h2>
          </MotionReveal>

          <div className="stats-grid">
            {STATS.map((stat, i) => (
              <MotionReveal key={stat.label} delay={i * 0.08} className="stat-card">
                <CountUp end={stat.value} suffix={stat.suffix} className="stat-number" />
                <h3 className="stat-label">{stat.label}</h3>
                <p className="stat-note">{stat.note}</p>
              </MotionReveal>
            ))}
          </div>

          <div className="timeline">
            {EXPERIENCE.map((item, i) => (
              <MotionReveal key={item.role + item.org} delay={i * 0.08} className="timeline-item">
                <span className="timeline-period">{item.period}</span>
                <div>
                  <h3 className="timeline-role">{item.role}</h3>
                  <p className="timeline-org">{item.org}</p>
                  <p className="body-text">{item.detail}</p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="section" id="projects">
        <div className="container">
          <MotionReveal>
            <p className="section-label">Featured Projects</p>
            <h2 className="section-title">Work I&apos;ve shipped.</h2>
            <p className="section-intro">
              Station systems built on the job, client products, and personal tools — all running in real environments.
            </p>
          </MotionReveal>

          <div className="featured-list">
            {FEATURED.map((project, index) => (
              <FeaturedProject
                key={project.featuredId}
                project={project}
                index={index}
                onOpen={setSelected}
              />
            ))}
          </div>

          <MotionReveal>
            <div className="projects-header">
              <h3 className="subsection-title">More projects</h3>
              <Link to="/projects" className="text-link">Full archive →</Link>
            </div>
          </MotionReveal>

          <div className="projects-grid">
            {HIGHLIGHTS.filter((p) => !p.featured).slice(0, 6).map((project, i) => (
              <MotionReveal key={project.title} delay={i * 0.05}>
                <ProjectCard project={project} onOpen={setSelected} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="section section--muted" id="skills">
        <div className="container">
          <MotionReveal>
            <p className="section-label">Skills &amp; Technologies</p>
            <h2 className="section-title">What I use in production.</h2>
            <p className="section-intro">
              Every tool listed has been used on a live station workflow or a shipped project.
            </p>
          </MotionReveal>

          <div className="skills-layout">
            {SKILLS.map((group, i) => (
              <MotionReveal key={group.category} delay={i * 0.08} className="skill-group">
                <h3>{group.category}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </MotionReveal>
            ))}
          </div>

          <div className="tools-detail">
            {TOOL_GROUPS.map((group, gi) => (
              <MotionReveal key={group.num} delay={gi * 0.06} className="tool-block">
                <div className="tool-block-head">
                  <span className="tool-num">{group.num}</span>
                  <h3>{group.title}</h3>
                </div>
                <ul className="tool-list">
                  {group.tools.map((tool) => (
                    <li key={tool.name}>
                      <div className="tool-list-top">
                        <strong>{tool.name}</strong>
                        <span>{tool.level}%</span>
                      </div>
                      <p>{tool.desc}</p>
                      <div className="tool-bar" aria-hidden="true">
                        <span style={{ width: `${tool.level}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENTLY EXPLORING ── */}
      <section className="section" id="exploring">
        <div className="container">
          <MotionReveal>
            <p className="section-label">Outside the Studio</p>
            <h2 className="section-title">Currently exploring.</h2>
            <p className="section-intro">
              Football taught me to read situations quickly and work as a team. Hardware repair taught me to diagnose before replacing. Video editing sharpened my sense of timing and visual storytelling.
            </p>
          </MotionReveal>

          <div className="explore-grid">
            {EXPLORING.map((item, i) => (
              <MotionReveal key={item.title} delay={i * 0.08} className="explore-card">
                <span className="explore-emoji">{item.emoji}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section contact-section" id="contact">
        <div className="container contact-wrap">
          <MotionReveal>
            <p className="section-label">Contact</p>
            <h2 className="section-title section-title--light">
              Let&apos;s build something that runs at 5am.
            </h2>
            <p className="section-intro section-intro--light">
              Hiring for automation, broadcast systems, or full-stack work? I read every message.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="contact-actions">
              <a href="mailto:klydejosephy@gmail.com" className="btn btn-primary btn-lg">
                klydejosephy@gmail.com
              </a>
              <Link to="/contact" className="btn btn-secondary btn-lg btn-secondary--light">
                Send a message
              </Link>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.18}>
            <div className="contact-links">
              <a href="tel:+639455927782">+63 945 592 7782</a>
              <a href="https://github.com/klaayd39" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/klyde-joseph-yabo-a38286373/" target="_blank" rel="noreferrer">LinkedIn</a>
              <Link to="/resume">Resume</Link>
            </div>
          </MotionReveal>
        </div>
      </section>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
