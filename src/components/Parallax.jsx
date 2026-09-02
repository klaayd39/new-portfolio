import { useEffect, useRef } from 'react'

const lerp = (a, b, t) => a + (b - a) * t
const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

/**
 * Premium, smoothed parallax with optional 3D depth (translateZ, rotateX/Y).
 * rAF-gated via Intersection Observer; disabled under prefers-reduced-motion.
 */
export default function Parallax({
  speed = 0.15,
  speedX = 0,
  scale = 0,
  rotate = 0,
  rotateX = 0,
  rotateY = 0,
  translateZ = 0,
  fade = 0,
  smooth = 0.085,
  base = '',
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
    const mobile = window.matchMedia('(max-width: 768px)')
    if (media.matches) return

    const mobileFactor = mobile.matches ? 0.35 : 1

    let raf = null
    let running = false
    const cur = { y: 0, x: 0, s: 0, r: 0, rx: 0, ry: 0, z: 0, o: 1 }
    const tgt = { y: 0, x: 0, s: 0, r: 0, rx: 0, ry: 0, z: 0, o: 1 }

    const measure = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const offset = rect.top + rect.height / 2 - vh / 2
      const p = clamp(offset / (vh / 2 + rect.height / 2), -1, 1)
      const f = mobileFactor

      tgt.y = -offset * speed * f
      tgt.x = -offset * speedX * f
      tgt.s = -p * scale * f
      tgt.r = -p * rotate * f
      tgt.rx = -p * rotateX * f
      tgt.ry = -p * rotateY * f
      tgt.z = -p * translateZ * f
      tgt.o = fade ? 1 - Math.abs(p) * fade : 1
    }

    const draw = () => {
      cur.y = lerp(cur.y, tgt.y, smooth)
      cur.x = lerp(cur.x, tgt.x, smooth)
      cur.s = lerp(cur.s, tgt.s, smooth)
      cur.r = lerp(cur.r, tgt.r, smooth)
      cur.rx = lerp(cur.rx, tgt.rx, smooth)
      cur.ry = lerp(cur.ry, tgt.ry, smooth)
      cur.z = lerp(cur.z, tgt.z, smooth)
      cur.o = lerp(cur.o, tgt.o, smooth)

      let t = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, ${cur.z.toFixed(2)}px)`
      if (scale) t += ` scale(${(1 + cur.s).toFixed(4)})`
      if (rotate) t += ` rotate(${cur.r.toFixed(3)}deg)`
      if (rotateX) t += ` rotateX(${cur.rx.toFixed(3)}deg)`
      if (rotateY) t += ` rotateY(${cur.ry.toFixed(3)}deg)`
      el.style.transform = base ? `${base} ${t}` : t
      if (fade) el.style.opacity = cur.o.toFixed(3)
    }

    const frame = () => {
      measure()
      draw()
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

    measure()
    cur.y = tgt.y
    cur.x = tgt.x
    cur.s = tgt.s
    cur.r = tgt.r
    cur.rx = tgt.rx
    cur.ry = tgt.ry
    cur.z = tgt.z
    cur.o = tgt.o
    draw()

    const onMobileChange = () => {
      measure()
    }
    mobile.addEventListener('change', onMobileChange)

    return () => {
      io.disconnect()
      stop()
      mobile.removeEventListener('change', onMobileChange)
    }
  }, [speed, speedX, scale, rotate, rotateX, rotateY, translateZ, fade, smooth, base])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ willChange: 'transform', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
