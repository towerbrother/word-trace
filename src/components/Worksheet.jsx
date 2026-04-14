import { useState } from 'react'
import GlyphCell from './GlyphCell.jsx'

const LS_DIFFICULTY = 'wt_difficulty'

// How many cells per row on the printed worksheet
export default function Worksheet({ config, onBack }) {
  const [difficulty, setDifficulty] = useState(config.difficulty)

  function handleDifficultyChange(e) {
    const val = Number(e.target.value)
    setDifficulty(val)
    localStorage.setItem(LS_DIFFICULTY, val)
  }

  function handlePrint() {
    window.print()
  }

  // Each word becomes its own row. A space always forces a new row.
  // No artificial character-count chunking — CSS handles wrapping on screen,
  // and print CSS uses flex-wrap: nowrap to keep each word on one line.
  const rows = config.text.split(' ').filter(w => w.length > 0).map(w => w.split(''))

  return (
    <div className="worksheet-page">
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

      <div className="difficulty-bar no-print">
        <label htmlFor="ws-difficulty" className="ws-difficulty-label">
          Difficulty: <strong>{difficulty}</strong>
        </label>
        <div className="slider-row">
          <span className="slider-label-left">More guides</span>
          <input
            id="ws-difficulty"
            type="range"
            min="1"
            max="10"
            step="1"
            value={difficulty}
            onChange={handleDifficultyChange}
            className="difficulty-slider"
          />
          <span className="slider-label-right">Fewer guides</span>
        </div>
      </div>

      {/* Printable worksheet grid */}
      <div className="worksheet-grid">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="worksheet-row">
            {row.map((char, colIdx) => (
              <GlyphCell
                key={`${rowIdx}-${colIdx}`}
                char={char}
                difficulty={difficulty}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
