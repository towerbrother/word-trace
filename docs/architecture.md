# Architecture

Word Trace is a React SPA with two views, managed by a `currentView` state variable in `App.jsx`:

| View | Component | Purpose |
|---|---|---|
| `home` | `ConfigPanel` | Preset selector, custom text input, difficulty slider (1–10), persists to localStorage |
| `worksheet` | `Worksheet` → `GlyphCell` | Print-ready grid, real-time difficulty adjustment, print button |

## Data Flow

`App.jsx` owns the config state (`words`, `difficulty`, `currentView`) and passes it down as props. `ConfigPanel` calls a callback to update state and switch views. There is no global state library.

## Input Sanitization

Custom text entered in `ConfigPanel` is filtered to uppercase A–Z, 0–9, and spaces before being stored or rendered. Characters outside this set have no glyph and are silently skipped.
