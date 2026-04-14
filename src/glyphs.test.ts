import { describe, it, expect } from 'vitest'
import { GLYPHS, GLYPH_ENDPOINTS } from './glyphs.ts'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const DIGITS  = '0123456789'.split('')
const ALL_CHARS = [...LETTERS, ...DIGITS]

describe('GLYPHS', () => {
  it('has an entry for every uppercase letter A–Z', () => {
    for (const ch of LETTERS) {
      expect(GLYPHS, `missing GLYPHS['${ch}']`).toHaveProperty(ch)
    }
  })

  it('has an entry for every digit 0–9', () => {
    for (const ch of DIGITS) {
      expect(GLYPHS, `missing GLYPHS['${ch}']`).toHaveProperty(ch)
    }
  })

  it('each path is a non-empty string starting with the SVG move command', () => {
    for (const ch of ALL_CHARS) {
      const d = GLYPHS[ch]
      expect(typeof d, `GLYPHS['${ch}'] should be a string`).toBe('string')
      expect(d.length, `GLYPHS['${ch}'] should be non-empty`).toBeGreaterThan(0)
      expect(d, `GLYPHS['${ch}'] should start with 'M '`).toMatch(/^M /)
    }
  })

  it('coordinates are within the 0–100 normalised viewBox', () => {
    const numRe = /[-\d.]+/g
    for (const ch of ALL_CHARS) {
      const nums = GLYPHS[ch].match(numRe)!.map(Number)
      for (const n of nums) {
        expect(n, `GLYPHS['${ch}'] has coordinate ${n} outside 0–100`).toBeGreaterThanOrEqual(0)
        expect(n, `GLYPHS['${ch}'] has coordinate ${n} outside 0–100`).toBeLessThanOrEqual(100)
      }
    }
  })
})

describe('GLYPH_ENDPOINTS', () => {
  it('has an entry for every uppercase letter A–Z', () => {
    for (const ch of LETTERS) {
      expect(GLYPH_ENDPOINTS, `missing GLYPH_ENDPOINTS['${ch}']`).toHaveProperty(ch)
    }
  })

  it('has an entry for every digit 0–9', () => {
    for (const ch of DIGITS) {
      expect(GLYPH_ENDPOINTS, `missing GLYPH_ENDPOINTS['${ch}']`).toHaveProperty(ch)
    }
  })

  it('each entry is a non-empty array', () => {
    for (const ch of ALL_CHARS) {
      const pts = GLYPH_ENDPOINTS[ch]
      expect(Array.isArray(pts), `GLYPH_ENDPOINTS['${ch}'] should be an array`).toBe(true)
      expect(pts.length, `GLYPH_ENDPOINTS['${ch}'] should have at least one point`).toBeGreaterThan(0)
    }
  })

  it('every endpoint has cx and cy as finite numeric strings', () => {
    for (const ch of ALL_CHARS) {
      for (const { cx, cy } of GLYPH_ENDPOINTS[ch]) {
        expect(typeof cx, `GLYPH_ENDPOINTS['${ch}'].cx should be string`).toBe('string')
        expect(typeof cy, `GLYPH_ENDPOINTS['${ch}'].cy should be string`).toBe('string')
        expect(Number.isFinite(Number(cx)), `GLYPH_ENDPOINTS['${ch}'].cx='${cx}' should be numeric`).toBe(true)
        expect(Number.isFinite(Number(cy)), `GLYPH_ENDPOINTS['${ch}'].cy='${cy}' should be numeric`).toBe(true)
      }
    }
  })

  it('endpoint count matches the number of stroke endpoints in the path', () => {
    // Each SVG path segment (M x,y) or line terminus contributes an endpoint.
    // GLYPH_ENDPOINTS should have exactly 2 points per stroke (start + end).
    for (const ch of ALL_CHARS) {
      const strokeCount = (GLYPHS[ch].match(/M /g) || []).length
      expect(
        GLYPH_ENDPOINTS[ch].length,
        `GLYPH_ENDPOINTS['${ch}'] should have 2 × ${strokeCount} endpoints`
      ).toBe(strokeCount * 2)
    }
  })
})
