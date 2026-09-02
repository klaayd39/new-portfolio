export const NAV_ITEMS = [
  { label: 'Home', to: '/#top', id: 'top', section: true },
  { label: 'About', to: '/#about', id: 'about', section: true },
  { label: 'Projects', to: '/#projects', id: 'projects', section: true },
  { label: 'Skills', to: '/#skills', id: 'skills', section: true },
  { label: 'Experience', to: '/#experience', id: 'experience', section: true },
  { label: 'Contact', to: '/#contact', id: 'contact', section: true },
]

export const PAGE_ITEMS = [
  { label: 'All Projects', to: '/projects', id: 'projects-page' },
  { label: 'Resume', to: '/resume', id: 'resume' },
  { label: 'Message', to: '/contact', id: 'contact-page' },
]

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id)
