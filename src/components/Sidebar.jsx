import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from './navItems'

function SidebarContent({ onLinkClick }) {
  return (
    <>
      <div className="sidebar-brand">
        <span className="brand-name">Klyde Joseph</span>
      </div>

      <ul className="nav-list">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              onClick={onLinkClick}
            >
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-bottom">
        <hr className="sidebar-divider" />

        <a
          href="/Klyde_Joseph_Yabo_Resume.pdf"
          download="Klyde_Joseph_Yabo_Resume.pdf"
          className="download-btn"
          onClick={onLinkClick}
        >
          Download Resume
        </a>

        <div className="sidebar-socials">
          <a href="mailto:klydejosephy@gmail.com" className="sidebar-social-link" title="Email">
            Email
          </a>
          <a href="https://github.com/klaayd39" target="_blank" rel="noreferrer" className="sidebar-social-link" title="GitHub">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/klyde-joseph-yabo-a38286373/" target="_blank" rel="noreferrer" className="sidebar-social-link" title="LinkedIn">
            LinkedIn
          </a>
        </div>

        <p className="sidebar-footer-note">© {new Date().getFullYear()} Klyde Joseph Yabo</p>
      </div>
    </>
  )
}

export default function Sidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const [prevPath, setPrevPath] = useState(location.pathname)

  // Adjust state during render when route changes
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname)
    setDrawerOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      {/* Desktop / Tablet Sidebar */}
      <aside className={`sidebar${isScrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <SidebarContent onLinkClick={undefined} />
      </aside>

      {/* Mobile Hamburger Bar */}
      <div className={`mobile-topbar${isScrolled ? ' scrolled' : ''}`} role="banner">
        <span className="brand">Klyde Joseph</span>
        <button
          className="hamburger-btn"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </div>

      {/* Mobile Off-Canvas Drawer */}
      {drawerOpen && (
        <div
          className="drawer-overlay"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`drawer-sidebar${drawerOpen ? ' drawer-open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!drawerOpen}
      >
        <button
          className="drawer-close-btn"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close navigation menu"
        >
          ✕
        </button>
        <SidebarContent
          onLinkClick={() => setDrawerOpen(false)}
        />
      </aside>
    </>
  )
}
