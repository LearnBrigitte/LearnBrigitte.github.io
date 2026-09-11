import './AboutPage.css'
import shieldIcon from '../../../Assets/Images/Icons/Shield.webp'
import supportIcon from '../../../Assets/Images/Icons/Support_icon.png'

export function AboutPage() {
  return (
    <div className="dossier-page">
      {/* Dossier Header Banner */}
      <header className="dossier-banner" aria-labelledby="dossier-headline">
        <div className="dossier-banner-inner">
          <div className="dossier-meta-tags">
            <span className="tag-pill">ARCHIVE ID // BL-07</span>
            <span className="tag-pill">CLEARANCE // OVERWATCH RECALL</span>
            <span className="tag-pill status-tag">STATUS // ACTIVE COMBATANT</span>
          </div>

          <div className="dossier-title-row">
            <div>
              <p className="dossier-pretitle">Field Log & Lore Dossier</p>
              <h1 id="dossier-headline" className="dossier-main-title">
                Brigitte <em>Lindholm</em>
              </h1>
            </div>
            <div className="dossier-quick-badge">
              <img src={supportIcon} alt="" />
              <div>
                <strong>Support / Vanguard</strong>
                <span>Ironclad Guild Engineer</span>
              </div>
            </div>
          </div>

          <div className="dossier-spec-strip">
            <div className="spec-item">
              <span className="spec-label">Hometown</span>
              <span className="spec-value">Gothenburg, Sweden</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Base of Ops</span>
              <span className="spec-value">Watchpoint: Gibraltar</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Specialization</span>
              <span className="spec-value">Armor Fabrication & Defense</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Affiliation</span>
              <span className="spec-value">Overwatch</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dossier Content: 2-Column Split Layout */}
      <main className="dossier-content">
        <div className="dossier-grid">
          {/* Left Column: Chronological Lore Timeline */}
          <section className="timeline-column" aria-labelledby="timeline-title">
            <div className="section-badge">
              <span>SECTION 01</span>
              <h2 id="timeline-title">Field Timeline</h2>
            </div>

            <ol className="timeline-track">
              <li className="timeline-entry">
                <div className="timeline-node">01</div>
                <div className="timeline-card">
                  <span className="entry-period">Early Years // Gothenburg</span>
                  <h3>The Ironclad Workshop</h3>
                  <p>
                    Brigitte Lindholm grew up in Gothenburg as the youngest daughter of Torbjörn
                    and Ingrid Lindholm, absorbing her family's engineering legacy from a young age.
                    While her father was known for weapons of destruction, Brigitte was drawn to
                    armor, protective systems, and the idea of building something that could shield
                    the people beside her.
                  </p>
                </div>
              </li>

              <li className="timeline-entry">
                <div className="timeline-node">02</div>
                <div className="timeline-card">
                  <span className="entry-period">Origin // Before White Dome</span>
                  <h3>Named by a Knight</h3>
                  <p>
                    Brigitte was conceived before Operation White Dome, when Torbjörn was fighting
                    for his life after losing his arm and eye in battle. Reinhardt Wilhelm, who
                    stood by him through recovery, became a trusted friend and godfather. When the
                    time came, Torbjörn gave Brigitte her name and entrusted Reinhardt to guide her.
                  </p>
                </div>
              </li>

              <li className="timeline-entry">
                <div className="timeline-node">03</div>
                <div className="timeline-card">
                  <span className="entry-period">The Wandering Squire // Europe</span>
                  <h3>Walking with Reinhardt</h3>
                  <p>
                    After Overwatch fell, Reinhardt set out as a knight-errant, and Brigitte chose
                    to join him as his squire. She handled the upkeep of his Crusader armor, traveled
                    with him across Europe, and became the practical heart of his crusade, repairing,
                    protecting, and keeping the old hero steady when his strength began to fail.
                  </p>
                </div>
              </li>

              <li className="timeline-entry">
                <div className="timeline-node">04</div>
                <div className="timeline-card">
                  <span className="entry-period">Present Day // Overwatch</span>
                  <h3>Forging the Shield</h3>
                  <p>
                    Brigitte eventually built her own armor and weapon systems to stand beside
                    Reinhardt in battle. Stubborn, disciplined, and fiercely loyal, she fights with
                    the same protective instincts that shaped her childhood. In the return to
                    Overwatch, she proved that her engineering could be more than support; it could
                    be a shield for the whole team.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Right Column: Schematics & Personnel Dossier */}
          <aside className="intel-column" aria-labelledby="intel-title">
            <div className="section-badge">
              <span>SECTION 02</span>
              <h2 id="intel-title">Armory & Schematics</h2>
            </div>

            <div className="schematic-cards">
              <article className="schematic-item">
                <div className="schematic-header">
                  <span className="schematic-id">TRAIT-01</span>
                  <h3>Protective Instinct</h3>
                </div>
                <p>
                  Brigitte fights for the people beside her. Her engineering is shaped by the
                  belief that protection is not a passive duty, but a promise made in action.
                </p>
              </article>

              <article className="schematic-item">
                <div className="schematic-header">
                  <span className="schematic-id">TRAIT-02</span>
                  <h3>Stubborn Resolve</h3>
                </div>
                <p>
                  Inherited from her father, Brigitte is intensely determined and difficult to
                  dissuade once she commits to a cause. Her will is just as important as the armor
                  she wears.
                </p>
              </article>

              <article className="schematic-item">
                <div className="schematic-header">
                  <span className="schematic-id">TRAIT-03</span>
                  <h3>Chivalry in Practice</h3>
                </div>
                <p>
                  She carries Reinhardt's ideals forward, but makes them personal. Brigitte is not
                  only a combatant; she is a guardian, a caretaker, and a steady hand when others
                  are overwhelmed.
                </p>
              </article>
            </div>

            {/* Key Personnel Relations */}
            <div className="section-badge bonds-badge">
              <span>SECTION 03</span>
              <h2>Personnel Connections</h2>
            </div>

            <div className="relations-list">
              <div className="relation-item">
                <div className="relation-avatar">TL</div>
                <div>
                  <strong>Torbjörn Lindholm</strong>
                  <span className="relation-role">Father & Engineer</span>
                  <p>Her father shaped both her craft and her stubborn streak, teaching her to build
                  for the future while never forgetting the people she protects.</p>
                </div>
              </div>

              <div className="relation-item">
                <div className="relation-avatar">RW</div>
                <div>
                  <strong>Reinhardt Wilhelm</strong>
                  <span className="relation-role">Godfather & Mentor</span>
                  <p>Reinhardt gave her a model of honor and bravery. Brigitte chose to follow it,
                  becoming his squire, his mechanic, and his shield in battle.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Quote Manifest */}
        <blockquote className="dossier-quote-block">
          <div className="quote-icon">
            <img src={shieldIcon} alt="" />
          </div>
          <div className="quote-text">
            <p>&ldquo;I am Brigitte Lindholm and I will be their shield&rdquo;</p>
            <cite>BRIGITTE LINDHOLM // COMBAT LOG</cite>
          </div>
        </blockquote>
      </main>

      <footer className="site-footer">
        <span>LEARN BRIGITTE</span>
        <span>DOSSIER ARCHIVE // BL-07</span>
        <span>EST. 2026</span>
      </footer>
    </div>
  )
}
