/** Each frame is an immutable snapshot, so playback can move in either direction. */
export interface SortingStep {
  values: number[]
  comparing: number[]
  sorted: number[]
  action: 'ready' | 'compare' | 'swap' | 'settle' | 'complete'
  description: string
  codeLine: number | null
  comparisons: number
  swaps: number
}
