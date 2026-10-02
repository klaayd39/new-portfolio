import { NavLink } from 'react-router-dom'
import { EnvelopeSimple } from '@/components/slab'

/** Mobile-only floating action — Contact, lower-right above the tab bar inset. */
export default function ContactFab() {
  return (
    <NavLink
      to="/contact"
      className={({ isActive }) => `contact-fab${isActive ? ' contact-fab--active' : ''}`}
      aria-label="Contact"
    >
      <EnvelopeSimple size={24} weight="bold" aria-hidden="true" />
    </NavLink>
  )
}
