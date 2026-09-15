import { motion, useReducedMotion } from 'framer-motion'
import ProjectImage from './ProjectImage'

export default function FeaturedProject({ project, index, onOpen, total = 3 }) {
  const reduced = useReducedMotion()
  const reverse = index % 2 === 1
  const indexLabel = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      className={`featured-project${reverse ? ' featured-project--reverse' : ''}`}
      id={project.featuredId}
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="featured-project-media">
        <span className="featured-index" aria-hidden="true">{indexLabel} / {String(total).padStart(2, '0')}</span>
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
          <button type="button" className="btn btn-primary" onClick={() => onOpen(project)}>
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
    </motion.article>
  )
}

export function ProjectCard({ project, onOpen }) {
  const reduced = useReducedMotion()

  return (
    <motion.button
      type="button"
      className="project-card"
      onClick={() => onOpen(project)}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <div className="project-card-image">
        <ProjectImage
          src={project.image}
          alt=""
          title={project.title}
          tag={project.tag}
          placeholderClassName="project-card-placeholder"
        />
      </div>
      <div className="project-card-content">
        <span className="tag tag--sm">{project.tag}</span>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="tech-row">
          {(project.tech || []).slice(0, 3).map((t) => (
            <span key={t} className="tech-pill tech-pill--sm">{t}</span>
          ))}
        </div>
        <span className="project-card-cta">View case study →</span>
      </div>
    </motion.button>
  )
}
