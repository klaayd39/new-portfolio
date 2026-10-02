/**
 * Identity and home copy — start here when updating the site.
 */

import { Briefcase, ChartBar, SquaresFour, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  firstName: string
  handle: string
  role: string
  avatarSrc: string
  verifiedLabel: string
  email: string
  location: string
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Klyde Joseph Yabo',
  firstName: 'Klyde',
  handle: '@klaayd39',
  role: 'Information Technology',
  avatarSrc: '/avatar.png',
  verifiedLabel: 'Open to work',
  email: 'klydejosephy@gmail.com',
  location: 'Malaybalay City, Bukidnon · GMT+8',
  stats: [
    { value: '12+', label: 'Projects shipped', Icon: Briefcase },
    { value: '8', label: 'Systems in production', Icon: ChartBar },
    { value: '3', label: 'Focus areas', Icon: SquaresFour },
  ],
  displayName: { line1: 'Real problems.', line2: 'Real tools.' },
  hero: {
    body: 'I build software and automation that solve real-world problems — from internal tools and web applications to broadcast systems and workflow automation. I focus on practical solutions that are reliable, useful, and actually get used.',
    portraitSrc: '/avatar.png',
    portraitAlt: 'Portrait of Klyde Joseph Yabo',
  },
  socials: [
    { label: 'GitHub profile', href: 'https://github.com/klaayd39', iconPath: '/icons/ai/github.svg' },
    {
      label: 'LinkedIn profile',
      href: 'https://www.linkedin.com/in/klyde-joseph-yabo-a38286373/',
      iconPath: '/icons/linkedin.svg',
    },
    { label: 'Email', href: 'mailto:klydejosephy@gmail.com', iconPath: '/icons/googleworkspace.svg' },
  ],
}
