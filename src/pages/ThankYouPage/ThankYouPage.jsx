import './ThankYouPage.css'
import rallyIcon from '../../../Assets/HeroInfo/icons/kit/Rally.webp'
import { SiteFooter } from '../../components/SiteFooter.jsx'
import { playAudioExclusive } from '../../utils/audioPlayer.js'
import thankAthenaSound from '../../../Assets/Sounds/HeroInfoPage/ThankAthena/TA_1.ogg'

export function ThankYouPage() {
  const playThankAthenaSound = () => {
    playAudioExclusive(thankAthenaSound, 0.5)
  }

  return (
    <div className="thank-you-page">
      <section className="thank-you-hero" aria-labelledby="thank-you-title">
        <div className="thank-you-grid" aria-hidden="true" />
        <div className="thank-you-content">
          <div className="thank-you-meta">
            <span>PRESENTATION COMPLETE</span>
            <span>LEARN BRIGITTE // 2026</span>
          </div>

          <div className="thank-you-emblem">
            <span className="thank-you-emblem-icon">
              <img src={rallyIcon} alt="" />
            </span>
          </div>

          <p className="thank-you-eyebrow">One last thing</p>
          <h1 id="thank-you-title">Thank you<br /><em>for listening.</em></h1>
          <p className="thank-you-message">
            We hope you leave with a stronger understanding of Brigitte, her kit,
            and the people she protects.
          </p>

          <div className="thank-you-rule" />
          <p className="thank-you-signoff">Stay behind the shield.</p>

          <button
            type="button"
            className="thank-you-home-link"
            aria-label="Click to thank Athena"
            title="Click to thank Athena"
            onClick={playThankAthenaSound}
          >
            Thank Athena!
          </button>
        </div>
      </section>

      <SiteFooter tag="PRESENTATION COMPLETE" />
    </div>
  )
}
