import ScrollReveal from './ScrollReveal'

/**
 * Splits a string into word spans for staggered typography reveals.
 */
export default function SplitReveal({
  text,
  as: Tag = 'span',
  className = '',
  wordClass = '',
  delay = 0,
  stagger = 45,
}) {
  const words = text.split(/\s+/).filter(Boolean)

  return (
    <Tag className={`split-reveal${className ? ` ${className}` : ''}`} aria-label={text}>
      {words.map((word, i) => (
        <ScrollReveal
          as="span"
          key={`${word}-${i}`}
          delay={delay + i * stagger}
          duration={650}
          mode="3d"
          scale={false}
          className={`split-word${wordClass ? ` ${wordClass}` : ''}`}
        >
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </ScrollReveal>
      ))}
    </Tag>
  )
}
