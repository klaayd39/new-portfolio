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
  { name: 'Visual Studio Code', icon: 'https://api.iconify.design/logos:visual-studio-code.svg' },
  { name: 'GitHub', icon: 'https://api.iconify.design/logos:github-icon.svg' },
  { name: 'Cursor', icon: 'https://api.iconify.design/simple-icons:cursor.svg' },
  { name: 'Claude Code', icon: 'https://api.iconify.design/simple-icons:claudecode.svg' },
  { name: 'Antigravity', icon: '/icons/antigravity.png' },
  { name: 'OBS Studio', icon: '/icons/obs-studio.jpg' },
  { name: 'Python', icon: 'https://api.iconify.design/logos:python.svg' },
  { name: 'Supabase', icon: 'https://api.iconify.design/logos:supabase-icon.svg' },
  { name: 'React', icon: 'https://api.iconify.design/logos:react.svg' },
  { name: 'Javascript', icon: 'https://api.iconify.design/logos:javascript.svg' },
  { name: 'Vite', icon: 'https://api.iconify.design/logos:vitejs.svg' },
  { name: 'ChatGPT', icon: 'https://api.iconify.design/simple-icons:openai.svg' },
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
