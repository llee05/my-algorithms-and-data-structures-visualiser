import { scaleBand, scaleLinear } from 'd3-scale'
import type { SortingStep } from '../algorithms/types'

interface ArrayVisualiserProps {
  step: SortingStep
}

export function ArrayVisualiser({ step }: ArrayVisualiserProps) {
  const width = 760
  const baseline = 244
  const x = scaleBand<number>()
    .domain(step.values.map((_, index) => index))
    .range([30, width - 30])
    .padding(0.23)
  const height = scaleLinear().domain([0, 100]).range([0, 190])

  return (
    <svg
      className="array-chart"
      viewBox={`0 0 ${width} 294`}
      role="img"
      aria-labelledby="chart-title chart-description"
    >
      <title id="chart-title">Bubble sort array visualisation</title>
      <desc id="chart-description">
        Values: {step.values.join(', ')}. {step.description}
      </desc>
      {[54, 102, 150, 198].map((y) => (
        <line
          key={y}
          x1="24"
          y1={y}
          x2={width - 24}
          y2={y}
          className="chart-grid"
        />
      ))}
      <line
        x1="24"
        y1={baseline}
        x2={width - 24}
        y2={baseline}
        className="chart-baseline"
      />
      {step.values.map((value, index) => {
        const state = step.sorted.includes(index)
          ? 'sorted'
          : step.comparing.includes(index)
            ? step.action === 'swap'
              ? 'swapping'
              : 'comparing'
            : 'idle'
        const barHeight = height(value)
        const barX = x(index)!

        return (
          <g
            key={index}
            className={`array-bar bar-${state}`}
            data-testid="array-bar"
            data-value={value}
          >
            <rect
              x={barX}
              y={baseline - barHeight}
              width={x.bandwidth()}
              height={barHeight}
              rx="7"
            />
            <text
              x={barX + x.bandwidth() / 2}
              y={baseline - barHeight - 12}
              className="bar-value"
            >
              {value}
            </text>
            <text
              x={barX + x.bandwidth() / 2}
              y={baseline + 28}
              className="bar-index"
            >
              {index}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
