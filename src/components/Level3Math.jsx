import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

function Level3Math() {
  const {
    tokens,
    qMatrix,
    kMatrix,
    vMatrix,
    attentionHeatmap,
    updateQMatrixValue
  } = useStore()

  const [selectedCell, setSelectedCell] = useState(null)

  const matrixSize = Math.min(tokens.length, 8)

  // Format number for display
  const formatNum = (n) => n?.toFixed(2) || '0.00'

  // Get color intensity for heatmap
  const getHeatmapColor = (value) => {
    const intensity = Math.round(value * 255)
    return `rgba(124, 58, 237, ${value})`
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-8 overflow-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-2 text-omniviz-text"
      >
        The Mathematical Engine
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-omniviz-text-muted mb-8"
      >
        Inside Multi-Head Attention
      </motion.p>

      {/* Formula */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-omniviz-surface rounded-xl border border-omniviz-border p-4 mb-8"
      >
        <p className="text-center font-mono text-omniviz-text">
          Attention(Q, K, V) = softmax(QK<sup>T</sup> / √d<sub>k</sub>) × V
        </p>
      </motion.div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Q, K, V Matrices */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-omniviz-surface rounded-xl border border-omniviz-border p-4"
        >
          <h3 className="text-lg font-semibold text-omniviz-accent mb-4">Q, K, V Matrices</h3>

          <div className="grid grid-cols-3 gap-4">
            {/* Query Matrix */}
            <div>
              <h4 className="text-sm font-medium text-red-400 mb-2 text-center">Query (Q)</h4>
              <div className="bg-omniviz-bg rounded-lg p-2 overflow-auto">
                <table className="text-xs font-mono">
                  <tbody>
                    {qMatrix.slice(0, matrixSize).map((row, i) => (
                      <tr key={i}>
                        {row.map((val, j) => (
                          <td
                            key={j}
                            onClick={() => setSelectedCell({ matrix: 'q', row: i, col: j })}
                            className={`p-1 cursor-pointer hover:bg-omniviz-accent/20 transition-colors ${
                              selectedCell?.matrix === 'q' && selectedCell.row === i && selectedCell.col === j
                                ? 'bg-omniviz-accent/30 ring-1 ring-omniviz-accent'
                                : ''
                            }`}
                          >
                            {formatNum(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Matrix */}
            <div>
              <h4 className="text-sm font-medium text-green-400 mb-2 text-center">Key (K)</h4>
              <div className="bg-omniviz-bg rounded-lg p-2 overflow-auto">
                <table className="text-xs font-mono">
                  <tbody>
                    {kMatrix.slice(0, matrixSize).map((row, i) => (
                      <tr key={i}>
                        {row.map((val, j) => (
                          <td key={j} className="p-1 text-omniviz-text-muted">
                            {formatNum(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Value Matrix */}
            <div>
              <h4 className="text-sm font-medium text-blue-400 mb-2 text-center">Value (V)</h4>
              <div className="bg-omniviz-bg rounded-lg p-2 overflow-auto">
                <table className="text-xs font-mono">
                  <tbody>
                    {vMatrix.slice(0, matrixSize).map((row, i) => (
                      <tr key={i}>
                        {row.map((val, j) => (
                          <td key={j} className="p-1 text-omniviz-text-muted">
                            {formatNum(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Value editor */}
          {selectedCell && selectedCell.matrix === 'q' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-omniviz-bg rounded-lg"
            >
              <p className="text-sm text-omniviz-text-muted mb-2">
                Tweak Q[{selectedCell.row}][{selectedCell.col}]:
              </p>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.1}
                value={qMatrix[selectedCell.row]?.[selectedCell.col] || 0}
                onChange={(e) => updateQMatrixValue(selectedCell.row, selectedCell.col, parseFloat(e.target.value))}
                className="w-full h-2 bg-omniviz-border rounded-lg appearance-none cursor-pointer accent-omniviz-accent"
              />
              <p className="text-xs text-omniviz-text-muted mt-1 text-center">
                Value: {formatNum(qMatrix[selectedCell.row]?.[selectedCell.col])}
              </p>
            </motion.div>
          )}

          <p className="text-xs text-omniviz-text-muted mt-3">
            Click a cell in Q to modify it and see how attention changes
          </p>
        </motion.div>

        {/* Attention Heatmap */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-omniviz-surface rounded-xl border border-omniviz-border p-4"
        >
          <h3 className="text-lg font-semibold text-omniviz-accent mb-4">Attention Heatmap</h3>
          <p className="text-sm text-omniviz-text-muted mb-4">
            softmax(QK<sup>T</sup> / √d<sub>k</sub>) - How much each token attends to others
          </p>

          <div className="bg-omniviz-bg rounded-lg p-4">
            {/* Column labels */}
            <div className="flex mb-2 ml-16">
              {tokens.slice(0, matrixSize).map((token, i) => (
                <div
                  key={i}
                  className="w-12 text-xs text-center truncate"
                  style={{ color: token.color }}
                >
                  {token.text}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="flex flex-col gap-1">
              {attentionHeatmap.slice(0, matrixSize).map((row, i) => (
                <div key={i} className="flex items-center gap-1">
                  {/* Row label */}
                  <div
                    className="w-14 text-xs text-right pr-2 truncate"
                    style={{ color: tokens[i]?.color }}
                  >
                    {tokens[i]?.text}
                  </div>
                  {/* Cells */}
                  {row.slice(0, matrixSize).map((val, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + (i * matrixSize + j) * 0.02 }}
                      className="w-12 h-10 rounded flex items-center justify-center text-xs font-mono"
                      style={{
                        backgroundColor: getHeatmapColor(val),
                        color: val > 0.5 ? 'white' : '#94a3b8'
                      }}
                    >
                      {(val * 100).toFixed(0)}%
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-xs text-omniviz-text-muted">Low</span>
            <div className="w-32 h-3 rounded bg-gradient-to-r from-transparent to-omniviz-accent" />
            <span className="text-xs text-omniviz-text-muted">High</span>
          </div>
        </motion.div>
      </div>

      {/* Mathematical explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-4xl mt-8 bg-omniviz-surface rounded-xl border border-omniviz-border p-6"
      >
        <h3 className="text-lg font-semibold text-omniviz-accent mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-omniviz-bg rounded-lg">
            <h4 className="font-medium text-red-400 mb-2">1. Query (Q)</h4>
            <p className="text-omniviz-text-muted">
              "What am I looking for?" - Each token's search query for relevant context.
            </p>
          </div>
          <div className="p-3 bg-omniviz-bg rounded-lg">
            <h4 className="font-medium text-green-400 mb-2">2. Key (K)</h4>
            <p className="text-omniviz-text-muted">
              "What do I contain?" - Each token's label describing its content.
            </p>
          </div>
          <div className="p-3 bg-omniviz-bg rounded-lg">
            <h4 className="font-medium text-blue-400 mb-2">3. Value (V)</h4>
            <p className="text-omniviz-text-muted">
              "What information to pass?" - The actual content that gets aggregated.
            </p>
          </div>
        </div>
        <p className="text-omniviz-text-muted mt-4 text-center">
          Q×K<sup>T</sup> computes similarity scores. Softmax normalizes them to probabilities.
          These probabilities weight the V vectors to create the output.
        </p>
      </motion.div>

      {/* Insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-omniviz-text-muted text-sm mt-8 max-w-lg"
      >
        This is the core "magic" - just matrix multiplication and softmax.
        By adjusting Q values, you can see how the model's focus shifts.
      </motion.p>
    </div>
  )
}

export default Level3Math
