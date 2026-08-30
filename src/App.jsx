import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopFAB from './components/ScrollToTopFAB'
import { Analytics } from '@vercel/analytics/react'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Resume = lazy(() => import('./pages/Resume'))
const Contact = lazy(() => import('./pages/Contact'))

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      let attempts = 0
      const jump = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return
        }
        if (attempts < 20) {
          attempts += 1
          window.setTimeout(jump, 50)
        }
      }
      jump()
      return undefined
    }
    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollManager />
      <Navbar />

      <main>
        <Suspense fallback={<div className="page-fallback" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <ScrollToTopFAB />
      <Analytics />
    </div>
  )
}
