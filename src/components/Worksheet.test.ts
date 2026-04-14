import { describe, it, expect } from 'vitest'
import { splitIntoRows } from './Worksheet.tsx'

describe('splitIntoRows', () => {
  it('splits a single word into one row of characters', () => {
    expect(splitIntoRows('ABC')).toEqual([['A', 'B', 'C']])
  })

  it('splits two space-separated words into two rows', () => {
    expect(splitIntoRows('AB CD')).toEqual([['A', 'B'], ['C', 'D']])
  })

  it('collapses multiple consecutive spaces (each non-empty token → one row)', () => {
    expect(splitIntoRows('AB  CD')).toEqual([['A', 'B'], ['C', 'D']])
  })

  it('ignores leading and trailing spaces', () => {
    expect(splitIntoRows(' AB ')).toEqual([['A', 'B']])
  })

  it('returns an empty array for an empty string', () => {
    expect(splitIntoRows('')).toEqual([])
  })

  it('returns an empty array for a string of only spaces', () => {
    expect(splitIntoRows('   ')).toEqual([])
  })

  it('handles a single character', () => {
    expect(splitIntoRows('A')).toEqual([['A']])
  })

  it('preserves digit characters', () => {
    expect(splitIntoRows('12 34')).toEqual([['1', '2'], ['3', '4']])
  })
})
