import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { PROJECTS } from '../data/projects'

const FEATURED = PROJECTS.filter((p) => p.featured)
const SECTION_IDS = ['about', 'tools', 'projects', 'bombo', 'nautel', 'hire']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('')
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setDropOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveHash('')
      return undefined
    }

    let io
    let cancelled = false
    const setup = () => {
      if (cancelled) return
      const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
      if (!els.length) {
        window.requestAnimationFrame(setup)
        return
      }
      io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
          if (!visible?.target?.id) return
          const id = visible.target.id
          setActiveHash(['bombo', 'nautel', 'projects'].includes(id) ? 'projects' : id)
        },
        { rootMargin: '-28% 0px -58% 0px', threshold: [0.1, 0.25, 0.5] }
      )
      els.forEach((el) => io.observe(el))
    }
    setup()
    return () => {
      cancelled = true
      io?.disconnect()
    }
  }, [location.pathname])

  const onHome = location.pathname === '/'
  const projectsActive = location.pathname === '/projects' || (onHome && activeHash === 'projects')

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo(0, 0)}>
          Klyde<span></span>
        </Link>

        <button
          className={`ham${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {menuOpen && (
          <div className="nav-scrim" onClick={() => setMenuOpen(false)} aria-hidden="true" />
        )}

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li>
            <NavLink to="/#about" className={() => onHome && activeHash === 'about' ? 'active' : ''}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/#tools" className={() => onHome && activeHash === 'tools' ? 'active' : ''}>
              Tools
            </NavLink>
          </li>
          <li className="has-drop">
            <button
              className={`nav-drop-btn${projectsActive ? ' active' : ''}`}
              onClick={() => setDropOpen((v) => !v)}
              aria-expanded={dropOpen}
            >
              Projects <span className="chevron">▼</span>
            </button>
            <div className={`dropdown${dropOpen ? ' mob-open' : ''}`}>
              {FEATURED.map((p) => (
                <Link
                  key={p.featuredId}
                  to={`/#${p.featuredId}`}
                  className="drop-item"
                >
                  <span className="drop-ico">{p.tag === 'Intelligence' ? '📡' : '📻'}</span>
                  <span>
                    <span className="drop-name">{p.title.replace('Bombo Radyo ', '')}</span>
                    <span className="drop-sub">{p.tag} · {p.subtitle.split('·')[0].trim()}</span>
                  </span>
                </Link>
              ))}
              <Link to="/projects" className="drop-item">
                <span className="drop-ico">→</span>
                <span>
                  <span className="drop-name">All projects</span>
                  <span className="drop-sub">Full archive with filters</span>
                </span>
              </Link>
            </div>
          </li>
          <li>
            <NavLink to="/resume">Resume</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => `nav-cta${isActive ? ' on' : ''}`}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}
