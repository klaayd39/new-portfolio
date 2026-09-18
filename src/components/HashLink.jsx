import { Link, useLocation } from 'react-router-dom'
import { navigateToSection } from '../utils/scrollToHash'

export default function HashLink({ to, children, onClick, ...props }) {
  const location = useLocation()
  const hashIndex = to.indexOf('#')
  const pathname = hashIndex === -1 ? to : to.slice(0, hashIndex) || '/'
  const hash = hashIndex === -1 ? '' : to.slice(hashIndex)

  const handleClick = (event) => {
    if (hash && pathname === '/' && location.pathname === '/') {
      event.preventDefault()
      navigateToSection(hash, { behavior: 'smooth' })
    }
    onClick?.(event)
  }

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
