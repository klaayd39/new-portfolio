import { useRef, useCallback } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'
import useIsMobile from '../hooks/useIsMobile'

/**
 * Subtle perspective tilt on hover — desktop only.
 * Falls back to a flat card under reduced-motion or on mobile.
 */
export default function Card3D({
  children,
  className = '',
  as: Tag = 'div',
  intensity = 10,
  lift = 6,
  ...rest
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const disabled = reduced || mobile

  const onMove = useCallback(
    (e) => {
      if (disabled || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      const inner = ref.current.querySelector('.card-3d-inner')
      if (!inner) return
      inner.style.transform = `rotateX(${(-y * intensity).toFixed(2)}deg) rotateY(${(x * intensity).toFixed(2)}deg) translateZ(${lift}px)`
    },
    [disabled, intensity, lift]
  )

  const onLeave = useCallback(() => {
    if (!ref.current) return
    const inner = ref.current.querySelector('.card-3d-inner')
    if (inner) inner.style.transform = ''
  }, [])

  return (
    <Tag
      ref={ref}
      className="card-3d"
      onMouseMove={disabled ? undefined : onMove}
      onMouseLeave={disabled ? undefined : onLeave}
      {...rest}
    >
      <div className={`card-3d-inner${className ? ` ${className}` : ''}`}>{children}</div>
    </Tag>
  )
}
