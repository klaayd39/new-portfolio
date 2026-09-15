import { useState } from 'react'

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
      >
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
