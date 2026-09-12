import { useEffect, useRef, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage/AboutPage.jsx'
import { HeroInfoPage } from './pages/HeroInfoPage/HeroInfoPage.jsx'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.jsx'
import introSound from '../Assets/Sounds/IntroSound/Intro_Sound.mp3'
import rallyIcon from '../Assets/HeroInfo/icons/kit/Rally.webp'

// Toggle to test the flashy page transition; set to false to disable it.
const FLASHY_PAGE_TRANSITIONS_ENABLED = true

// Toggle for the fade/slide-in animation applied to each page's content.
const PAGE_FADE_TRANSITIONS_ENABLED = true

const routeTitles = {
  '/': 'Brigitte Lindholm',
  '/about': 'About Brigitte',
  '/hero-info': 'Hero Information',
}

export default function App() {
  const location = useLocation()
  const isDarkHeader = location.pathname === '/about' || location.pathname === '/hero-info'
  const previousPathRef = useRef(location.pathname)
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)

  useEffect(() => {
    const nextTitle = routeTitles[location.pathname] || 'Brigitte Lindholm'
    document.title = nextTitle
  }, [location.pathname])

  useEffect(() => {
    if (!FLASHY_PAGE_TRANSITIONS_ENABLED) {
      return
    }

    if (previousPathRef.current === location.pathname) {
      return
    }

    setIsPageTransitioning(true)
    // Matches the longest bar's animation-delay + duration in styles.css so the overlay isn't cut off mid-sweep.
    const timeoutId = setTimeout(() => setIsPageTransitioning(false), 920)
    return () => clearTimeout(timeoutId)
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
    <div className={`app-shell ${PAGE_FADE_TRANSITIONS_ENABLED ? '' : 'page-fade-disabled'}`}>
      {FLASHY_PAGE_TRANSITIONS_ENABLED && isPageTransitioning && (
        <div className="page-transition-overlay" aria-hidden="true">
          <span className="page-transition-flash" />
          <span className="page-transition-ring ring-1" />
          <span className="page-transition-ring ring-2" />
          <span className="page-transition-ring ring-3" />
          <span className="page-transition-emblem">
            <img src={rallyIcon} alt="" />
          </span>
        </div>
      )}
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