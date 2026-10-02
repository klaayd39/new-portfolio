export type TimelineEntry = {
  period: string
  role: string
  org: string
  detail: string
}

export const EXPERIENCE: TimelineEntry[] = [
  {
    period: '2025 – Present',
    role: 'IT / Technician',
    org: 'Bombo Radyo Malaybalay',
    detail:
      'Built news intelligence, transmitter monitoring, OBS automation, and mixer control systems used during live broadcasts.',
  },
  {
    period: '2024',
    role: 'IT Intern – Cash Unit (OJT)',
    org: 'Department of Education, Malaybalay City',
    detail: 'Computer troubleshooting, data encoding, and loan and voucher processing.',
  },
]

export const EDUCATION: TimelineEntry[] = [
  {
    period: '2020 – 2024',
    role: 'BS Information Technology',
    org: 'Bukidnon State University',
    detail: 'College of Technologies Athlete of the Year, 2024.',
  },
  {
    period: '2018 – 2020',
    role: 'Technical-Vocational-Livelihood — Information Technology',
    org: 'STI Malaybalay · Senior High School',
    detail: 'TVL-ICT track.',
  },
  {
    period: '2014 – 2018',
    role: 'Special Program in Sports',
    org: 'Bukidnon National High School',
    detail: 'Junior High School.',
  },
]

export type ExploreItem = { emoji: string; title: string; text: string }

export const EXPLORING: ExploreItem[] = [
  { emoji: '⚽', title: 'Football', text: 'College of Technologies Athlete of the Year, BukSU 2024.' },
  { emoji: '🎬', title: 'Video editing', text: 'Timing and pacing for station and personal work.' },
  { emoji: '🔧', title: 'Hardware repair', text: 'Freelance diagnostics, upgrades, and small-office networks.' },
  { emoji: '🛠', title: 'Building from scratch', text: 'If the station needs it and it does not exist, I write it.' },
]

export const HERO_METRICS = [
  { value: '12+', label: 'Projects shipped' },
  { value: '8', label: 'Systems in production' },
  { value: '3', label: 'Focus areas' },
] as const

export const CONTACT_DETAILS = {
  phone: '+63 945 592 7782',
  phoneHref: 'tel:+639455927782',
  status: 'Available now · Actively looking',
} as const
