// Renders one active perk card (minor or major tier), including the community-choice/pick-rate row.
export function PerkCard({ perk, iconSrc, isMajor = false, isCommunityChoice = false }) {
  return (
    <div className={`perk-card ${isMajor ? 'major-card' : ''} ${isCommunityChoice ? 'community-choice' : ''}`}>
      <div className="perk-icon-slot">
        <img src={iconSrc} alt="" />
      </div>
      <div className="perk-info">
        <div className="perk-header-row">
          <h4>{perk.name}</h4>
          {isCommunityChoice ? (
            <span className="community-choice-badge">
              <span className="check-circle">✓</span>
              COMMUNITY CHOICE
            </span>
          ) : (
            <span className="perk-spacer" />
          )}
          {perk.pick_rate && (
            <span className="perk-pickrate-tag">
              PICK RATE: <strong>{perk.pick_rate}</strong>
            </span>
          )}
        </div>
        <p>{perk.description}</p>
      </div>
    </div>
  )
}

// Renders one legacy/removed perk card, showing the season it was vaulted instead of a pick rate.
export function RemovedPerkCard({ item, iconSrc, isMajor = false }) {
  return (
    <div className={`perk-card ${isMajor ? 'major-card' : ''}`}>
      <div className="perk-icon-slot">
        <img src={iconSrc} alt="" />
      </div>
      <div className="perk-info">
        <div className="removed-meta-row">
          <span className={`tier-tag ${isMajor ? 'major' : ''}`}>
            {item.type.toUpperCase()} PERK
          </span>
          <span className="removed-season-tag">
            {item.removed_season.toUpperCase()}
          </span>
        </div>
        <h4>{item.name}</h4>
        <p>{item.description}</p>
      </div>
    </div>
  )
}
