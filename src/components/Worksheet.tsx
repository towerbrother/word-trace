import GlyphCell from './GlyphCell.tsx'
import type { WorksheetConfig } from '../App.tsx'

// Screen and print dimensions for each cell size step (1=XS … 5=XXL)
const CELL_SIZES = [
  { screenW: '60px',  screenH: '50px',  printW: '1.2cm', printH: '1.0cm' },
  { screenW: '85px',  screenH: '71px',  printW: '2.2cm', printH: '1.8cm' },
  { screenW: '110px', screenH: '92px',  printW: '3.2cm', printH: '2.7cm' },
  { screenW: '140px', screenH: '117px', printW: '4.4cm', printH: '3.7cm' },
  { screenW: '180px', screenH: '150px', printW: '6.0cm', printH: '5.0cm' },
]

// Split text into rows of characters: each space-separated word becomes one row.
export function splitIntoRows(text: string): string[][] {
  return text.split(' ').filter(w => w.length > 0).map(w => w.split(''))
}

interface WorksheetProps {
  config: WorksheetConfig
  onBack: () => void
}

export default function Worksheet({ config, onBack }: WorksheetProps) {
  function handlePrint() {
    window.print()
  }

  const { screenW, screenH, printW, printH } = CELL_SIZES[config.cellSize - 1]

  // Each word becomes its own row. A space always forces a new row.
  // No artificial character-count chunking — CSS handles wrapping on screen,
  // and print CSS uses flex-wrap: nowrap to keep each word on one line.
  const rows = splitIntoRows(config.text)

  return (
    <div
      className="worksheet-page"
      style={{
        '--cell-w':       screenW,
        '--cell-h':       screenH,
        '--cell-print-w': printW,
        '--cell-print-h': printH,
      } as React.CSSProperties}
    >
      {/* Controls — hidden on print */}
      <nav className="worksheet-nav no-print">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <span className="worksheet-title">Word Trace Worksheet</span>
        <button type="button" className="print-btn" onClick={handlePrint}>
          🖨 Print
        </button>
      </nav>

      {/* Printable worksheet grid */}
      <div className="worksheet-grid">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="worksheet-row">
            {row.map((char, colIdx) => (
              <GlyphCell
                key={`${rowIdx}-${colIdx}`}
                char={char}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
