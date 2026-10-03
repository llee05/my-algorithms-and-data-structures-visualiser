import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

// Load only the language and theme we use, and share one instance across renders.
export const highlighter = createHighlighterCore({
  themes: [import('shiki/themes/github-dark.mjs')],
  langs: [import('shiki/langs/typescript.mjs')],
  engine: createJavaScriptRegexEngine(),
})
