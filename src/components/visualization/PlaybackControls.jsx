import { motion } from 'framer-motion'
import { useStore } from '../../store/useStore'

function PlaybackControls() {
  const {
    isPlaying,
    togglePlay,
    animationSpeed,
    setAnimationSpeed,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    resetAnimation,
  } = useStore()

  const speeds = [0.5, 1, 2]

  const stepLabels = [
    'Input',
    'Tokenize',
    'Embed',
    'Process',
    'Attend',
    'Output'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-omniviz-surface/95 backdrop-blur-sm rounded-2xl border border-omniviz-border p-4 shadow-xl">
        <div className="flex items-center gap-6">
          {/* Step indicator */}
          <div className="flex items-center gap-1">
            {Array(totalSteps).fill(0).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => useStore.getState().setCurrentStep(i)}
                className={`relative w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                  currentStep === i
                    ? 'bg-omniviz-accent text-white'
                    : currentStep > i
                    ? 'bg-omniviz-accent/20 text-omniviz-accent'
                    : 'bg-omniviz-bg text-omniviz-text-muted hover:bg-omniviz-border'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {i + 1}
                {currentStep === i && (
                  <motion.div
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-omniviz-accent"
                    layoutId="stepIndicator"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-omniviz-border" />

          {/* Playback controls */}
          <div className="flex items-center gap-2">
            {/* Previous */}
            <motion.button
              onClick={prevStep}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-omniviz-text-muted hover:text-omniviz-text hover:bg-omniviz-bg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Play/Pause */}
            <motion.button
              onClick={togglePlay}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-omniviz-accent text-white'
                  : 'bg-omniviz-bg text-omniviz-text hover:bg-omniviz-accent hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>

            {/* Next */}
            <motion.button
              onClick={nextStep}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-omniviz-text-muted hover:text-omniviz-text hover:bg-omniviz-bg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Reset */}
            <motion.button
              onClick={resetAnimation}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-omniviz-text-muted hover:text-omniviz-text hover:bg-omniviz-bg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.button>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-omniviz-border" />

          {/* Speed controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-omniviz-text-muted">Speed:</span>
            <div className="flex items-center bg-omniviz-bg rounded-lg p-1">
              {speeds.map((speed) => (
                <motion.button
                  key={speed}
                  onClick={() => setAnimationSpeed(speed)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    animationSpeed === speed
                      ? 'bg-omniviz-accent text-white'
                      : 'text-omniviz-text-muted hover:text-omniviz-text'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {speed}x
                </motion.button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-omniviz-border" />

          {/* Current step label */}
          <div className="text-sm">
            <span className="text-omniviz-text-muted">Step: </span>
            <span className="text-omniviz-text font-medium">{stepLabels[currentStep]}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PlaybackControls
