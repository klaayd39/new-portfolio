import { useEffect, useRef, useState } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

const easeOut = (t) => 1 - (1 - t) ** 3

export default function CountUp({
  end,
  suffix = '',
  prefix = '',
  duration = 1400,
  className = '',
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [value, setValue] = useState(() => (reduced ? end : 0))

  useEffect(() => {
    if (reduced) return undefined

    let raf = null
    let started = false
    let startTime = null

    const animate = (time) => {
      if (!startTime) startTime = time
      const p = Math.min((time - startTime) / duration, 1)
      setValue(Math.round(end * easeOut(p)))
      if (p < 1) raf = requestAnimationFrame(animate)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          raf = requestAnimationFrame(animate)
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    const node = ref.current
    if (node) io.observe(node)

    return () => {
      io.disconnect()
      if (raf != null) cancelAnimationFrame(raf)
    }
  }, [end, duration, reduced])

  return (
    <b ref={ref} className={className}>
      {prefix}{value}{suffix}
    </b>
  )
}
