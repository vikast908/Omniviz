import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

function Level2Architecture() {
  const {
    tokens,
    attentionWeights,
    currentLayer,
    setCurrentLayer,
    maxLayers,
    showAttentionLines,
    setShowAttentionLines,
    hoveredTokenIndex,
    setHoveredTokenIndex
  } = useStore()

  // Architecture components
  const components = [
    { id: 'ln1', label: 'Layer Norm 1', color: '#22c55e' },
    { id: 'attention', label: 'Multi-Head Attention', color: '#7c3aed', main: true },
    { id: 'ln2', label: 'Layer Norm 2', color: '#22c55e' },
    { id: 'mlp', label: 'Feed-Forward (MLP)', color: '#3b82f6', main: true },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 overflow-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-2 text-omniviz-text"
      >
        Transformer Architecture
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-omniviz-text-muted mb-8"
      >
        Layer {currentLayer} of {maxLayers}
      </motion.p>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-omniviz-surface rounded-xl border border-omniviz-border p-6"
        >
          <h3 className="text-lg font-semibold text-omniviz-accent mb-4">Single GPT Layer (Exploded View)</h3>

          {/* Vertical flow diagram */}
          <div className="flex flex-col items-center gap-4">
            {/* Input */}
            <div className="w-full h-12 bg-omniviz-bg rounded-lg border border-omniviz-border flex items-center justify-center">
              <span className="text-omniviz-text-muted">Input Embeddings</span>
            </div>

            <svg className="w-4 h-6 text-omniviz-accent">
              <path d="M2 0 L2 24" stroke="currentColor" strokeWidth="2" />
              <path d="M2 24 L0 20 M2 24 L4 20" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>

            {/* Components */}
            {components.map((comp, i) => (
              <motion.div key={comp.id} className="w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`w-full p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    comp.main ? 'glow' : ''
                  }`}
                  style={{
                    backgroundColor: `${comp.color}15`,
                    borderColor: comp.color
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-omniviz-text">{comp.label}</span>
                    {comp.main && (
                      <span className="text-xs px-2 py-1 rounded bg-omniviz-bg text-omniviz-text-muted">
                        Zoom in to explore
                      </span>
                    )}
                  </div>
                  {comp.id === 'attention' && (
                    <p className="text-xs text-omniviz-text-muted mt-2">
                      8 attention heads process tokens in parallel
                    </p>
                  )}
                  {comp.id === 'mlp' && (
                    <p className="text-xs text-omniviz-text-muted mt-2">
                      2-layer network with GELU activation
                    </p>
                  )}
                </motion.div>
                {i < components.length - 1 && (
                  <div className="flex justify-center my-2">
                    <svg className="w-4 h-6 text-omniviz-accent">
                      <path d="M2 0 L2 24" stroke="currentColor" strokeWidth="2" />
                      <path d="M2 24 L0 20 M2 24 L4 20" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}

            <svg className="w-4 h-6 text-omniviz-accent">
              <path d="M2 0 L2 24" stroke="currentColor" strokeWidth="2" />
              <path d="M2 24 L0 20 M2 24 L4 20" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>

            {/* Output */}
            <div className="w-full h-12 bg-omniviz-bg rounded-lg border border-omniviz-border flex items-center justify-center">
              <span className="text-omniviz-text-muted">Output to Next Layer</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Attention Visualization */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-omniviz-surface rounded-xl border border-omniviz-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-omniviz-accent">Attention Visualization</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showAttentionLines}
                onChange={(e) => setShowAttentionLines(e.target.checked)}
                className="w-4 h-4 rounded border-omniviz-border bg-omniviz-bg checked:bg-omniviz-accent"
              />
              <span className="text-sm text-omniviz-text-muted">Show Connections</span>
            </label>
          </div>

          {/* Token attention view */}
          <div className="relative bg-omniviz-bg rounded-lg p-4 min-h-[200px]">
            {/* Source tokens */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tokens.map((token, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  onMouseEnter={() => setHoveredTokenIndex(i)}
                  onMouseLeave={() => setHoveredTokenIndex(null)}
                  className={`px-3 py-1 rounded-md border-2 cursor-pointer transition-all ${
                    hoveredTokenIndex === i ? 'ring-2 ring-white' : ''
                  }`}
                  style={{
                    backgroundColor: `${token.color}20`,
                    borderColor: token.color
                  }}
                >
                  {token.text}
                </motion.span>
              ))}
            </div>

            {/* Attention lines */}
            {showAttentionLines && hoveredTokenIndex !== null && (
              <svg className="absolute inset-0 pointer-events-none overflow-visible">
                {tokens.map((_, j) => {
                  const weight = attentionWeights[hoveredTokenIndex]?.[j] || 0
                  if (weight < 0.1) return null
                  return (
                    <motion.line
                      key={j}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: weight }}
                      x1={`${(hoveredTokenIndex + 0.5) * (100 / tokens.length)}%`}
                      y1="40"
                      x2={`${(j + 0.5) * (100 / tokens.length)}%`}
                      y2="120"
                      stroke={tokens[hoveredTokenIndex]?.color || '#7c3aed'}
                      strokeWidth={weight * 4}
                      strokeOpacity={weight}
                    />
                  )
                })}
              </svg>
            )}

            {/* Target tokens (repeated) */}
            <div className="flex flex-wrap gap-2 mt-16">
              {tokens.map((token, i) => {
                const weight = hoveredTokenIndex !== null
                  ? attentionWeights[hoveredTokenIndex]?.[i] || 0
                  : 0.5
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.3 + weight * 0.7, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="px-3 py-1 rounded-md border-2"
                    style={{
                      backgroundColor: `${token.color}${Math.round(weight * 40).toString(16).padStart(2, '0')}`,
                      borderColor: token.color,
                      transform: `scale(${0.8 + weight * 0.4})`
                    }}
                  >
                    {token.text}
                  </motion.span>
                )
              })}
            </div>

            {hoveredTokenIndex !== null && (
              <p className="text-xs text-omniviz-text-muted mt-4 text-center">
                "{tokens[hoveredTokenIndex]?.text}" attends to other tokens
              </p>
            )}
          </div>

          {/* Layer slider */}
          <div className="mt-6">
            <label className="text-sm text-omniviz-text-muted block mb-2">
              Layer: {currentLayer} (Early layers = grammar, Later layers = semantics)
            </label>
            <input
              type="range"
              min={1}
              max={maxLayers}
              value={currentLayer}
              onChange={(e) => setCurrentLayer(parseInt(e.target.value))}
              className="w-full h-2 bg-omniviz-bg rounded-lg appearance-none cursor-pointer accent-omniviz-accent"
            />
            <div className="flex justify-between text-xs text-omniviz-text-muted mt-1">
              <span>Grammar Features</span>
              <span>Semantic Concepts</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-omniviz-text-muted text-sm mt-8 max-w-lg"
      >
        Attention allows tokens to "look at" other tokens to understand context.
        The word "bank" connects differently to "river" vs "money".
      </motion.p>
    </div>
  )
}

export default Level2Architecture
