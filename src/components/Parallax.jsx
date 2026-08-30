import { useEffect, useRef } from 'react'

const lerp = (a, b, t) => a + (b - a) * t
const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

/**
 * Premium, smoothed parallax.
 *
 * Motion is driven by the element's distance from the viewport center and eased
 * every frame with a lerp, so it trails the scroll with a soft, weighted feel
 * instead of snapping. Supports layered translate / scale / rotate / opacity so
 * multiple instances at different speeds create real depth.
 *
 * Runs a rAF loop only while the element is near the viewport (Intersection
 * Observer gated) and disables entirely under prefers-reduced-motion.
 */
export default function Parallax({
  speed = 0.15, // vertical translate factor (px per px of offset)
  speedX = 0, // horizontal translate factor
  scale = 0, // extra scale across the pass (e.g. 0.06)
  rotate = 0, // degrees across the pass
  fade = 0, // 0..1 opacity dip at the extremes
  smooth = 0.085, // easing (lower = smoother / more lag)
  base = '', // transform applied before the parallax transform
  as: Tag = 'div',
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return

    let raf = null
    let running = false
    const cur = { y: 0, x: 0, s: 0, r: 0, o: 1 }
    const tgt = { y: 0, x: 0, s: 0, r: 0, o: 1 }
    let settleFrames = 0

    const measure = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const offset = rect.top + rect.height / 2 - vh / 2
      const p = clamp(offset / (vh / 2 + rect.height / 2), -1, 1)
      tgt.y = -offset * speed
      tgt.x = -offset * speedX
      tgt.s = -p * scale
      tgt.r = -p * rotate
      tgt.o = fade ? 1 - Math.abs(p) * fade : 1
    }

    const draw = () => {
      cur.y = lerp(cur.y, tgt.y, smooth)
      cur.x = lerp(cur.x, tgt.x, smooth)
      cur.s = lerp(cur.s, tgt.s, smooth)
      cur.r = lerp(cur.r, tgt.r, smooth)
      cur.o = lerp(cur.o, tgt.o, smooth)

      let t = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`
      if (scale) t += ` scale(${(1 + cur.s).toFixed(4)})`
      if (rotate) t += ` rotate(${cur.r.toFixed(3)}deg)`
      el.style.transform = base ? `${base} ${t}` : t
      if (fade) el.style.opacity = cur.o.toFixed(3)
    }

    const frame = () => {
      measure()
      draw()
      // keep animating a touch after settling so nothing freezes mid-ease
      const rest =
        Math.abs(cur.y - tgt.y) +
        Math.abs(cur.x - tgt.x) +
        Math.abs(cur.s - tgt.s) +
        Math.abs(cur.r - tgt.r)
      settleFrames = rest < 0.05 ? settleFrames + 1 : 0
      if (running) raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      if (raf != null) cancelAnimationFrame(raf)
      raf = null
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      },
      { rootMargin: '25% 0px 25% 0px', threshold: 0 }
    )
    io.observe(el)

    // prime once so there's no first-paint jump
    measure()
    cur.y = tgt.y
    cur.x = tgt.x
    cur.s = tgt.s
    cur.r = tgt.r
    cur.o = tgt.o
    draw()

    return () => {
      io.disconnect()
      stop()
    }
  }, [speed, speedX, scale, rotate, fade, smooth, base])

  return (
    <Tag ref={ref} className={className} style={{ willChange: 'transform', ...style }} {...rest}>
      {children}
    </Tag>
  )
}
