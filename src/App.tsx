import { useState } from 'react'
import ConfigPanel from './components/ConfigPanel.tsx'
import Worksheet from './components/Worksheet.tsx'

export interface WorksheetConfig {
  text: string
  cellSize: number  // 1 (XS) – 5 (XXL)
}

export default function App() {
  const [view, setView] = useState<'home' | 'worksheet'>('home')
  const [config, setConfig] = useState<WorksheetConfig | null>(null)

  function handleGenerate(cfg: WorksheetConfig) {
    setConfig(cfg)
    setView('worksheet')
  }

  function handleBack() {
    setView('home')
  }

  if (view === 'worksheet' && config) {
    return <Worksheet config={config} onBack={handleBack} />
  }

  return <ConfigPanel onGenerate={handleGenerate} />
}
