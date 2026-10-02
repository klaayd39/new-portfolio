import {
  PROJECT_ARCHIVE,
  STATION_PROJECTS,
  CLIENT_PROJECTS,
  PERSONAL_PROJECTS,
  type PortfolioProject,
  type ProjectTag,
} from '@/data/projectArchive'

export type AppStat = { value: string; label: string }

export type AppProject = {
  name: string
  tagline: string
  description: string
  imageSrc?: string
  imagePosition?: string
  accentColor: string
  stats: AppStat[]
  badge: string
  href?: string
}

const TAG_COLORS: Record<ProjectTag, string> = {
  'Web App': '#2563EB',
  Intelligence: '#DC2626',
  Automation: '#F59E0B',
  'Broadcast Systems': '#0891B2',
}

function toAppProject(p: PortfolioProject): AppProject {
  const badge =
    p.group === 'station' ? 'Station' : p.group === 'client' ? 'Client' : 'Personal'
  return {
    name: p.title,
    tagline: p.desc,
    description: p.longDesc,
    imageSrc: p.image?.startsWith('/') ? p.image : undefined,
    accentColor: TAG_COLORS[p.tag] ?? '#2D6A4F',
    stats: [
      { value: p.tag, label: 'Category' },
      { value: p.liveUrl ? 'Live' : 'GitHub', label: p.liveUrl ? 'Deployed' : 'Repository' },
      { value: String(p.tech.length), label: 'Stack items' },
    ],
    badge,
    href: p.liveUrl || p.link,
  }
}

/** Shipped web and client products (live or repo). */
export const webApps: AppProject[] = PROJECT_ARCHIVE.filter(
  (p) => p.tag === 'Web App' || p.tag === 'Intelligence' || p.liveUrl,
).map(toAppProject)

/** Operator-facing apps and dashboards (client + personal products). */
export const mobileApps: AppProject[] = [...CLIENT_PROJECTS, ...PERSONAL_PROJECTS].map(toAppProject)

/** Screenshots for marquees — projects that have images in public/projects. */
export const PROJECT_SCREENSHOTS = PROJECT_ARCHIVE.filter((p) => p.image?.startsWith('/projects/')).map(
  (p) => ({ file: p.image.replace('/projects/', ''), label: p.title, href: p.liveUrl || p.link }),
)

export { PROJECT_ARCHIVE, STATION_PROJECTS, CLIENT_PROJECTS, PERSONAL_PROJECTS }
export type { PortfolioProject }
