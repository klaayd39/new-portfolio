import { useState } from 'react'

function PlaceholderIcon() {
  return (
    <span className="project-media-placeholder-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3.8 16.2 8.4 12a1.4 1.4 0 0 1 1.9 0l3.1 2.8 1.6-1.5a1.4 1.4 0 0 1 1.9.1l3.3 3.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="9.2" r="1.35" fill="currentColor" />
      </svg>
    </span>
  )
}

export default function ProjectImage({
  src,
  alt = '',
  className = '',
  placeholderClassName = '',
  title,
  tag,
}) {
  const [failed, setFailed] = useState(!src)

  if (failed || !src) {
    return (
      <div
        className={`project-media-placeholder${placeholderClassName ? ` ${placeholderClassName}` : ''}`}
        aria-hidden={alt ? undefined : true}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
      >
        <PlaceholderIcon />
        {tag && <span className="project-media-placeholder-tag">{tag}</span>}
        {title && <span className="project-media-placeholder-title">{title}</span>}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className || undefined}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
