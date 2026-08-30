export const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Vite', 'Responsive Design']
  },
  {
    category: 'Backend & Automation',
    items: ['Python', 'Node.js', 'Playwright', 'OSC Protocol', 'WebSockets', 'API Design']
  },
  {
    category: 'Database & Cloud',
    items: ['Supabase', 'PostgreSQL', 'REST APIs', 'Firebase App Hosting', 'Git/GitHub']
  },
  {
    category: 'Broadcast Systems & Tools',
    items: ['OBS Studio', 'Nautel Telemetry', 'X32 Control', 'Linux Systems', 'Video Editing']
  }
]

export const MARQUEE_TOOLS = [
  'Python',
  'React',
  'JavaScript',
  'Playwright',
  'WebSockets',
  'Node.js',
  'OBS Studio',
  'Supabase',
  'Git',
  'Linux',
  'OSC Protocol',
  'PowerShell',
  'Vite',
  'PostgreSQL',
]

export const TOOL_GROUPS = [
  {
    num: '01',
    title: 'Automation and Scripting',
    tools: [
      {
        name: 'Python',
        desc: 'Primary language for crawlers, transmitter monitors, and OBS scripts that run during live production.',
        level: 95,
      },
      {
        name: 'Playwright',
        desc: 'Browser automation for headline extraction and monitoring workflows that would otherwise be done by hand.',
        level: 80,
      },
      {
        name: 'PowerShell',
        desc: 'Windows automation for media renaming, mixer control, and scheduled station tasks.',
        level: 85,
      },
      {
        name: 'OSC Protocol',
        desc: 'Low-latency UDP control of Behringer X32 mixers so engineers can mute and switch without touching the desk.',
        level: 85,
      },
    ],
  },
  {
    num: '02',
    title: 'Web and Real-time Systems',
    tools: [
      {
        name: 'React',
        desc: 'Interactive dashboards and this portfolio. Used where operators need a live view of data, not a static page.',
        level: 85,
      },
      {
        name: 'JavaScript',
        desc: 'Browser engines, Discord webhooks, and the live news dashboard sitting on top of the Python backend.',
        level: 88,
      },
      {
        name: 'WebSockets',
        desc: 'Real-time sync between monitoring services and operator-facing boards during broadcasts.',
        level: 80,
      },
      {
        name: 'Supabase',
        desc: 'Postgres-backed storage and realtime subscriptions for apps that need to stay in sync without a custom backend.',
        level: 78,
      },
    ],
  },
  {
    num: '03',
    title: 'Broadcast Systems',
    tools: [
      {
        name: 'OBS Studio',
        desc: 'Scene organisation, media source automation, and Lua/Python scripts used on live shows.',
        level: 90,
      },
      {
        name: 'Nautel Telemetry',
        desc: 'Transmitter health capture from a legacy AUI window, including when the window is minimised or covered.',
        level: 82,
      },
      {
        name: 'X32 Control',
        desc: 'Custom OSC tooling for Behringer X32 channel toggles with sub-50ms state sync.',
        level: 85,
      },
      {
        name: 'Linux',
        desc: 'Station machines, scripting, and keeping production tools running without babysitting them.',
        level: 75,
      },
    ],
  },
]
