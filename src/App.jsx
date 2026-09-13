import { useEffect, useRef, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage/AboutPage.jsx'
import { HeroInfoPage } from './pages/HeroInfoPage/HeroInfoPage.jsx'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { RolePage } from './pages/RolePage/RolePage.jsx'
import { HeroPage } from './pages/HeroPage/HeroPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.jsx'
import { ROLE_LABELS, ROSTER_BY_ROLE } from './data/roster.js'
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

// Resolves the tab title for routes that aren't in the static map above (e.g. /basics/*).
function resolveDocumentTitle(pathname) {
  if (routeTitles[pathname]) {
    return routeTitles[pathname]
  }

  const basicsMatch = pathname.match(/^\/basics\/([^/]+)(?:\/([^/]+))?$/)
  if (basicsMatch) {
    const [, role, heroSlug] = basicsMatch
    const roleLabel = ROLE_LABELS[role]
    if (!roleLabel) {
      return 'Brigitte Lindholm'
    }
    if (!heroSlug) {
      return `${roleLabel} // Basics`
    }
    const hero = ROSTER_BY_ROLE[role]?.find((item) => item.slug === heroSlug)
    return hero ? `${hero.name} // Basics` : 'Brigitte Lindholm'
  }

  return 'Brigitte Lindholm'
}

export default function App() {
  const location = useLocation()
  const isDarkHeader =
    location.pathname === '/about' ||
    location.pathname === '/hero-info' ||
    location.pathname.startsWith('/basics')
  const previousPathRef = useRef(location.pathname)
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)
  const [isBasicsMenuOpen, setIsBasicsMenuOpen] = useState(false)
  const basicsMenuRef = useRef(null)

  useEffect(() => {
    document.title = resolveDocumentTitle(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    setIsBasicsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (basicsMenuRef.current && !basicsMenuRef.current.contains(event.target)) {
        setIsBasicsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

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
    const isAboutNavigation = location.pathname === '/about' && previousPath !== '/about'

    if (isAboutNavigation) {
      const hasPlayedAboutSound = sessionStorage.getItem('brigitteAboutIntroPlayed') === 'true'
      // const hasPlayedAboutSound = sessionStorage.getItem('brigitteAboutIntroPlayed') === 'false'

      if (!hasPlayedAboutSound) {
        const audio = new Audio(introSound)
        audio.volume = 0.075 // volume control
        audio.play().catch(() => {})
        sessionStorage.setItem('brigitteAboutIntroPlayed', 'true')
      }
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
            <div className="nav-dropdown" ref={basicsMenuRef}>
              <button
                type="button"
                className={`nav-dropdown-trigger ${location.pathname.startsWith('/basics') ? 'active' : ''}`}
                onClick={() => setIsBasicsMenuOpen((open) => !open)}
                aria-expanded={isBasicsMenuOpen}
                aria-haspopup="true"
              >
                Basics
                <span className="nav-dropdown-caret">▾</span>
              </button>
              {isBasicsMenuOpen && (
                <div className="nav-dropdown-menu">
                  <NavLink to="/basics/tanks">Tanks</NavLink>
                  <NavLink to="/basics/dps">DPS</NavLink>
                  <NavLink to="/basics/supports">Supports</NavLink>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/hero-info" element={<HeroInfoPage />} />
          <Route path="/basics/:role" element={<RolePage />} />
          <Route path="/basics/:role/:heroSlug" element={<HeroPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}