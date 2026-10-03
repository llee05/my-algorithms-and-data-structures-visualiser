# Algo Studio

An editable algorithms and data structures visualiser starter. The bubble-sort lesson works end to end; the other catalogue entries are labelled **Soon** so you can grow the project one lesson at a time.

## Start locally

Use Node.js **24** and npm. Node 22.13+ and 26+ are also supported. `.nvmrc` selects Node 24 if you use nvm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Dependencies are already installed in the initial workspace; `npm ci` is for a fresh checkout.

## Stack

| Layer          | Included                                                        |
| -------------- | --------------------------------------------------------------- |
| Language       | TypeScript, strict checking                                     |
| UI             | React 19                                                        |
| Build          | Vite 8                                                          |
| Styling        | Tailwind CSS 4 via its Vite plugin, plus editable component CSS |
| Visualisation  | React-rendered SVG with D3 scales (`d3-scale`)                  |
| Animation      | CSS transitions, with reduced-motion support                    |
| State          | React state and a reusable playback hook                        |
| Code display   | Shiki, loading only TypeScript and one theme                    |
| Unit testing   | Vitest                                                          |
| UI/E2E testing | Playwright, Chromium                                            |
| Code quality   | ESLint and Prettier                                             |
| CI/CD          | GitHub Actions CI and a manual GitHub Pages deployment workflow |
| Deployment     | GitHub Pages or Vercel                                          |

Zustand is intentionally deferred until shared state becomes complex. Motion can be added when CSS transitions no longer cover your animations.

## What works

- Bubble sort with immutable execution snapshots, comparisons, swaps, and a sorted result.
- Play, pause, replay, reset, previous/next step, timeline seeking, and playback speed.
- Editable arrays of 2–16 integers between 1 and 99, with validation and shuffle.
- SVG bar colours showing comparisons, swaps, and sorted positions.
- TypeScript code highlighting that follows the current execution step.
- Comparison/swap counters, a quick guide, and a responsive layout.

## Where to edit

```text
src/
  algorithms/
    types.ts                 # The sorting frame contract
    bubble-sort.ts           # Pure algorithm and displayed source code
    bubble-sort.test.ts      # Algorithm correctness tests
  components/
    ArrayVisualiser.tsx      # SVG rendering and D3 scales
    CodePanel.tsx            # Shiki tokens and active code line
    PlaybackControls.tsx     # Playback buttons, speed, timeline
  data/
    lessons.ts               # Catalogue entries and availability
  hooks/
    usePlayback.ts           # Playback timing and React state
  lib/
    highlighter.ts           # Shared Shiki instance
    input.ts                 # Array defaults and input validation
    input.test.ts            # Input validation tests
  App.tsx                    # Page layout and lesson wiring
  styles.css                 # Tailwind import, theme, and component styles
  main.tsx                   # React entry point
tests/e2e/
  visualiser.spec.ts          # Controls and browser interaction tests
.github/workflows/
  ci.yml                     # Format, lint, tests, build, browser checks
  deploy-pages.yml           # Manual GitHub Pages publish
```

To add another sorting algorithm:

1. Create a pure function under `src/algorithms/` that returns `SortingStep[]`, and add correctness tests beside it.
2. Add its displayed code, explanation, and complexity information.
3. Extend `App.tsx` with selected-lesson state and wire the lesson's frames and metadata to the existing components. The initial page is deliberately wired to bubble sort.
4. Mark its entry in `src/data/lessons.ts` as available after its UI is connected.

For stacks, trees, or graphs, define an appropriate frame type and SVG renderer; the playback hook only needs a frame count, so it can be reused. Let React own the SVG elements and use D3 for scales or layouts.

The in-place bubble-sort algorithm uses O(1) auxiliary space. The displayed function makes an O(n) input copy; the visualiser additionally stores snapshots for backwards playback. This starter bounds input size to keep playback storage manageable.

## Commands and checks

```bash
npm run typecheck       # Check app, tool configs, and browser-test types
npm run lint
npm run format         # Format the editable source and configs
npm run format:check
npm test               # Unit tests once
npm run test:watch      # Unit tests during development
npm run build          # Type-check and build into dist/
npm run preview        # Preview the production build locally

npx playwright install chromium  # One-time browser download
npm run test:e2e
npm run test:e2e:ui
```

On Linux, Playwright may also need system dependencies; use `npx playwright install --with-deps chromium` on a supported distribution. CI installs those on Ubuntu automatically.

## Deployment when ready

Nothing is published by creating this starter. Git is initialised locally on `main`; creating a remote and committing/pushing are separate steps.

**GitHub Pages:** push the project to GitHub, then choose **Settings → Pages → Source → GitHub Actions**. Run **Deploy to GitHub Pages** from the Actions tab. It defaults to `/repository-name/`; enter `/` in its optional base-path field for a user site or custom domain. To enable automatic publishing later, add a `push` trigger for `main` to that workflow. See the [Vite deployment guide](https://vite.dev/guide/static-deploy#github-pages).

**Vercel:** import the Git repository as a Vite project. `vercel.json` uses `npm run build` and `dist`. Leave `VITE_BASE_PATH` unset or set it to `/`. See [Vercel's Vite documentation](https://vercel.com/docs/frameworks/frontend/vite).

For local testing of a subpath, copy `.env.example` to `.env.local`, change `VITE_BASE_PATH`, and restart Vite. All `VITE_` environment variables are public browser configuration; keep secrets out of them.

## Setup references

- [Vite 8 and its Node requirements](https://vite.dev/blog/announcing-vite8)
- [Tailwind's Vite integration](https://tailwindcss.com/docs/installation/using-vite)
- [Shiki's fine-grained bundles](https://shiki.style/guide/bundles)
- [Playwright web-server configuration](https://playwright.dev/docs/test-webserver)
