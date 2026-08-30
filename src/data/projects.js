export const PROJECTS = [
  {
    title: 'Klyde Joseph Yabo Portfolio',
    tag: 'Web App',
    link: 'https://github.com/klaayd39/personal-portfolio',
    desc: 'A modern, high-end, responsive portfolio built with React, Vite, Supabase, and plain CSS.',
    longDesc: 'This portfolio showcases professional broadcast systems, live-production automation tools, and real-time web applications with an elegant dark navy glassmorphic theme.',
    problem: 'Showcasing a diverse range of technical projects requires a fast, responsive, and visually stunning platform.',
    solution: 'Engineered a modern portfolio with interactive project filters, off-canvas mobile navigation, and a Supabase-connected contact form.',
    features: [
      'Interactive project filter with smooth transitions',
      'Supabase Integration for real-time contact messages',
      'In-Page Print-to-PDF Resume generation',
      'Glassmorphic aesthetics with 3D hover effects'
    ],
    tech: ['React', 'Vite', 'Supabase', 'Vanilla CSS', 'Lottie'],
    challenges: 'Balancing visual quality and performance. Optimized CSS and lazy-loaded components to ensure lightning-fast speeds.',
    liveUrl: 'https://yabopersonalportfolio.vercel.app/',
    image: '/projects/portfolio.png'
  },
  {
    title: 'news-headline-crawler',
    tag: 'Intelligence',
    link: 'https://github.com/klaayd39/news-headline-crawler',
    desc: 'Automated news headline crawler and aggregation engine.',
    longDesc: 'news-headline-crawler is a headline crawler that gathers the latest news from various sources to build a centralized real-time intelligence board.',
    problem: 'Manually scanning dozens of news pages to find headlines is time-consuming and inefficient.',
    solution: 'Built an automated crawler that extracts headlines and categorizes them.',
    features: [
      'Automated headline extraction',
      'Source categorization',
      'Real-time updates'
    ],
    tech: ['Python', 'Web Scraping', 'Automation'],
    challenges: 'Handling different HTML structures across news sites. Built robust parsers to handle variations.',
    liveUrl: '',
    image: '/projects/crawler.png'
  },
  {
    title: 'Personal Financial Hub',
    tag: 'Web App',
    link: 'https://github.com/klaayd39/personal-financial-hub',
    desc: 'A modern, visually stunning dashboard to track income, manage expenses, and monitor savings.',
    longDesc: 'A modern, visually stunning, and highly interactive web application designed to help you take complete control of your personal finances. Track your income, manage expenses, and monitor your savings all in one beautiful dashboard.',
    problem: 'Managing personal finances across multiple platforms or spreadsheets can be tedious, leading to poor financial tracking and uncontrolled spending.',
    solution: 'Engineered a comprehensive financial dashboard with expense tracking, bill management, and savings logging, powered by real-time sync via Supabase.',
    features: [
      'Comprehensive financial dashboard with real-time overview',
      'Detailed expense tracking and categorization',
      'Recurring bills and subscriptions management',
      'Automatic Dark/Light Mode with glassmorphism aesthetics'
    ],
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
    challenges: 'Ensuring seamless micro-animations and complex data state synchronization across the dashboard. Addressed by utilizing Framer Motion and efficient Supabase real-time subscriptions.',
    liveUrl: '',
    image: '/projects/finance.png'
  },
  {
    title: 'Drama Report Gen',
    tag: 'Automation',
    link: 'https://github.com/klaayd39/Automatic-Drama-Report-Document-Generation',
    desc: 'Automated documentation engine for generating broadcast logs and performance reports.',
    longDesc: 'Drama Report Gen is a backend document synthesizer that extracts script data, performance notes, and schedule logs to construct professional PDFs and sheets optimized for broadcast audit compliance.',
    problem: 'Station managers spent hours daily copy-pasting log inputs into Word templates for official administrative checks.',
    solution: 'Designed a command-line and web automation script using docx/xlsx templating engines to build and output finalized compliance PDFs in one click.',
    features: [
      'Automated document building with zero manual layouting',
      'Audit compliance matching templates',
      'Error checking for missing schedules or duplicate entries',
      'Direct output to cloud folders'
    ],
    tech: ['Node.js', 'docx', 'File System APIs'],
    challenges: 'Aligning dynamic tables perfectly across multi-page templates. Resolved by standardizing style XML blocks inside the generation script.',
    liveUrl: '',
    image: '/projects/drama.png'
  },
  {
    title: 'Bombo Radyo News Intelligence Hub',
    tag: 'Intelligence',
    featured: true,
    featuredId: 'bombo',
    featuredNum: '01',
    subtitle: 'Malaybalay · Bombo Radyo Malaybalay',
    featuredTags: ['Intelligence', 'Python', 'Discord', '50+ sources', 'Live station'],
    situation: [
      'Journalists were scanning dozens of sites by hand',
      'Breaking stories were easy to miss during coverage',
      'No single board for headlines across sources',
      'Alerts lived in group chats, not a system',
    ],
    built: [
      'Full-stack hub aggregating 50+ live feeds',
      'Smart topic categorisation before anything is pushed',
      'Discord webhooks for breaking-news alerts',
      'Live dashboard with auto-refresh and search',
    ],
    outcome: [
      'Newsroom has a single intelligence board',
      'Alerts land where the team already works',
      'Hybrid Python + JS architecture stays online',
      'Still expanding sources from station demand',
    ],
    screenshotCaption: 'Live aggregation board. Headlines categorised and searchable instead of scattered across tabs.',
    link: 'https://github.com/klaayd39/bombo-radyo-news-intelligence',
    desc: 'A professional-grade, automated news aggregation system and Discord intelligence bot.',
    longDesc: 'An advanced monitoring board aggregating 50+ live feeds, news portals, and social reports. It features a hybrid architecture with a Python persistent sync backend and a browser-based JavaScript engine for a live dashboard.',
    problem: 'Journalists manually scanning dozens of pages miss breaking news, or lose valuable time during coverage.',
    solution: 'Engineered a full-stack platform that categorizes, prioritizes, and pushes Breaking News alerts directly to Discord using webhooks.',
    features: [
      'Multi-Source Aggregation from 50+ sources',
      'Smart Categorization of news topics',
      'Discord Integration via Webhooks',
      'Live Dashboard with Auto-refresh and Search'
    ],
    tech: ['Python', 'JavaScript', 'HTML5', 'CSS3', 'Discord API'],
    challenges: 'Maintaining speed and reliability while processing massive amounts of incoming feeds. Mitigated by using a hybrid Python backend and efficient JS rendering.',
    liveUrl: '',
    image: '/projects/bombo.png'
  },
  {
    title: 'X32 Remote Toggle',
    tag: 'Automation',
    link: 'https://github.com/klaayd39/x32-channel-remote-toggle',
    desc: 'High-performance OSC control system for Behringer X32 mixers using global keyboard hotkeys.',
    longDesc: 'X32 Remote Toggle is a high-performance, low-latency OSC control suite developed to interface directly with Behringer X32 audio consoles. It enables broadcast engineers to seamlessly toggle specific channels via global hotkeys.',
    problem: 'Live audio engineers often face physical layout constraints or slow response times when executing emergency mutes or quick mic handovers, leading to delayed action during live broadcasts.',
    solution: 'Designed an event-driven automation module using AutoHotkey and PowerShell communicating over low-latency OSC protocols (UDP), reaching instant synchronization across hardware.',
    features: [
      'Sub-50ms state sync latency over UDP OSC protocols',
      'Global hotkey support via AutoHotkey v2',
      'PowerShell driven UDP packet transmission',
      'Custom profiles for different studio configurations'
    ],
    tech: ['AutoHotkey v2', 'PowerShell', 'OSC Protocol', 'UDP Network'],
    challenges: 'Interfacing with proprietary mixing console protocols over UDP. Handled by creating specialized binary packet payloads in PowerShell to correctly trigger OSC commands.',
    liveUrl: '',
    image: '/projects/x32.png'
  },
  {
    title: 'Media Rename Automation',
    tag: 'Automation',
    link: 'https://github.com/klaayd39/media-rename-automation',
    desc: 'PowerShell utilities for batch-renaming video files into a clean, consistent naming convention.',
    longDesc: 'A collection of PowerShell utilities built for organizing multi-part Holy Week drama series. It iterates through complex folder hierarchies to automatically rename files to a standardized format without moving or copying data.',
    problem: 'Manually renaming hundreds of nested media files is prone to human error and takes hours of tedious work.',
    solution: 'Developed a targeted PowerShell script that automatically detects valid video parts and strictly applies standard naming schemas based on regex matches.',
    features: [
      'Batch-renaming of nested video files in place',
      'Regex-based pattern matching to prevent errors',
      'Automated folder traversal up to 11 parts',
      'Dry-run protection to avoid naming conflicts'
    ],
    tech: ['PowerShell', 'Regex', 'Windows Automation'],
    challenges: 'Handling arbitrary directory structures without failing. Resolved by implementing safe file skipping and strict pattern detection before making changes.',
    liveUrl: '',
    image: '/projects/rename.png'
  },
  {
    title: 'OBS Scene Autosort',
    tag: 'Automation',
    link: 'https://github.com/klaayd39/obs-scene-autosort',
    desc: 'Dynamic scene indexing and organization tool designed for complex live productions.',
    longDesc: 'OBS Scene Autosort resolves workflow clutter in complex live productions by auto-indexing, sorting, and arranging scene structures in OBS Studio based on natural alphanumeric sorting via a Lua script.',
    problem: 'Broadcasters running 30+ scenes struggle to find the right transitions or camera layout during stressful live show switches.',
    solution: 'Created an intelligent sorting agent running natively within OBS using Lua that enforces strict scene structures and automatically snaps sources into alphabetical order.',
    features: [
      'Natural Alphanumeric Sorting applied automatically',
      'Real-time Organization executed every second',
      'Targeted Sorting only affecting specific scenes',
      'API Stability Fixes for cross-version compatibility'
    ],
    tech: ['Lua', 'OBS Studio API', 'Automation'],
    challenges: 'Preventing the script from crashing older OBS versions due to API differences. Resolved by utilizing specific item re-positioning functions instead of bulk table updates.',
    liveUrl: '',
    image: '/projects/obs.png'
  },
  {
    title: 'Nautel AUI Monitor',
    tag: 'Broadcast Systems',
    featured: true,
    featuredId: 'nautel',
    featuredNum: '02',
    subtitle: 'Remote transmitter site · Bombo Radyo Malaybalay',
    featuredTags: ['Broadcast', 'Python', 'Telemetry', 'Windows API', 'Unattended monitoring'],
    situation: [
      'Transmitters sit at remote sites',
      'AUI crashes could go unnoticed for hours',
      'Manual screenshot checks were easy to skip',
      'No historical trail when something failed',
    ],
    built: [
      'Background scheduler using Python and PyWin32',
      'Captures the AUI even when minimised or covered',
      'Smart window detection via title keywords',
      'Screenshots organised by year, month, and day',
    ],
    outcome: [
      '24/7 unattended transmitter health capture',
      'Historical reference when diagnosing faults',
      'No extra hardware — runs on existing station PCs',
      'Quiet enough to leave running in the background',
    ],
    screenshotCaption: 'Scheduled AUI capture. PrintWindow API grabs the transmitter UI whether it is focused or not.',
    link: 'https://github.com/klaayd39/nautel-aui-monitor',
    desc: 'Automatically captures periodic screenshots of a Nautel Legacy AUI window for transmitter monitoring.',
    longDesc: 'Nautel AUI Monitor is a critical infrastructure tool that automatically captures screenshots of a legacy Nautel AUI window—even if minimized or covered—using the Windows PrintWindow API.',
    problem: 'Radio transmitters are located in remote sites and AUI crashes can go unnoticed, and manual checks are easy to forget.',
    solution: 'Created a background scheduler service using Python and PyWin32 that silently captures and organizes screenshots by date, allowing for easy historical reference.',
    features: [
      'Captures screenshots of background/hidden windows',
      'Scheduled interval execution',
      'Smart window detection via title keywords',
      'Organized output by Year / Month / Day'
    ],
    tech: ['Python', 'PyWin32', 'Pillow', 'Automation'],
    challenges: 'Capturing windows that are not focused or are minimized. Solved by deeply integrating with Windows native PrintWindow API using PyWin32.',
    liveUrl: '',
    image: '/projects/nautel.png'
  },
  {
    title: 'OBS Media Automator',
    tag: 'Automation',
    link: 'https://github.com/klaayd39/obs-media-automator',
    desc: 'Python-driven workflow engine for instant broadcast asset deployment and OBS source management.',
    longDesc: 'OBS Media Automator is a specialized Python toolkit for OBS Studio that automates the configuration, scaling, and audio routing of Media Sources as they are added to your scenes, preventing manual setup delays.',
    problem: 'Production assistants frequently delay broadcast graphics deployment due to manual folder navigation, drag-drop errors, or mismatching aspect ratios.',
    solution: 'Built an OBS Python script that automatically transforms, resizes, and manages audio routing when new media assets are loaded into active scenes.',
    features: [
      'Automatic Scaling & Positioning to fit screen',
      'Standardized Media Settings (hardware decoding, loop)',
      'Advanced Audio Routing (Mono, -10dB, Monitor)',
      'Smart Restart Logic for nested graphic scenes'
    ],
    tech: ['Python', 'OBS Scripting API'],
    challenges: 'Handling audio routing glitches in nested OBS scenes. Solved by implementing dynamic toggle logic to disable "Restart on Activate" only when required.',
    liveUrl: '',
    image: '/projects/media.png'
  }
];
