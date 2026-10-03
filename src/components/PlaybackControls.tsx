import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react'
import type { usePlayback } from '../hooks/usePlayback'

interface PlaybackControlsProps {
  playback: ReturnType<typeof usePlayback>
  frameCount: number
}

export function PlaybackControls({
  playback,
  frameCount,
}: PlaybackControlsProps) {
  return (
    <div className="playback-controls">
      <div className="playback-buttons">
        <button
          className="icon-button"
          aria-label="Reset visualisation"
          onClick={playback.reset}
          title="Reset"
        >
          <RotateCcw size={17} />
        </button>
        <span className="control-divider" />
        <button
          className="icon-button"
          aria-label="Previous step"
          disabled={playback.atStart}
          onClick={() => playback.seek(playback.index - 1)}
          title="Previous step"
        >
          <SkipBack size={18} />
        </button>
        <button className="play-button" onClick={playback.toggle}>
          {playback.playing ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Play size={16} fill="currentColor" />
          )}
          {playback.playing ? 'Pause' : playback.atEnd ? 'Replay' : 'Play'}
        </button>
        <button
          className="icon-button"
          aria-label="Next step"
          disabled={playback.atEnd}
          onClick={() => playback.seek(playback.index + 1)}
          title="Next step"
        >
          <SkipForward size={18} />
        </button>
      </div>
      <label className="speed-control">
        Speed
        <select
          aria-label="Playback speed"
          value={playback.speed}
          onChange={(event) => playback.setSpeed(Number(event.target.value))}
        >
          <option value={0.5}>0.5×</option>
          <option value={1}>1×</option>
          <option value={2}>2×</option>
          <option value={4}>4×</option>
        </select>
      </label>
      <div className="timeline-control">
        <input
          type="range"
          aria-label="Execution step"
          min={0}
          max={frameCount - 1}
          value={playback.index}
          onChange={(event) => playback.seek(Number(event.target.value))}
        />
        <span data-testid="step-counter">
          {playback.index + 1} <span>/ {frameCount}</span>
        </span>
      </div>
    </div>
  )
}
