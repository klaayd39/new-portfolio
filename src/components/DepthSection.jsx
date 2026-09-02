import Parallax from './Parallax'

/**
 * Section wrapper with perspective context and optional ambient depth layers.
 */
export default function DepthSection({
  children,
  className = '',
  id,
  ambient = false,
  sticky = false,
  as: Tag = 'section',
}) {
  return (
    <Tag
      id={id}
      className={`scene-section${sticky ? ' scene-sticky' : ''}${className ? ` ${className}` : ''}`}
    >
      {ambient && (
        <div className="scene-ambient" aria-hidden="true">
          <Parallax className="scene-orb scene-orb-a" speed={0.28} scale={0.14} fade={0.3} />
          <Parallax className="scene-orb scene-orb-b" speed={0.42} speedX={-0.08} scale={0.1} />
        </div>
      )}
      <div className="scene-content">{children}</div>
    </Tag>
  )
}
