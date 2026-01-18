import { motion } from 'framer-motion'
import { useStore } from '../../store/useStore'

function ZoomControls() {
  const { zoomLevel, setZoomLevel } = useStore()

  const levels = [
    { id: 0, label: 'Overview', icon: '1x' },
    { id: 1, label: 'Pipeline', icon: '2x' },
    { id: 2, label: 'Transformer', icon: '5x' },
    { id: 3, label: 'Attention', icon: '10x' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-50"
    >
      <div className="bg-omniviz-surface/95 backdrop-blur-sm rounded-xl border border-omniviz-border p-2 shadow-xl">
        {/* Zoom out button */}
        <motion.button
          onClick={() => setZoomLevel(zoomLevel - 1)}
          disabled={zoomLevel === 0}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-omniviz-text hover:bg-omniviz-bg disabled:opacity-30 disabled:cursor-not-allowed transition-all mb-2"
          whileHover={{ scale: zoomLevel > 0 ? 1.1 : 1 }}
          whileTap={{ scale: zoomLevel > 0 ? 0.95 : 1 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
        </motion.button>

        {/* Level buttons */}
        <div className="flex flex-col gap-1 py-2 border-y border-omniviz-border">
          {levels.map((level) => (
            <motion.button
              key={level.id}
              onClick={() => setZoomLevel(level.id)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                zoomLevel === level.id
                  ? 'bg-omniviz-accent text-white'
                  : zoomLevel > level.id
                  ? 'bg-omniviz-accent/20 text-omniviz-accent'
                  : 'text-omniviz-text-muted hover:bg-omniviz-bg'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={level.label}
            >
              {level.icon}
            </motion.button>
          ))}
        </div>

        {/* Zoom in button */}
        <motion.button
          onClick={() => setZoomLevel(zoomLevel + 1)}
          disabled={zoomLevel === 3}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-omniviz-text hover:bg-omniviz-bg disabled:opacity-30 disabled:cursor-not-allowed transition-all mt-2"
          whileHover={{ scale: zoomLevel < 3 ? 1.1 : 1 }}
          whileTap={{ scale: zoomLevel < 3 ? 0.95 : 1 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </motion.button>
      </div>

      {/* Current level tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute left-14 top-1/2 -translate-y-1/2 bg-omniviz-surface/95 backdrop-blur-sm rounded-lg border border-omniviz-border px-3 py-2 whitespace-nowrap"
      >
        <p className="text-xs text-omniviz-text-muted">Zoom Level</p>
        <p className="text-sm font-medium text-omniviz-text">{levels[zoomLevel]?.label}</p>
      </motion.div>
    </motion.div>
  )
}

export default ZoomControls
