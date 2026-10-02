import type { Funnel } from '@/data/funnels'

const DEMO_POSTERS: Record<string, string> = {
  'bombo.html': '/projects/bombo.png',
  'jg-farm.html': '/projects/jg-farm.png',
  'nautel.html': '/projects/nautel.png',
}

/** Poster for funnel/carousel tiles — demo pages use project screenshots. */
export function funnelThumbSrc(f: Funnel): string {
  if (f.dir === 'demos') {
    return DEMO_POSTERS[f.file] ?? '/projects/portfolio.png'
  }
  return `/${f.dir ?? 'funnels'}/thumbs/${f.file.replace('.html', '.jpeg')}`
}
