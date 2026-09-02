import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import ProjectModal from '../components/ProjectModal'
import { PROJECTS } from '../data/projects'

export default function Projects() {
  const [activeGroup, setActiveGroup] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const groups = ['All', 'Bombo Radyo Malaybalay', 'Client Projects', 'Personal']

  const filteredProjects = PROJECTS.filter((p) =>
    activeGroup === 'All'
    || (activeGroup === 'Bombo Radyo Malaybalay' && p.group === 'station')
    || (activeGroup === 'Client Projects' && p.group === 'client')
    || (activeGroup === 'Personal' && p.group === 'personal')
  )

  return (
    <div className="subpage">
      <Helmet>
        <title>Projects | Klyde Joseph Yabo</title>
      </Helmet>

      <div className="subpage-hero">
        <div className="wrap">
          <span className="label">Archive</span>
          <h1 className="h2">Projects I actually <em>shipped.</em></h1>
          <p className="bp" style={{ maxWidth: 520, margin: 0 }}>
            Automation toolsets, telemetry, and real-time systems built for a live radio station and personal products.
          </p>
        </div>
      </div>

      <div className="wrap archive-body">
        <div className="filter-tabs">
          {groups.map((group) => (
            <button
              key={group}
              className={`filter-tab${activeGroup === group ? ' active' : ''}`}
              onClick={() => setActiveGroup(group)}
            >
              {group}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <ScrollReveal direction="up" delay={Math.min(index * 40, 200)} duration={500} key={project.title}>
              <article className="project-card">
                <div className="project-card-image-wrap">
                  {project.image ? (
                    <img src={project.image} loading="lazy" alt={project.title} className="project-card-image" />
                  ) : (
                    <div className="modal-hero-placeholder">
                      <span className="placeholder-text">{project.title}</span>
                    </div>
                  )}
                  {project.featured && <span className="feat-pill">Station</span>}
                </div>
                <span className="project-card-tag">{project.tag}</span>
                <h3 className="card-title-main">{project.title}</h3>
                <p className="project-card-desc">{project.desc}</p>
                <div className="tech-badges">
                  {(project.tech || []).slice(0, 3).map((t) => (
                    <span className="tech-badge" key={t}>{t}</span>
                  ))}
                  {project.tech && project.tech.length > 3 && (
                    <span className="tech-badge">+{project.tech.length - 3}</span>
                  )}
                </div>
                <div className="project-actions">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="project-btn-sm project-btn-primary"
                  >
                    Details →
                  </button>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn-sm project-btn-outline"
                  >
                    GitHub
                  </a>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}
