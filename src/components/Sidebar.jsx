import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_ITEMS, PAGE_ITEMS, SECTION_IDS } from './navItems'
import LocalTime from './LocalTime'

function SidebarContent({ activeId, onHome, onLinkClick }) {
  return (
    <>
      <div className="sidebar-top">
        <Link to="/" className="sidebar-brand" onClick={onLinkClick}>
          Klyde<span>.</span>
        </Link>
        <span className="sidebar-pill">Open to work</span>
        <LocalTime />
        <p className="sidebar-updated">Malaybalay, Philippines</p>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <p className="sidebar-nav-label">Sections</p>
        <ul className="sidebar-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              {onHome ? (
                <a
                  href={`#${item.id}`}
                  className={`sidebar-link${activeId === item.id ? ' sidebar-link--active' : ''}`}
                  onClick={onLinkClick}
                >
                  <span className="sidebar-link-dot" aria-hidden="true" />
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.to}
                  className={`sidebar-link${activeId === item.id ? ' sidebar-link--active' : ''}`}
                  onClick={onLinkClick}
                >
                  <span className="sidebar-link-dot" aria-hidden="true" />
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <p className="sidebar-nav-label">Pages</p>
        <ul className="sidebar-list">
          {PAGE_ITEMS.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `sidebar-link${isActive ? ' sidebar-link--active' : ''}`}
                onClick={onLinkClick}
              >
                <span className="sidebar-link-dot" aria-hidden="true" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-bottom">
        <a
          href="/Klyde_Joseph_Yabo_Resume.pdf"
          download="Klyde_Joseph_Yabo_Resume.pdf"
          className="sidebar-download"
          onClick={onLinkClick}
        >
          Download Resume
        </a>
        <div className="sidebar-socials">
          <a href="mailto:klydejosephy@gmail.com">Email</a>
          <a href="https://github.com/klaayd39" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/klyde-joseph-yabo-a38286373/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <p className="sidebar-note">📻 probably automating something at the station</p>
        <p className="sidebar-copy">© {new Date().getFullYear()} Klyde Joseph Yabo</p>
      </div>
    </>
  )
}

export default function Sidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('top')
  const location = useLocation()
  const onHome = location.pathname === '/'

  const closeDrawer = () => setDrawerOpen(false)

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

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
        { rootMargin: '-28% 0px -58% 0px', threshold: [0.1, 0.25, 0.5] }
      )
      els.forEach((el) => io.observe(el))
    }
    setup()
    return () => {
      cancelled = true
      io?.disconnect()
    }
  }, [onHome])

  const activeId = onHome ? activeHash : ''

  return (
    <>
      {/* Mobile top bar */}
      <header className="mobile-bar">
        <Link to="/" className="mobile-bar-brand" onClick={closeDrawer}>
          Klyde<span>.</span>
        </Link>
        <button
          type="button"
          className={`mobile-bar-toggle${drawerOpen ? ' mobile-bar-toggle--open' : ''}`}
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={drawerOpen}
        >
          <span /><span /><span />
        </button>
      </header>

      {drawerOpen && (
        <button type="button" className="sidebar-scrim" onClick={closeDrawer} aria-label="Close menu" />
      )}

      {/* Right sidebar — desktop fixed, mobile drawer from right */}
      <aside
        className={`sidebar-right${drawerOpen ? ' sidebar-right--open' : ''}`}
        aria-label="Site navigation"
      >
        <button
          type="button"
          className="sidebar-close"
          onClick={closeDrawer}
          aria-label="Close menu"
        >
          ✕
        </button>
        <SidebarContent activeId={activeId} onHome={onHome} onLinkClick={closeDrawer} />
      </aside>
    </>
  )
}
