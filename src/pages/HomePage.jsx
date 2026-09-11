import { UsersRound } from 'lucide-react'
import brigitteIcon from '../../Assets/Images/Landingpage/Brigitte-Icon.png'
import shieldIcon from '../../Assets/Images/Icons/Shield.webp'
import supportIcon from '../../Assets/Images/Icons/Support_icon.png'

export function HomePage() {
  return (
    <>
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
        <div className="authors-mark" aria-hidden="true"><UsersRound size={36} strokeWidth={1.5} /></div>
        <div className="authors-copy">
          <p className="eyebrow">About the authors</p>
          <h2 id="authors-title">The people<br />behind the shield.</h2>
        </div>
        <div className="author-list">
          <div><strong>Mericle</strong><span>Brig Main</span></div>
          <div><strong>Soren</strong><span>Brig Main</span></div>
        </div>
      </section>

      <footer className="site-footer">
        <span>LEARN BRIGITTE</span>
        <span>CHARACTER ARCHIVE</span>
        <span>EST. 2026</span>
      </footer>
    </>
  )
}