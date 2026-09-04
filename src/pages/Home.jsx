import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { STATION_PROJECTS, CLIENT_PROJECTS, PERSONAL_PROJECTS } from '../data/projects'
import { TOOL_GROUPS, SKILLS } from '../data/skills'
import MotionReveal from '../components/MotionReveal'
import FeaturedProject, { ProjectCard } from '../components/FeaturedProject'
import ProjectModal from '../components/ProjectModal'
import AnimatedFill from '../components/AnimatedFill'
import TechMarquee from '../components/TechMarquee'
import CopyButton from '../components/CopyButton'

const FEATURED = STATION_PROJECTS.filter((p) => p.featured)
const HIGHLIGHTS = [...FEATURED, ...CLIENT_PROJECTS.slice(0, 2), ...PERSONAL_PROJECTS.slice(0, 1)]

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

const SECTION_NUMS = {
  about: '01',
  experience: '02',
  projects: '03',
  skills: '04',
  exploring: '05',
  contact: '06',
}

export default function Home() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <Helmet>
        <title>Klyde Joseph Yabo — Information Technology</title>
        <meta name="description" content="Klyde Joseph Yabo builds automation, broadcast systems, and web apps for live radio — based in Malaybalay, Philippines." />
      </Helmet>

      {/* ── HERO ── */}
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
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
              Information Technology
            </motion.p>

            <motion.p
              className="hero-lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
            >
              I build software and automation that solve real-world problems — from internal tools and web applications to broadcast systems and workflow automation. I focus on building practical solutions that are reliable, useful, and actually get used.
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

      <TechMarquee />

      {/* ── ABOUT ── */}
      <section className="section" id="about">
        <div className="container">
          <MotionReveal>
            <p className="section-label">
              <span className="section-num">{SECTION_NUMS.about}</span>
              About Me
            </p>
            <h2 className="section-title">I turn real-world problems into working software.</h2>
          </MotionReveal>

          <div className="about-layout">
            <MotionReveal delay={0.1}>
              <blockquote className="about-pull">
                Real problems. Real tools. Built to be used.
              </blockquote>
              <p className="body-text">
                I grew up in Malaybalay City, Bukidnon and studied Information Technology at Bukidnon State University.
                After graduating, I took about a year to rest and explore what I wanted to pursue. I eventually
                joined Bombo Radyo Malaybalay as an IT Technician, where I discovered that I could do more than
                maintain systems — I could build the tools the station actually needed. Working at the station
                showed me how much time can be lost on small, repetitive tasks. I saw opportunities to make things
                easier, so I started building my own tools — from crawlers and monitoring systems to OSC controls
                and OBS scripts. What started as solving small problems gradually became a way of thinking: if
                something can be automated, why keep doing it manually?
              </p>
              <p className="body-text">
                I also use AI throughout my development process, from exploring ideas to getting a starting point
                for the code. But I don&apos;t just copy and paste what it gives me. I read it, understand it, change
                it, and make it work for the problem I&apos;m actually solving. My goal is always to build software
                that is useful, reliable, and something I can confidently call my own.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="about-callout">
                <p className="body-text body-text--light">
                  I want to work with a team that values people who build, solve problems, and take
                  ownership. I&apos;m looking for opportunities where I can turn real-world problems
                  into reliable software and automation.
                </p>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="section section--muted" id="experience">
        <div className="container">
          <MotionReveal>
            <p className="section-label">
              <span className="section-num">{SECTION_NUMS.experience}</span>
              Experience
            </p>
          </MotionReveal>

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
            <p className="section-label">
              <span className="section-num">{SECTION_NUMS.projects}</span>
              Featured Projects
            </p>
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
                total={FEATURED.length}
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
            <p className="section-label">
              <span className="section-num">{SECTION_NUMS.skills}</span>
              Skills &amp; Technologies
            </p>
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
                      <AnimatedFill width={tool.level} />
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
            <p className="section-label">
              <span className="section-num">{SECTION_NUMS.exploring}</span>
              Outside the Studio
            </p>
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
            <p className="section-label">
              <span className="section-num">{SECTION_NUMS.contact}</span>
              Contact
            </p>
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
              <CopyButton text="klydejosephy@gmail.com" className="copy-btn--light" />
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
