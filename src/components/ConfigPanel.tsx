import { useState, useEffect } from 'react'
import type { WorksheetConfig } from '../App.tsx'

const PRESETS: Record<string, string> = {
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
}

const LS_PRESET     = 'wt_preset'
const LS_CUSTOM     = 'wt_custom'
const LS_DIFFICULTY = 'wt_difficulty'

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
  const [preset, setPreset]         = useState(() => localStorage.getItem(LS_PRESET) || 'alphabet')
  const [custom, setCustom]         = useState(() => localStorage.getItem(LS_CUSTOM) || '')
  const [difficulty, setDifficulty] = useState(() => {
    const saved = localStorage.getItem(LS_DIFFICULTY)
    return saved ? Number(saved) : 5
  })

  // Persist on every change
  useEffect(() => { localStorage.setItem(LS_PRESET, preset) },     [preset])
  useEffect(() => { localStorage.setItem(LS_CUSTOM, custom) },     [custom])
  useEffect(() => { localStorage.setItem(LS_DIFFICULTY, String(difficulty)) }, [difficulty])

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
    onGenerate({ text, difficulty })
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

        {/* Difficulty slider */}
        <div className="field-group">
          <label className="field-label" htmlFor="difficulty-slider">
            Difficulty: <strong>{difficulty}</strong>
          </label>
          <div className="slider-row">
            <span className="slider-label-left">More guides</span>
            <input
              id="difficulty-slider"
              type="range"
              min="1"
              max="10"
              step="1"
              value={difficulty}
              onChange={e => setDifficulty(Number(e.target.value))}
              className="difficulty-slider"
            />
            <span className="slider-label-right">Fewer guides</span>
          </div>
          <div className="slider-ticks" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className={`tick${difficulty === i + 1 ? ' active' : ''}`}>{i + 1}</span>
            ))}
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
