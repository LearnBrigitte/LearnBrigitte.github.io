import { Link, useParams } from 'react-router-dom'
import { NotFoundPage } from '../NotFoundPage/NotFoundPage.jsx'
import { SiteFooter } from '../../components/SiteFooter.jsx'
import { ROLE_LABELS, ROSTER_BY_ROLE } from '../../data/roster.js'
import { getMatchupGuide } from '../../data/matchupGuides.js'
import './HeroPage.css'

export function HeroPage() {
  const { role, heroSlug } = useParams()
  const heroes = ROSTER_BY_ROLE[role]
  const hero = heroes?.find((item) => item.slug === heroSlug)

  if (!hero) {
    return <NotFoundPage />
  }

  const roleLabel = ROLE_LABELS[role]
  const { tips } = getMatchupGuide(hero.name)
  const videoCount = tips.filter((tip) => tip.video).length

  return (
    <div className="herobasics-page">
      <section className="herobasics-banner">
        <div className="herobasics-banner-inner">
          <Link to={`/intermediate/${role}`} className="herobasics-back-link">
            &larr; Back to {roleLabel}
          </Link>
          <div className="herobasics-title-row">
            <span className="herobasics-icon-frame">
              <img src={hero.icon} alt="" className="herobasics-icon" />
            </span>
            <div>
              <p className="herobasics-pretitle">Playing Brigitte vs.</p>
              <h1 className="herobasics-main-title">{hero.name}</h1>
              <div className="herobasics-meta-tags">
                <span className="herobasics-tag-pill herobasics-role-tag">{roleLabel}</span>
                <span
                  className={`herobasics-tag-pill herobasics-status-tag ${
                    tips.length > 0 ? 'is-ready' : 'is-pending'
                  }`}
                >
                  <span className="herobasics-tag-dot" />
                  {tips.length > 0 ? `${tips.length} TIP${tips.length === 1 ? '' : 'S'}` : 'TIPS PENDING'}
                </span>
                <span
                  className={`herobasics-tag-pill herobasics-status-tag ${
                    videoCount > 0 ? 'is-ready' : 'is-pending'
                  }`}
                >
                  <span className="herobasics-tag-dot" />
                  {videoCount > 0 ? `${videoCount} CLIP${videoCount === 1 ? '' : 'S'}` : 'VIDEO PENDING'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="herobasics-content">
        <section className="herobasics-section">
          <div className="herobasics-section-badge">
            <span>STRATEGY</span>
            <h2>Tips</h2>
          </div>
          {tips.length > 0 ? (
            <ul className="herobasics-tips-list">
              {tips.map((tip, index) => (
                <li key={index}>
                  <div className="herobasics-tip-row">
                    <span className="herobasics-tip-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="herobasics-tip-text">{tip.text}</span>
                  </div>
                  {tip.video && (
                    <video
                      className="herobasics-tip-video"
                      src={tip.video}
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="herobasics-placeholder">
              <p className="herobasics-placeholder-label">TIPS PENDING</p>
              <p>
                Tips for fighting against {hero.name} as Brigitte have not been added yet.
                Check back soon for counter-play strategies, positioning advice, and ability
                trades to watch out for.
              </p>
            </div>
          )}
        </section>
      </main>

      <SiteFooter tag={`MATCHUP GUIDE // ${roleLabel.toUpperCase()}`} />
    </div>
  )
}
