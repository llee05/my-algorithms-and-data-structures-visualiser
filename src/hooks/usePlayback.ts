import { useEffect, useState } from 'react'

/** Controls frame playback independently of the algorithm that creates the frames. */
export function usePlayback(frameCount: number) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const atStart = index === 0
  const atEnd = index === frameCount - 1

  useEffect(() => {
    if (!playing) return

    const timer = window.setTimeout(() => {
      if (index >= frameCount - 2) setPlaying(false)
      setIndex((current) => Math.min(current + 1, frameCount - 1))
    }, 700 / speed)

    return () => window.clearTimeout(timer)
  }, [playing, index, frameCount, speed])

  function reset() {
    setPlaying(false)
    setIndex(0)
  }

  function seek(next: number) {
    setPlaying(false)
    setIndex(Math.max(0, Math.min(next, frameCount - 1)))
  }

  function toggle() {
    if (atEnd) setIndex(0)
    setPlaying((current) => !current)
  }

  return {
    index,
    playing,
    speed,
    atStart,
    atEnd,
    reset,
    seek,
    toggle,
    setSpeed,
  }
}
