/**
 * Hershey Roman Simplex single-stroke glyph data.
 * Each character maps to an SVG path `d` string.
 * Coordinates normalised to fit a 0–100 × 0–100 viewBox.
 *
 * Raw Hershey coordinate space: x ≈ -13..13, y ≈ -12..9 (y negative = up).
 * Normalisation: x_norm = (x + 13) / 26 * 80 + 10
 *                y_norm = (y + 12) / 21 * 80 + 10
 *
 * Each path uses pathLength="100" on the <path> element (set in GlyphCell).
 */

// Helper: normalise a raw Hershey coordinate pair to 0–100 viewBox
function nx(x) { return ((x + 13) / 26 * 80 + 10).toFixed(1); }
function ny(y) { return ((y + 12) / 21 * 80 + 10).toFixed(1); }

// Build an SVG path `d` string from an array of strokes.
// Each stroke is an array of [x, y] raw-coordinate pairs.
function buildPath(strokes) {
  return strokes
    .map(stroke => {
      const pts = stroke.map(([x, y]) => `${nx(x)},${ny(y)}`);
      return 'M ' + pts[0] + (pts.length > 1 ? ' L ' + pts.slice(1).join(' L ') : '');
    })
    .join(' ');
}

// ---------------------------------------------------------------------------
// Hershey Roman Simplex coordinate data
// Raw [x, y] pairs per stroke; multiple strokes = pen-up between them.
// ---------------------------------------------------------------------------
const RAW = {
  // A – two legs + crossbar
  'A': [
    [[-5, 9], [0, -12], [5, 9]],
    [[-3, 3], [3, 3]]
  ],
  // B – vertical + two bumps right
  'B': [
    [[-5, -12], [-5, 9]],
    [[-5, -12], [1, -12], [4, -9], [4, -5], [1, -2], [-5, -2]],
    [[-5, -2], [1, -2], [4, 1], [4, 5], [1, 9], [-5, 9]]
  ],
  // C – open arc left
  'C': [
    [[5, -8], [3, -11], [0, -12], [-2, -12], [-5, -9], [-5, 9/2], [-5, 6], [-2, 9], [0, 9], [3, 8], [5, 5]]
  ],
  // D – vertical + right arc
  'D': [
    [[-5, -12], [-5, 9]],
    [[-5, -12], [0, -12], [3, -9], [5, -5], [5, 2], [3, 6], [0, 9], [-5, 9]]
  ],
  // E – vertical + three horizontals
  'E': [
    [[-5, -12], [-5, 9]],
    [[-5, -12], [5, -12]],
    [[-5, -2], [2, -2]],
    [[-5, 9], [5, 9]]
  ],
  // F – vertical + two horizontals (no bottom)
  'F': [
    [[-5, -12], [-5, 9]],
    [[-5, -12], [5, -12]],
    [[-5, -2], [2, -2]]
  ],
  // G – C-shape + inward horizontal
  'G': [
    [[5, -8], [3, -11], [0, -12], [-2, -12], [-5, -9], [-5, 6], [-2, 9], [0, 9], [3, 8], [5, 5], [5, 0], [0, 0]]
  ],
  // H – two verticals + crossbar
  'H': [
    [[-5, -12], [-5, 9]],
    [[5, -12], [5, 9]],
    [[-5, -2], [5, -2]]
  ],
  // I – single vertical
  'I': [
    [[0, -12], [0, 9]]
  ],
  // J – top-right vertical descending into hook left
  'J': [
    [[3, -12], [3, 6], [1, 9], [-1, 9], [-3, 6], [-3, 3]]
  ],
  // K – vertical + two diagonals
  'K': [
    [[-5, -12], [-5, 9]],
    [[5, -12], [-5, -2]],
    [[-5, -2], [5, 9]]   // corrected: starts at junction
  ],
  // L – vertical + bottom horizontal
  'L': [
    [[-5, -12], [-5, 9]],
    [[-5, 9], [5, 9]]
  ],
  // M – two legs + V in middle
  'M': [
    [[-6, -12], [-6, 9]],
    [[-6, -12], [0, 0], [6, -12]],
    [[6, -12], [6, 9]]
  ],
  // N – two verticals + diagonal
  'N': [
    [[-5, -12], [-5, 9]],
    [[-5, -12], [5, 9]],
    [[5, -12], [5, 9]]
  ],
  // O – oval
  'O': [
    [[-1, -12], [-4, -11], [-6, -8], [-6, 0], [-4, 6], [-1, 9],
     [1, 9], [4, 6], [6, 0], [6, -8], [4, -11], [1, -12], [-1, -12]]
  ],
  // P – vertical + top bump
  'P': [
    [[-5, -12], [-5, 9]],
    [[-5, -12], [1, -12], [4, -9], [4, -5], [1, -2], [-5, -2]]
  ],
  // Q – O + diagonal tail
  'Q': [
    [[-1, -12], [-4, -11], [-6, -8], [-6, 0], [-4, 6], [-1, 9],
     [1, 9], [4, 6], [6, 0], [6, -8], [4, -11], [1, -12], [-1, -12]],
    [[1, 3], [6, 9]]
  ],
  // R – vertical + bump + leg
  'R': [
    [[-5, -12], [-5, 9]],
    [[-5, -12], [1, -12], [4, -9], [4, -5], [1, -2], [-5, -2]],
    [[-5, -2], [5, 9]]
  ],  // corrected: leg from junction
  // S – reverse-C top + C bottom
  'S': [
    [[5, -9], [3, -12], [0, -12], [-3, -9], [-3, -5], [0, -2], [3, 2], [3, 6], [0, 9], [-3, 6]]
  ],
  // T – top horizontal + vertical
  'T': [
    [[0, -12], [0, 9]],
    [[-6, -12], [6, -12]]
  ],
  // U – two verticals curving to bottom
  'U': [
    [[-5, -12], [-5, 3], [-3, 8], [0, 9], [3, 8], [5, 3], [5, -12]]
  ],
  // V – two diagonals meeting at bottom
  'V': [
    [[-6, -12], [0, 9], [6, -12]]
  ],
  // W – four legs / double V
  'W': [
    [[-7, -12], [-4, 9], [0, -2], [4, 9], [7, -12]]
  ],
  // X – two crossing diagonals
  'X': [
    [[-5, -12], [5, 9]],
    [[5, -12], [-5, 9]]
  ],
  // Y – two diagonals meeting midpoint + stem down
  'Y': [
    [[-5, -12], [0, -2]],
    [[5, -12], [0, -2]],
    [[0, -2], [0, 9]]
  ],
  // Z – top horizontal + diagonal + bottom horizontal
  'Z': [
    [[-5, -12], [5, -12]],
    [[5, -12], [-5, 9]],
    [[-5, 9], [5, 9]]
  ],

  // Digits
  // 0 – oval with diagonal slash
  '0': [
    [[-1, -12], [-4, -11], [-6, -8], [-6, 0], [-4, 6], [-1, 9],
     [1, 9], [4, 6], [6, 0], [6, -8], [4, -11], [1, -12], [-1, -12]],
    [[-4, -8], [4, 5]]
  ],
  // 1 – serif top + vertical
  '1': [
    [[-2, -8], [0, -12], [0, 9]]
  ],
  // 2 – top arc + diagonal + bottom horizontal
  '2': [
    [[-4, -9], [-2, -12], [1, -12], [4, -9], [4, -6], [0, -2], [-5, 9], [5, 9]]
  ],
  // 3 – two C-bumps right
  '3': [
    [[-4, -12], [4, -12], [0, -4], [3, -1], [4, 2], [4, 5], [2, 8], [-1, 9], [-4, 8]]
  ],
  // 4 – vertical descending + cross horizontal
  '4': [
    [[2, -12], [2, 9]],
    [[-5, -2], [6, -2]],
    [[-5, -2], [2, -12]]
  ],
  // 5 – top horizontal + vertical arm + C bottom
  '5': [
    [[4, -12], [-4, -12], [-4, -2], [-1, -4], [2, -4], [5, -1], [5, 5], [2, 8], [-1, 9], [-4, 7]]
  ],
  // 6 – curved top + circle bottom
  '6': [
    [[4, -9], [2, -12], [-1, -12], [-4, -9], [-5, -4], [-5, 4], [-3, 8], [0, 9], [2, 9], [5, 7], [5, 3], [2, 0], [-1, 0], [-4, 2], [-5, 4]]
  ],
  // 7 – top horizontal + diagonal
  '7': [
    [[-5, -12], [5, -12], [0, 9]]
  ],
  // 8 – two stacked circles
  '8': [
    [[-1, -12], [-4, -10], [-4, -6], [-1, -3], [2, -3], [5, -1], [5, 5], [2, 9], [-1, 9], [-4, 7], [-4, 2], [-1, -3]],
    [[-1, -3], [2, -6], [2, -10], [-1, -12]]
  ],
  // 9 – circle top + curved tail down
  '9': [
    [[4, -3], [5, -6], [5, -9], [3, -12], [0, -12], [-3, -10], [-4, -7], [-4, -4], [-2, -1], [1, 0], [4, 0], [5, -3], [5, 3], [3, 8], [0, 9], [-2, 8]]
  ],
};

// Build the exported GLYPHS map
export const GLYPHS = Object.fromEntries(
  Object.entries(RAW).map(([char, strokes]) => [char, buildPath(strokes)])
);

// For each character, collect the normalised first and last coordinate of every
// stroke. Used by GlyphCell to render filled anchor dots that are always visible
// regardless of difficulty / stroke-dasharray phase.
export const GLYPH_ENDPOINTS = Object.fromEntries(
  Object.entries(RAW).map(([char, strokes]) => [
    char,
    strokes.flatMap(stroke => [
      { cx: nx(stroke[0][0]),               cy: ny(stroke[0][1]) },
      { cx: nx(stroke[stroke.length-1][0]), cy: ny(stroke[stroke.length-1][1]) },
    ])
  ])
);
