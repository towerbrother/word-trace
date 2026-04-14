/**
 * Single-stroke glyph data for handwriting practice worksheets.
 *
 * Uppercase letters follow Handwriting Without Tears (HWT) stroke rules:
 *   - All capitals start from the top-left or top
 *   - Built from Big Lines, Little Lines, Big Curves, Little Curves
 *   - Coordinates normalised to a 0–100 × 0–100 viewBox (10pt margin)
 *
 * Digits (0–9) retain their original Hershey Roman Simplex paths, normalised
 * with the same formula: nx = (x+13)/26*80+10, ny = (y+12)/21*80+10.
 *
 * Each path uses pathLength="100" on the <path> element (set in GlyphCell).
 */

export type GlyphEndpoint = { cx: string; cy: string }

// Internal shape: d = SVG path string, e = [cx,cy] pairs (start+end per stroke)
type E = [string, string]
type GlyphEntry = { d: string; e: E[] }

// ---------------------------------------------------------------------------
// Uppercase HWT letters
// Working space: x 10–90, y 10–90 (full height = 10→90, mid = 50)
// ---------------------------------------------------------------------------
const LETTER_DATA: Record<string, GlyphEntry> = {
  // A – two diagonals from apex + crossbar at mid
  'A': {
    d: 'M 50,10 L 10,90 M 50,10 L 90,90 M 30,50 L 70,50',
    e: [['50','10'],['10','90'], ['50','10'],['90','90'], ['30','50'],['70','50']],
  },
  // B – vertical + top bump + bottom bump
  'B': {
    d: 'M 10,10 L 10,90 M 10,10 L 50,10 L 60,20 L 60,40 L 50,50 L 10,50 M 10,50 L 55,50 L 65,60 L 65,80 L 55,90 L 10,90',
    e: [['10','10'],['10','90'], ['10','10'],['10','50'], ['10','50'],['10','90']],
  },
  // C – open arc, starts top-right, ends bottom-right
  'C': {
    d: 'M 80,20 L 65,10 L 50,10 L 30,15 L 15,30 L 10,50 L 15,70 L 30,85 L 50,90 L 65,90 L 80,80',
    e: [['80','20'],['80','80']],
  },
  // D – vertical + right arc closing back
  'D': {
    d: 'M 10,10 L 10,90 M 10,10 L 40,10 L 60,20 L 75,40 L 75,60 L 60,80 L 40,90 L 10,90',
    e: [['10','10'],['10','90'], ['10','10'],['10','90']],
  },
  // E – vertical + top, mid, bottom horizontals
  'E': {
    d: 'M 10,10 L 10,90 M 10,10 L 70,10 M 10,50 L 55,50 M 10,90 L 70,90',
    e: [['10','10'],['10','90'], ['10','10'],['70','10'], ['10','50'],['55','50'], ['10','90'],['70','90']],
  },
  // F – vertical + top and mid horizontals (no bottom)
  'F': {
    d: 'M 10,10 L 10,90 M 10,10 L 70,10 M 10,50 L 55,50',
    e: [['10','10'],['10','90'], ['10','10'],['70','10'], ['10','50'],['55','50']],
  },
  // G – C-shape + inward horizontal shelf
  'G': {
    d: 'M 80,20 L 65,10 L 50,10 L 30,15 L 15,30 L 10,50 L 15,70 L 30,85 L 50,90 L 65,90 L 80,80 L 80,50 L 50,50',
    e: [['80','20'],['50','50']],
  },
  // H – two verticals + crossbar
  'H': {
    d: 'M 10,10 L 10,90 M 90,10 L 90,90 M 10,50 L 90,50',
    e: [['10','10'],['10','90'], ['90','10'],['90','90'], ['10','50'],['90','50']],
  },
  // I – single vertical
  'I': {
    d: 'M 50,10 L 50,90',
    e: [['50','10'],['50','90']],
  },
  // J – vertical descending into hook left
  'J': {
    d: 'M 70,10 L 70,75 L 65,85 L 50,90 L 35,85 L 30,75 L 30,65',
    e: [['70','10'],['30','65']],
  },
  // K – vertical + two diagonals meeting at mid
  'K': {
    d: 'M 10,10 L 10,90 M 70,10 L 10,50 M 10,50 L 70,90',
    e: [['10','10'],['10','90'], ['70','10'],['10','50'], ['10','50'],['70','90']],
  },
  // L – vertical + bottom horizontal
  'L': {
    d: 'M 10,10 L 10,90 M 10,90 L 70,90',
    e: [['10','10'],['10','90'], ['10','90'],['70','90']],
  },
  // M – two outer verticals + inner V descending to baseline
  'M': {
    d: 'M 10,10 L 10,90 M 10,10 L 50,90 L 90,10 M 90,10 L 90,90',
    e: [['10','10'],['10','90'], ['10','10'],['90','10'], ['90','10'],['90','90']],
  },
  // N – two verticals + diagonal
  'N': {
    d: 'M 10,10 L 10,90 M 10,10 L 90,90 M 90,10 L 90,90',
    e: [['10','10'],['10','90'], ['10','10'],['90','90'], ['90','10'],['90','90']],
  },
  // O – closed oval
  'O': {
    d: 'M 50,10 L 25,15 L 10,30 L 10,70 L 25,85 L 50,90 L 75,85 L 90,70 L 90,30 L 75,15 L 50,10',
    e: [['50','10'],['50','10']],
  },
  // P – vertical + top bump
  'P': {
    d: 'M 10,10 L 10,90 M 10,10 L 50,10 L 65,20 L 65,40 L 50,50 L 10,50',
    e: [['10','10'],['10','90'], ['10','10'],['10','50']],
  },
  // Q – oval + diagonal tail
  'Q': {
    d: 'M 50,10 L 25,15 L 10,30 L 10,70 L 25,85 L 50,90 L 75,85 L 90,70 L 90,30 L 75,15 L 50,10 M 60,70 L 85,90',
    e: [['50','10'],['50','10'], ['60','70'],['85','90']],
  },
  // R – vertical + top bump + diagonal leg
  'R': {
    d: 'M 10,10 L 10,90 M 10,10 L 50,10 L 65,20 L 65,40 L 50,50 L 10,50 M 10,50 L 70,90',
    e: [['10','10'],['10','90'], ['10','10'],['10','50'], ['10','50'],['70','90']],
  },
  // S – reverse-C top + C bottom
  'S': {
    d: 'M 80,20 L 65,10 L 45,10 L 20,20 L 20,45 L 50,50 L 80,55 L 80,80 L 55,90 L 35,90 L 20,80',
    e: [['80','20'],['20','80']],
  },
  // T – top horizontal + vertical
  'T': {
    d: 'M 50,10 L 50,90 M 10,10 L 90,10',
    e: [['50','10'],['50','90'], ['10','10'],['90','10']],
  },
  // U – two verticals curving to baseline
  'U': {
    d: 'M 10,10 L 10,70 L 20,85 L 50,90 L 80,85 L 90,70 L 90,10',
    e: [['10','10'],['90','10']],
  },
  // V – two diagonals meeting at baseline
  'V': {
    d: 'M 10,10 L 50,90 L 90,10',
    e: [['10','10'],['90','10']],
  },
  // W – double-V
  'W': {
    d: 'M 10,10 L 28,90 L 50,50 L 72,90 L 90,10',
    e: [['10','10'],['90','10']],
  },
  // X – two crossing diagonals
  'X': {
    d: 'M 10,10 L 90,90 M 90,10 L 10,90',
    e: [['10','10'],['90','90'], ['90','10'],['10','90']],
  },
  // Y – two diagonals to mid + stem down
  'Y': {
    d: 'M 10,10 L 50,50 M 90,10 L 50,50 M 50,50 L 50,90',
    e: [['10','10'],['50','50'], ['90','10'],['50','50'], ['50','50'],['50','90']],
  },
  // Z – top horizontal + diagonal + bottom horizontal
  'Z': {
    d: 'M 10,10 L 90,10 M 90,10 L 10,90 M 10,90 L 90,90',
    e: [['10','10'],['90','10'], ['90','10'],['10','90'], ['10','90'],['90','90']],
  },
};

// ---------------------------------------------------------------------------
// Digits – Hershey Roman Simplex paths pre-normalised
// nx = (x+13)/26*80+10  ny = (y+12)/21*80+10
// ---------------------------------------------------------------------------
const DIGIT_DATA: Record<string, GlyphEntry> = {
  // 0 – oval + diagonal slash
  '0': {
    d: 'M 46.9,10.0 L 37.7,13.8 L 31.5,25.2 L 31.5,55.7 L 37.7,78.6 L 46.9,90.0 L 53.1,90.0 L 62.3,78.6 L 68.5,55.7 L 68.5,25.2 L 62.3,13.8 L 53.1,10.0 L 46.9,10.0 M 37.7,25.2 L 62.3,74.8',
    e: [['46.9','10.0'],['46.9','10.0'], ['37.7','25.2'],['62.3','74.8']],
  },
  // 1 – serif top + vertical
  '1': {
    d: 'M 43.8,25.2 L 50.0,10.0 L 50.0,90.0',
    e: [['43.8','25.2'],['50.0','90.0']],
  },
  // 2 – top arc + diagonal + bottom horizontal
  '2': {
    d: 'M 37.7,21.4 L 43.8,10.0 L 53.1,10.0 L 62.3,21.4 L 62.3,32.9 L 50.0,48.1 L 34.6,90.0 L 65.4,90.0',
    e: [['37.7','21.4'],['65.4','90.0']],
  },
  // 3 – two C-bumps right
  '3': {
    d: 'M 37.7,10.0 L 62.3,10.0 L 50.0,40.5 L 59.2,44.3 L 62.3,59.5 L 62.3,74.8 L 56.2,86.2 L 46.9,90.0 L 37.7,86.2',
    e: [['37.7','10.0'],['37.7','86.2']],
  },
  // 4 – vertical + cross horizontal + diagonal arm
  '4': {
    d: 'M 56.2,10.0 L 56.2,90.0 M 34.6,48.1 L 68.5,48.1 M 34.6,48.1 L 56.2,10.0',
    e: [['56.2','10.0'],['56.2','90.0'], ['34.6','48.1'],['68.5','48.1'], ['34.6','48.1'],['56.2','10.0']],
  },
  // 5 – top horizontal + vertical arm + C bottom
  '5': {
    d: 'M 62.3,10.0 L 37.7,10.0 L 37.7,48.1 L 46.9,40.5 L 56.2,40.5 L 65.4,44.3 L 65.4,74.8 L 56.2,86.2 L 46.9,90.0 L 37.7,82.4',
    e: [['62.3','10.0'],['37.7','82.4']],
  },
  // 6 – curved top + circle bottom
  '6': {
    d: 'M 62.3,21.4 L 56.2,10.0 L 46.9,10.0 L 37.7,21.4 L 34.6,36.7 L 34.6,63.3 L 40.8,86.2 L 50.0,90.0 L 56.2,90.0 L 65.4,82.4 L 65.4,67.1 L 56.2,55.7 L 46.9,55.7 L 37.7,59.5 L 34.6,63.3',
    e: [['62.3','21.4'],['34.6','63.3']],
  },
  // 7 – top horizontal + diagonal
  '7': {
    d: 'M 34.6,10.0 L 65.4,10.0 L 50.0,90.0',
    e: [['34.6','10.0'],['50.0','90.0']],
  },
  // 8 – two stacked circles
  '8': {
    d: 'M 46.9,10.0 L 37.7,17.6 L 37.7,32.9 L 46.9,44.3 L 56.2,44.3 L 65.4,51.9 L 65.4,74.8 L 56.2,90.0 L 46.9,90.0 L 37.7,82.4 L 37.7,63.3 L 46.9,44.3 M 46.9,44.3 L 56.2,32.9 L 56.2,17.6 L 46.9,10.0',
    e: [['46.9','10.0'],['46.9','44.3'], ['46.9','44.3'],['46.9','10.0']],
  },
  // 9 – circle top + curved tail
  '9': {
    d: 'M 62.3,44.3 L 65.4,32.9 L 65.4,21.4 L 59.2,10.0 L 50.0,10.0 L 40.8,17.6 L 37.7,29.0 L 37.7,40.5 L 43.8,51.9 L 53.1,55.7 L 62.3,55.7 L 65.4,44.3 L 65.4,67.1 L 59.2,86.2 L 50.0,90.0 L 43.8,86.2',
    e: [['62.3','44.3'],['43.8','86.2']],
  },
};

const GLYPH_DATA: Record<string, GlyphEntry> = { ...LETTER_DATA, ...DIGIT_DATA };

export const GLYPHS: Record<string, string> = Object.fromEntries(
  Object.entries(GLYPH_DATA).map(([ch, g]) => [ch, g.d])
);

export const GLYPH_ENDPOINTS: Record<string, GlyphEndpoint[]> = Object.fromEntries(
  Object.entries(GLYPH_DATA).map(([ch, g]) => [
    ch,
    g.e.map(([cx, cy]) => ({ cx, cy })),
  ])
);
