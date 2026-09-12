import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { kit, AbilityTags, Perks, Removed } from './kit.js'
import shieldIcon from '../../../Assets/Images/Icons/Shield.webp'
import supportIcon from '../../../Assets/Images/Icons/Support_icon.png'

// Kit Ability Icons
import rocketFlailIcon from '../../../Assets/HeroInfo/icons/kit/Rocket_Flail.webp'
import barrierShieldIcon from '../../../Assets/HeroInfo/icons/kit/Barrier_Shield.webp'
import repairPackIcon from '../../../Assets/HeroInfo/icons/kit/Repair_Pack.webp'
import whipShotIcon from '../../../Assets/HeroInfo/icons/kit/Whip_Shot.webp'
import shieldBashIcon from '../../../Assets/HeroInfo/icons/kit/Shield_Bash.webp'
import rallyIcon from '../../../Assets/HeroInfo/icons/kit/Rally.webp'

// Passive Ability Icons
import survivorIcon from '../../../Assets/HeroInfo/icons/passives/Sub-Role_Survivor.svg'
import inspireIcon from '../../../Assets/HeroInfo/icons/passives/Inspire.webp'

// Perk Icons
import combatMedicIcon from '../../../Assets/HeroInfo/icons/perks/minor/Perk_Combat_Medic.webp'
import moraleBoostIcon from '../../../Assets/HeroInfo/icons/perks/minor/Perk_MoraleBoost.webp'
import inspiringStrikeIcon from '../../../Assets/HeroInfo/icons/perks/major/Perk_Inspiring_Strike.webp'
import whiplashIcon from '../../../Assets/HeroInfo/icons/perks/major/Perk_Whiplash.webp'
import barrierRestorationIcon from '../../../Assets/HeroInfo/icons/perks/removed/Perk_BarrierRestoration.webp'
import quickFixIcon from '../../../Assets/HeroInfo/icons/perks/removed/Perk_QuickFix.webp'

// Ability Demo Videos
import rocketFlailVideo from '../../../Assets/HeroInfo/videos/Rocket_Flail.mp4'
import barrierShieldVideo from '../../../Assets/HeroInfo/videos/Barrier_Shield.mp4'
import repairPackVideo from '../../../Assets/HeroInfo/videos/Repair_Pack.mp4'
import whipShotVideo from '../../../Assets/HeroInfo/videos/Whip_Shot.mp4'
import shieldBashVideo from '../../../Assets/HeroInfo/videos/Shield_Bash.mp4'
import rallyVideo from '../../../Assets/HeroInfo/videos/Rally.mp4'
import inspireVideo from '../../../Assets/HeroInfo/videos/Inspire.mp4'

import './HeroInfoPage.css'

const abilityIconMap = {
  'Rocket Flail': rocketFlailIcon,
  'Barrier Shield': barrierShieldIcon,
  'Repair Pack': repairPackIcon,
  'Whip Shot': whipShotIcon,
  'Shield Bash': shieldBashIcon,
  Rally: rallyIcon,
  'Sub-Role: Survivor': survivorIcon,
  Inspire: inspireIcon,
}

const perkIconMap = {
  'Combat Medic': combatMedicIcon,
  'Morale Boost': moraleBoostIcon,
  'Inspiring Strike': inspiringStrikeIcon,
  Whiplash: whiplashIcon,
  'Barrier Restoration': barrierRestorationIcon,
  'Quick Fix': quickFixIcon,
}

const abilityVideoMap = {
  'Rocket Flail': rocketFlailVideo,
  'Barrier Shield': barrierShieldVideo,
  'Repair Pack': repairPackVideo,
  'Whip Shot': whipShotVideo,
  'Shield Bash': shieldBashVideo,
  Rally: rallyVideo,
  Inspire: inspireVideo,
}

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

export function HeroInfoPage() {
  const [selectedTag, setSelectedTag] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    document.body.style.overflow = activeVideo ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeVideo])

  const openAbilityVideo = (name) => {
    const src = abilityVideoMap[name]
    if (src) {
      setActiveVideo({ name, src })
    }
  }

  const closeAbilityVideo = () => setActiveVideo(null)

  const heroStats = kit.find((item) => item.type === 'Hero Stats')
  const weapons = kit.filter((item) => item.type.includes('Weapon'))
  const standardAbilities = kit.filter((item) => item.type === 'Ability')
  const ultimateAbility = kit.find((item) => item.type === 'Ultimate Ability')
  const activeAbilities = [
    ...weapons,
    ...standardAbilities,
    ...(ultimateAbility ? [ultimateAbility] : []),
  ]
  const passiveAbilities = kit.filter((item) => item.type.includes('Passive'))

  const minorPerks = Perks.filter((p) => p.type === 'Minor')
  const majorPerks = Perks.filter((p) => p.type === 'Major')

  const highestMinorPickRatePerk = minorPerks.reduce((prev, current) => {
    const prevRate = parseFloat(prev?.pick_rate) || 0
    const currRate = parseFloat(current?.pick_rate) || 0
    return currRate > prevRate ? current : prev
  }, null)?.name

  const highestMajorPickRatePerk = majorPerks.reduce((prev, current) => {
    const prevRate = parseFloat(prev?.pick_rate) || 0
    const currRate = parseFloat(current?.pick_rate) || 0
    return currRate > prevRate ? current : prev
  }, null)?.name

  const handleTagClick = (tagName) => {
    if (selectedTag === tagName) {
      setSelectedTag(null)
    } else {
      setSelectedTag(tagName)
      const targetElement = document.getElementById(`tag-${tagName.replace(/\s+/g, '-').toLowerCase()}`)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  // Format stat keys into clean readable labels
  const formatStatKey = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const ignoredStatKeys = ['name', 'type', 'description', 'tags']

  const renderMetricValue = (value) => {
    if (typeof value === 'string' && value.includes(',')) {
      const items = value.split(',').map((item) => item.trim()).filter(Boolean)
      return (
        <div className="metric-multiline">
          {items.map((line, idx) => (
            <span key={idx} className="metric-line">{line}</span>
          ))}
        </div>
      )
    }
    return <span className="metric-val">{String(value)}</span>
  }

  return (
    <div className="heroinfo-page">
      {/* Hero Info Dossier Banner */}
      <section className="heroinfo-banner">
        <div className="heroinfo-banner-inner">
          <div className="heroinfo-meta-tags">
            <span className="tag-pill">TACTICAL ARCHIVE</span>
            <span className="tag-pill">SYSTEM PROTOCOL 2.0</span>
            <span className="tag-pill status-tag">CURRENT COMBAT SPEC</span>
          </div>

          <div className="heroinfo-title-row">
            <div>
              <p className="heroinfo-pretitle">Hero Specifications &amp; Arsenal</p>
              <h1 className="heroinfo-main-title">
                Hero <em>Information</em>
              </h1>
            </div>

            <div className="heroinfo-quick-badge">
              <img src={supportIcon} alt="" className="support-badge-icon" />
              <div>
                <strong>Support / Survivor</strong>
                <span>Ironclad Guild Engineer</span>
              </div>
            </div>
          </div>

          {/* Baseline Telemetry Strip */}
          {heroStats && (
            <div className="heroinfo-spec-strip">
              <div className="spec-item">
                <span className="spec-label">Total Health</span>
                <span className="spec-value">{heroStats.health + heroStats.armor} HP</span>
                <span className="spec-sub">{heroStats.health} Health + {heroStats.armor} Armor</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Base Move Speed</span>
                <span className="spec-value">{heroStats.moves_speed}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Health Regen</span>
                <span className="spec-value">{heroStats.health_regeneration_over_time}</span>
                <span className="spec-sub">Delay: {heroStats.health_regeneration_delay}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Melee Damage</span>
                <span className="spec-value">{heroStats.melee_damage} DMG</span>
                <span className="spec-sub">75 dmg per second</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Healing Debuff</span>
                <span className="spec-value">{heroStats.healing_reduction_from_damage_dealt}</span>
                <span className="spec-sub">Global Healing Reduction Passive</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="heroinfo-content">
        {/* SECTION 01: Weapons & Active Abilities */}
        <div className="section-badge">
          <span>SECTION 01</span>
          <h2>Weapons &amp; Active Abilities</h2>
        </div>

        <div className="abilities-grid">
          {activeAbilities.map((item, index) => {
            const isUltimate = item.type === 'Ultimate Ability'
            const isWeapon = item.type.includes('Weapon')
            const hasVideo = Boolean(abilityVideoMap[item.name])

            // Extract dynamic metrics
            const stats = Object.entries(item).filter(
              ([key]) => !ignoredStatKeys.includes(key)
            )

            return (
              <article
                key={index}
                className={`ability-card ${isUltimate ? 'card-ultimate' : ''} ${isWeapon ? 'card-weapon' : ''} ${hasVideo ? 'has-video' : ''}`}
                {...(hasVideo && {
                  role: 'button',
                  tabIndex: 0,
                  onClick: () => openAbilityVideo(item.name),
                  onKeyDown: (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      openAbilityVideo(item.name)
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
                      <img
                        src={abilityIconMap[item.name] || (isUltimate ? shieldIcon : inspireIcon)}
                        alt=""
                      />
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

                {/* Stat Metrics Grid */}
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

                {/* Ability Mechanic Tags */}
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
                            handleTagClick(tag)
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
          })}
        </div>

        {/* SECTION 02: Passive Abilities */}
        <div className="section-badge passives-section-badge">
          <span>SECTION 02</span>
          <h2>Passive Abilities</h2>
        </div>

        <div className="passives-grid">
          {passiveAbilities.map((item, index) => {
            const stats = Object.entries(item).filter(
              ([key]) => !ignoredStatKeys.includes(key)
            )
            const hasVideo = Boolean(abilityVideoMap[item.name])

            return (
              <article
                key={index}
                className={`ability-card card-passive ${hasVideo ? 'has-video' : ''}`}
                {...(hasVideo && {
                  role: 'button',
                  tabIndex: 0,
                  onClick: () => openAbilityVideo(item.name),
                  onKeyDown: (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      openAbilityVideo(item.name)
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
                      <img
                        src={abilityIconMap[item.name] || inspireIcon}
                        alt=""
                      />
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

                {/* Stat Metrics Grid */}
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

                {/* Ability Mechanic Tags */}
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
                            handleTagClick(tag)
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
          })}
        </div>

        {/* SECTION 03: Hero Perks Matrix */}
        <div className="section-badge perks-section-badge">
          <span>SECTION 03</span>
          <h2>Tactical Perks &amp; Upgrades</h2>
        </div>

        <div className="perks-grid">
          <div className="perk-column">
            <div className="perk-tier-header">
              <span className="tier-tag">TIER 01 / MINOR</span>
              <h3>Level 2 Perks</h3>
            </div>
            <div className="perk-cards">
              {minorPerks.map((perk, i) => {
                const isCommunityChoice = perk.name === highestMinorPickRatePerk
                return (
                  <div
                    key={i}
                    className={`perk-card ${isCommunityChoice ? 'community-choice' : ''}`}
                  >
                    <div className="perk-icon-slot">
                      <img
                        src={perkIconMap[perk.name] || inspireIcon}
                        alt=""
                      />
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
              })}
            </div>
          </div>

          <div className="perk-column">
            <div className="perk-tier-header">
              <span className="tier-tag major">TIER 02 / MAJOR</span>
              <h3>Level 3 Perks</h3>
            </div>
            <div className="perk-cards">
              {majorPerks.map((perk, i) => {
                const isCommunityChoice = perk.name === highestMajorPickRatePerk
                return (
                  <div
                    key={i}
                    className={`perk-card major-card ${isCommunityChoice ? 'community-choice' : ''}`}
                  >
                    <div className="perk-icon-slot">
                      <img
                        src={perkIconMap[perk.name] || shieldIcon}
                        alt=""
                      />
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
              })}
            </div>
          </div>
        </div>

        {/* SECTION 04: Legacy & Removed Perks */}
        <div className="section-badge removed-section-badge">
          <span>SECTION 04</span>
          <h2>Legacy &amp; Removed Perks</h2>
        </div>

        <div className="perk-cards removed-perk-cards">
          {Removed.map((item, i) => (
            <div
              key={i}
              className={`perk-card ${item.type === 'Major' ? 'major-card' : ''}`}
            >
              <div className="perk-icon-slot">
                <img
                  src={perkIconMap[item.name] || (item.type === 'Major' ? shieldIcon : inspireIcon)}
                  alt=""
                />
              </div>
              <div className="perk-info">
                <div className="removed-meta-row">
                  <span className={`tier-tag ${item.type === 'Major' ? 'major' : ''}`}>
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
          ))}
        </div>

        {/* SECTION 05: Mechanics & Ability Tags Glossary */}
        <div className="section-badge glossary-section-badge">
          <span>SECTION 05</span>
          <h2>Combat Mechanics Glossary</h2>
        </div>

        <div className="tags-glossary-grid">
          {AbilityTags.map((tagItem, idx) => {
            const isHighlighted = selectedTag === tagItem.name
            const tagAnchorId = `tag-${tagItem.name.replace(/\s+/g, '-').toLowerCase()}`

            return (
              <div
                key={idx}
                id={tagAnchorId}
                className={`glossary-card ${isHighlighted ? 'glossary-card-highlight' : ''}`}
                onClick={() => setSelectedTag(isHighlighted ? null : tagItem.name)}
              >
                <div className="glossary-header">
                  <span className="glossary-tag-name">{tagItem.name}</span>
                  <span className="glossary-id">PROP-{(idx + 1).toString().padStart(2, '0')}</span>
                </div>
                <p className="glossary-description">{tagItem.description}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom Tactical Quote Manifest */}
        <blockquote className="dossier-quote-block heroinfo-quote">
          <div className="quote-icon">
            <img src={shieldIcon} alt="" />
          </div>
          <div className="quote-text">
            <p>&ldquo;Breaking me down just builds me up.&rdquo;</p>
            <cite>BRIGITTE LINDHOLM // SYSTEM LOG BL-KIT</cite>
          </div>
        </blockquote>
      </main>

      <footer className="site-footer">
        <span>LEARN BRIGITTE</span>
        <span>HERO SPECIFICATION // BL-KIT</span>
        <span>EST. 2026</span>
      </footer>

      {activeVideo && createPortal(
        <div
          className="video-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.name} demonstration video`}
          onClick={closeAbilityVideo}
        >
          <div className="video-modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="video-modal-close"
              onClick={closeAbilityVideo}
              aria-label="Close video"
            >
              &times;
            </button>
            <h3 className="video-modal-title">{activeVideo.name}</h3>
            <video
              className="video-modal-player"
              src={activeVideo.src}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
