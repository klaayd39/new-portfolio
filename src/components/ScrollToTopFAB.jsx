import { useState, useEffect } from 'react'

export default function ScrollToTopFAB() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    toggleVisibility()
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`btt${isVisible ? ' show' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  )
}
