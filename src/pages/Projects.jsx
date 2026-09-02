import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { PROJECTS } from '../data/projects'
import MotionReveal from '../components/MotionReveal'
import { ProjectCard } from '../components/FeaturedProject'
import ProjectModal from '../components/ProjectModal'

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

      <section className="subpage-hero">
        <div className="container">
          <MotionReveal>
            <p className="section-label">Archive</p>
            <h1 className="section-title">Projects I actually shipped.</h1>
            <p className="section-intro">
              {PROJECTS.length} automation toolsets, telemetry systems, and web apps built for a live radio station, clients, and personal use.
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <MotionReveal>
            <div className="filter-tabs">
              {groups.map((group) => (
                <button
                  key={group}
                  type="button"
                  className={`filter-tab${activeGroup === group ? ' filter-tab--active' : ''}`}
                  onClick={() => setActiveGroup(group)}
                >
                  {group}
                </button>
              ))}
            </div>
          </MotionReveal>

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <MotionReveal key={project.title} delay={Math.min(index * 0.04, 0.24)}>
                <ProjectCard project={project} onOpen={setSelectedProject} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  )
}
