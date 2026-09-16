import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './HomePage.css'
import brigitteIcon from '../../../Assets/Images/LandingPage/Brigitte-Icon.png'
import shieldIcon from '../../../Assets/Images/Icons/Shield.webp'
import supportIcon from '../../../Assets/Images/Icons/Support_icon.png'
import { SiteFooter } from '../../components/SiteFooter.jsx'
import { SOUND_POPUP_AUTO_DISMISS_ENABLED, SOUND_POPUP_BACKDROP_BLUR_ENABLED, LANDING_PAGE_AUDIO_ENABLED } from '../../data/flags.js'
import { playAudioExclusive } from '../../utils/audioPlayer.js'
import landingAudio1 from '../../../Assets/Sounds/HeroInfoPage/HomePage/HP_1.ogg'
import landingAudio2 from '../../../Assets/Sounds/HeroInfoPage/HomePage/HP_2.ogg'
import landingAudio3 from '../../../Assets/Sounds/HeroInfoPage/HomePage/HP_3.ogg'

const SOUND_POPUP_SESSION_KEY = 'brigitteSoundPopupShown'
const LANDING_AUDIO_SESSION_KEY = 'brigitteLandingAudioPlayed'
const landingAudioClips = [landingAudio1, landingAudio2, landingAudio3]

export function HomePage() {
  const [isSoundPopupVisible, setIsSoundPopupVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SOUND_POPUP_SESSION_KEY) === 'true') return

    setIsSoundPopupVisible(true)
    sessionStorage.setItem(SOUND_POPUP_SESSION_KEY, 'true')
  }, [])

  // Plays the landing clips back to back, in file-name order, once per tab session.
  const playLandingAudio = () => {
    if (!LANDING_PAGE_AUDIO_ENABLED) return
    if (sessionStorage.getItem(LANDING_AUDIO_SESSION_KEY) === 'true') return

    const playClipAt = (index) => {
      if (index >= landingAudioClips.length) return

      const audio = playAudioExclusive(landingAudioClips[index], 0.5)
      audio.addEventListener('ended', () => playClipAt(index + 1))
    }

    playClipAt(0)
    sessionStorage.setItem(LANDING_AUDIO_SESSION_KEY, 'true')
  }

  const closeSoundPopup = () => {
    setIsSoundPopupVisible(false)
    playLandingAudio()
  }

  useEffect(() => {
    if (!isSoundPopupVisible || !SOUND_POPUP_AUTO_DISMISS_ENABLED) return

    const timeoutId = setTimeout(closeSoundPopup, 4000)
    return () => clearTimeout(timeoutId)
  }, [isSoundPopupVisible])

  return (
    <>
      {isSoundPopupVisible && createPortal(
        <>
          {SOUND_POPUP_BACKDROP_BLUR_ENABLED && (
            <div className="sound-on-popup-backdrop" aria-hidden="true" />
          )}
          <div className="sound-on-popup" role="status">
            <span className="sound-on-popup-icon" aria-hidden="true">🔊</span>
            <span className="sound-on-popup-text">Sound On</span>
            {!SOUND_POPUP_AUTO_DISMISS_ENABLED && (
              <button
                type="button"
                className="sound-on-popup-close"
                onClick={closeSoundPopup}
                aria-label="Dismiss sound notice"
              >
                &times;
              </button>
            )}
          </div>
        </>,
        document.body
      )}

      <section className="landing-hero" aria-labelledby="hero-title">
        <div className="hero-topline">
          <span>CHARACTER ARCHIVE</span>
          <span>01 / 01</span>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">The shieldmaiden</p>
            <h1 id="hero-title">Brigitte<br /><em>Lindholm</em></h1>
            <p>
              A gifted engineer with a steadfast heart, Brigitte built her place in
              Overwatch by protecting the people who matter most.
            </p>
            <div className="hero-signature">
              <img src={shieldIcon} alt="" />
              <span>Stand behind the shield.</span>
            </div>
          </div>
          <div className="portrait-stage">
            <p className="portrait-label">BRIGITTE<br />LINDHOLM</p>
            <img src={brigitteIcon} alt="Brigitte Lindholm" />
          </div>
        </div>
      </section>

      <section className="character-facts" aria-label="Brigitte at a glance">
        <div><span>ROLE</span><strong><img src={supportIcon} alt="" />Support</strong></div>
        <div><span>HOME</span><strong>Gothenburg</strong></div>
        <div><span>CALLING</span><strong>Engineer</strong></div>
        <div><span>LOYALTY</span><strong>Overwatch</strong></div>
      </section>

      <section className="authors" aria-labelledby="authors-title">
        <div className="authors-copy">
          <p className="eyebrow">About the authors</p>
          <h2 id="authors-title">The people<br />behind the shield.</h2>
        </div>
        <div className="author-list">
          <div><strong>Mericle</strong><span>Brig Main</span></div>
          <div><strong>Soren</strong><span>Brig Main</span></div>
        </div>
      </section>

      <SiteFooter tag="CHARACTER ARCHIVE" />
    </>
  )
}
