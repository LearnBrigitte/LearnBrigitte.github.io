import placeholderIcon from '../../Assets/Images/Hero_Icons/placeholder-icon.svg'

// Slugifies a hero name into a URL-safe path segment.
function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Strips accents/punctuation/spacing so names can be matched regardless of formatting differences.
function normalizeKey(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

// Eagerly loads every uploaded hero icon (e.g. Assets/Images/Hero_Icons/Tanks/Icon-Reinhardt.webp).
const heroIconModules = import.meta.glob(
  '../../Assets/Images/Hero_Icons/*/*.{webp,png,svg}',
  { eager: true, import: 'default' }
)

// Maps a normalized hero name -> icon url, built from each file's "Icon-<Name>.<ext>" filename.
const heroIconsByName = Object.entries(heroIconModules).reduce((map, [path, url]) => {
  const fileName = path.split('/').pop()
  const nameMatch = fileName.match(/^Icon-(.+)\.[^.]+$/)
  if (nameMatch) {
    map[normalizeKey(nameMatch[1])] = url
  }
  return map
}, {})

function getHeroIcon(name) {
  return heroIconsByName[normalizeKey(name)] || placeholderIcon
}

function buildRoster(role, names) {
  return names.map((name) => ({
    name,
    slug: slugify(name),
    role,
    icon: getHeroIcon(name),
    path: `/intermediate/${role}/${slugify(name)}`,
  }))
}

export const TANKS = buildRoster('tanks', [
  'D.Mon',
  'D.Va',
  'Doomfist',
  'Domina',
  'Hazard',
  'Junker Queen',
  'Mauga',
  // 'Orisa',
  'Ramattra',
  'Reinhardt',
  'Roadhog',
  'Sigma',
  'Winston',
  'Wrecking Ball',
  'Zarya',
])

export const DPS = buildRoster('dps', [
  'Anran',
  'Ashe',
  'Bastion',
  'Cassidy',
  'Echo',
  // 'Emre',
  // 'Freja',
  'Genji',
  'Hanzo',
  'Junkrat',
  // 'Mei',
  // 'Pharah',
  'Reaper',
  'Shion',
  'Sierra',
  'Soldier: 76',
  // 'Sojourn',
  'Sombra',
  // 'Symmetra',
  // 'Torbjörn',
  'Tracer',
  'Vendetta',
  'Venture',
  // 'Widowmaker',
])

export const SUPPORTS = buildRoster('supports', [
  'Ana',
  // 'Baptiste',
  'Brigitte',
  // 'Illari',
  'Jetpack Cat',
  // 'Juno',
  // 'Kiriko',
  // 'Lifeweaver',
  'Lúcio',
  'Mercy',
  // 'Mizuki',
  'Moira',
  'Wuyang',
  'Zenyatta',
])

export const ROLE_LABELS = {
  tanks: 'Tank',
  dps: 'DPS',
  supports: 'Support',
}

export const ROSTER_BY_ROLE = {
  tanks: TANKS,
  dps: DPS,
  supports: SUPPORTS,
}
