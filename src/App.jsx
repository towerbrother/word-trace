import { useState } from 'react'
import ConfigPanel from './components/ConfigPanel.jsx'
import Worksheet from './components/Worksheet.jsx'

export default function App() {
  const [view, setView] = useState('home')
  const [config, setConfig] = useState(null)

  function handleGenerate(cfg) {
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
