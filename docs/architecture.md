# Architecture

Word Trace is a React SPA with two views, managed by a `currentView` state variable in `App.tsx`:

| View | Component | Purpose |
|---|---|---|
| `home` | `ConfigPanel` | Preset selector, custom text input, cell size slider (XS–XXL), persists to localStorage |
| `worksheet` | `Worksheet` → `GlyphCell` | Print-ready grid, print button |

## Data Flow

`App.tsx` owns the config state (`text`, `cellSize`, `currentView`) and passes it down as props. `ConfigPanel` calls a callback to update state and switch views. There is no global state library.

`WorksheetConfig` carries `{ text: string, cellSize: number }` where `cellSize` is 1–5 (XS → XXL). `Worksheet` maps that to concrete pixel/cm dimensions via `CELL_SIZES` and injects them as CSS custom properties (`--cell-w`, `--cell-h`, `--cell-print-w`, `--cell-print-h`) on the root `.worksheet-page` element, making them available to both screen and print styles.

## Input Sanitization

Custom text entered in `ConfigPanel` is filtered to uppercase A–Z, 0–9, and spaces before being stored or rendered. Characters outside this set have no glyph and are silently skipped.

## Tests

Unit tests live next to their source file:

| Test file | Covers |
|---|---|
| `src/components/ConfigPanel.test.ts` | `sanitise` — upcasing, symbol stripping, space preservation |
| `src/components/GlyphCell.test.tsx` | Component rendering — known characters, spaces, unknown characters, hardcoded dasharray |
| `src/components/Worksheet.test.ts` | `splitIntoRows` — word splitting, edge cases |
| `src/glyphs.test.ts` | `GLYPHS` / `GLYPH_ENDPOINTS` — completeness, format, viewBox bounds |

Run all tests with `npm test`.
