import { useEffect, useRef } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage/AboutPage.jsx'
import { HeroInfoPage } from './pages/HeroInfoPage/HeroInfoPage.jsx'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.jsx'
import introSound from '../Assets/Sounds/IntroSound/Intro_Sound.mp3'

const routeTitles = {
  '/': 'Brigitte Lindholm',
  '/about': 'About Brigitte',
  '/hero-info': 'Hero Information',
}

export default function App() {
  const location = useLocation()
  const isDarkHeader = location.pathname === '/about' || location.pathname === '/hero-info'
  const previousPathRef = useRef(location.pathname)

  useEffect(() => {
    const nextTitle = routeTitles[location.pathname] || 'Brigitte Lindholm'
    document.title = nextTitle
  }, [location.pathname])

  useEffect(() => {
    const previousPath = previousPathRef.current
    const isHomeToAboutTransition = location.pathname === '/about' && previousPath === '/'

    if (isHomeToAboutTransition) {
      const hasPlayedHomeToAboutSound = sessionStorage.getItem('brigitteAboutIntroPlayed') === 'true'

      if (hasPlayedHomeToAboutSound) {
        previousPathRef.current = location.pathname
        return
      }

      const audio = new Audio(introSound)
      audio.volume = 0.15
      audio.play().catch(() => {})
      sessionStorage.setItem('brigitteAboutIntroPlayed', 'true')
    }

    previousPathRef.current = location.pathname
  }, [location.pathname])

  return (
    <div className="app-shell">
      <header className={`site-header ${isDarkHeader ? 'header-light-text' : ''}`}>
        <nav aria-label="Main navigation">
          <NavLink className="wordmark" to="/" aria-label="Learn Brigitte home">
            BRIGITTE <span>LINDHOLM</span>
          </NavLink>
          <div className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/hero-info">Hero Info</NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/hero-info" element={<HeroInfoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}