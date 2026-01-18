import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../../store/useStore'

// Simple token colors
const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6']

export default function LLMExplainer() {
  const { goToLanding } = useStore()
  const [input, setInput] = useState('The cat sat on')
  const [tokens, setTokens] = useState([])
  const [selectedToken, setSelectedToken] = useState(null)
  const [showNumbers, setShowNumbers] = useState(false)
  const [attentionFrom, setAttentionFrom] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Simple tokenization
  useEffect(() => {
    const words = input.split(' ').filter(w => w)
    setTokens(words.map((word, i) => ({
      text: word,
      color: COLORS[i % COLORS.length],
      id: Math.floor(Math.random() * 50000),
      embedding: Array(5).fill(0).map(() => (Math.random() * 2 - 1).toFixed(2))
    })))
    setSelectedToken(null)
    setAttentionFrom(null)
    setPrediction(null)
  }, [input])

  // Simulate prediction
  const predict = () => {
    setIsGenerating(true)
    setPrediction(null)

    setTimeout(() => {
      const predictions = [
        { word: 'the', prob: 0.35 },
        { word: 'a', prob: 0.25 },
        { word: 'my', prob: 0.18 },
        { word: 'his', prob: 0.12 },
        { word: 'her', prob: 0.10 },
      ]
      setPrediction(predictions)
      setIsGenerating(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-omniviz-bg text-omniviz-text">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-omniviz-bg/90 backdrop-blur border-b border-omniviz-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={goToLanding}
            className="flex items-center gap-2 text-omniviz-text-muted hover:text-omniviz-text transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-xl font-bold">How LLMs Work</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-24">

        {/* Section 1: The Big Picture */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-omniviz-text">The Big Picture</h2>
          <p className="text-omniviz-text-muted text-lg mb-8">
            An LLM is a <span className="text-omniviz-text">next-word prediction machine</span>.
            You give it some text, it predicts what word comes next.
          </p>

          <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm text-omniviz-text-muted mb-2 block">Your input:</label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-omniviz-bg text-xl p-4 rounded-xl border border-omniviz-border focus:border-omniviz-accent focus:outline-none text-omniviz-text"
                  placeholder="Type something..."
                />
              </div>

              <svg className="w-8 h-8 text-omniviz-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm text-omniviz-text-muted mb-2 block">LLM predicts:</label>
                <div className="bg-omniviz-bg text-xl p-4 rounded-xl border border-omniviz-border min-h-[60px] flex items-center">
                  {isGenerating ? (
                    <span className="text-omniviz-text-muted animate-pulse">thinking...</span>
                  ) : prediction ? (
                    <span className="text-omniviz-accent font-semibold">"{prediction[0].word}"</span>
                  ) : (
                    <button
                      onClick={predict}
                      className="text-omniviz-accent hover:underline"
                    >
                      Click to predict →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {prediction && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 pt-6 border-t border-omniviz-border"
              >
                <p className="text-sm text-omniviz-text-muted mb-3">Top predictions (with confidence):</p>
                <div className="flex gap-3 flex-wrap">
                  {prediction.map((p, i) => (
                    <div
                      key={i}
                      className="bg-omniviz-bg px-4 py-2 rounded-lg border border-omniviz-border"
                    >
                      <span className="font-medium text-omniviz-text">{p.word}</span>
                      <span className="text-omniviz-text-muted ml-2">{(p.prob * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Section 2: Tokenization */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-omniviz-text">Step 1: Breaking Text into Tokens</h2>
          <p className="text-omniviz-text-muted text-lg mb-8">
            LLMs don't read letters or words directly. They break text into <span className="text-omniviz-text">tokens</span> —
            small pieces that might be words, parts of words, or even single characters.
          </p>

          <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">
            <div className="mb-6">
              <p className="text-sm text-omniviz-text-muted mb-3">Your text becomes these tokens:</p>
              <div className="flex gap-2 flex-wrap">
                {tokens.map((token, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedToken(selectedToken === i ? null : i)}
                    className={`px-4 py-2 rounded-lg text-lg font-medium border-2 transition-all ${
                      selectedToken === i
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-omniviz-surface'
                        : ''
                    }`}
                    style={{
                      backgroundColor: `${token.color}20`,
                      borderColor: token.color,
                    }}
                  >
                    {token.text}
                  </motion.button>
                ))}
              </div>
            </div>

            {selectedToken !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-omniviz-bg rounded-xl border border-omniviz-border"
              >
                <p className="text-sm text-omniviz-text-muted">
                  Token "<span style={{ color: tokens[selectedToken].color }}>{tokens[selectedToken].text}</span>"
                  has ID: <span className="font-mono text-omniviz-text">{tokens[selectedToken].id}</span>
                </p>
                <p className="text-xs text-omniviz-text-muted mt-2">
                  (Each unique token maps to a number. GPT-4 has ~100,000 different tokens)
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Section 3: Embeddings */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-omniviz-text">Step 2: Tokens Become Numbers</h2>
          <p className="text-omniviz-text-muted text-lg mb-8">
            Each token is converted into a list of numbers called an <span className="text-omniviz-text">embedding</span>.
            These numbers capture the meaning of the token. Similar words have similar numbers.
          </p>

          <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-omniviz-text-muted">Show as:</span>
              <button
                onClick={() => setShowNumbers(false)}
                className={`px-3 py-1 rounded-lg text-sm ${!showNumbers ? 'bg-omniviz-accent text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
              >
                Words
              </button>
              <button
                onClick={() => setShowNumbers(true)}
                className={`px-3 py-1 rounded-lg text-sm ${showNumbers ? 'bg-omniviz-accent text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
              >
                Numbers
              </button>
            </div>

            <div className="space-y-3">
              {tokens.map((token, i) => (
                <motion.div
                  key={i}
                  layout
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-20 px-3 py-2 rounded-lg text-center font-medium border-2"
                    style={{
                      backgroundColor: `${token.color}20`,
                      borderColor: token.color,
                    }}
                  >
                    {token.text}
                  </div>

                  <svg className="w-6 h-6 text-omniviz-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>

                  <motion.div
                    layout
                    className="flex-1 bg-omniviz-bg rounded-lg p-3 font-mono text-sm overflow-x-auto text-omniviz-text"
                  >
                    {showNumbers ? (
                      <span className="text-omniviz-text-muted">
                        [{token.embedding.join(', ')} ... <span className="text-omniviz-accent">768 numbers total</span>]
                      </span>
                    ) : (
                      <div className="flex gap-1">
                        {token.embedding.map((val, j) => (
                          <div
                            key={j}
                            className="w-8 h-8 rounded"
                            style={{
                              backgroundColor: token.color,
                              opacity: (parseFloat(val) + 1) / 2 * 0.8 + 0.2
                            }}
                            title={val}
                          />
                        ))}
                        <span className="text-omniviz-text-muted ml-2">... 768 dimensions</span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Attention */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-omniviz-text">Step 3: Words Look at Each Other</h2>
          <p className="text-omniviz-text-muted text-lg mb-8">
            The magic happens in <span className="text-omniviz-text">attention</span>. Each token looks at every other token
            to understand context. Click a token to see what it pays attention to.
          </p>

          <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">
            <p className="text-sm text-omniviz-text-muted mb-4">Click a token to see its attention:</p>

            <div className="flex gap-3 flex-wrap mb-8">
              {tokens.map((token, i) => {
                // Generate attention weights
                const isSelected = attentionFrom === i
                let attention = tokens.map(() => Math.random())
                const sum = attention.reduce((a, b) => a + b, 0)
                attention = attention.map(a => a / sum)

                return (
                  <motion.button
                    key={i}
                    onClick={() => setAttentionFrom(attentionFrom === i ? null : i)}
                    className={`px-4 py-2 rounded-lg text-lg font-medium border-2 transition-all ${
                      isSelected ? 'ring-2 ring-white' : ''
                    }`}
                    style={{
                      backgroundColor: `${token.color}20`,
                      borderColor: token.color,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {token.text}
                  </motion.button>
                )
              })}
            </div>

            {attentionFrom !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm text-omniviz-text-muted mb-4">
                  "<span style={{ color: tokens[attentionFrom].color }}>{tokens[attentionFrom].text}</span>"
                  pays attention to:
                </p>

                <div className="space-y-2">
                  {tokens.map((token, i) => {
                    const weight = i === attentionFrom ? 0.4 : Math.random() * 0.3 + 0.05
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-16 text-right" style={{ color: token.color }}>
                          {token.text}
                        </span>
                        <div className="flex-1 h-6 bg-omniviz-bg rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${weight * 100}%` }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: tokens[attentionFrom].color }}
                          />
                        </div>
                        <span className="w-12 text-sm text-omniviz-text-muted">
                          {(weight * 100).toFixed(0)}%
                        </span>
                      </div>
                    )
                  })}
                </div>

                <p className="text-xs text-omniviz-text-muted mt-4">
                  This is how the model understands that "bank" means different things in "river bank" vs "bank account"
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Section 5: The Output */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-omniviz-text">Step 4: Predicting the Next Word</h2>
          <p className="text-omniviz-text-muted text-lg mb-8">
            After processing through many layers (GPT-4 has 120!), the model outputs a
            <span className="text-omniviz-text"> probability for every possible next word</span>.
            It picks one (usually the most likely) and that's your output.
          </p>

          <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">
            <div className="text-center">
              <p className="text-lg mb-4">
                <span className="text-omniviz-text-muted">Input: </span>
                <span className="text-omniviz-text">"{input}"</span>
              </p>

              <button
                onClick={predict}
                disabled={isGenerating}
                className="px-8 py-4 bg-omniviz-accent text-white rounded-xl text-lg font-semibold hover:bg-omniviz-accent-light transition-colors disabled:opacity-50"
              >
                {isGenerating ? 'Thinking...' : 'Predict Next Word'}
              </button>

              {prediction && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <p className="text-omniviz-text-muted mb-4">Model's top predictions:</p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {prediction.map((p, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`px-6 py-3 rounded-xl border-2 ${
                          i === 0
                            ? 'bg-omniviz-accent/20 border-omniviz-accent'
                            : 'bg-omniviz-bg border-omniviz-border'
                        }`}
                      >
                        <div className="text-2xl font-bold text-omniviz-text">{p.word}</div>
                        <div className="text-sm text-omniviz-text-muted">{(p.prob * 100).toFixed(0)}%</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="pb-12">
          <h2 className="text-3xl font-bold mb-4 text-omniviz-text">That's It!</h2>
          <div className="bg-gradient-to-r from-omniviz-accent/20 to-blue-500/20 rounded-2xl p-8 border border-omniviz-accent/30">
            <div className="flex items-start gap-6 flex-wrap">
              <div className="flex-1 min-w-[250px]">
                <h3 className="text-xl font-semibold mb-4">The LLM Pipeline:</h3>
                <ol className="space-y-3 text-omniviz-text-muted">
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-omniviz-accent flex items-center justify-center text-white font-bold">1</span>
                    <span><strong className="text-omniviz-text">Tokenize</strong> — Split text into pieces</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-omniviz-accent flex items-center justify-center text-white font-bold">2</span>
                    <span><strong className="text-omniviz-text">Embed</strong> — Convert to numbers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-omniviz-accent flex items-center justify-center text-white font-bold">3</span>
                    <span><strong className="text-omniviz-text">Attend</strong> — Words look at each other</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-omniviz-accent flex items-center justify-center text-white font-bold">4</span>
                    <span><strong className="text-omniviz-text">Predict</strong> — Output next word probabilities</span>
                  </li>
                </ol>
              </div>

              <div className="flex-1 min-w-[250px]">
                <h3 className="text-xl font-semibold mb-4">Key Insights:</h3>
                <ul className="space-y-2 text-omniviz-text-muted">
                  <li>• LLMs don't "understand" — they predict</li>
                  <li>• Everything is just numbers and math</li>
                  <li>• Attention is what makes them powerful</li>
                  <li>• The output is always probabilistic</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
