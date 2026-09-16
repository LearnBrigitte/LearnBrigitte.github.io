// Shared audio playback helper so only one clip plays site-wide at a time.
let currentAudio = null

export function stopCurrentAudio() {
  if (!currentAudio) return

  currentAudio.pause()
  currentAudio.currentTime = 0
  currentAudio = null
}

// Stops whatever is currently playing, then plays the given clip.
export function playAudioExclusive(src, volume = 1) {
  stopCurrentAudio()

  const audio = new Audio(src)
  audio.volume = volume
  audio.play().catch(() => {})
  currentAudio = audio

  return audio
}
