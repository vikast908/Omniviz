import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

function Level1Pipeline() {
  const {
    inputText,
    tokens,
    tokenIds,
    embeddings,
    hoveredTokenIndex,
    setHoveredTokenIndex,
    setInputText
  } = useStore()

  const stages = [
    { id: 'input', label: 'Input Text', icon: 'T' },
    { id: 'tokenizer', label: 'Tokenizer', icon: 'Tk' },
    { id: 'ids', label: 'Token IDs', icon: '#' },
    { id: 'embedding', label: 'Embeddings', icon: 'E' },
    { id: 'transformer', label: 'Transformer', icon: 'Tr' },
    { id: 'output', label: 'Output', icon: 'O' },
  ]

  // Top 5 mock predictions
  const predictions = [
    { word: 'jumps', probability: 0.42 },
    { word: 'runs', probability: 0.23 },
    { word: 'walks', probability: 0.15 },
    { word: 'leaps', probability: 0.12 },
    { word: 'hops', probability: 0.08 },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 overflow-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-8 text-omniviz-text"
      >
        The Data Pipeline
      </motion.h2>

      {/* Flow Diagram */}
      <div className="flex items-center gap-4 mb-12 flex-wrap justify-center">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-xl bg-omniviz-surface border border-omniviz-border flex items-center justify-center text-omniviz-accent font-mono text-lg glow">
                {stage.icon}
              </div>
              <span className="text-xs text-omniviz-text-muted mt-2">{stage.label}</span>
            </div>
            {i < stages.length - 1 && (
              <svg className="w-8 h-8 text-omniviz-accent mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Stage Details */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stage A: Tokenizer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-omniviz-surface rounded-xl border border-omniviz-border p-4"
        >
          <h3 className="text-sm font-semibold text-omniviz-accent mb-3">Stage A: Tokenizer</h3>
          <div className="flex flex-wrap gap-2">
            {tokens.map((token, i) => (
              <motion.span
                key={i}
                onMouseEnter={() => setHoveredTokenIndex(i)}
                onMouseLeave={() => setHoveredTokenIndex(null)}
                whileHover={{ scale: 1.1 }}
                className={`px-3 py-1 rounded-md border-2 cursor-pointer transition-all ${
                  hoveredTokenIndex === i ? 'ring-2 ring-white' : ''
                }`}
                style={{
                  backgroundColor: `${token.color}20`,
                  borderColor: token.color,
                }}
              >
                {token.text}
              </motion.span>
            ))}
          </div>
          <p className="text-xs text-omniviz-text-muted mt-3">
            Text is split into tokens (subwords)
          </p>
        </motion.div>

        {/* Stage B: Token IDs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-omniviz-surface rounded-xl border border-omniviz-border p-4"
        >
          <h3 className="text-sm font-semibold text-omniviz-accent mb-3">Stage B: Token IDs</h3>
          <div className="flex flex-wrap gap-2">
            {tokens.map((token, i) => (
              <motion.span
                key={i}
                onMouseEnter={() => setHoveredTokenIndex(i)}
                onMouseLeave={() => setHoveredTokenIndex(null)}
                whileHover={{ scale: 1.1 }}
                className={`px-3 py-1 rounded-md font-mono text-sm cursor-pointer transition-all ${
                  hoveredTokenIndex === i ? 'ring-2 ring-white' : ''
                }`}
                style={{
                  backgroundColor: `${token.color}20`,
                  borderColor: token.color,
                  border: `2px solid ${token.color}`
                }}
              >
                {tokenIds[i]}
              </motion.span>
            ))}
          </div>
          <p className="text-xs text-omniviz-text-muted mt-3">
            Each token maps to a unique integer ID
          </p>
        </motion.div>

        {/* Stage C: Embeddings (3D Point Cloud Preview) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-omniviz-surface rounded-xl border border-omniviz-border p-4"
        >
          <h3 className="text-sm font-semibold text-omniviz-accent mb-3">Stage C: Embeddings</h3>
          <div className="h-32 relative bg-omniviz-bg rounded-lg overflow-hidden">
            {/* Simple 2D representation of embedding space */}
            <svg className="w-full h-full">
              {embeddings.map((emb, i) => {
                const x = ((emb[0] + 1) / 2) * 100
                const y = ((emb[1] + 1) / 2) * 100
                return (
                  <motion.circle
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r={hoveredTokenIndex === i ? 12 : 8}
                    fill={tokens[i]?.color || '#7c3aed'}
                    opacity={hoveredTokenIndex === i ? 1 : 0.7}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredTokenIndex(i)}
                    onMouseLeave={() => setHoveredTokenIndex(null)}
                  />
                )
              })}
            </svg>
          </div>
          <p className="text-xs text-omniviz-text-muted mt-3">
            IDs become 768-dimensional vectors
          </p>
        </motion.div>
      </div>

      {/* Transformer Stack & Output */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Stage D: Transformer Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-omniviz-surface rounded-xl border border-omniviz-border p-4"
        >
          <h3 className="text-sm font-semibold text-omniviz-accent mb-3">Stage D: Transformer Stack</h3>
          <div className="flex flex-col gap-2">
            {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].slice(0, 6).map((layer) => (
              <motion.div
                key={layer}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.7 + (12 - layer) * 0.05 }}
                className="h-6 bg-gradient-to-r from-omniviz-accent/30 to-omniviz-accent/10 rounded border border-omniviz-accent/30 flex items-center justify-center"
              >
                <span className="text-xs text-omniviz-text-muted">Layer {layer}</span>
              </motion.div>
            ))}
            <p className="text-xs text-omniviz-text-muted text-center">... 12 layers total</p>
          </div>
          <p className="text-xs text-omniviz-text-muted mt-3">
            Data flows through multiple transformer layers
          </p>
        </motion.div>

        {/* Stage E: Output Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-omniviz-surface rounded-xl border border-omniviz-border p-4"
        >
          <h3 className="text-sm font-semibold text-omniviz-accent mb-3">Stage E: Output (Top 5 Predictions)</h3>
          <div className="space-y-2">
            {predictions.map((pred, i) => (
              <motion.div
                key={pred.word}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <span className="w-16 text-sm text-omniviz-text">{pred.word}</span>
                <div className="flex-1 h-6 bg-omniviz-bg rounded overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pred.probability * 100}%` }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-omniviz-accent to-omniviz-accent-light"
                  />
                </div>
                <span className="w-12 text-sm text-omniviz-text-muted text-right">
                  {(pred.probability * 100).toFixed(0)}%
                </span>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-omniviz-text-muted mt-3">
            Model outputs probability distribution over vocabulary
          </p>
        </motion.div>
      </div>

      {/* Editable Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8 w-full max-w-md"
      >
        <label className="text-sm text-omniviz-text-muted block mb-2">
          Edit input to see changes:
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full bg-omniviz-surface text-omniviz-text rounded-lg border border-omniviz-border p-3 focus:outline-none focus:border-omniviz-accent"
        />
      </motion.div>
    </div>
  )
}

export default Level1Pipeline
