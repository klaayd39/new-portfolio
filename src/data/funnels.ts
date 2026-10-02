export type FunnelTag = 'Lead Capture' | 'Booking' | 'Checkout' | 'Website'

export type Funnel = {
  file: string
  label: string
  tag: FunnelTag
  desc: string
  dir?: 'funnels' | 'samples' | 'demos'
}

/** Live demos and shipped sites shown in the 3D carousel and home reels. */
const liveSite = (file: string, label: string, desc: string, dir: Funnel['dir'] = 'demos'): Funnel => ({
  file,
  label,
  tag: 'Website',
  desc,
  dir,
})

export const gymFunnel: Funnel[] = [
  liveSite('bombo.html', 'Bombo News Hub', 'Newsroom intelligence board with Discord alerts.'),
  liveSite('jg-farm.html', 'J&G Farm Tracker', 'Client farm operations portal.'),
  liveSite('nautel.html', 'Nautel AUI Monitor', 'Transmitter UI capture for remote sites.'),
]

export const bookingFunnel: Funnel[] = [
  liveSite('bombo.html', 'Bombo live board', 'Open the aggregation dashboard.'),
  liveSite('jg-farm.html', 'J&G Calamansi', 'Harvest and P&L dashboard.'),
  liveSite('nautel.html', 'Nautel monitor', 'Scheduled AUI screenshots.'),
]

export const websiteFunnel: Funnel[] = [
  liveSite('bombo.html', 'Bombo Radyo News Hub', '50+ sources · live dashboard · Discord alerts.'),
  liveSite('jg-farm.html', 'J&G Farm Tracker', 'Client portal · Supabase · PWA-ready.'),
  liveSite('nautel.html', 'Nautel AUI Monitor', 'Broadcast telemetry capture.'),
  liveSite('bombo.html', 'News intelligence', 'Hybrid Python + JavaScript architecture.'),
  liveSite('jg-farm.html', 'Farm analytics', 'Inventory guards and exportable reports.'),
  liveSite('nautel.html', 'Transmitter health', 'Runs quietly on station PCs.'),
]

export const tagColors: Record<FunnelTag, string> = {
  'Lead Capture': '#8b5cf6',
  Booking: '#ec4899',
  Checkout: '#f59e0b',
  Website: '#FF7A1A',
}
