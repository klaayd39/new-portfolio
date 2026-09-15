const HASH_ALIASES = {
  about: 'about',
  exploring: 'projects',
}

export function resolveHashTarget(rawHash) {
  const raw = decodeURIComponent(rawHash.replace(/^#/, ''))
  if (!raw) return null
  return HASH_ALIASES[raw] || raw
}

export function scrollToHash(rawHash, { behavior = 'smooth', maxAttempts = 80, interval = 50 } = {}) {
  const id = resolveHashTarget(rawHash)
  if (!id) return () => {}

  let attempts = 0
  let timer

  const jump = () => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior, block: 'start' })
      return
    }
    if (attempts < maxAttempts) {
      attempts += 1
      timer = window.setTimeout(jump, interval)
    }
  }

  jump()

  return () => {
    if (timer) window.clearTimeout(timer)
  }
}
