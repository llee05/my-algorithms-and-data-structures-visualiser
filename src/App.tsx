import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowDownUp,
  ArrowRight,
  BarChart3,
  BookOpen,
  Braces,
  Check,
  ChevronRight,
  CircleHelp,
  Layers3,
  Lightbulb,
  Search,
  Shuffle,
  Sparkles,
} from 'lucide-react'
import { bubbleSortCode, bubbleSortSteps } from './algorithms/bubble-sort'
import { ArrayVisualiser } from './components/ArrayVisualiser'
import { CodePanel } from './components/CodePanel'
import { PlaybackControls } from './components/PlaybackControls'
import { lessons } from './data/lessons'
import { usePlayback } from './hooks/usePlayback'
import { DEFAULT_VALUES, parseArrayInput, randomArray } from './lib/input'

const categories = [
  { title: 'Sorting', icon: ArrowDownUp },
  { title: 'Searching', icon: Search },
  { title: 'Data structures', icon: Layers3 },
]

export default function App() {
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [input, setInput] = useState(DEFAULT_VALUES.join(', '))
  const [error, setError] = useState('')
  const [showGuide, setShowGuide] = useState(false)
  const steps = useMemo(() => bubbleSortSteps(values), [values])
  const playback = usePlayback(steps.length)
  const step = steps[playback.index]!

  function applyInput(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = parseArrayInput(input)
    if (result.error) {
      setError(result.error)
      return
    }
    playback.reset()
    setValues(result.values!)
    setError('')
  }

  function shuffle() {
    const next = randomArray(values.length)
    playback.reset()
    setValues(next)
    setInput(next.join(', '))
    setError('')
  }

  return (
    <div className="app-shell min-h-screen">
      <header className="topbar">
        <a
          href={import.meta.env.BASE_URL}
          className="brand"
          aria-label="Algo Studio home"
        >
          <span className="brand-mark">
            <BarChart3 size={22} strokeWidth={2.5} />
          </span>
          <span>
            algo<span className="brand-light">studio</span>
            <span className="brand-period">.</span>
          </span>
        </a>
        <span className="topbar-caption">
          A little clarity for complex ideas.
        </span>
        <button
          className={`guide-button ${showGuide ? 'guide-active' : ''}`}
          aria-expanded={showGuide}
          aria-controls="quick-guide"
          onClick={() => setShowGuide((current) => !current)}
        >
          <CircleHelp size={16} /> Quick guide
        </button>
      </header>

      <div className="workspace">
        <aside className="sidebar" aria-label="Lesson catalogue">
          <div className="sidebar-label">YOUR PLAYGROUND</div>
          <div className="library-title">
            <BookOpen size={17} /> Explore the library
          </div>
          <nav aria-label="Algorithms and data structures">
            {categories.map(({ title, icon: Icon }) => (
              <div className="lesson-group" key={title}>
                <h2>
                  <Icon size={15} />
                  {title}
                </h2>
                {lessons
                  .filter((lesson) => lesson.category === title)
                  .map((lesson) => (
                    <button
                      key={lesson.id}
                      className={`lesson-link ${lesson.available ? 'lesson-active' : ''}`}
                      disabled={!lesson.available}
                      aria-current={lesson.available ? 'page' : undefined}
                      onClick={lesson.available ? playback.reset : undefined}
                    >
                      <span>{lesson.title}</span>
                      {lesson.available ? (
                        <ChevronRight size={15} />
                      ) : (
                        <span className="soon-label">Soon</span>
                      )}
                    </button>
                  ))}
              </div>
            ))}
          </nav>
          <div className="sidebar-note">
            <span className="note-icon">
              <Braces size={19} />
            </span>
            <strong>Built to be explored.</strong>
            <p>
              This is your starting point. Add an algorithm and make it your
              own.
            </p>
            <span className="starter-label">
              EDITABLE STARTER <span>↗</span>
            </span>
          </div>
          <div className="sidebar-bottom">
            <span className="status-dot" /> One step at a time.
          </div>
        </aside>

        <main>
          <div className="breadcrumb">
            <span>Library</span>
            <ChevronRight size={12} />
            <span>Sorting</span>
            <ChevronRight size={12} />
            <strong>Bubble sort</strong>
          </div>
          <div className="page-intro">
            <div>
              <div className="eyebrow">
                <Sparkles size={13} /> LEARN BY SEEING
              </div>
              <h1>Small steps. Big understanding.</h1>
              <p>
                Turn abstract ideas into something you can see, play with, and
                understand.
              </p>
            </div>
            <span className="version-tag">
              PLAYGROUND <span>v0.1</span>
            </span>
          </div>

          {showGuide && (
            <section className="quick-guide" id="quick-guide">
              <Lightbulb size={20} />
              <div>
                <strong>Make the algorithm yours</strong>
                <p>
                  Enter 2–16 numbers from 1 to 99, then select Apply. Press Play
                  to watch, use Next step to inspect each operation, or drag the
                  timeline to revisit a frame. Purple means comparing, amber
                  means swapping, and green means sorted.
                </p>
              </div>
            </section>
          )}

          <section
            className="visualiser-card"
            aria-labelledby="algorithm-title"
          >
            <div className="visualiser-heading">
              <div className="algorithm-icon">
                <ArrowDownUp size={21} />
              </div>
              <div className="algorithm-heading-text">
                <div className="title-row">
                  <h2 id="algorithm-title">Bubble sort</h2>
                  <span className="level-badge">Beginner friendly</span>
                </div>
                <p>A simple sort. A great place to start.</p>
              </div>
              <span className="category-badge">Sorting</span>
            </div>

            <form className="input-form" onSubmit={applyInput}>
              <div className="input-label">
                <label htmlFor="array-input">Your array</label>
                <span>2–16 values · 1–99</span>
              </div>
              <div className="input-controls">
                <input
                  id="array-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="42, 18, 65, 31, 54, 12, 77, 25"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'input-error' : undefined}
                  autoComplete="off"
                />
                <button className="apply-button" type="submit">
                  Apply <ArrowRight size={14} />
                </button>
                <button
                  className="shuffle-button"
                  type="button"
                  onClick={shuffle}
                >
                  <Shuffle size={15} /> Shuffle
                </button>
              </div>
              {error && (
                <p className="input-error" role="alert" id="input-error">
                  {error}
                </p>
              )}
            </form>

            <div className="chart-topline">
              <span>
                <span
                  className={`status-dot ${step.action === 'complete' ? 'status-complete' : ''}`}
                />
                {step.action === 'complete'
                  ? 'Complete'
                  : playback.playing
                    ? 'Running'
                    : playback.atStart
                      ? 'Ready to explore'
                      : 'Paused'}
              </span>
              <div className="chart-legend">
                <span>
                  <i className="legend-comparing" />
                  Comparing
                </span>
                <span>
                  <i className="legend-swapping" />
                  Swapping
                </span>
                <span>
                  <i className="legend-sorted" />
                  Sorted
                </span>
              </div>
            </div>
            <div className="chart-container">
              <ArrayVisualiser step={step} />
            </div>
            <div className="step-explanation" role="status" aria-live="polite">
              <span
                className={`step-icon ${step.action === 'complete' ? 'step-icon-complete' : ''}`}
              >
                {step.action === 'complete' ? (
                  <Check size={16} />
                ) : (
                  <Lightbulb size={16} />
                )}
              </span>
              <p>{step.description}</p>
              <span className="step-tag">
                {step.action === 'ready'
                  ? 'LET’S BEGIN'
                  : step.action.toUpperCase()}
              </span>
            </div>
            <PlaybackControls playback={playback} frameCount={steps.length} />
          </section>

          <div className="detail-grid">
            <section className="about-card" aria-labelledby="about-title">
              <h3 id="about-title">
                <BookOpen size={16} /> The idea behind it
              </h3>
              <p>
                Compare two neighbours. If they’re in the wrong order, swap
                them. Repeat, and the largest values “bubble” to the end of the
                array.
              </p>
              <div className="complexity-grid">
                <div>
                  <span>TIME · AVERAGE / WORST</span>
                  <strong>O(n²)</strong>
                </div>
                <div>
                  <span>EXTRA SPACE</span>
                  <strong>O(1)</strong>
                </div>
              </div>
              <p className="complexity-note">
                For the in-place algorithm. This demo stores snapshots for
                playback. The displayed function copies the input, using O(n)
                space.
              </p>
              <div className="metrics tabular-nums">
                <div>
                  <strong data-testid="comparison-count">
                    {step.comparisons}
                  </strong>
                  <span>comparisons</span>
                </div>
                <div>
                  <strong data-testid="swap-count">{step.swaps}</strong>
                  <span>swaps</span>
                </div>
                <div>
                  <strong>{values.length}</strong>
                  <span>elements</span>
                </div>
              </div>
              <div className="learning-tip">
                <Lightbulb size={17} />
                <p>
                  <strong>Try this:</strong> enter an already sorted array. With
                  no swaps in a pass, bubble sort can finish early.
                </p>
              </div>
            </section>
            <CodePanel code={bubbleSortCode} activeLine={step.codeLine} />
          </div>
          <footer className="page-footer">
            <span>Curiosity is the best place to start.</span>
            <span>
              React + TypeScript <span className="footer-dot">·</span> Made for
              learning
            </span>
          </footer>
        </main>
      </div>
    </div>
  )
}
