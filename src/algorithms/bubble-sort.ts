import type { SortingStep } from './types'

export const bubbleSortCode = `function bubbleSort(values: number[]) {
  const array = [...values];
  for (let end = array.length - 1; end > 0; end--) {
    let swapped = false;
    for (let i = 0; i < end; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return array;
}`

/** Pure algorithm: no timers or UI dependencies, and the input is never mutated. */
export function bubbleSortSteps(input: readonly number[]): SortingStep[] {
  const values = [...input]
  const steps: SortingStep[] = []
  const sorted: number[] = []
  let comparisons = 0
  let swaps = 0

  function record(
    action: SortingStep['action'],
    description: string,
    codeLine: number | null,
    comparing: number[] = [],
  ) {
    steps.push({
      values: [...values],
      comparing: [...comparing],
      sorted: [...sorted],
      action,
      description,
      codeLine,
      comparisons,
      swaps,
    })
  }

  record(
    'ready',
    'Ready when you are. Play the animation or move through one step at a time.',
    null,
  )

  for (let end = values.length - 1; end > 0; end--) {
    let swapped = false

    for (let i = 0; i < end; i++) {
      const left = values[i]!
      const right = values[i + 1]!
      comparisons++
      record(
        'compare',
        `Compare ${left} and ${right}. Is the left value larger?`,
        6,
        [i, i + 1],
      )

      if (left > right) {
        values[i] = right
        values[i + 1] = left
        swapped = true
        swaps++
        record(
          'swap',
          `Swap ${left} and ${right} to put the smaller value first.`,
          7,
          [i, i + 1],
        )
      }
    }

    sorted.push(end)
    record('settle', `${values[end]} is now in its final position.`, 3)

    if (!swapped) break
  }

  for (let i = 0; i < values.length; i++) {
    if (!sorted.includes(i)) sorted.push(i)
  }
  record('complete', 'All sorted! Every value is now in ascending order.', 13)
  return steps
}
