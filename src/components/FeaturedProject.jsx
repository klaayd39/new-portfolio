import MotionReveal, { staggerDelay } from './MotionReveal'
import ProjectImage from './ProjectImage'

export default function FeaturedProject({ project, index, onOpen, total = 3 }) {
  const reverse = index % 2 === 1
  const indexLabel = String(index + 1).padStart(2, '0')

  return (
    <MotionReveal
      as="article"
      className={`featured-project${reverse ? ' featured-project--reverse' : ''}`}
      id={project.featuredId}
      delay={staggerDelay(index)}
    >
      <div className="featured-project-media">
        <span className="featured-index" aria-hidden="true">{indexLabel} / {String(total).padStart(2, '0')}</span>
        {project.tag && <span className="tag tag--overlay">{project.tag}</span>}
        <ProjectImage
          src={project.image}
          alt={project.title}
          title={project.title}
          tag={project.tag}
          placeholderClassName="featured-project-placeholder"
        />
      </div>
      <div className="featured-project-body">
        <div className="featured-project-tags">
          {(project.featuredTags || [project.tag]).slice(0, 4).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <h3 className="featured-project-title">{project.title}</h3>
        <p className="featured-project-sub">{project.subtitle || project.desc}</p>
        <p className="featured-project-desc">{project.longDesc || project.desc}</p>
        <div className="tech-row">
          {(project.tech || []).slice(0, 5).map((t) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>
        <div className="featured-project-actions">
          <button type="button" className="btn btn-primary btn-arrow" onClick={() => onOpen(project)}>
            View case study
          </button>
          <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-ghost">
            GitHub
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Live demo
            </a>
          )}
        </div>
      </div>
    </MotionReveal>
  )
}

export function ProjectCard({ project, onOpen }) {
  return (
    <button
      type="button"
      className="project-card"
      onClick={() => onOpen(project)}
    >
      <div className="project-card-image">
        {project.tag && <span className="tag tag--sm tag--overlay">{project.tag}</span>}
        <ProjectImage
          src={project.image}
          alt=""
          title={project.title}
          tag={project.tag}
          placeholderClassName="project-card-placeholder"
        />
      </div>
      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="tech-row">
          {(project.tech || []).slice(0, 3).map((t) => (
            <span key={t} className="tech-pill tech-pill--sm">{t}</span>
          ))}
        </div>
        <span className="project-card-cta">View case study <span className="cta-arrow" aria-hidden="true">→</span></span>
      </div>
    </button>
  )
}
