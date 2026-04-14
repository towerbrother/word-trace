# Print Layout

`index.css` contains `@media print` rules that hide UI controls and apply physical cell dimensions for accurate paper output.

## Cell Size Control

The user selects a cell size on the config screen (XS / S / M / L / XXL). `Worksheet.tsx` maps that 1–5 value to four CSS custom properties injected as inline styles on `.worksheet-page`:

| Property | Purpose |
|---|---|
| `--cell-w` | Screen preview width (px) |
| `--cell-h` | Screen preview height (px) |
| `--cell-print-w` | Print width (cm) |
| `--cell-print-h` | Print height (cm) |

The `.glyph-cell` rule in `index.css` reads `--cell-w` / `--cell-h` for the screen view and the `@media print` block reads `--cell-print-w` / `--cell-print-h` for the printed output. CSS custom properties defined on a parent element are inherited by descendants and respected inside `@media print` rules.

## Size Mapping

| Label | Print W | Print H |
|-------|---------|---------|
| XS    | 1.2 cm  | 1.0 cm  |
| S     | 2.2 cm  | 1.8 cm  |
| M     | 3.2 cm  | 2.7 cm  |
| L     | 4.4 cm  | 3.7 cm  |
| XXL   | 6.0 cm  | 5.0 cm  |

**Warning:** Changes to `index.css` flex/grid rules can break the physical paper layout. Keep print-layout correctness in mind whenever editing worksheet or cell styles.
