import { SiteFooter } from '../../components/SiteFooter.jsx'
import './BasicsPage.css'

const basicsSections = [
  {
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
      <ul key="aggro-6">
        <li>How many enemies can actually damage me?</li>
        <li>What enemy cooldowns are available?</li>
        <li>Do I have an escape route?</li>
        <li>Where is my other support?</li>
        <li>Can my team follow my aggression?</li>
        <li>What happens if the fight goes badly?</li>
      </ul>,
      <p key="aggro-7">
        The better you understand what Brigitte can and cannot survive, the more aggressive you can safely become.
      </p>,
    ],
  },
  {
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
    title: 'The Big Picture',
    body: [
      <p key="big-1">
        A good Brigitte isn't constantly looking for someone to hit.
      </p>,
      <p key="big-2">
        She's constantly asking:
      </p>,
      <ul key="big-3">
        <li><strong>Who needs protection?</strong></li>
        <li><strong>What space needs to be controlled?</strong></li>
        <li><strong>Which enemy position needs to be denied?</strong></li>
        <li><strong>Where can I help my team take space?</strong></li>
        <li><strong>Can I safely play more aggressively right now?</strong></li>
      </ul>,
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

export function BasicsPage() {
  return (
    <div className="basics-page">
      <header className="basics-banner" aria-labelledby="basics-headline">
        <div className="basics-banner-inner">
          <div className="basics-meta-tags">
            <span className="tag-pill">FUNDAMENTALS</span>
            <span className="tag-pill">ROLE PLAY</span>
            <span className="tag-pill status-tag">PLAYING BRIGITTE</span>
          </div>

          <div className="basics-title-row">
            <div>
              <p className="basics-pretitle">Combat Primer &amp; Positioning</p>
              <h1 id="basics-headline" className="basics-main-title">
                Playing <em>Brigitte</em>
              </h1>
            </div>
            <div className="basics-quick-badge">
              <div>
                <strong>Support / Frontliner</strong>
                <span>Protect, deny space, create openings</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="basics-content">
        <div className="basics-layout">
          <article className="basics-article">
            {basicsSections.map((section, index) => (
              <section key={section.title} className="basics-section">
                <div className="basics-section-header">
                  <span className="basics-index">{String(index + 1).padStart(2, '0')}</span>
                  <h2>{section.title}</h2>
                </div>
                {section.body}
              </section>
            ))}
          </article>

          <aside className="basics-sidebar" aria-label="Brigitte fundamentals overview">
            <div className="basics-aside-card basics-aside-highlight">
              <span className="basics-side-kicker">Core Rule</span>
              <strong>Protect the backline.</strong>
              <p>Brigitte's value is not just damage; it is how often she keeps the team alive and the fight from spiraling.</p>
            </div>

            <div className="basics-aside-card">
              <span className="basics-side-kicker">Priority</span>
              <strong>Control space</strong>
              <p>Take the angles that matter and deny the enemy their easiest access to your team.</p>
            </div>

            <div className="basics-aside-card">
              <span className="basics-side-kicker">Timing</span>
              <strong>Play the fight</strong>
              <p>Brigitte should be aggressive when the numbers, cooldowns, and team follow-up all favor it.</p>
            </div>

            <div className="basics-aside-card">
              <span className="basics-side-kicker">Weapon</span>
              <strong>Whip Shot</strong>
              <p>Use it for safe value. Efficient Whip Shots create pressure without forcing risky positioning.</p>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter tag="PLAYING BRIGITTE // BASICS" />
    </div>
  )
}
