import { useState } from 'react'

export default function CopyButton({ text, label = 'Copy email', className = '' }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button
      type="button"
      className={`copy-btn${className ? ` ${className}` : ''}`}
      onClick={handleCopy}
      aria-live="polite"
    >
      {copied ? 'Copied!' : label}
    </button>
  )
}
