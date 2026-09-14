import { formatStatKey, renderMetricValue, IGNORED_STAT_KEYS } from '../../utils/kitFormatters.jsx'

// Small clicking-mouse glyph used as the "click me" hint on playable cards.
function ClickPointerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 3.5 19 13l-4.2.6 2.4 4.9-2.3 1.1-2.4-4.9L9.8 18 9 3.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Renders one ability/weapon/passive card; used for both the active-abilities and passives grids.
export function AbilityCard({
  item,
  iconSrc,
  isUltimate = false,
  isWeapon = false,
  isPassive = false,
  hasVideo = false,
  onOpenVideo,
  selectedTag,
  onTagClick,
}) {
  const stats = Object.entries(item).filter(([key]) => !IGNORED_STAT_KEYS.includes(key))

  const cardClassName = [
    'ability-card',
    isUltimate && 'card-ultimate',
    isWeapon && 'card-weapon',
    isPassive && 'card-passive',
    hasVideo && 'has-video',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article
      className={cardClassName}
      {...(hasVideo && {
        role: 'button',
        tabIndex: 0,
        onClick: () => onOpenVideo(item.name),
        onKeyDown: (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onOpenVideo(item.name)
          }
        },
      })}
    >
      {hasVideo && (
        <span className="click-hint">
          <ClickPointerIcon />
          Click to Watch
        </span>
      )}

      <div className="ability-card-top">
        <div className="ability-header-group">
          <div className="ability-icon-slot">
            <img src={iconSrc} alt="" />
          </div>
          <div className="ability-card-header">
            <div className="ability-type-badge">
              <span>{item.type.toUpperCase()}</span>
            </div>
            <h3 className="ability-title">{item.name}</h3>
          </div>
        </div>

        <p className="ability-description">{item.description}</p>
      </div>

      {stats.length > 0 && (
        <div className="ability-metrics-grid">
          {stats.map(([key, value]) => (
            <div key={key} className="metric-pill">
              <span className="metric-label">{formatStatKey(key)}</span>
              {renderMetricValue(value)}
            </div>
          ))}
        </div>
      )}

      {item.tags && item.tags.length > 0 && (
        <div className="ability-tags-row">
          <span className="tags-label">PROPERTIES:</span>
          <div className="tags-list">
            {item.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`tag-chip ${selectedTag === tag ? 'active-tag' : ''}`}
                onClick={(event) => {
                  event.stopPropagation()
                  onTagClick(tag)
                }}
                title={`Click to jump to tag: ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
