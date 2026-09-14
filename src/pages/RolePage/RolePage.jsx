import { Link, useParams } from 'react-router-dom'
import { NotFoundPage } from '../NotFoundPage/NotFoundPage.jsx'
import { SiteFooter } from '../../components/SiteFooter.jsx'
import { ROLE_LABELS, ROSTER_BY_ROLE } from '../../data/roster.js'
import './RolePage.css'

export function RolePage() {
  const { role } = useParams()
  const heroes = ROSTER_BY_ROLE[role]

  if (!heroes) {
    return <NotFoundPage />
  }

  const roleLabel = ROLE_LABELS[role]

  return (
    <div className="role-page">
      <section className="role-banner">
        <div className="role-banner-inner">
          <div className="role-meta-tags">
            <span className="role-tag-pill">BASICS ARCHIVE</span>
            <span className="role-tag-pill">MATCHUP GUIDE</span>
            <span className="role-tag-pill role-status-tag">{heroes.length} HEROES TRACKED</span>
          </div>

          <p className="role-pretitle">Basics &amp; Matchup Guides</p>
          <h1 className="role-main-title">{roleLabel}</h1>
          <p className="role-subtitle">
            Learn how to fight against every {roleLabel.toLowerCase()} hero while playing Brigitte.
          </p>
        </div>
      </section>

      <main className="role-content">
        <div className="role-section-badge">
          <span>SECTION 01</span>
          <h2>{roleLabel} Roster</h2>
        </div>

        <div className="role-grid">
          {heroes.map((hero) => (
            <Link key={hero.slug} to={hero.path} className="role-card">
              <span className="role-card-icon-frame">
                <img src={hero.icon} alt="" className="role-card-icon" />
              </span>
              <span className="role-card-name">{hero.name}</span>
              <span className="role-card-cta">
                View Matchup <span className="role-card-arrow">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter tag={`MATCHUP GUIDE // ${roleLabel.toUpperCase()}`} />
    </div>
  )
}
