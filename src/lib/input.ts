export const DEFAULT_VALUES = [42, 18, 65, 31, 54, 12, 77, 25]
export const MAX_VALUES = 16

export type InputResult =
  { values: number[]; error?: never } | { error: string; values?: never }

/** Keep visualisation inputs small and bounded; other lessons can use their own parser. */
export function parseArrayInput(input: string): InputResult {
  const parts = input
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean)

  if (parts.length < 2 || parts.length > MAX_VALUES) {
    return {
      error: `Enter between 2 and ${MAX_VALUES} numbers, separated by commas or spaces.`,
    }
  }

  const values = parts.map(Number)
  if (
    values.some((value) => !Number.isInteger(value) || value < 1 || value > 99)
  ) {
    return { error: 'Use whole numbers from 1 to 99.' }
  }

  return { values }
}

export function randomArray(length = 8): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * 99) + 1)
}
