import { Link } from 'react-router-dom'
import MotionReveal from './MotionReveal'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <MotionReveal>
          <p className="footer-name">Klyde Joseph Yabo</p>
          <p className="footer-tagline">Automation · Broadcast systems · Web apps</p>
        </MotionReveal>
        <MotionReveal delay={0.08}>
          <div className="footer-links">
            <Link to="/#about">About</Link>
            <Link to="/#projects">Projects</Link>
            <Link to="/#skills">Skills</Link>
            <Link to="/resume">Resume</Link>
            <Link to="/contact">Contact</Link>
            <a href="https://github.com/klaayd39" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </MotionReveal>
        <MotionReveal delay={0.14}>
          <p className="footer-copy">
            © {new Date().getFullYear()} Klyde Joseph Yabo · Built for live broadcast, not demos
          </p>
        </MotionReveal>
      </div>
    </footer>
  )
}
