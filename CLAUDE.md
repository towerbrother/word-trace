# CLAUDE.md

## Commands

```bash
npm run dev       # Start development server (Vite HMR)
npm run build     # Production build → dist/
npm run lint      # ESLint check
npm run preview   # Preview the production build locally
```

No test runner is configured.

## Architecture

Word Trace is a React SPA that generates printable handwriting practice worksheets. It has two views managed by a state variable in `App.jsx`:

- **`home`** → `ConfigPanel` — preset selector, custom text input, difficulty slider (1–10), persists to localStorage
- **`worksheet`** → `Worksheet` → `GlyphCell` — print-ready grid, real-time difficulty adjustment, print button

### Data Flow

`App.jsx` owns the config state (`words`, `difficulty`, `currentView`) and passes it down as props. `ConfigPanel` calls a callback to update state and switch views; there is no global state library.

### Core Data Module: `src/glyphs.js`

All letter shapes come from Hershey Roman Simplex glyph data stored here. The module exports:

- `GLYPHS` — map of character → SVG path `d` string
- `GLYPH_ENDPOINTS` — start/end stroke points used to render anchor dots in `GlyphCell`
- `buildPath(rawCoords)` — normalizes raw Hershey coordinates to SVG viewBox space

### SVG Tracing Effect

`GlyphCell.jsx` renders each character as an SVG path with `pathLength="100"`. The difficulty level controls `stroke-dasharray` — higher difficulty means less of the stroke is visible (more gap), so the child has more to trace themselves. The `difficultyToDashArray()` function maps difficulty 1–10 to dash/gap values.

### Print Optimization

`Worksheet.jsx` includes `<style>` with `@media print` rules that hide UI controls and set cell sizes in centimeters. Keep print-layout correctness in mind when editing worksheet or cell styles — changes to `index.css` flex/grid rules can break the physical paper output.

### Input Sanitization

Custom text entered in `ConfigPanel` is filtered to uppercase A–Z, 0–9, and spaces before being stored or rendered. Characters outside this set have no glyph and are silently skipped.

## Tech Stack

- React 19 (JSX files, not TSX)
- Vite 8 with `@vitejs/plugin-react` (Oxc transform)
- TypeScript 6 for type checking (configured but source files use `.jsx`)
- ESLint 9 flat config (`eslint.config.js`)
- No CSS framework — single `src/index.css` with CSS custom properties
