export const SITE_URL = 'https://klydeyabo.vercel.app'
export const SITE_NAME = 'Klyde Joseph Yabo'
export const DEFAULT_TITLE = 'Klyde Joseph Yabo — Information Technology'
export const DEFAULT_DESCRIPTION =
  'Klyde Joseph Yabo builds automation, broadcast systems, and web apps for live radio — based in Malaybalay, Philippines.'
export const OG_IMAGE = `${SITE_URL}/og-image.png`

export function pageTitle(title) {
  if (!title || title === DEFAULT_TITLE) return DEFAULT_TITLE
  return `${title} | ${SITE_NAME}`
}

export function canonicalUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (normalized === '/') return `${SITE_URL}/`
  return `${SITE_URL}${normalized}`
}
