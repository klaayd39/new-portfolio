import { useEffect, useState } from 'react'

/**
 * Fetches a Lottie animation JSON from a URL.
 * Mirrors the original Streamlit `load_lottieurl` helper:
 * fails silently (returns null) if the fetch doesn't succeed.
 */
export default function useLottieUrl(url) {
  const [data, setData] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled) setData(json)
      })
      .catch(() => {
        if (!cancelled) setData(null)
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return data
}
