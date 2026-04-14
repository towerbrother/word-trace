# Glyph Rendering

## Core Data Module: `src/glyphs.ts`

All letter shapes come from Hershey Roman Simplex glyph data stored here. The module exports:

- `GLYPHS` — map of character → SVG path `d` string
- `GLYPH_ENDPOINTS` — start/end stroke points used to render anchor dots in `GlyphCell`
- `buildPath(rawCoords)` — normalizes raw Hershey coordinates to SVG viewBox space

## SVG Tracing Effect

`GlyphCell.tsx` renders each character as an SVG path with `pathLength="100"`. The `stroke-dasharray` is hardcoded to `"0.0 7.0"` (equivalent to the former difficulty level 4 — moderate guide spacing). Dot opacity is set to `0.55` to make the guides slightly less prominent and increase tracing challenge. The anchor dots at stroke endpoints remain fully opaque.

## Tests

- `src/glyphs.test.ts` — verifies every A–Z and 0–9 character has a valid entry in both `GLYPHS` and `GLYPH_ENDPOINTS`, checks SVG path format and viewBox bounds, and asserts endpoint count matches stroke count.
- `src/components/GlyphCell.test.tsx` — component rendering tests for known characters, spaces, and unknown characters; asserts the hardcoded `stroke-dasharray` value is applied.
