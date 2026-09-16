import { useEffect, useRef, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage/AboutPage.jsx'
import { BasicsPage } from './pages/BasicsPage/BasicsPage.jsx'
import { HeroInfoPage } from './pages/HeroInfoPage/HeroInfoPage.jsx'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { RolePage } from './pages/RolePage/RolePage.jsx'
import { HeroPage } from './pages/HeroPage/HeroPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.jsx'
import { ThankYouPage } from './pages/ThankYouPage/ThankYouPage.jsx'
import { ROLE_LABELS, ROSTER_BY_ROLE } from './data/roster.js'
import { FLASHY_PAGE_TRANSITIONS_ENABLED, PAGE_FADE_TRANSITIONS_ENABLED, INTERMEDIATE_TAB_ENABLED, THANK_YOU_PAGE_AUDIO_ENABLED, HERO_INFO_PAGE_INTRO_AUDIO_ENABLED } from './data/flags.js'
import { playAudioExclusive } from './utils/audioPlayer.js'
import introSound from '../Assets/Sounds/IntroSound/Intro_Sound.mp3'
import thankYouSound1 from '../Assets/Sounds/HeroInfoPage/ThankyouPage/TyP_1.ogg'
import thankYouSound2 from '../Assets/Sounds/HeroInfoPage/ThankyouPage/TyP_2.ogg'
import thankYouSound3 from '../Assets/Sounds/HeroInfoPage/ThankyouPage/TyP_3.ogg'
import heroInfoIntroSound from '../Assets/Sounds/HeroInfoPage/HeroInfoPage/HIP_1.ogg'
import rallyIcon from '../Assets/HeroInfo/icons/kit/Rally.webp'

const thankYouSoundClips = [thankYouSound1, thankYouSound2, thankYouSound3]
// Extra pause (ms) inserted before each clip index starts; keeps TyP_3 from following TyP_2 immediately.
const thankYouClipDelays = [0, 0, 1500]

const routeTitles = {
  '/': 'Brigitte Lindholm',
  '/about': 'About Brigitte',
  '/hero-info': 'Hero Information',
  '/basics': 'Playing Brigitte',
  '/intermediate': 'Intermediate Guides',
  '/thank-you': 'Thank You',
}

// Resolves the tab title for routes that aren't in the static map above (e.g. /basics/*).
function resolveDocumentTitle(pathname) {
  if (routeTitles[pathname]) {
    return routeTitles[pathname]
  }

  const intermediateMatch = pathname.match(/^\/intermediate\/([^/]+)(?:\/([^/]+))?$/)
  if (intermediateMatch) {
    const [, role, heroSlug] = intermediateMatch
    const roleLabel = ROLE_LABELS[role]
    if (!roleLabel) {
      return 'Brigitte Lindholm'
    }
    if (!heroSlug) {
      return `${roleLabel} // Intermediate`
    }
    const hero = ROSTER_BY_ROLE[role]?.find((item) => item.slug === heroSlug)
    return hero ? `${hero.name} // Intermediate` : 'Brigitte Lindholm'
  }

  return 'Brigitte Lindholm'
}

export default function App() {
  const location = useLocation()
  const isDarkHeader =
    location.pathname === '/about' ||
    location.pathname === '/hero-info' ||
    location.pathname.startsWith('/basics') ||
    location.pathname.startsWith('/intermediate') ||
    location.pathname === '/thank-you'
  const previousPathRef = useRef(location.pathname)
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)
  const [isIntermediateMenuOpen, setIsIntermediateMenuOpen] = useState(false)
  const intermediateMenuRef = useRef(null)

  useEffect(() => {
    document.title = resolveDocumentTitle(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    setIsIntermediateMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!INTERMEDIATE_TAB_ENABLED) {
      return
    }

    const handleOutsideClick = (event) => {
      if (intermediateMenuRef.current && !intermediateMenuRef.current.contains(event.target)) {
        setIsIntermediateMenuOpen(false)
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
    const isThankYouNavigation = location.pathname === '/thank-you' && previousPath !== '/thank-you'
    const isHeroInfoNavigation = location.pathname === '/hero-info' && previousPath !== '/hero-info'

    if (isAboutNavigation) {
      const hasPlayedAboutSound = sessionStorage.getItem('brigitteAboutIntroPlayed') === 'true'
      // const hasPlayedAboutSound = sessionStorage.getItem('brigitteAboutIntroPlayed') === 'false'

      if (!hasPlayedAboutSound) {
        playAudioExclusive(introSound, 0.075) // volume control
        sessionStorage.setItem('brigitteAboutIntroPlayed', 'true')
      }
    }

    if (isThankYouNavigation && THANK_YOU_PAGE_AUDIO_ENABLED) {
      const hasPlayedThankYouSound = sessionStorage.getItem('brigitteThankYouIntroPlayed') === 'true'

      if (!hasPlayedThankYouSound) {
        // Play the clips back to back, in file-name order, honoring any per-clip delay.
        const playClipAt = (index) => {
          if (index >= thankYouSoundClips.length) return

          setTimeout(() => {
            const audio = playAudioExclusive(thankYouSoundClips[index], 0.5)
            audio.addEventListener('ended', () => playClipAt(index + 1))
          }, thankYouClipDelays[index] || 0)
        }

        playClipAt(0)
        sessionStorage.setItem('brigitteThankYouIntroPlayed', 'true')
      }
    }

    if (isHeroInfoNavigation && HERO_INFO_PAGE_INTRO_AUDIO_ENABLED) {
      const hasPlayedHeroInfoIntroSound = sessionStorage.getItem('brigitteHeroInfoIntroPlayed') === 'true'

      if (!hasPlayedHeroInfoIntroSound) {
        playAudioExclusive(heroInfoIntroSound, 0.5)
        sessionStorage.setItem('brigitteHeroInfoIntroPlayed', 'true')
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
            <NavLink to="/basics">Basics</NavLink>
            <NavLink to="/thank-you">Thank You</NavLink>
            {INTERMEDIATE_TAB_ENABLED && (
              <div className="nav-dropdown" ref={intermediateMenuRef}>
                <button
                  type="button"
                  className={`nav-dropdown-trigger ${location.pathname.startsWith('/intermediate') ? 'active' : ''}`}
                  onClick={() => setIsIntermediateMenuOpen((open) => !open)}
                  aria-expanded={isIntermediateMenuOpen}
                  aria-haspopup="true"
                >
                  Intermediate
                  <span className="nav-dropdown-caret">▾</span>
                </button>
                {isIntermediateMenuOpen && (
                  <div className="nav-dropdown-menu">
                    <NavLink to="/intermediate/tanks">Tanks</NavLink>
                    <NavLink to="/intermediate/dps">DPS</NavLink>
                    <NavLink to="/intermediate/supports">Supports</NavLink>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/hero-info" element={<HeroInfoPage />} />
          <Route path="/basics" element={<BasicsPage />} />
          <Route path="/intermediate" element={<RolePage />} />
          <Route path="/intermediate/:role" element={<RolePage />} />
          <Route path="/intermediate/:role/:heroSlug" element={<HeroPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}