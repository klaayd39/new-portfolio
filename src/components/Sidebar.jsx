import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MAIN_NAV, CONNECT_LINKS, SECTION_IDS } from './navItems'

const ICONS = {
  home: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 01-1.5 1.5H15v-5.5H9V20.5H5.5A1.5 1.5 0 014 19v-8.5z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6 19.5c.8-3.2 3-4.8 6-4.8s5.2 1.6 6 4.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 12l8-3.5M12 12v8M12 12L4 8.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  resume: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M8 4h8l4 4v12a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 016 20V5.5A1.5 1.5 0 017.5 4H8z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 4v4h4M9 13h6M9 16.5h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4 7.5l8 5.5 8-5.5M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4 7.5l8 5.5 8-5.5M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1.1.5-2.2 1.6-2.9-3.4-.4-7-1.7-7-7.6 0-1.7.6-3.1 1.6-4.2-1.5 0-3.1.8-3.8 2 0 0-1.6-.8-3.2.6-.9 1.7-.4 4 .8 5.2-1.2 1.1-1.6 2.5-1.6 4.2 0 5.9 3.6 7.2 7 7.6 1.3 1.2 2.8 1.9 4.4 1.9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 11v5M8 8v.01M12 16v-5m0 0a2 2 0 114 0v5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M7 17L17 7M10 7h7v7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

function NavItem({ item, active, onClick }) {
  const content = (isActive) => (
    <>
      <span className="sidebar-nav-icon">{ICONS[item.icon]}</span>
      <span className="sidebar-nav-text">{item.label}</span>
      {isActive && <span className="sidebar-nav-chevron">{ICONS.chevron}</span>}
    </>
  )

  if (item.path) {
    return (
      <li>
        <NavLink
          to={item.path}
          className={({ isActive }) => `sidebar-nav-link${isActive ? ' sidebar-nav-link--active' : ''}`}
          onClick={onClick}
        >
          {({ isActive }) => content(isActive)}
        </NavLink>
      </li>
    )
  }

  const className = `sidebar-nav-link${active ? ' sidebar-nav-link--active' : ''}`

  return (
    <li>
      <Link to={item.to} className={className} onClick={onClick}>
        {content(active)}
      </Link>
    </li>
  )
}

function SidebarPanel({ activeId, onLinkClick }) {
  const location = useLocation()
  const onHome = location.pathname === '/'

  const isNavActive = (item) => {
    if (item.path) return location.pathname === item.path
    if (!onHome) return false
    return activeId === item.id
  }

  return (
    <div className="sidebar-panel-inner">
      <header className="sidebar-profile">
        <img src="/ID.png" alt="Klyde Joseph Yabo" className="sidebar-avatar" />
        <div className="sidebar-profile-copy">
          <Link to="/" className="sidebar-name" onClick={onLinkClick}>
            Klyde Joseph Yabo
          </Link>
          <p className="sidebar-role">Information Technology</p>
        </div>
      </header>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <ul className="sidebar-nav-list">
          {MAIN_NAV.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={isNavActive(item)}
              onClick={onLinkClick}
            />
          ))}
        </ul>
      </nav>

      <div className="sidebar-connect">
        <p className="sidebar-connect-label">Connect</p>
        <ul className="sidebar-connect-list">
          {CONNECT_LINKS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="sidebar-connect-link"
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                onClick={onLinkClick}
              >
                <span className="sidebar-nav-icon">{ICONS[item.icon]}</span>
                <span className="sidebar-nav-text">{item.label}</span>
                <span className="sidebar-connect-external">{ICONS.external}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="sidebar-footer">
        <a
          href="/Klyde_Joseph_Yabo_Resume.pdf"
          download="Klyde_Joseph_Yabo_Resume.pdf"
          className="sidebar-download-card"
          onClick={onLinkClick}
        >
          <span className="sidebar-download-kicker">Get my resume</span>
          <span className="sidebar-download-title">Download PDF</span>
        </a>
        <p className="sidebar-meta">Open to work · Malaybalay, PH</p>
        <p className="sidebar-copy">© {new Date().getFullYear()} Klyde Joseph Yabo</p>
      </footer>
    </div>
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
  }, [onHome, location.pathname])

  const activeId = onHome ? activeHash : ''

  return (
    <>
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

      <aside
        className={`sidebar-panel${drawerOpen ? ' sidebar-panel--open' : ''}`}
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
        <SidebarPanel activeId={activeId} onLinkClick={closeDrawer} />
      </aside>
    </>
  )
}
