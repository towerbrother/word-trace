<div align="center">
  <h1>Word Trace</h1>
  <p>
    Word Trace is a tool for generating printable handwriting practice worksheets. Enter any word or phrase and get a print-ready tracing sheet with adjustable difficulty.
  </p>
  <p>
    <span>
      <img src="https://img.shields.io/badge/language-TypeScript-3078c6" alt="language">
    </span>
    <span>
      <img src="https://img.shields.io/badge/library-ReactJS-149eca" alt="library">
    </span>
    <span>
      <img src="https://img.shields.io/badge/bundler-Vite-646cff" alt="bundler">
    </span>
    <span>
      <img src="https://img.shields.io/badge/type-frontend-lightgray" alt="type">
    </span>
  </p>
</div>
<br/>

## Overview

Word Trace renders each character as an SVG path using Hershey Roman Simplex glyph data. A difficulty slider (1–10) controls how much of each stroke is pre-drawn — at higher difficulty levels, less of the path is visible and the child has more to trace themselves.

Worksheets are print-optimised: cells are sized in centimetres and all UI chrome is hidden via `@media print`.

## Getting Started

```bash
npm install
npm run dev          # Start dev server with HMR
npm run build        # Production build → dist/
npm run preview      # Preview the production build locally
npm run lint         # ESLint check
npm test             # Run unit tests (Vitest, single pass)
npm run test:watch   # Run unit tests in watch mode
```

## Tech Stack

- **React 19** — component model, JSX
- **Vite 8** — dev server and bundler (Oxc transform)
- **TypeScript 6** — type checking (source files use `.jsx`)
- **ESLint 9** — flat config

## Features

- Preset word lists or free-form custom text input
- Difficulty slider that adjusts how much of each stroke is visible
- Config persisted to `localStorage`
- Print-ready layout sized for A4/letter paper
- Supports uppercase A–Z and digits 0–9
