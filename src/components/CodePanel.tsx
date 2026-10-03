import { useEffect, useState } from 'react'
import { Code2 } from 'lucide-react'
import type { ThemedToken } from 'shiki'
import { highlighter } from '../lib/highlighter'

interface CodePanelProps {
  code: string
  activeLine: number | null
}

export function CodePanel({ code, activeLine }: CodePanelProps) {
  const [tokens, setTokens] = useState<ThemedToken[][] | null>(null)

  useEffect(() => {
    let cancelled = false
    highlighter
      .then((instance) => {
        const result = instance.codeToTokens(code, {
          lang: 'typescript',
          theme: 'github-dark',
        })
        if (!cancelled) setTokens(result.tokens)
      })
      .catch(() => {
        // The plain-text version remains readable if highlighting cannot load.
      })
    return () => {
      cancelled = true
    }
  }, [code])

  return (
    <section className="code-panel" aria-labelledby="code-title">
      <div className="code-header">
        <h3 id="code-title">
          <Code2 size={16} aria-hidden="true" /> Under the hood
        </h3>
        <span>TypeScript</span>
      </div>
      <div className="code-scroll">
        <pre aria-label="Bubble sort source code">
          <code>
            {code.split('\n').map((line, index) => (
              <span
                key={index}
                className={`code-line ${activeLine === index + 1 ? 'code-line-active' : ''}`}
                aria-current={activeLine === index + 1 ? 'step' : undefined}
              >
                <span className="line-number" aria-hidden="true">
                  {index + 1}
                </span>
                <span>
                  {tokens?.[index]?.map((token, tokenIndex) => (
                    <span key={tokenIndex} style={{ color: token.color }}>
                      {token.content}
                    </span>
                  )) ?? line}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>
      <div className="code-footer">
        <span className="code-dot" /> Follow the highlighted line as you step
        through.
      </div>
    </section>
  )
}
