import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

export default function MotionReveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  as = 'div',
}) {
  const reduced = useReducedMotion()
  const Tag = reduced ? 'div' : motion[as] || motion.div

  if (reduced) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '-5% 0px' }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </Tag>
  )
}
