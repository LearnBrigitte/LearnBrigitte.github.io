// Strips accents/punctuation so hero names can be matched regardless of formatting differences.
function normalizeKey(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

// Eagerly loads tip files, e.g. Assets/Matchups/Tank/D.Mon.txt, one tip per line.
const tipModules = import.meta.glob('../../Assets/Matchups/tips/*/*.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
})

// Eagerly loads matchup demo clips tied to a specific tip via a numeric suffix, e.g.
// Assets/Matchups/videos/Tank/D.Mon/D.Mon_1.mp4 pairs with the first tip in D.Mon.txt.
const videoModules = import.meta.glob('../../Assets/Matchups/videos/*/*/*_*.{mp4,webm}', {
  eager: true,
  import: 'default',
})

const tipsByHero = Object.entries(tipModules).reduce((map, [path, raw]) => {
  const fileName = path.split('/').pop().replace(/\.[^.]+$/, '')
  const tips = raw
    .split('\n')
    .map((line) => line.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean)
  map[normalizeKey(fileName)] = tips
  return map
}, {})

// Maps hero key -> { tipNumber: videoSrc }, tipNumber being the 1-based line number of the tip.
const videosByHero = Object.entries(videoModules).reduce((map, [path, src]) => {
  const fileName = path.split('/').pop().replace(/\.[^.]+$/, '')
  const match = fileName.match(/^(.+)_(\d+)$/)
  if (!match) return map
  const [, heroName, tipNumber] = match
  const key = normalizeKey(heroName)
  if (!map[key]) map[key] = {}
  map[key][Number(tipNumber)] = src
  return map
}, {})

export function getMatchupGuide(heroName) {
  const key = normalizeKey(heroName)
  const tips = tipsByHero[key] || []
  const videos = videosByHero[key] || {}
  return {
    tips: tips.map((text, index) => ({ text, video: videos[index + 1] })),
  }
}
