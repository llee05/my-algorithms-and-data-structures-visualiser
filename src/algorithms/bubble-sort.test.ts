import { describe, expect, it } from 'vitest'
import { bubbleSortSteps } from './bubble-sort'

describe('bubbleSortSteps', () => {
  it.each([
    [42, 18, 65, 31, 54, 12, 77, 25],
    [5, 4, 3, 2, 1],
    [1, 2, 3, 4, 5],
    [3, 1, 3, 2, 1],
    [1],
    [],
  ])('sorts %j without mutating the input', (...input) => {
    const original = [...input]
    const frames = bubbleSortSteps(input)
    const final = frames.at(-1)!

    expect(final.values).toEqual([...original].sort((a, b) => a - b))
    expect(final.action).toBe('complete')
    expect([...final.sorted].sort((a, b) => a - b)).toEqual(
      original.map((_, index) => index),
    )
    expect(input).toEqual(original)
  })

  it('records comparisons before swaps and preserves previous snapshots', () => {
    const frames = bubbleSortSteps([3, 1, 2])
    const comparison = frames[1]!
    const swap = frames[2]!

    expect(comparison).toMatchObject({
      action: 'compare',
      values: [3, 1, 2],
      comparisons: 1,
      swaps: 0,
      comparing: [0, 1],
    })
    expect(swap).toMatchObject({
      action: 'swap',
      values: [1, 3, 2],
      comparisons: 1,
      swaps: 1,
    })
    expect(frames.at(-1)).toMatchObject({ comparisons: 3, swaps: 2 })
    expect(frames[0]!.values).toEqual([3, 1, 2])
    expect(frames[0]!.sorted).toEqual([])
    expect(comparison.values).not.toBe(swap.values)
  })

  it('stops after one pass for an already sorted array', () => {
    const final = bubbleSortSteps([1, 2, 3, 4]).at(-1)!
    expect(final.comparisons).toBe(3)
    expect(final.swaps).toBe(0)
    expect(final.sorted).toHaveLength(4)
  })
})
