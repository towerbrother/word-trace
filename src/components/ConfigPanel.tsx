import { useState, useEffect } from 'react'
import type { WorksheetConfig } from '../App.tsx'

const PRESETS: Record<string, string> = {
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
}

const LS_PRESET     = 'wt_preset'
const LS_CUSTOM     = 'wt_custom'
const LS_CELL_SIZE  = 'wt_cell_size'
const LS_OPACITY    = 'wt_opacity'

const CELL_SIZE_LABELS = ['XS', 'S', 'M', 'L', 'XXL']

export function sanitise(text: string): string {
  // Uppercase, keep only A-Z, 0-9, and spaces
  return text
    .toUpperCase()
    .split('')
    .filter(ch => /[A-Z0-9 ]/.test(ch))
    .join('')
}

interface ConfigPanelProps {
  onGenerate: (config: WorksheetConfig) => void
}

export default function ConfigPanel({ onGenerate }: ConfigPanelProps) {
  // Restore from localStorage
  const [preset, setPreset]       = useState(() => localStorage.getItem(LS_PRESET) || 'alphabet')
  const [custom, setCustom]       = useState(() => localStorage.getItem(LS_CUSTOM) || '')
  const [cellSize, setCellSize]   = useState(() => {
    const saved = localStorage.getItem(LS_CELL_SIZE)
    return saved ? Number(saved) : 3
  })
  const [opacity, setOpacity]     = useState(() => {
    const saved = localStorage.getItem(LS_OPACITY)
    return saved ? Number(saved) : 0.55
  })

  // Persist on every change
  useEffect(() => { localStorage.setItem(LS_PRESET, preset) },              [preset])
  useEffect(() => { localStorage.setItem(LS_CUSTOM, custom) },              [custom])
  useEffect(() => { localStorage.setItem(LS_CELL_SIZE, String(cellSize)) }, [cellSize])
  useEffect(() => { localStorage.setItem(LS_OPACITY, String(opacity)) },    [opacity])

  function handlePresetChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPreset(e.target.value)
    setCustom('') // clear custom when preset is selected
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = sanitise(e.target.value)
    setCustom(val)
    if (val.length > 0) setPreset('') // deselect preset when typing
  }

  function handleGenerate() {
    const text = custom.length > 0 ? custom : (PRESETS[preset] || '')
    if (!text.trim().replace(/ /g, '')) return // nothing to render
    onGenerate({ text, cellSize, opacity })
  }

  const canGenerate = custom.length > 0 || preset !== ''

  return (
    <main className="config-page">
      <header className="config-header">
        <h1 className="app-title">✏️ Word Trace</h1>
        <p className="app-subtitle">Children's handwriting worksheet generator</p>
      </header>

      <section className="config-card">
        {/* Preset selector */}
        <div className="field-group">
          <label className="field-label">Preset character set</label>
          <div className="preset-buttons">
            <button
              type="button"
              className={`preset-btn${preset === 'alphabet' ? ' active' : ''}`}
              onClick={() => { setPreset('alphabet'); setCustom('') }}
            >
              Alphabet (A–Z)
            </button>
            <button
              type="button"
              className={`preset-btn${preset === 'numbers' ? ' active' : ''}`}
              onClick={() => { setPreset('numbers'); setCustom('') }}
            >
              Numbers (0–9)
            </button>
          </div>
        </div>

        {/* Custom input */}
        <div className="field-group">
          <label className="field-label" htmlFor="custom-input">
            Custom text
            <span className="field-hint"> — or type your own word/phrase</span>
          </label>
          <input
            id="custom-input"
            type="text"
            className="custom-input"
            value={custom}
            onChange={handleCustomChange}
            placeholder="e.g. CAT DOG"
            spellCheck={false}
            autoCapitalize="characters"
          />
          {custom.length > 0 && (
            <p className="field-hint-below">
              Lowercase → uppercase · Symbols dropped · Spaces = blank cells
            </p>
          )}
        </div>

        {/* Cell size slider */}
        <div className="field-group">
          <label className="field-label" htmlFor="size-slider">
            Cell Size: <strong>{CELL_SIZE_LABELS[cellSize - 1]}</strong>
          </label>
          <div className="slider-row">
            <span className="slider-label-left">Smaller</span>
            <input
              id="size-slider"
              type="range"
              min="1"
              max="5"
              step="1"
              value={cellSize}
              onChange={e => setCellSize(Number(e.target.value))}
              className="size-slider"
            />
            <span className="slider-label-right">Larger</span>
          </div>
          <div className="slider-ticks" aria-hidden="true">
            {CELL_SIZE_LABELS.map((label, i) => (
              <span key={i} className={`tick${cellSize === i + 1 ? ' active' : ''}`}>{label}</span>
            ))}
          </div>
        </div>

        {/* Opacity slider */}
        <div className="field-group">
          <label className="field-label" htmlFor="opacity-slider">
            Opacity: <strong>{Math.round(opacity * 100)}%</strong>
          </label>
          <div className="slider-row">
            <span className="slider-label-left">Faint</span>
            <input
              id="opacity-slider"
              type="range"
              min="0.2"
              max="1"
              step="0.05"
              value={opacity}
              onChange={e => setOpacity(Number(e.target.value))}
              className="size-slider"
            />
            <span className="slider-label-right">Dark</span>
          </div>
        </div>

        {/* Generate button */}
        <button
          type="button"
          className="generate-btn"
          onClick={handleGenerate}
          disabled={!canGenerate}
        >
          Generate Worksheet
        </button>
      </section>
    </main>
  )
}
