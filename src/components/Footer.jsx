import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <ScrollReveal mode="3d" duration={800}>
          <p className="ft-name">Klyde Joseph Yabo<span>.</span></p>
          <p className="ft-sub">Information Technology · Malaybalay, Philippines</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="ft-links">
            <Link to="/#about">About</Link>
            <Link to="/#tools">Tools</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/resume">Resume</Link>
            <Link to="/contact">Contact</Link>
            <a href="https://github.com/klaayd39" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/klyde-joseph-yabo-a38286373/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="ft-copy">
            © {new Date().getFullYear()} Klyde Joseph Yabo · Built for live broadcast, not demos
          </p>
        </ScrollReveal>
      </div>
    </footer>
  )
}
