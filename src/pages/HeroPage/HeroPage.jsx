import { Link, useParams } from 'react-router-dom'
import { NotFoundPage } from '../NotFoundPage/NotFoundPage.jsx'
import { SiteFooter } from '../../components/SiteFooter.jsx'
import { ROLE_LABELS, ROSTER_BY_ROLE } from '../../data/roster.js'
import './HeroPage.css'

export function HeroPage() {
  const { role, heroSlug } = useParams()
  const heroes = ROSTER_BY_ROLE[role]
  const hero = heroes?.find((item) => item.slug === heroSlug)

  if (!hero) {
    return <NotFoundPage />
  }

  const roleLabel = ROLE_LABELS[role]

  return (
    <div className="herobasics-page">
      <section className="herobasics-banner">
        <div className="herobasics-banner-inner">
          <Link to={`/basics/${role}`} className="herobasics-back-link">
            &larr; Back to {roleLabel}
          </Link>
          <div className="herobasics-title-row">
            <span className="herobasics-icon-frame">
              <img src={hero.icon} alt="" className="herobasics-icon" />
            </span>
            <div>
              <p className="herobasics-pretitle">Brigitte Matchup Guide</p>
              <h1 className="herobasics-main-title">{hero.name}</h1>
            </div>
          </div>
        </div>
      </section>

      <main className="herobasics-content">
        <div className="herobasics-placeholder">
          <p className="herobasics-placeholder-label">MATCHUP GUIDE PENDING</p>
          <p>
            Tips for fighting against {hero.name} as Brigitte have not been added yet.
            Check back soon for counter-play strategies, positioning advice, and ability
            trades to watch out for.
          </p>
        </div>
      </main>

      <SiteFooter tag={`MATCHUP GUIDE // ${roleLabel.toUpperCase()}`} />
    </div>
  )
}
