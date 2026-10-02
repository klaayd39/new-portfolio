import {
  Sparkle,
  Robot,
  Article,
  Broadcast,
  Database,
  MagnifyingGlass,
  FlowArrow,
  Browser,
  Timer,
  Gear,
} from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Live' | 'Internal' | 'Beta'

export type StackLogo = { src: string; name: string }

export type StackNode = {
  id: string
  name: string
  what: string
  stack?: string
  status?: StackStatus
  Icon: Icon
  logos?: StackLogo[]
  children?: StackNode[]
}

const PY: StackLogo = { src: '/icons/ai/nodedotjs.svg', name: 'Python' }
const REACT: StackLogo = { src: '/icons/ai/react.svg', name: 'React' }
const SUPA: StackLogo = { src: '/icons/ai/postgresql.svg', name: 'Supabase' }
const DISCORD: StackLogo = { src: '/icons/discord.svg', name: 'Discord' }
const OBS_LOGO: StackLogo = { src: '/icons/obs-studio.jpg', name: 'OBS' }

export const aiStack: StackNode = {
  id: 'root',
  Icon: Sparkle,
  name: profile.name,
  what: 'Production systems for live radio, client ops, and personal products.',
  stack: 'Python · React · Supabase · OBS · OSC',
  children: [
    {
      id: 'station-intel',
      Icon: Robot,
      name: 'Station intelligence',
      what: 'News aggregation, crawlers, and alerting for the newsroom.',
      children: [
        {
          id: 'bombo-hub',
          Icon: Article,
          logos: [PY, DISCORD, REACT],
          name: 'Bombo News Intelligence Hub',
          what: '50+ live feeds, categorised headlines, Discord breaking-news alerts.',
          stack: 'Python · JavaScript · Discord webhooks',
          status: 'Live',
        },
        {
          id: 'headline-crawler',
          Icon: MagnifyingGlass,
          logos: [PY],
          name: 'news-headline-crawler',
          what: 'Automated headline extraction and source categorisation.',
          stack: 'Python · scraping',
          status: 'Internal',
        },
      ],
    },
    {
      id: 'broadcast-auto',
      Icon: Broadcast,
      name: 'Broadcast automation',
      what: 'Tools that run during live air — OBS, mixers, and transmitters.',
      children: [
        {
          id: 'nautel-monitor',
          Icon: Timer,
          logos: [PY],
          name: 'Nautel AUI Monitor',
          what: 'Scheduled PrintWindow captures of the transmitter AUI — even when minimised.',
          stack: 'Python · PyWin32 · Pillow',
          status: 'Live',
        },
        {
          id: 'x32-toggle',
          Icon: FlowArrow,
          name: 'X32 Remote Toggle',
          what: 'Global hotkeys for Behringer X32 via low-latency OSC/UDP.',
          stack: 'AutoHotkey v2 · PowerShell',
          status: 'Live',
        },
        {
          id: 'obs-tooling',
          Icon: Gear,
          logos: [PY, OBS_LOGO],
          name: 'OBS automation suite',
          what: 'Scene autosort, media automator, and deployment scripts for live shows.',
          stack: 'Lua · OBS API · Python',
          status: 'Live',
        },
      ],
    },
    {
      id: 'web-client',
      Icon: Database,
      name: 'Web & client apps',
      what: 'Dashboards with auth, reporting, and realtime data.',
      children: [
        {
          id: 'jg-farm',
          Icon: Browser,
          logos: [REACT, SUPA],
          name: 'J&G Farm Tracker',
          what: 'Harvest, sales, expenses, and P&L for J&G Calamansi Farm.',
          stack: 'React · Supabase · Vercel',
          status: 'Live',
        },
        {
          id: 'toma-admin',
          Icon: Browser,
          logos: [REACT, SUPA],
          name: 'TOMA Mobile Bar',
          what: 'Liquidations, budgets, PDF exports, and audit logs.',
          stack: 'React · TypeScript · Supabase',
          status: 'Live',
        },
        {
          id: 'finance-hub',
          Icon: Gear,
          logos: [REACT, SUPA],
          name: 'Personal Financial Hub',
          what: 'Personal finance dashboard with bills, expenses, and savings.',
          stack: 'React · TypeScript · Supabase',
          status: 'Internal',
        },
      ],
    },
  ],
}
