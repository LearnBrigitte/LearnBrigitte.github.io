// Formats a snake_case stat key into a readable label, e.g. "health_regen" -> "Health Regen".
export function formatStatKey(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

// Renders a stat value, splitting comma-separated strings onto their own lines with commas removed.
export function renderMetricValue(value) {
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

// Builds the DOM id used to scroll/highlight a glossary entry from a property tag name.
export function tagAnchorId(tagName) {
  return `tag-${tagName.replace(/\s+/g, '-').toLowerCase()}`
}

export const IGNORED_STAT_KEYS = ['name', 'type', 'description', 'tags']
