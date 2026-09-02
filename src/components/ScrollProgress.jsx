import { useEffect, useState } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined

    let raf = null
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
      raf = null
    }

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf != null) cancelAnimationFrame(raf)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}
