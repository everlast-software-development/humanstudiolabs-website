import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import RouteTransition from './components/RouteTransition'
import Home from './pages/Home'
import Solution from './pages/Solution'
import Solutions from './pages/Solutions'
import About from './pages/About'
import ResponsibleAI from './pages/ResponsibleAI'
import Partnerships from './pages/Partnerships'
import Contact from './pages/Contact'
import { SOLUTIONS, BRAND } from './data/content'

const TITLES = { '/': `${BRAND.name} — Intelligence for the Next Era of Healthcare`, '/about': `About — ${BRAND.name}`, '/responsible-ai': `Responsible AI — ${BRAND.name}`, '/partnerships': `Partnerships — ${BRAND.name}`, '/contact': `Contact — ${BRAND.name}`, '/solutions': `Solutions — ${BRAND.name}` }

// Page title, and scroll to the top (or to a #section) on every navigation.
function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const sol = SOLUTIONS.find((s) => pathname === `/solutions/${s.id}`)
    document.title = sol ? `${sol.name} — ${BRAND.name}` : TITLES[pathname] || BRAND.name
    if (hash) { const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 60); return () => clearTimeout(t) }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

// Each page fades in when the address changes (the header and footer stay outside, so they don't move).
function PageFade({ children }) {
  const { pathname } = useLocation()
  return <div key={pathname} className="page-fade">{children}</div>
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Preloader />
      <RouteTransition />
      <RouteEffects />
      <Header />
      <PageFade>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solutions/:id" element={<Solution />} />
        <Route path="/about" element={<About />} />
        <Route path="/responsible-ai" element={<ResponsibleAI />} />
        <Route path="/partnerships" element={<Partnerships />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
      </PageFade>
      <Footer />
    </BrowserRouter>
  )
}
