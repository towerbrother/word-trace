import { describe, it, expect } from 'vitest'
import { sanitise } from './ConfigPanel.tsx'

describe('sanitise', () => {
  it('upcases lowercase letters', () => {
    expect(sanitise('hello')).toBe('HELLO')
  })

  it('keeps uppercase letters unchanged', () => {
    expect(sanitise('HELLO')).toBe('HELLO')
  })

  it('keeps digits unchanged', () => {
    expect(sanitise('123')).toBe('123')
  })

  it('preserves spaces', () => {
    expect(sanitise('AB CD')).toBe('AB CD')
  })

  it('drops punctuation and symbols', () => {
    expect(sanitise('H@llo!')).toBe('HLLO')
  })

  it('drops accented and non-ASCII characters', () => {
    expect(sanitise('Café')).toBe('CAF')
  })

  it('returns empty string for empty input', () => {
    expect(sanitise('')).toBe('')
  })

  it('returns empty string when all characters are dropped', () => {
    expect(sanitise('!!!')).toBe('')
  })

  it('handles mixed alphanumeric, spaces, and symbols', () => {
    expect(sanitise('hello world 123!')).toBe('HELLO WORLD 123')
  })

  it('preserves multiple consecutive spaces', () => {
    expect(sanitise('A  B')).toBe('A  B')
  })
})
