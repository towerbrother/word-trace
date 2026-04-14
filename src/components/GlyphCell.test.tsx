import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import GlyphCell from './GlyphCell.tsx'

// ─── GlyphCell (component) ──────────────────────────────────────────────────

describe('GlyphCell component', () => {
  it('renders a blank cell for the space character', () => {
    const { container } = render(<GlyphCell char=" " />)
    expect(container.firstChild).toHaveClass('glyph-cell--blank')
  })

  it('renders an SVG for a known character', () => {
    const { container } = render(<GlyphCell char="A" />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('sets aria-label on the wrapper for a known character', () => {
    render(<GlyphCell char="A" />)
    expect(screen.getByLabelText('Trace the letter A')).toBeTruthy()
  })

  it('renders the fallback cell for an unknown character', () => {
    const { container } = render(<GlyphCell char="?" />)
    expect(container.firstChild).toHaveClass('glyph-cell--unknown')
  })

  it('applies the hardcoded level-4 dash array to the SVG path', () => {
    const { container } = render(<GlyphCell char="B" />)
    const path = container.querySelector('path')
    expect(path!.getAttribute('stroke-dasharray')).toBe('0.0 7.0')
  })
})
