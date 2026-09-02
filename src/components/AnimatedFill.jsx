import { useEffect, useRef, useState } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

export default function AnimatedFill({ width, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(() => reduced)

  useEffect(() => {
    if (reduced) return undefined

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )

    const node = ref.current
    if (node) io.observe(node)

    return () => io.disconnect()
  }, [reduced])

  return (
    <div ref={ref} className={`lv-bar${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div
        className={`lv-fill${active ? ' lv-fill-active' : ''}`}
        style={{ '--lv-target': `${width}%` }}
      />
    </div>
  )
}
