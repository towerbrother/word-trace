import { GLYPHS, GLYPH_ENDPOINTS } from '../glyphs.js'

/**
 * Compute stroke-dasharray values on the normalised pathLength=100 scale.
 *
 * difficulty 1  (easiest)  → "8.0 2.0"  (dense dashes, easy to follow)
 * difficulty 10 (hardest)  → "2.0 12.0" (sparse dashes, harder to follow)
 */
function getDashArray(difficulty) {
  const dash = 8 - (difficulty - 1) * (6 / 9)   // 8 → 2
  const gap  = 2 + (difficulty - 1) * (10 / 9)   // 2 → 12
  return `${dash.toFixed(1)} ${gap.toFixed(1)}`
}

export default function GlyphCell({ char, difficulty }) {
  // Blank cell for space character
  if (char === ' ') {
    return <div className="glyph-cell glyph-cell--blank" aria-hidden="true" />
  }

  const pathData = GLYPHS[char]

  if (!pathData) {
    // Should never happen after sanitisation, but guard anyway
    return (
      <div className="glyph-cell glyph-cell--unknown" aria-label={`Unknown character: ${char}`}>
        <span className="glyph-fallback">{char}</span>
      </div>
    )
  }

  return (
    <div className="glyph-cell" aria-label={`Trace the letter ${char}`}>
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Baseline guide */}
        <line
          x1="10" y1="86" x2="90" y2="86"
          stroke="#e0d8f0"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />
        {/* The tracing path */}
        <path
          d={pathData}
          pathLength="100"
          stroke="#333"
          strokeWidth="4"
          fill="none"
          strokeDasharray={getDashArray(difficulty)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Stroke endpoint markers — anchor dots always visible at stroke boundaries */}
        {GLYPH_ENDPOINTS[char].map(({ cx, cy }, i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill="#333" />
        ))}
        {/* Character label */}
        <text
          x="88"
          y="98"
          fontSize="8"
          fill="#c0b8d0"
          textAnchor="end"
          fontFamily="system-ui, sans-serif"
        >
          {char}
        </text>
      </svg>
    </div>
  )
}
