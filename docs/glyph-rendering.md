# Glyph Rendering

## Core Data Module: `src/glyphs.js`

All letter shapes come from Hershey Roman Simplex glyph data stored here. The module exports:

- `GLYPHS` — map of character → SVG path `d` string
- `GLYPH_ENDPOINTS` — start/end stroke points used to render anchor dots in `GlyphCell`
- `buildPath(rawCoords)` — normalizes raw Hershey coordinates to SVG viewBox space

## SVG Tracing Effect

`GlyphCell.jsx` renders each character as an SVG path with `pathLength="100"`. The difficulty level controls `stroke-dasharray` — higher difficulty means less of the stroke is visible (more gap), so the child has more to trace themselves. The exported `getDashArray(difficulty)` function maps difficulty 1–10 to dash/gap values.

## Tests

- `src/glyphs.test.js` — verifies every A–Z and 0–9 character has a valid entry in both `GLYPHS` and `GLYPH_ENDPOINTS`, checks SVG path format and viewBox bounds, and asserts endpoint count matches stroke count.
- `src/components/GlyphCell.test.jsx` — unit tests for `getDashArray` boundary and monotonicity, plus component rendering tests for known characters, spaces, and unknown characters.
