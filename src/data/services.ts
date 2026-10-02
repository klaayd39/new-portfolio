import type { Icon } from '@/components/slab'
import { MagnetStraight, Timer, Trophy } from '@/components/slab'

export type ServiceStage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

export const SERVICE_STAGES: ServiceStage[] = [
  {
    index: '01',
    label: 'Listen & map the workflow',
    body: 'Understand how work actually happens today — station air chain, spreadsheets, or live ops — before writing code.',
    Icon: MagnetStraight,
    chips: ['Discovery', 'Station ops', 'Client process', 'Constraints'],
  },
  {
    index: '02',
    label: 'Build & iterate in production',
    body: 'Ship small, test during real broadcasts or daily use, and harden what breaks under load or deadline pressure.',
    Icon: Timer,
    chips: ['React / Vite', 'Python', 'Supabase', 'OBS / OSC'],
  },
  {
    index: '03',
    label: 'Hand off something durable',
    body: 'Document, deploy, and leave behind tools the team can run without babysitting — with alerts where it matters.',
    Icon: Trophy,
    chips: ['Vercel', 'Discord alerts', 'Exports', 'Maintenance'],
  },
]

export type ServiceOffer = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
}

const REACT = '/icons/ai/react.svg'
const VITE = '/icons/ai/vite.svg'
const SUPABASE = '/icons/ai/postgresql.svg'
const PYTHON = '/icons/ai/nodedotjs.svg'
const OBS = '/icons/obs-studio.jpg'
const CLAUDE = '/icons/ai/claude-color.svg'
const CODEX = '/icons/ai/codex.svg'
const DISCORD = '/icons/discord.svg'
const GITHUB = '/icons/ai/github.svg'

export const SERVICE_OFFERS: ServiceOffer[] = [
  {
    index: '01',
    title: 'Broadcast automation',
    description: 'OBS scripts, scene tools, media deployment, and mixer control for live radio.',
    chip: 'Station · Live air',
    logos: [OBS, PYTHON, DISCORD],
    bullets: [
      'OBS Lua/Python automation for scenes and media sources',
      'X32 OSC hotkeys and emergency mutes under 50ms',
      'Scheduled monitoring and logging for remote sites',
    ],
  },
  {
    index: '02',
    title: 'News & intelligence systems',
    description: 'Crawlers, aggregation boards, and alerts so teams stop tab-hopping during coverage.',
    chip: '50+ sources · Discord',
    logos: [PYTHON, CLAUDE, DISCORD],
    bullets: [
      'Multi-source headline aggregation and categorisation',
      'Breaking-news webhooks into channels the team already uses',
      'Searchable live dashboards with auto-refresh',
    ],
  },
  {
    index: '03',
    title: 'Web apps & dashboards',
    description: 'Client and internal portals with auth, reporting, and data that stays in sync.',
    chip: 'React · Supabase',
    logos: [REACT, VITE, SUPABASE],
    bullets: [
      'Role-aware dashboards with exports (CSV / PDF)',
      'Inventory guards and audit trails for operations teams',
      'Deployment on Vercel with environment-safe configs',
    ],
  },
  {
    index: '04',
    title: 'Workflow & document automation',
    description: 'Batch renaming, compliance PDFs, and Windows/Python jobs that replace manual copy-paste.',
    chip: 'Python · PowerShell',
    logos: [PYTHON, GITHUB, CODEX],
    bullets: [
      'Regex-safe batch processing for media libraries',
      'Template-driven document generation for compliance',
      'Dry-run modes before destructive file operations',
    ],
  },
  {
    index: '05',
    title: 'AI-assisted development',
    description: 'Faster delivery with AI tools — with code you understand, own, and can maintain.',
    chip: 'Cursor · Claude Code',
    logos: [CLAUDE, CODEX, '/icons/cursor.svg'],
    bullets: [
      'Prototype to production with reviewed, adapted code',
      'Internal tools tailored to one team\'s workflow',
      'Practical integrations, not demo-ware',
    ],
  },
]

export const SERVICES_HEADLINE = 'Automation, broadcast systems, and web apps that ship.'
export const SERVICES_LEDE =
  'From Bombo Radyo Malaybalay to client farms and mobile bar ops — I build tools that survive daily use and live air.'
export const SERVICES_METHOD_BLURB =
  'Station and client work taught me to diagnose the real bottleneck first, then automate what repeats.'
export const SERVICES_FLOW_TITLE = 'Example: news hits Discord when it matters'
export const SERVICES_FLOW_SUB =
  'Headlines are categorised, deduplicated, and pushed to the newsroom channel — the same pattern behind the Bombo intelligence hub.'
