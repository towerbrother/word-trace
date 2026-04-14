# CLAUDE.md

## Commands

```bash
npm run dev       # Start development server (Vite HMR)
npm run build     # Production build → dist/
npm run lint      # ESLint check
npm run preview   # Preview the production build locally
```

No test runner is configured.

## Overview

Word Trace is a React SPA that generates printable handwriting practice worksheets. Children trace SVG letter outlines whose visibility is controlled by a difficulty slider.

- [Architecture & data flow](docs/architecture.md) — views, state, input sanitization
- [Glyph rendering](docs/glyph-rendering.md) — `glyphs.js` data module, SVG tracing effect
- [Print layout](docs/print-layout.md) — `@media print` rules, physical sizing warnings

## Tech Stack

- React 19 (JSX files, not TSX)
- Vite 8 with `@vitejs/plugin-react` (Oxc transform)
- TypeScript 6 for type checking (configured but source files use `.jsx`)
- ESLint 9 flat config (`eslint.config.js`)
- No CSS framework — single `src/index.css` with CSS custom properties
