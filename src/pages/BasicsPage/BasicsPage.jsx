import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { SiteFooter } from '../../components/SiteFooter.jsx'
import { BASICS_PAGE_AUDIO_ENABLED } from '../../data/flags.js'
import { playAudioExclusive } from '../../utils/audioPlayer.js'
import basicsPageAudio from '../../../Assets/Sounds/HeroInfoPage/Basics_Page/BP_1.ogg'
import supportIcon from '../../../Assets/Images/Icons/Support_icon.png'
import whipShotIcon from '../../../Assets/HeroInfo/icons/kit/Whip_Shot.webp'
import './BasicsPage.css'

const basicsSections = [
  {
    id: 'how-to-play',
    title: 'How to Play Brigitte',
    body: [
      <p key="intro-1">
        Brigitte doesn't have one universal playstyle. The way you should position and play her depends heavily on <strong>what both teams are trying to accomplish</strong>.
      </p>,
      <p key="intro-2">
        Rather than asking, <em>"Where should Brigitte stand?"</em>, ask yourself:
      </p>,
      <blockquote key="intro-3">
        <strong>"What does my team need me to protect, and what does the enemy team want to do?"</strong>
      </blockquote>,
      <p key="intro-4">
        Your job is to make the enemy's game plan as difficult as possible while helping your own team execute theirs.
      </p>,
    ],
  },
  {
    id: 'protect-support',
    title: 'Protect Your Other Support',
    body: [
      <p key="support-1">
        One of Brigitte's most important responsibilities is protecting your other support.
      </p>,
      <p key="support-2">
        This doesn't necessarily mean standing directly beside them at all times. Instead, you want to position yourself where you can <strong>quickly respond when the enemy threatens your backline</strong>.
      </p>,
      <p key="support-3">
        If the enemy is playing a dive composition, this might mean staying close enough to your other support to deny dives and peel for them.
      </p>,
      <p key="support-4">
        If the enemy isn't diving, your positioning can be more flexible. You may be able to play farther forward, control an important angle, or help your DPS establish a strong position while still remaining close enough to protect your support when necessary.
      </p>,
      <p key="support-5">
        The important part is recognizing <strong>when your other support is vulnerable and being in a position to help them</strong>.
      </p>,
    ],
  },
  {
    id: 'control-space',
    title: 'Control Important Space',
    body: [
      <p key="space-1">
        Brigitte is extremely good at making certain areas of the map uncomfortable for the enemy.
      </p>,
      <p key="space-2">
        You don't always need to be fighting. Sometimes your presence alone can prevent an enemy from taking an important position.
      </p>,
      <p key="space-3">
        For example, if an enemy DPS wants to take a powerful off-angle, you can pressure them and make that position difficult to maintain. If one of your DPS players is trying to establish an angle, you can help protect that position and prevent the enemy from easily contesting it.
      </p>,
      <p key="space-4">
        Think about <strong>which areas of the map actually matter</strong> and position yourself around those areas.
      </p>,
      <p key="space-5">
        High ground is especially valuable. Being on high ground can give you better sightlines, safer Whip Shots, easier access to your teammates, and more opportunities to deny enemy movement.
      </p>,
      <p key="space-6">
        Being a melee hero does <strong>not</strong> mean you should constantly be fighting on low ground.
      </p>,
    ],
  },
  {
    id: 'win-condition',
    title: 'Support Your Team\'s Win Condition',
    body: [
      <p key="win-1">
        Brigitte should complement what her team is trying to accomplish.
      </p>,
      <p key="win-2">
        If your team wants to play aggressively, you can help them take and maintain space.
      </p>,
      <p key="win-3">
        If your team wants to play around strong defensive positions, you can help protect those positions.
      </p>,
      <p key="win-4">
        If your team has vulnerable backline heroes, you may need to prioritize peeling for them.
      </p>,
      <p key="win-5">
        If your DPS are taking aggressive angles, you can help them hold those angles.
      </p>,
      <p key="win-6">
        And if the enemy is constantly trying to attack your backline, your priority may shift toward denying those attacks rather than looking for damage yourself.
      </p>,
      <p key="win-7">
        There isn't always one correct place for Brig to be. <strong>Your positioning should change according to where your team gets value.</strong>
      </p>,
    ],
  },
  {
    id: 'aggression',
    title: 'Know When to Be Aggressive',
    body: [
      <p key="aggro-1">
        Brigitte can absolutely fight alongside her tank and take part in aggressive engagements, but you need to know when doing so is actually safe.
      </p>,
      <p key="aggro-2">
        If the enemy team is down several players, pushing forward with your tank may be the correct play. Likewise, if you have a numbers advantage or a significant cooldown advantage, you may be able to take much more aggressive positions.
      </p>,
      <p key="aggro-3">
        However, this is where many Brig players get themselves killed.
      </p>,
      <p key="aggro-4">
        Being capable of fighting in melee range doesn't mean you should always be in melee range.
      </p>,
      <p key="aggro-5">
        Before committing, consider:
      </p>,
      <div key="aggro-6" className="basics-checklist">
        <ul>
          <li>How many enemies can actually damage me?</li>
          <li>What enemy cooldowns are available?</li>
          <li>Do I have an escape route?</li>
          <li>Where is my other support?</li>
          <li>Can my team follow my aggression?</li>
          <li>What happens if the fight goes badly?</li>
        </ul>
      </div>,
      <p key="aggro-7">
        The better you understand what Brigitte can and cannot survive, the more aggressive you can safely become.
      </p>,
    ],
  },
  {
    id: 'whip-shot',
    title: 'WHIP SHOT',
    body: [
      <p key="whip-1">
        And, of course:
      </p>,
      <blockquote key="whip-2">
        <strong>WHIP. WHIP. WHIP.</strong>
      </blockquote>,
      <p key="whip-3">
        Whip Shot is one of the most important abilities in Brigitte's kit. Don't treat it as something you only use when an enemy happens to walk into range.
      </p>,
      <p key="whip-4">
        Look for safe opportunities to use it consistently. It allows you to contribute damage, activate Inspire, and influence the fight without unnecessarily putting yourself in danger.
      </p>,
      <p key="whip-5">
        At the same time, don't become obsessed with maintaining a specific Inspire percentage. Inspire uptime naturally varies depending on the map, team compositions, and how the game is being played.
      </p>,
      <p key="whip-6">
        Focus on <strong>using Whip Shot whenever you can safely get value from it</strong> rather than forcing yourself into dangerous positions just to activate Inspire.
      </p>,
    ],
  },
  {
    id: 'big-picture',
    title: 'The Big Picture',
    body: [
      <p key="big-1">
        A good Brigitte isn't constantly looking for someone to hit.
      </p>,
      <p key="big-2">
        She's constantly asking:
      </p>,
      <div key="big-3" className="basics-checklist">
        <ul>
            <li>Who needs protection?</li>
            <li>What space needs to be controlled?</li>
            <li>Which enemy position needs to be denied?</li>
            <li>Where can I help my team take space?</li>
            <li>Can I safely play more aggressively right now?</li>
        </ul>
      </div>,
      <p key="big-4">
        Brigitte's strength comes from being able to switch between <strong>peeling, controlling space, supporting teammates, and applying pressure</strong> as the situation changes.
      </p>,
      <p key="big-5">
        Don't play Brigitte on autopilot.
      </p>,
      <blockquote key="big-6">
        <strong>Pay attention to what both teams are doing, and position yourself where you can have the most impact.</strong>
      </blockquote>,
    ],
  },
]

const keyTakeaways = [
  {
    kicker: 'Core Rule',
    title: 'Protect the backline.',
    text: "Brigitte's value is not just damage; it is how often she keeps the team alive and the fight from spiraling.",
  },
  {
    kicker: 'Priority',
    title: 'Control space',
    text: 'Take the angles that matter and deny the enemy their easiest access to your team.',
  },
  {
    kicker: 'Timing',
    title: 'Play the fight',
    text: 'Brigitte should be aggressive when the numbers, cooldowns, and team follow-up all favor it.',
  },
  {
    kicker: 'Weapon',
    title: 'Whip Shot',
    text: 'Use it for safe value. Efficient Whip Shots create pressure without forcing risky positioning.',
  },
]

export function BasicsPage() {
  const [activeId, setActiveId] = useState(basicsSections[0].id)
  const [progress, setProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const sectionRefs = useRef({})

  // Plays a welcome clip once per tab session when the user lands on the Basics page.
  useEffect(() => {
    if (!BASICS_PAGE_AUDIO_ENABLED) return

    const hasPlayedBasicsSound = sessionStorage.getItem('brigitteBasicsIntroPlayed') === 'true'
    if (hasPlayedBasicsSound) return

    playAudioExclusive(basicsPageAudio, 0.5)
    sessionStorage.setItem('brigitteBasicsIntroPlayed', 'true')
  }, [])

  // Highlights the TOC entry for whichever section is currently in the reading zone.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    )

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updatePositions = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? window.scrollY / total : 0)
      setShowBackToTop(window.scrollY > 600)
    }

    updatePositions()
    window.addEventListener('scroll', updatePositions, { passive: true })
    window.addEventListener('resize', updatePositions)
    return () => {
      window.removeEventListener('scroll', updatePositions)
      window.removeEventListener('resize', updatePositions)
    }
  }, [])

  const tocNav = (
    <nav className="basics-toc">
      <span className="basics-side-kicker">On This Page</span>
      <ul>
        {basicsSections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={activeId === section.id ? 'active' : ''}
              onClick={(event) => {
                event.preventDefault()
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              <span className="basics-toc-index">{String(index + 1).padStart(2, '0')}</span>
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <div className="basics-page">
      {createPortal(
        <div className="basics-progress-track" aria-hidden="true">
          <div className="basics-progress-bar" style={{ width: `${Math.min(progress, 1) * 100}%` }} />
        </div>,
        document.body
      )}

      <header className="basics-banner" aria-labelledby="basics-headline">
        <div className="basics-banner-inner">
          <div className="basics-meta-tags">
            <span className="tag-pill">TACTICAL ARCHIVE ID // BL-07</span>
            <span className="tag-pill">POSITIONING GUIDE</span>
            <span className="tag-pill status-tag">SUPPORT FUNDAMENTALS</span>
          </div>

          <div className="basics-title-row">
            <div>
              <p className="basics-pretitle">Combat Primer &amp; Positioning</p>
              <h1 id="basics-headline" className="basics-main-title">
                Playing <em>Brigitte</em>
              </h1>
            </div>
            <div className="basics-quick-badge">
              <img src={supportIcon} alt="" />
              <div>
                <strong>Support / Survivor</strong>
                <span>Ironclad Guild Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="basics-content">
        <div className="basics-takeaways" aria-label="Key takeaways">
          {keyTakeaways.map((item) => (
            <div key={item.kicker} className="basics-takeaway-tile">
              <span className="basics-side-kicker">{item.kicker}</span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="basics-layout">
          <article className="basics-article">
            {basicsSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => { sectionRefs.current[section.id] = el }}
                className="basics-section"
              >
                <div className="basics-section-header">
                  <span className="basics-index">
                    <img src={whipShotIcon} alt="" />
                  </span>
                  <h2>{section.title}</h2>
                </div>
                {section.body}
              </section>
            ))}
          </article>

          <aside className="basics-sidebar" aria-label="Section navigation">
            {tocNav}
          </aside>
        </div>
      </main>

      {createPortal(
        <button
          type="button"
          className={`basics-back-to-top ${showBackToTop ? 'visible' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          &uarr;
        </button>,
        document.body
      )}

      <SiteFooter tag="PLAYING BRIGITTE // BASICS" />
    </div>
  )
}
