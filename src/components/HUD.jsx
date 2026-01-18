import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

function HUD() {
  const { zoomLevel, setZoomLevel } = useStore()

  const levels = [
    { id: 0, label: 'Overview', short: 'Chat' },
    { id: 1, label: 'Pipeline', short: 'Data' },
    { id: 2, label: 'Architecture', short: 'Layer' },
    { id: 3, label: 'Math', short: 'Math' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Breadcrumb trail */}
      <div className="bg-omniviz-surface/90 backdrop-blur-sm rounded-xl border border-omniviz-border p-3 shadow-lg">
        <div className="flex items-center gap-2">
          {levels.map((level, i) => (
            <div key={level.id} className="flex items-center">
              <button
                onClick={() => setZoomLevel(level.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  zoomLevel === level.id
                    ? 'bg-omniviz-accent text-white'
                    : zoomLevel > level.id
                    ? 'text-omniviz-accent hover:bg-omniviz-accent/20'
                    : 'text-omniviz-text-muted hover:bg-omniviz-bg'
                }`}
              >
                {level.short}
              </button>
              {i < levels.length - 1 && (
                <svg
                  className={`w-4 h-4 mx-1 ${
                    zoomLevel > level.id ? 'text-omniviz-accent' : 'text-omniviz-border'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Current level description */}
        <p className="text-xs text-omniviz-text-muted mt-2 px-1">
          {levels[zoomLevel]?.label} View
        </p>
      </div>

      {/* Zoom controls */}
      <div className="mt-3 bg-omniviz-surface/90 backdrop-blur-sm rounded-xl border border-omniviz-border p-2 shadow-lg flex flex-col gap-1">
        <button
          onClick={() => setZoomLevel(zoomLevel - 1)}
          disabled={zoomLevel === 0}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-omniviz-text hover:bg-omniviz-bg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-omniviz-accent text-sm font-bold">
          {zoomLevel + 1}x
        </div>
        <button
          onClick={() => setZoomLevel(zoomLevel + 1)}
          disabled={zoomLevel === 3}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-omniviz-text hover:bg-omniviz-bg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

export default HUD
