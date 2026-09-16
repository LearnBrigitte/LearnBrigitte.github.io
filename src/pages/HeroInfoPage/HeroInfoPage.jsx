import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { kit, AbilityTags, Perks, Removed } from './kit.js'
import { SiteFooter } from '../../components/SiteFooter.jsx'
import { AbilityCard } from './AbilityCard.jsx'
import { PerkCard, RemovedPerkCard } from './PerkCard.jsx'
import { tagAnchorId } from '../../utils/kitFormatters.jsx'
import { stopCurrentAudio, playAudioExclusive } from '../../utils/audioPlayer.js'
import {
  SHOW_VIDEO_CONTROLS,
  HERO_INFO_ABILITY_AUDIO_ENABLED,
  ROCKET_FLAIL_AUDIO_ENABLED,
  BARRIER_SHIELD_AUDIO_ENABLED,
  REPAIR_PACK_AUDIO_ENABLED,
  WHIP_SHOT_AUDIO_ENABLED,
  SHIELD_BASH_AUDIO_ENABLED,
  RALLY_AUDIO_ENABLED,
} from '../../data/flags.js'
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

// Ability Audio Clips
import rocketFlailAudio from '../../../Assets/Sounds/HeroInfoPage/Rocket_Flail/RF_1.ogg'
import repairPackAudio from '../../../Assets/Sounds/HeroInfoPage/Repair_Pack/RP_1.ogg'
import whipShotAudio from '../../../Assets/Sounds/HeroInfoPage/Whip_Shot/WS_1.ogg'
import rallyAudio1 from '../../../Assets/Sounds/HeroInfoPage/Rally/R_1.ogg'
import rallyAudio2 from '../../../Assets/Sounds/HeroInfoPage/Rally/R_2.ogg'
import rallyAudio3 from '../../../Assets/Sounds/HeroInfoPage/Rally/R_3.ogg'

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

// Barrier Shield and Shield Bash have no audio clips yet; entries stay undefined until added.
const abilityAudioMap = {
  'Rocket Flail': rocketFlailAudio,
  'Barrier Shield': undefined,
  'Repair Pack': repairPackAudio,
  'Whip Shot': whipShotAudio,
  'Shield Bash': undefined,
  Rally: [rallyAudio1, rallyAudio2, rallyAudio3],
}

// Per-ability audio flags, keyed by ability name so audio only plays when both switches are on.
const abilityAudioFlagMap = {
  'Rocket Flail': ROCKET_FLAIL_AUDIO_ENABLED,
  'Barrier Shield': BARRIER_SHIELD_AUDIO_ENABLED,
  'Repair Pack': REPAIR_PACK_AUDIO_ENABLED,
  'Whip Shot': WHIP_SHOT_AUDIO_ENABLED,
  'Shield Bash': SHIELD_BASH_AUDIO_ENABLED,
  Rally: RALLY_AUDIO_ENABLED,
}

export function HeroInfoPage() {
  const [selectedTag, setSelectedTag] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)
  const [isVideoClosing, setIsVideoClosing] = useState(false)

  useEffect(() => {
    document.body.style.overflow = activeVideo ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeVideo])

  // Plays the matching ability clip(s) at 50% volume, once per tab session, when its card's video is opened.
  // Multiple clips are played back to back in file-name order.
  const playAbilityAudio = (name) => {
    const isEnabled = HERO_INFO_ABILITY_AUDIO_ENABLED && Boolean(abilityAudioFlagMap[name])
    const audioSrc = abilityAudioMap[name]
    if (!isEnabled || !audioSrc) return

    const sessionKey = `brigitteAbilityAudioPlayed_${name}`
    if (sessionStorage.getItem(sessionKey) === 'true') return

    const clips = Array.isArray(audioSrc) ? audioSrc : [audioSrc]

    const playClipAt = (index) => {
      if (index >= clips.length) return

      const audio = playAudioExclusive(clips[index], 0.5)
      audio.addEventListener('ended', () => playClipAt(index + 1))
    }

    playClipAt(0)
    sessionStorage.setItem(sessionKey, 'true')
  }

  const openAbilityVideo = (name) => {
    const src = abilityVideoMap[name]
    if (src) {
      setActiveVideo({ name, src })
      setIsVideoClosing(false)
      playAbilityAudio(name)
    }
  }

  // Delay unmounting until the exit animation finishes.
  const closeAbilityVideo = () => {
    setIsVideoClosing(true)
    stopCurrentAudio()
  }

  useEffect(() => {
    if (!isVideoClosing) return

    const timeoutId = setTimeout(() => {
      setActiveVideo(null)
      setIsVideoClosing(false)
    }, 220)

    return () => clearTimeout(timeoutId)
  }, [isVideoClosing])

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
      const targetElement = document.getElementById(tagAnchorId(tagName))
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  return (
    <div className="heroinfo-page">
      {/* Hero Info Dossier Banner */}
      <section className="heroinfo-banner">
        <div className="heroinfo-banner-inner">
          <div className="heroinfo-meta-tags">
            <span className="tag-pill">TACTICAL ARCHIVE ID // BL-07</span>
            <span className="tag-pill">SYSTEM PROTOCOL 2.0</span>
            <span className="tag-pill status-tag">CURRENT COMBAT SPECIFICATIONS</span>
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

            return (
              <AbilityCard
                key={index}
                item={item}
                iconSrc={abilityIconMap[item.name] || (isUltimate ? shieldIcon : inspireIcon)}
                isUltimate={isUltimate}
                isWeapon={isWeapon}
                hasVideo={hasVideo}
                onOpenVideo={openAbilityVideo}
                selectedTag={selectedTag}
                onTagClick={handleTagClick}
              />
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
            const hasVideo = Boolean(abilityVideoMap[item.name])

            return (
              <AbilityCard
                key={index}
                item={item}
                iconSrc={abilityIconMap[item.name] || inspireIcon}
                isPassive
                hasVideo={hasVideo}
                onOpenVideo={openAbilityVideo}
                selectedTag={selectedTag}
                onTagClick={handleTagClick}
              />
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
              {minorPerks.map((perk, i) => (
                <PerkCard
                  key={i}
                  perk={perk}
                  iconSrc={perkIconMap[perk.name] || inspireIcon}
                  isCommunityChoice={perk.name === highestMinorPickRatePerk}
                />
              ))}
            </div>
          </div>

          <div className="perk-column">
            <div className="perk-tier-header">
              <span className="tier-tag major">TIER 02 / MAJOR</span>
              <h3>Level 3 Perks</h3>
            </div>
            <div className="perk-cards">
              {majorPerks.map((perk, i) => (
                <PerkCard
                  key={i}
                  perk={perk}
                  iconSrc={perkIconMap[perk.name] || shieldIcon}
                  isMajor
                  isCommunityChoice={perk.name === highestMajorPickRatePerk}
                />
              ))}
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
            <RemovedPerkCard
              key={i}
              item={item}
              iconSrc={perkIconMap[item.name] || (item.type === 'Major' ? shieldIcon : inspireIcon)}
              isMajor={item.type === 'Major'}
            />
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

            return (
              <div
                key={idx}
                id={tagAnchorId(tagItem.name)}
                className={`glossary-card ${isHighlighted ? 'glossary-card-highlight' : ''}`}
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

      <SiteFooter tag="HERO SPECIFICATION // BL-KIT" />

      {activeVideo && createPortal(
        <div
          className={`video-modal-overlay ${isVideoClosing ? 'video-modal-closing' : ''}`}
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
              controls={SHOW_VIDEO_CONTROLS}
              autoPlay
              loop
              playsInline
              ref={(el) => {
                if (el) el.volume = 0.25
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
