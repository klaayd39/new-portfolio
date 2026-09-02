import { useEffect, useState } from 'react'

function formatTime() {
  return new Intl.DateTimeFormat('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
  }).format(new Date())
}

export default function LocalTime() {
  const [time, setTime] = useState(formatTime)

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <p className="sidebar-time" aria-label={`Local time in Malaybalay: ${time}`}>
      <span className="sidebar-time-dot" aria-hidden="true" />
      {time} · PHT
    </p>
  )
}
