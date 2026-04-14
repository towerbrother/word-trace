import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getDashArray } from './GlyphCell.tsx'
import GlyphCell from './GlyphCell.tsx'

// ─── getDashArray (pure function) ───────────────────────────────────────────

describe('getDashArray', () => {
  it('returns dense dashes at difficulty 1 (easiest)', () => {
    expect(getDashArray(1)).toBe('8.0 2.0')
  })

  it('returns sparse dashes at difficulty 10 (hardest)', () => {
    expect(getDashArray(10)).toBe('2.0 12.0')
  })

  it('returns intermediate values between boundaries', () => {
    const [dash, gap] = getDashArray(5).split(' ').map(Number)
    expect(dash).toBeGreaterThan(2)
    expect(dash).toBeLessThan(8)
    expect(gap).toBeGreaterThan(2)
    expect(gap).toBeLessThan(12)
  })

  it('formats every value to exactly one decimal place', () => {
    for (let d = 1; d <= 10; d++) {
      expect(getDashArray(d)).toMatch(/^\d+\.\d \d+\.\d$/)
    }
  })

  it('dash decreases monotonically as difficulty increases', () => {
    const dashes = Array.from({ length: 10 }, (_, i) => Number(getDashArray(i + 1).split(' ')[0]))
    for (let i = 1; i < dashes.length; i++) {
      expect(dashes[i]).toBeLessThanOrEqual(dashes[i - 1])
    }
  })

  it('gap increases monotonically as difficulty increases', () => {
    const gaps = Array.from({ length: 10 }, (_, i) => Number(getDashArray(i + 1).split(' ')[1]))
    for (let i = 1; i < gaps.length; i++) {
      expect(gaps[i]).toBeGreaterThanOrEqual(gaps[i - 1])
    }
  })
})

// ─── GlyphCell (component) ──────────────────────────────────────────────────

describe('GlyphCell component', () => {
  it('renders a blank cell for the space character', () => {
    const { container } = render(<GlyphCell char=" " difficulty={5} />)
    expect(container.firstChild).toHaveClass('glyph-cell--blank')
  })

  it('renders an SVG for a known character', () => {
    const { container } = render(<GlyphCell char="A" difficulty={5} />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('sets aria-label on the wrapper for a known character', () => {
    render(<GlyphCell char="A" difficulty={5} />)
    expect(screen.getByLabelText('Trace the letter A')).toBeTruthy()
  })

  it('renders the fallback cell for an unknown character', () => {
    const { container } = render(<GlyphCell char="?" difficulty={5} />)
    expect(container.firstChild).toHaveClass('glyph-cell--unknown')
  })

  it('applies getDashArray output to the SVG path', () => {
    const { container } = render(<GlyphCell char="B" difficulty={1} />)
    const path = container.querySelector('path')
    expect(path!.getAttribute('stroke-dasharray')).toBe('8.0 2.0')
  })
})
