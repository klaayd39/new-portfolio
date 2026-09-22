import { Link } from 'react-router-dom'
import HashLink from './HashLink'
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
            <HashLink to="/#about">About</HashLink>
            <HashLink to="/#projects">Projects</HashLink>
            <HashLink to="/#skills">Skills</HashLink>
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
