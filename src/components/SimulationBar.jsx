import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

function SimulationBar() {
  const {
    selectedModel,
    setSelectedModel,
    temperature,
    setTemperature,
    modelLoading,
    modelReady
  } = useStore()

  const models = [
    { id: 'gpt2', name: 'GPT-2 Small', description: 'Fast, decoder-only' },
    { id: 'bert', name: 'BERT Base', description: 'Encoder-only, bidirectional' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-omniviz-surface/95 backdrop-blur-sm rounded-xl border border-omniviz-border p-3 shadow-xl flex items-center gap-6">
        {/* Model Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-omniviz-text-muted whitespace-nowrap">Model:</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-omniviz-bg text-omniviz-text text-sm rounded-lg border border-omniviz-border px-3 py-1.5 focus:outline-none focus:border-omniviz-accent cursor-pointer"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <span className="text-xs text-omniviz-text-muted hidden sm:inline">
            {models.find(m => m.id === selectedModel)?.description}
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-omniviz-border" />

        {/* Temperature Control */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-omniviz-text-muted whitespace-nowrap">
            Temperature:
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-24 h-2 bg-omniviz-bg rounded-lg appearance-none cursor-pointer accent-omniviz-accent"
          />
          <span className="text-sm text-omniviz-text font-mono w-8">
            {temperature.toFixed(1)}
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-omniviz-border hidden sm:block" />

        {/* Status indicator */}
        <div className="hidden sm:flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              modelLoading
                ? 'bg-yellow-500 animate-pulse'
                : modelReady
                ? 'bg-green-500'
                : 'bg-omniviz-text-muted'
            }`}
          />
          <span className="text-xs text-omniviz-text-muted">
            {modelLoading ? 'Loading...' : modelReady ? 'Ready' : 'Demo Mode'}
          </span>
        </div>
      </div>

      {/* Temperature explanation tooltip */}
      <p className="text-center text-xs text-omniviz-text-muted mt-2 opacity-70">
        Low temp = focused, High temp = creative
      </p>
    </motion.div>
  )
}

export default SimulationBar
