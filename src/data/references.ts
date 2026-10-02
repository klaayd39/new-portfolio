import { Gauge, Robot, Code, Broadcast } from '@/components/slab'
import type { Icon } from '@/components/slab'

/** Professional references and client contexts (written summaries — no fabricated quotes). */

export type ReferenceClient = {
  index: string
  name: string
  role: string
  daily: string
  work: string[]
  logoSrc?: string
  Icon: Icon
}

export const REFERENCE_CLIENTS: ReferenceClient[] = [
  {
    index: '01',
    name: 'Bombo Radyo Malaybalay',
    role: 'IT / Technician · Newsroom systems',
    daily:
      'Maintain live broadcast tooling and built the news intelligence hub — 50+ sources, live dashboard, and Discord breaking-news alerts used during coverage.',
    work: ['Intelligence', 'Python', 'Discord', 'Live station'],
    logoSrc: '/projects/bombo.png',
    Icon: Broadcast,
  },
  {
    index: '02',
    name: 'J&G Calamansi Farm',
    role: 'Client · Farm operations portal',
    daily:
      'Full-stack farm tracker for harvest batches, sales, expenses, and P&L — inventory guards, analytics, and exportable reports at jgcalamansi.vercel.app.',
    work: ['Web App', 'Supabase', 'PWA', 'Client'],
    logoSrc: '/projects/jg-farm.png',
    Icon: Gauge,
  },
  {
    index: '03',
    name: 'TOMA Mobile Bar',
    role: 'Client · Finance & liquidation',
    daily:
      'Event liquidation, budgets, PDF reports, activity logs, and recycle bin — centralised admin at tomaadmin.vercel.app for mobile bar operators.',
    work: ['TypeScript', 'Supabase', 'Analytics', 'Client'],
    logoSrc: '/projects/toma-mobile-bar.png',
    Icon: Robot,
  },
  {
    index: '04',
    name: 'Department of Education · Malaybalay',
    role: 'IT Intern · Cash Unit (OJT)',
    daily:
      'Computer troubleshooting, data encoding, and loan and voucher processing during on-the-job training in 2024.',
    work: ['OJT', 'Support', 'Data entry', '2024'],
    Icon: Code,
  },
]

export type ReferenceClip = {
  id: string
  index: string
  src: string
  poster: string
  duration: string
  kicker: string
  width: number
  height: number
}

/** Posters from shipped work until testimonial videos are added. */
export const REFERENCE_CLIPS: ReferenceClip[] = [
  {
    id: 'clip-bombo',
    index: '01',
    src: '',
    poster: '/projects/bombo.png',
    duration: 'Case study',
    kicker: 'Bombo Radyo · News hub',
    width: 1280,
    height: 720,
  },
  {
    id: 'clip-jg',
    index: '02',
    src: '',
    poster: '/projects/jg-farm.png',
    duration: 'Live app',
    kicker: 'J&G Farm Tracker',
    width: 1280,
    height: 720,
  },
]

export const REFERENCES_HEADLINE = 'Teams and projects in production.'
export const REFERENCES_LEDE =
  'Station, client, and internship work — summaries of what shipped and where it runs today. Video testimonials can slot in when available.'
