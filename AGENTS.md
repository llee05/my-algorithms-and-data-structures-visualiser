# Repository guidance

These instructions apply throughout this repository. Follow any more specific `AGENTS.md` in the directory you are editing.

## Project

Algo Studio is an editable algorithms and data structures visualiser for learning. Bubble sort is the first working lesson; other catalogue entries are extension points labelled **Soon**. Keep explanations accurate and the code easy to understand and extend.

The stack is TypeScript, React 19, Vite 8, Tailwind CSS 4, React-rendered SVG with D3 scales, CSS transitions, Shiki, Vitest, and Playwright. Use React state initially. Add Zustand or Motion only when the feature warrants it.

Use npm and the committed `package-lock.json`. `.nvmrc` selects Node 24. Read `README.md` and `package.json` before changing setup or tooling.

## Where code belongs

- `src/algorithms/`: pure algorithms, execution frame types, displayed source code, and algorithm unit tests.
- `src/components/`: visualisers, playback controls, code display, and reusable UI.
- `src/hooks/`: React behaviour, including the reusable playback hook.
- `src/data/`: lesson catalogue and metadata.
- `src/lib/`: input validation, shared utilities, and Shiki configuration.
- `src/App.tsx`: page composition and lesson selection/wiring.
- `src/styles.css`: Tailwind integration, theme, component styles, and responsive layouts.
- `tests/e2e/`: Playwright tests for user interactions.
- `.github/workflows/`: CI and the manual GitHub Pages deployment workflow.

## Implementation

- Keep algorithms independent of React, browser APIs, animation, and timers. Return immutable execution snapshots and never mutate caller inputs or earlier frames.
- Reuse `SortingStep` for compatible sorting lessons. Define appropriate frame types for other data structures; keep playback independent of the frame contents.
- Let React own SVG elements. Use D3 for scales, calculations, and layouts rather than direct DOM mutation.
- Keep playback timing and cleanup in hooks. New input or a new lesson must reset playback; preserve pause, backwards stepping, replay, and timeline seeking.
- Keep displayed code, highlighted line numbers, descriptions, counters, and visual states consistent with the actual algorithm.
- Explain time and space complexity accurately, including input copies and storage used for playback snapshots.
- Validate inputs before generating frames. Keep input sizes bounded so computation, snapshot storage, and rendering remain manageable.
- Enable a catalogue entry only after its algorithm and controls are connected. Label unfinished lessons clearly.
- Use strict TypeScript, clear types, and small, focused functions and components. Follow the existing ESLint and Prettier configuration.
- Keep controls keyboard accessible, label inputs and icon buttons, report validation errors, support mobile layouts, and respect reduced-motion preferences.
- Load only the Shiki languages and themes needed. Reuse the shared highlighter.
- Prefer existing dependencies. Update `package-lock.json` with dependency changes, and update `README.md` when commands or architecture change.

## Verification

Choose checks appropriate to the change:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run format:check
```

For controls, playback, or visualiser interaction changes, also run `npm run test:e2e`. Install Chromium with `npx playwright install chromium` if needed. Check the affected layout at desktop and mobile sizes.

Add meaningful correctness tests when implementing or changing algorithms. Cover representative inputs, duplicates, already sorted values, boundary cases, input immutability, and relevant frame/counter behaviour. Use browser tests for user-facing interactions rather than duplicating implementation details.

For documentation-only changes, check formatting of the changed Markdown; an application build or browser test run is unnecessary. Report checks actually run and any unresolved failures.

Keep generated output, browser reports, `node_modules`, and local environment files out of commits. Preserve `VITE_BASE_PATH` support for root hosting and GitHub Pages repository subpaths.

## Git workflow

- Break each task into suitable smaller commits.
- Keep each commit focused on one coherent change, with related tests and documentation included where appropriate.
- Never attribute AI in commit messages.
- Do not include AI tool credits, generated-by notices, or AI co-author trailers in commit subjects or bodies.
- Write concise commit subjects describing the concrete change and its purpose.
- Inspect the diff before committing and stage only files belonging to the current task. Preserve unrelated user changes.
- Avoid rewriting existing history unless the user requests it.
