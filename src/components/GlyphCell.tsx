import { GLYPHS, GLYPH_ENDPOINTS } from '../glyphs.ts'

// Hardcoded level-4 dash/gap on the pathLength=100 scale.
// gap = 3 + (4-1) * (12/9) = 7.0  → moderate guide spacing
const DASH_ARRAY = '0.0 7.0'

interface GlyphCellProps {
  char: string
  opacity?: number
}

export default function GlyphCell({ char, opacity = 0.55 }: GlyphCellProps) {
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
        {/* The tracing path — dots at level-4 spacing, slightly dimmed for difficulty */}
        <path
          d={pathData}
          pathLength="100"
          stroke="#333"
          strokeWidth="4"
          fill="none"
          strokeDasharray={DASH_ARRAY}
          strokeOpacity={opacity}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Stroke endpoint markers */}
        {GLYPH_ENDPOINTS[char].map(({ cx, cy }, i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill="#333" fillOpacity={opacity} />
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
