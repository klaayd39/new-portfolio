import { useEffect, useRef, useState } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  className = '',
  mode = '3d',
  blur = false,
  scale = true,
  threshold = 0.12,
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    const node = ref.current
    if (node) observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
    }
  }, [reduced, threshold])

  const shown = reduced || isVisible

  const getHiddenTransform = () => {
    if (shown || mode === 'none') return 'none'

    const depth = mode === '3d' ? ' translateZ(-48px) rotateX(7deg)' : ''
    const scaleVal = scale && mode === '3d' ? ' scale(0.97)' : ''

    switch (direction) {
      case 'up':
        return `translateY(36px)${depth}${scaleVal}`
      case 'down':
        return `translateY(-36px)${depth}${scaleVal}`
      case 'left':
        return `translateX(36px)${mode === '3d' ? ' rotateY(-6deg)' : ''}${scaleVal}`
      case 'right':
        return `translateX(-36px)${mode === '3d' ? ' rotateY(6deg)' : ''}${scaleVal}`
      default:
        return mode === '3d' ? `translateZ(-32px)${scaleVal}` : 'none'
    }
  }

  const style = {
    opacity: shown ? 1 : 0,
    transform: shown ? 'none' : getHiddenTransform(),
    filter: blur && !shown && !reduced ? 'blur(6px)' : 'none',
    transition: reduced
      ? 'none'
      : [
          `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          blur ? `filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` : '',
        ]
          .filter(Boolean)
          .join(', '),
    willChange: reduced ? 'auto' : 'transform, opacity',
  }

  return (
    <Tag
      ref={ref}
      style={style}
      className={`scroll-reveal${className ? ` ${className}` : ''}`}
    >
      {children}
    </Tag>
  )
}
