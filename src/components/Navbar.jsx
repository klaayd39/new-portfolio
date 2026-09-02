import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV = [
  { label: 'Home', to: '/#top', id: 'top' },
  { label: 'About', to: '/#about', id: 'about' },
  { label: 'Projects', to: '/#projects', id: 'projects' },
  { label: 'Skills', to: '/#skills', id: 'skills' },
  { label: 'Experience', to: '/#experience', id: 'experience' },
  { label: 'Contact', to: '/#contact', id: 'contact' },
]

const SECTION_IDS = NAV.map((n) => n.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('top')
  const location = useLocation()
  const onHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!onHome) return undefined

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
          if (visible?.target?.id) setActiveHash(visible.target.id)
        },
        { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.3] }
      )
      els.forEach((el) => io.observe(el))
    }
    setup()
    return () => {
      cancelled = true
      io?.disconnect()
    }
  }, [onHome])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Klyde<span>.</span>
        </Link>

        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' nav-toggle--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

        {menuOpen && (
          <button type="button" className="nav-scrim" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
        )}

        <nav className={`nav-menu${menuOpen ? ' nav-menu--open' : ''}`}>
          {NAV.map((item) => (
            onHome ? (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link${activeHash === item.id ? ' nav-link--active' : ''}`}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.id} to={item.to} className="nav-link" onClick={closeMenu}>
                {item.label}
              </Link>
            )
          ))}
          <NavLink to="/resume" className="nav-link nav-link--resume" onClick={closeMenu}>Resume</NavLink>
        </nav>
      </div>
    </header>
  )
}
