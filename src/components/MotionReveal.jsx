import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const DURATION = 0.65

export const MOTION = {
  fadeUp: {
    initial: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
}

export const staggerDelay = (index, step = 0.08, max = 0.32) => Math.min(index * step, max)

export default function MotionReveal({
  children,
  className = '',
  delay = 0,
  variant = 'fadeUp',
  as = 'div',
  mode = 'view',
  duration = DURATION,
  ...props
}) {
  const reduced = useReducedMotion()
  const Tag = as
  const preset = MOTION[variant] || MOTION.fadeUp

  if (reduced) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }

  const MotionTag = motion[as] || motion.div
  const transition = { duration, delay, ease: EASE }

  if (mode === 'mount') {
    return (
      <MotionTag
        className={className}
        initial={preset.initial}
        animate={preset.visible}
        transition={transition}
        {...props}
      >
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={preset.initial}
      whileInView={preset.visible}
      viewport={{ once: true, amount: 0.2, margin: '-5% 0px' }}
      transition={transition}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
