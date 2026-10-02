import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { House, FolderOpen, User } from '@/components/slab'
import { motionReduced } from '@/lib/a11y'

/**
 * The phone navigation: Home, Work, and About in a bottom tab bar. Contact
 * lives in ContactFab (lower-right). One pill marks the active tab and
 * travels between them. The bar slides away while the visitor reads down a
 * page and returns when they scroll back up.
 *
 * Only rendered below the shell breakpoint (App decides); from 1100px the
 * profile rail is the navigation.
 */
const TABS = [
  { label: 'Home', to: '/', Icon: House },
  { label: 'Work', to: '/projects', Icon: FolderOpen },
  { label: 'About', to: '/about', Icon: User },
] as const

/** Scroll distance in one direction before the bar reacts, and the band at the
 *  top of the page where it always shows. */
const HIDE_AFTER = 24
const ALWAYS_SHOW_ABOVE = 60
/** The pill's stretch toward its target, as a share of the full span. */
const PILL_REACH = 0.85
const PILL_MS = 560
const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'

type Box = { x: number; w: number }

export default function TabBar() {
  const { pathname } = useLocation()
  const navRef = useRef<HTMLElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const last = useRef<Box | null>(null)
  const reducedMotion = useRef<MediaQueryList | null>(null)

  const reduced = useCallback(
    () => !!reducedMotion.current?.matches || motionReduced(),
    [],
  )

  const place = useCallback(
    (animate: boolean) => {
      const nav = navRef.current
      const pill = pillRef.current
      if (!nav || !pill) return
      const tab = nav.querySelector<HTMLElement>('.tabbar__tab[aria-current="page"]')
      if (!tab) {
        pill.dataset.off = ''
        last.current = null
        return
      }
      const to: Box = { x: tab.offsetLeft, w: tab.offsetWidth }
      let from = last.current
      const travel = pill.getAnimations().filter((a) => !(a instanceof CSSTransition))
      if (travel.length && from) {
        const m = new DOMMatrixReadOnly(getComputedStyle(pill).transform)
        from = { x: m.m41, w: from.w * m.m11 }
      }
      travel.forEach((a) => a.cancel())
      pill.style.width = `${to.w}px`
      pill.style.transform = `translateX(${to.x}px)`
      delete pill.dataset.off
      last.current = to
      if (!animate || !from || from.x === to.x || reduced()) return
      const lo = Math.min(from.x, to.x)
      const reach = (Math.abs(to.x - from.x) + to.w) * PILL_REACH
      pill.animate(
        [
          { transform: `translateX(${from.x}px) scaleX(${from.w / to.w})` },
          { transform: `translateX(${lo}px) scaleX(${reach / to.w})`, offset: 0.42 },
          { transform: `translateX(${to.x}px) scaleX(1)` },
        ],
        { duration: PILL_MS, easing: EASE_OUT },
      )
    },
    [reduced],
  )

  useLayoutEffect(() => {
    place(true)
    delete navRef.current?.dataset.hidden
  }, [pathname, place])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const ro = new ResizeObserver(() => place(false))
    ro.observe(nav)
    return () => ro.disconnect()
  }, [place])

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lastY = window.scrollY
    let run = 0
    const onScroll = () => {
      const nav = navRef.current
      if (!nav) return
      const y = window.scrollY
      const dy = y - lastY
      lastY = y
      if (dy === 0) return
      nav.dataset.live = ''
      if (reduced()) {
        delete nav.dataset.hidden
        return
      }
      run = dy > 0 === run > 0 ? run + dy : dy
      if (y < ALWAYS_SHOW_ABOVE || run < -HIDE_AFTER) delete nav.dataset.hidden
      else if (run > HIDE_AFTER) nav.dataset.hidden = ''
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduced])

  return (
    <nav className="tabbar" aria-label="Primary navigation" ref={navRef}>
      <span className="tabbar__pill" ref={pillRef} aria-hidden="true" data-off="" />
      {TABS.map(({ label, to, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className="tabbar__tab"
        >
          {({ isActive }) => (
            <>
              <Icon size={22} weight={isActive ? 'fill' : 'regular'} aria-hidden="true" />
              <span className="tabbar__label">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
