import { describe, expect, it } from 'vitest'
import { parseArrayInput } from './input'

describe('parseArrayInput', () => {
  it('accepts comma or space separated integers and duplicate values', () => {
    expect(parseArrayInput(' 3, 1  3, 99 ')).toEqual({ values: [3, 1, 3, 99] })
  })

  it.each([
    '',
    '1',
    '1, 0',
    '1, 100',
    '1, -2',
    '1, 2.5',
    '1, abc',
    '1, Infinity',
    Array(17).fill('1').join(','),
  ])('rejects invalid input: %s', (input) => {
    expect(parseArrayInput(input)).toHaveProperty('error')
  })
})
