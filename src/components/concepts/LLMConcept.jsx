import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function Section({ title, id, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="py-12 border-b border-omniviz-border last:border-0"
    >
      {title && <h2 className="text-2xl font-bold mb-8 text-omniviz-text">{title}</h2>}
      {children}
    </motion.section>
  )
}

function ExplanationCard({ children }) {
  return (
    <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">
      {children}
    </div>
  )
}

// Token colors for visualization
const TOKEN_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#3b82f6', '#a855f7', '#ec4899', '#14b8a6'
]

// Simple tokenizer simulation
function tokenizeText(text) {
  const words = text.split(/(\s+)/).filter(Boolean)
  return words.map((word, i) => ({
    text: word.trim() || ' ',
    color: TOKEN_COLORS[i % TOKEN_COLORS.length],
    id: Math.floor(Math.random() * 50000)
  })).filter(t => t.text.trim())
}

function LLMConcept() {
  const [inputText, setInputText] = useState('The quick brown fox')
  const [tokens, setTokens] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [displayedOutput, setDisplayedOutput] = useState('')
  const [hoveredTokenIndex, setHoveredTokenIndex] = useState(null)

  useEffect(() => {
    setTokens(tokenizeText(inputText))
  }, [inputText])

  const generateResponse = async () => {
    setIsGenerating(true)
    setDisplayedOutput('')
    const response = "jumps over the lazy dog. This is a classic pangram containing every letter of the English alphabet."

    for (let i = 0; i < response.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 25))
      setDisplayedOutput(prev => prev + response[i])
    }
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Large Language Models" color="violet" />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <Section id="intro">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent"
            >
              Large Language Models
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-omniviz-text-muted max-w-3xl mx-auto"
            >
              Understanding how AI understands and generates human language through the power of transformers and attention mechanisms.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-violet-400 mb-4">What is an LLM?</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  A Large Language Model (LLM) is a neural network trained on vast amounts of text to understand and generate human language. Models like GPT, Claude, and LLaMA can write essays, answer questions, and even code.
                </p>
                <p>
                  The "magic" behind LLMs is actually sophisticated pattern recognition: they learn statistical relationships between words and concepts from billions of text examples.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-violet-400 font-semibold mb-2">Key Components:</div>
                  <ul className="text-sm space-y-1">
                    <li>• Tokenizer: Breaks text into digestible pieces</li>
                    <li>• Embeddings: Converts tokens to number vectors</li>
                    <li>• Transformer: Processes context via attention</li>
                    <li>• Output layer: Predicts next tokens</li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Try It: Chat Interface</h3>
              <div className="space-y-4">
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border min-h-[100px]">
                  {displayedOutput ? (
                    <p className="text-omniviz-text">
                      {displayedOutput}
                      {isGenerating && <span className="inline-block w-2 h-5 bg-violet-500 ml-1 animate-pulse" />}
                    </p>
                  ) : (
                    <p className="text-omniviz-text-muted italic">Output will appear here...</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter a prompt..."
                    className="w-full bg-omniviz-bg text-omniviz-text placeholder-omniviz-text-muted rounded-lg border border-omniviz-border p-4 pr-14 focus:outline-none focus:border-violet-500"
                  />
                  <button
                    onClick={generateResponse}
                    disabled={isGenerating || !inputText.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>

                <p className="text-xs text-omniviz-text-muted text-center italic">
                  "This looks like magic. How does it work?"
                </p>
              </div>
            </ExplanationCard>
          </div>
        </Section>

        {/* Tokenization Section */}
        <Section title="Step 1: Tokenization" id="tokenization">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Breaking Text into Tokens</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  Before an LLM can process text, it must be converted into <span className="text-blue-400 font-semibold">tokens</span> - pieces of text that the model can understand. Tokens can be words, subwords, or even individual characters.
                </p>
                <p>
                  Modern tokenizers like BPE (Byte Pair Encoding) split text efficiently: common words stay whole, while rare words are broken into smaller pieces.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-blue-400 font-semibold mb-2">Why Subword Tokenization?</div>
                  <ul className="text-sm space-y-1">
                    <li>• Handles any word, even unseen ones</li>
                    <li>• Keeps vocabulary size manageable (~50K tokens)</li>
                    <li>• Captures morphology: "running" = "run" + "ning"</li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>

            <div className="bg-omniviz-surface rounded-2xl border border-omniviz-border overflow-hidden">
              <div className="bg-omniviz-bg px-4 py-2 border-b border-omniviz-border">
                <span className="text-violet-400 text-sm font-semibold">Live Tokenization</span>
              </div>
              <div className="p-6">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border p-3 mb-4 focus:outline-none focus:border-violet-500"
                  placeholder="Type something..."
                />

                <div className="text-xs text-omniviz-text-muted mb-2">Tokens:</div>
                <div className="flex flex-wrap gap-2">
                  {tokens.map((token, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onMouseEnter={() => setHoveredTokenIndex(i)}
                      onMouseLeave={() => setHoveredTokenIndex(null)}
                      className={`px-3 py-2 rounded-lg border-2 cursor-pointer transition-all ${
                        hoveredTokenIndex === i ? 'ring-2 ring-white scale-105' : ''
                      }`}
                      style={{
                        backgroundColor: `${token.color}20`,
                        borderColor: token.color,
                      }}
                    >
                      <div className="font-mono text-sm" style={{ color: token.color }}>{token.text}</div>
                      <div className="text-[10px] text-omniviz-text-muted mt-1">ID: {token.id}</div>
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Data Pipeline Section */}
        <Section title="Step 2: The Data Pipeline" id="pipeline">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">From Text to Predictions</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  Once tokenized, text flows through several transformation stages before the model can make predictions. Each stage converts data into a form that reveals more semantic meaning.
                </p>
                <div className="space-y-3">
                  {[
                    { stage: 'Input Text', desc: 'Raw characters', icon: 'T' },
                    { stage: 'Tokenizer', desc: 'Subword pieces', icon: 'Tk' },
                    { stage: 'Token IDs', desc: 'Integer indices', icon: '#' },
                    { stage: 'Embeddings', desc: '768-dim vectors', icon: 'E' },
                    { stage: 'Transformer', desc: 'Context mixing', icon: 'Tr' },
                    { stage: 'Output', desc: 'Probabilities', icon: 'O' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.stage}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-omniviz-bg border border-omniviz-border flex items-center justify-center text-violet-400 font-mono text-sm">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-omniviz-text">{item.stage}</div>
                        <div className="text-xs text-omniviz-text-muted">{item.desc}</div>
                      </div>
                      {i < 5 && (
                        <svg className="w-4 h-4 text-omniviz-text-muted ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </ExplanationCard>

            <div className="space-y-4">
              <EmbeddingVisualizer tokens={tokens} hoveredTokenIndex={hoveredTokenIndex} setHoveredTokenIndex={setHoveredTokenIndex} />
              <PredictionVisualizer />
            </div>
          </div>
        </Section>

        {/* Positional Encoding Section */}
        <Section title="Step 2.5: Positional Encoding" id="position">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-pink-400 mb-4">Why Position Matters</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  Unlike RNNs that process tokens one-by-one, Transformers see all tokens at once. But
                  <span className="text-pink-400 font-semibold"> word order matters!</span> "The dog bit the man"
                  means something very different from "The man bit the dog."
                </p>
                <p>
                  <span className="text-cyan-400 font-semibold">Positional encoding</span> adds information about
                  each token's position in the sequence. Without it, the model couldn't tell the difference between
                  "ABC" and "CBA".
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-pink-400 font-semibold mb-2">How It Works</div>
                  <p className="text-sm">
                    Position information is <span className="text-green-400">added</span> to word embeddings using
                    sine and cosine functions of different frequencies:
                  </p>
                  <div className="font-mono text-xs mt-2 p-2 bg-omniviz-surface rounded text-omniviz-text border border-omniviz-border">
                    PE(pos, 2i) = sin(pos / 10000^(2i/d))<br/>
                    PE(pos, 2i+1) = cos(pos / 10000^(2i/d))
                  </div>
                </div>
              </div>
            </ExplanationCard>

            <PositionalEncodingDemo tokens={tokens} />
          </div>
        </Section>

        {/* Transformer Architecture Section */}
        <Section title="Step 3: Transformer Architecture" id="architecture">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Inside a Transformer Layer</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  The <span className="text-cyan-400 font-semibold">Transformer</span> is the neural network architecture that powers modern LLMs. Each layer contains two main components that process the embedded tokens.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-cyan-400 font-semibold mb-2">Layer Components:</div>
                  <div className="space-y-2">
                    <div className="p-2 bg-omniviz-surface rounded">
                      <span className="text-purple-400 font-semibold">Multi-Head Attention:</span>
                      <span className="text-sm ml-2">Lets tokens look at each other</span>
                    </div>
                    <div className="p-2 bg-omniviz-surface rounded">
                      <span className="text-blue-400 font-semibold">Feed-Forward (MLP):</span>
                      <span className="text-sm ml-2">Processes each token independently</span>
                    </div>
                    <div className="p-2 bg-omniviz-surface rounded">
                      <span className="text-green-400 font-semibold">Layer Norm:</span>
                      <span className="text-sm ml-2">Stabilizes training</span>
                    </div>
                  </div>
                </div>
                <p>
                  GPT-3 has 96 layers stacked, each refining the representation. Early layers capture syntax, while later layers understand semantics and context.
                </p>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Single Layer (Exploded View)</h3>
              <div className="flex flex-col items-center gap-3">
                <div className="w-full h-10 bg-omniviz-bg rounded-lg border border-omniviz-border flex items-center justify-center text-sm text-omniviz-text-muted">
                  Input Embeddings
                </div>

                <svg className="w-4 h-6 text-violet-400">
                  <path d="M2 0 L2 24 L0 20 M2 24 L4 20" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>

                {[
                  { label: 'Layer Norm 1', color: '#22c55e', main: false },
                  { label: 'Multi-Head Attention', color: '#7c3aed', main: true },
                  { label: 'Layer Norm 2', color: '#22c55e', main: false },
                  { label: 'Feed-Forward (MLP)', color: '#3b82f6', main: true },
                ].map((comp, i) => (
                  <motion.div
                    key={comp.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full"
                  >
                    <div
                      className={`w-full p-3 rounded-lg border-2 ${comp.main ? 'glow' : ''}`}
                      style={{
                        backgroundColor: `${comp.color}15`,
                        borderColor: comp.color
                      }}
                    >
                      <span className="text-sm font-medium text-omniviz-text">{comp.label}</span>
                    </div>
                    {i < 3 && (
                      <div className="flex justify-center my-2">
                        <svg className="w-4 h-6 text-violet-400">
                          <path d="M2 0 L2 24 L0 20 M2 24 L4 20" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}

                <svg className="w-4 h-6 text-violet-400">
                  <path d="M2 0 L2 24 L0 20 M2 24 L4 20" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>

                <div className="w-full h-10 bg-omniviz-bg rounded-lg border border-omniviz-border flex items-center justify-center text-sm text-omniviz-text-muted">
                  Output to Next Layer
                </div>
              </div>
            </ExplanationCard>
          </div>

          {/* Attention Visualization */}
          <AttentionVisualizer tokens={tokens} />
        </Section>

        {/* Mathematical Engine Section */}
        <Section title="Step 4: The Attention Mechanism" id="attention-math">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Query, Key, Value</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  The core of attention uses three learned projections of each token: <span className="text-red-400 font-semibold">Query</span>, <span className="text-green-400 font-semibold">Key</span>, and <span className="text-blue-400 font-semibold">Value</span>.
                </p>

                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border font-mono text-center text-lg text-omniviz-text">
                  Attention(Q, K, V) = softmax(QK<sup>T</sup> / √d<sub>k</sub>) × V
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-omniviz-bg rounded-lg text-omniviz-text">
                    <span className="text-red-400 font-semibold">Query (Q):</span>
                    <span className="text-sm ml-2">"What am I looking for?"</span>
                  </div>
                  <div className="p-3 bg-omniviz-bg rounded-lg text-omniviz-text">
                    <span className="text-green-400 font-semibold">Key (K):</span>
                    <span className="text-sm ml-2">"What information do I contain?"</span>
                  </div>
                  <div className="p-3 bg-omniviz-bg rounded-lg text-omniviz-text">
                    <span className="text-blue-400 font-semibold">Value (V):</span>
                    <span className="text-sm ml-2">"What should I pass along?"</span>
                  </div>
                </div>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">How Attention Works</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <ol className="list-decimal list-inside space-y-3 text-sm">
                  <li>
                    <span className="font-semibold text-omniviz-text">Compute similarity:</span> Each Query dot-products with all Keys to get attention scores
                  </li>
                  <li>
                    <span className="font-semibold text-omniviz-text">Scale and normalize:</span> Divide by √d<sub>k</sub> and apply softmax to get probabilities
                  </li>
                  <li>
                    <span className="font-semibold text-omniviz-text">Weighted sum:</span> Use probabilities to weight and sum Value vectors
                  </li>
                </ol>

                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-yellow-400 font-semibold mb-2">Multi-Head Attention:</div>
                  <p className="text-sm">
                    Instead of one attention mechanism, LLMs use 8-96 "heads" in parallel. Each head can learn different relationship patterns (syntax, semantics, coreference, etc.)
                  </p>
                </div>
              </div>
            </ExplanationCard>
          </div>

          <AttentionHeatmap tokens={tokens} />
        </Section>

        {/* Summary Section */}
        <Section title="Putting It All Together" id="summary">
          <ExplanationCard>
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">The Complete LLM Pipeline</h3>
              <p className="text-omniviz-text-muted">
                From your prompt to the model's response, here's the journey your text takes.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { stage: 'Text Input', icon: '📝', color: 'blue' },
                { stage: 'Tokenize', icon: '🔤', color: 'purple' },
                { stage: 'Embed', icon: '📊', color: 'cyan' },
                { stage: 'Transform', icon: '🔄', color: 'yellow' },
                { stage: 'Attend', icon: '👀', color: 'orange' },
                { stage: 'Predict', icon: '🎯', color: 'green' },
              ].map((item, i) => (
                <motion.div
                  key={item.stage}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="bg-omniviz-surface p-4 rounded-xl border border-omniviz-border text-center min-w-[90px]">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className={`text-sm font-semibold text-${item.color}-400`}>{item.stage}</div>
                  </div>
                  {i < 5 && (
                    <svg className="w-6 h-6 text-omniviz-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-omniviz-bg rounded-lg text-center">
                <div className="text-3xl font-bold text-violet-400">175B</div>
                <div className="text-sm text-omniviz-text-muted">Parameters in GPT-3</div>
              </div>
              <div className="p-4 bg-omniviz-bg rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-400">96</div>
                <div className="text-sm text-omniviz-text-muted">Transformer Layers</div>
              </div>
              <div className="p-4 bg-omniviz-bg rounded-lg text-center">
                <div className="text-3xl font-bold text-cyan-400">~50K</div>
                <div className="text-sm text-omniviz-text-muted">Vocabulary Size</div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl border border-violet-500/30">
              <p className="text-omniviz-text-muted text-center">
                <span className="text-violet-400 font-semibold">Key Insight:</span> LLMs aren't truly "understanding" language in the human sense. They're incredibly sophisticated pattern matchers that learn statistical relationships between tokens. Yet through enough scale and data, emergent capabilities arise that feel remarkably intelligent.
              </p>
            </div>
          </ExplanationCard>
        </Section>
      </div>
    </div>
  )
}

// Embedding Visualizer Component
function EmbeddingVisualizer({ tokens, hoveredTokenIndex, setHoveredTokenIndex }) {
  const embeddings = tokens.map(() => [
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2
  ])

  return (
    <div className="bg-omniviz-surface rounded-xl p-6 border border-omniviz-border">
      <h4 className="text-sm font-semibold text-cyan-400 mb-3">Embedding Space (2D Projection)</h4>
      <div className="h-40 relative bg-omniviz-bg rounded-lg overflow-hidden">
        <svg className="w-full h-full">
          {embeddings.map((emb, i) => {
            const x = ((emb[0] + 1) / 2) * 100
            const y = ((emb[1] + 1) / 2) * 100
            return (
              <motion.circle
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
      <p className="text-xs text-omniviz-text-muted mt-2">
        Similar tokens cluster together in embedding space
      </p>
    </div>
  )
}

// Prediction Visualizer Component
function PredictionVisualizer() {
  const predictions = [
    { word: 'jumps', probability: 0.42 },
    { word: 'runs', probability: 0.23 },
    { word: 'walks', probability: 0.15 },
    { word: 'leaps', probability: 0.12 },
    { word: 'hops', probability: 0.08 },
  ]

  return (
    <div className="bg-omniviz-surface rounded-xl p-6 border border-omniviz-border">
      <h4 className="text-sm font-semibold text-green-400 mb-3">Output: Top 5 Predictions</h4>
      <div className="space-y-2">
        {predictions.map((pred, i) => (
          <motion.div
            key={pred.word}
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="w-14 text-sm text-omniviz-text">{pred.word}</span>
            <div className="flex-1 h-5 bg-omniviz-bg rounded overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pred.probability * 100}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
              />
            </div>
            <span className="w-10 text-sm text-omniviz-text-muted text-right">
              {(pred.probability * 100).toFixed(0)}%
            </span>
          </motion.div>
        ))}
      </div>
      <p className="text-xs text-omniviz-text-muted mt-2">
        Softmax converts scores to probability distribution
      </p>
    </div>
  )
}

// Attention Visualizer Component
function AttentionVisualizer({ tokens }) {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  // Generate random attention weights
  const attentionWeights = tokens.map(() =>
    tokens.map(() => Math.random())
  )

  return (
    <ExplanationCard>
      <h3 className="text-lg font-semibold text-purple-400 mb-4">Attention Visualization</h3>
      <p className="text-sm text-omniviz-text-muted mb-6">
        Hover over a token to see which other tokens it "attends to". Brighter connections indicate stronger attention.
      </p>

      <div className="relative bg-omniviz-bg rounded-lg p-6 min-h-[200px]">
        {/* Source tokens */}
        <div className="flex flex-wrap gap-2 mb-12">
          {tokens.map((token, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`px-3 py-1.5 rounded-md border-2 cursor-pointer transition-all text-omniviz-text ${
                hoveredIdx === i ? 'ring-2 ring-white scale-110' : ''
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

        {/* Attention arrows */}
        {hoveredIdx !== null && (
          <div className="flex flex-wrap gap-2">
            {tokens.map((token, i) => {
              const weight = attentionWeights[hoveredIdx]?.[i] || 0
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.3 + weight * 0.7, y: 0 }}
                  className="px-3 py-1.5 rounded-md border-2 text-omniviz-text"
                  style={{
                    backgroundColor: `${token.color}${Math.round(weight * 60).toString(16).padStart(2, '0')}`,
                    borderColor: token.color,
                    transform: `scale(${0.8 + weight * 0.4})`
                  }}
                >
                  {token.text}
                </motion.span>
              )
            })}
          </div>
        )}

        {hoveredIdx !== null && (
          <p className="text-sm text-omniviz-text-muted mt-6 text-center">
            "{tokens[hoveredIdx]?.text}" attends to other tokens with varying strengths
          </p>
        )}

        {hoveredIdx === null && (
          <p className="text-sm text-omniviz-text-muted text-center">
            Hover over a token above to see its attention pattern
          </p>
        )}
      </div>
    </ExplanationCard>
  )
}

// Attention Heatmap Component
function AttentionHeatmap({ tokens }) {
  const matrixSize = Math.min(tokens.length, 6)

  // Generate attention scores
  const heatmap = Array(matrixSize).fill(0).map(() =>
    Array(matrixSize).fill(0).map(() => Math.random())
  )

  return (
    <ExplanationCard>
      <h3 className="text-lg font-semibold text-orange-400 mb-4">Attention Heatmap</h3>
      <p className="text-sm text-omniviz-text-muted mb-6">
        This matrix shows how much each token (row) attends to other tokens (column). Brighter = more attention.
      </p>

      <div className="flex justify-center">
        <div className="bg-omniviz-bg rounded-lg p-4 inline-block">
          {/* Column labels */}
          <div className="flex mb-2 ml-16">
            {tokens.slice(0, matrixSize).map((token, i) => (
              <div key={i} className="w-12 text-xs text-center truncate" style={{ color: token.color }}>
                {token.text}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="flex flex-col gap-1">
            {heatmap.map((row, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-14 text-xs text-right pr-2 truncate" style={{ color: tokens[i]?.color }}>
                  {tokens[i]?.text}
                </div>
                {row.map((val, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i * matrixSize + j) * 0.03 }}
                    className="w-12 h-10 rounded flex items-center justify-center text-xs font-mono"
                    style={{
                      backgroundColor: `rgba(124, 58, 237, ${val})`,
                      color: val > 0.5 ? 'white' : '#94a3b8'
                    }}
                  >
                    {(val * 100).toFixed(0)}%
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-xs text-omniviz-text-muted">Low</span>
            <div className="w-24 h-3 rounded bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-xs text-omniviz-text-muted">High</span>
          </div>
        </div>
      </div>
    </ExplanationCard>
  )
}

// Positional Encoding Demo
function PositionalEncodingDemo({ tokens }) {
  // Generate sinusoidal positional encodings for visualization
  const generatePE = (pos, dim) => {
    const pe = []
    for (let i = 0; i < dim; i++) {
      const angle = pos / Math.pow(10000, (2 * Math.floor(i / 2)) / dim)
      pe.push(i % 2 === 0 ? Math.sin(angle) : Math.cos(angle))
    }
    return pe
  }

  const numTokens = Math.min(tokens.length || 4, 6)
  const dims = 8 // Simplified to 8 dimensions for visualization

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <h4 className="text-sm font-semibold text-pink-400 mb-4">Positional Encoding Visualization</h4>

      <div className="space-y-4">
        <div className="text-xs text-omniviz-text-muted mb-2">
          Each row shows positional encoding for that position (simplified to {dims} dimensions):
        </div>

        <div className="overflow-x-auto">
          <div className="space-y-2">
            {Array.from({ length: numTokens }).map((_, pos) => {
              const pe = generatePE(pos, dims)
              return (
                <motion.div
                  key={pos}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: pos * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-16 text-xs text-omniviz-text-muted flex-shrink-0">
                    pos={pos}
                    {tokens[pos] && <span className="ml-1 text-violet-400">({tokens[pos].text})</span>}
                  </div>
                  <div className="flex gap-1">
                    {pe.map((val, i) => (
                      <div
                        key={i}
                        className="w-8 h-6 rounded text-[10px] font-mono flex items-center justify-center"
                        style={{
                          backgroundColor: `rgba(236, 72, 153, ${Math.abs(val) * 0.8})`,
                          color: Math.abs(val) > 0.5 ? 'white' : '#94a3b8'
                        }}
                        title={`dim ${i}: ${val.toFixed(3)}`}
                      >
                        {val.toFixed(1)}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="p-3 bg-omniviz-bg rounded-lg text-xs text-omniviz-text-muted">
          <span className="text-pink-400 font-semibold">Notice:</span> Each position has a unique pattern.
          Lower dimensions change slowly, higher dimensions oscillate faster - creating a unique "fingerprint" for each position.
        </div>

        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-xs text-omniviz-text-muted">Low</span>
          <div className="w-20 h-3 rounded bg-gradient-to-r from-transparent to-pink-500" />
          <span className="text-xs text-omniviz-text-muted">High</span>
        </div>
      </div>
    </div>
  )
}

export default LLMConcept
