import { useEffect, useRef, useState } from 'react'
import { profile } from '@/data/profile'

/**
 * IntroOverlay — headline reveal, then fly onto the real `.home__title`.
 *
 * No animation library: Web Animations API for keyframed parts and one rAF
 * loop for word reveals. Transform and opacity only.
 */

const WORDS = `${profile.displayName.line1} ${profile.displayName.line2}`.split(' ')

const IGNITE_MS = 200
const RUN_MS = 1400
const LOCK_MS = 280
const FLY_MS = 900

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_CAMERA = 'cubic-bezier(0.76, 0, 0.24, 1)'

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const shouldRun =
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
  window.location.pathname === '/'

if (shouldRun) document.documentElement.classList.add('is-intro', 'is-intro-head')

const release = () => document.documentElement.classList.remove('is-intro')
const releaseHead = () => document.documentElement.classList.remove('is-intro-head')

export default function IntroOverlay() {
  const [gone, setGone] = useState(!shouldRun)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!shouldRun) {
      release()
      releaseHead()
      return
    }

    document.documentElement.classList.add('is-intro', 'is-intro-head')

    const title = titleRef.current
    if (!title) {
      release()
      releaseHead()
      setGone(true)
      return
    }

    let cancelled = false
    let raf = 0
    const timers: number[] = []
    const anims: Animation[] = []
    const wait = (ms: number) =>
      new Promise<void>((res) => timers.push(window.setTimeout(res, ms)))
    const play = (el: Element, frames: Keyframe[], opts: KeyframeAnimationOptions) => {
      const a = el.animate(frames, { fill: 'both', ...opts })
      anims.push(a)
      return a
    }

    const run = async () => {
      if (document.fonts?.ready) await document.fonts.ready
      if (cancelled) return

      const k = window.innerWidth < 1100 ? 0.62 : 1
      const IGNITE = IGNITE_MS * k
      const RUN = RUN_MS * k
      const LOCK = LOCK_MS * k
      const FLY = FLY_MS * k

      const target = document.querySelector<HTMLElement>('.home__title')
      const t = target?.getBoundingClientRect()

      const width = t?.width ?? Math.min(760, window.innerWidth * 0.86)
      title.style.width = `${width}px`

      const height = t?.height ?? title.offsetHeight
      const scale = Math.min((window.innerWidth * 0.86) / width, 2.6)
      const w = width * scale
      const h = height * scale
      const sx = (window.innerWidth - w) / 2
      const sy = (window.innerHeight - h) / 2 - Math.min(96, window.innerHeight * 0.09)

      const restTransform = `translate(${sx}px, ${sy}px) scale(${scale})`
      title.style.transform = restTransform
      title.style.opacity = '1'

      const wordEls = Array.from(title.querySelectorAll<HTMLElement>('.boot__word'))
      const probe = document.createElement('span')
      probe.className = 'boot__word'
      probe.textContent = ' '
      title.append(probe)
      const space = probe.getBoundingClientRect().width / scale
      probe.remove()
      const inked = wordEls.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0) / scale
      const fits = inked + (wordEls.length - 1) * space <= width + 0.5
      title.style.columnGap = `${fits ? Math.max(0, (width - inked) / (wordEls.length - 1)) : space}px`

      const gates = wordEls.map((el, i) => ({
        inner: el.querySelector<HTMLElement>('.boot__word-in'),
        at: i / wordEls.length,
        done: false,
      }))

      await wait(IGNITE)
      if (cancelled) return

      await new Promise<void>((res) => {
        const start = performance.now()
        const step = (now: number) => {
          if (cancelled) return res()
          const raw = Math.min(1, (now - start) / RUN)
          const p = easeInOut(raw)

          for (const g of gates) {
            if (!g.done && p >= g.at && g.inner) {
              g.done = true
              play(
                g.inner,
                [{ transform: 'translateY(132%)' }, { transform: 'translateY(0)' }],
                { duration: 760, easing: EASE_OUT },
              )
            }
          }

          if (raw < 1) raf = requestAnimationFrame(step)
          else res()
        }
        raf = requestAnimationFrame(step)
      })
      if (cancelled) return

      await wait(LOCK)
      if (cancelled) return

      if (t) {
        play(
          title,
          [
            { transform: restTransform },
            { transform: `translate(${t.left}px, ${t.top}px) scale(1)` },
          ],
          { duration: FLY, easing: EASE_CAMERA },
        )
      } else {
        play(title, [{ opacity: 1 }, { opacity: 0 }], { duration: 420, easing: EASE_OUT })
      }

      await wait(FLY - 150)
      if (cancelled) return
      release()

      await wait(150)
      if (cancelled) return
      releaseHead()
      setGone(true)
    }

    void run()

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      anims.forEach((a) => a.cancel())
      release()
      releaseHead()
    }
  }, [])

  if (gone) return null

  return (
    <div className="boot" aria-hidden="true" role="presentation">
      <div className="boot__title" ref={titleRef}>
        {WORDS.map((word, i) => (
          <span className="boot__word" key={`${word}-${i}`}>
            <span className="boot__word-in">{word}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
