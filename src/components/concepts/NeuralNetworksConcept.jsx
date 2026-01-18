import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

const COLORS = {
  input: '#3b82f6',
  hidden1: '#8b5cf6',
  hidden2: '#a855f7',
  output: '#22c55e',
  weight: '#f97316',
  bias: '#ec4899',
  activation: '#06b6d4',
  gradient: '#ef4444',
}

function NeuralNetworksConcept() {
  const [inputValues, setInputValues] = useState([0.5, 0.8, 0.3])
  const [weights, setWeights] = useState({
    layer1: [[0.4, -0.2, 0.6], [0.3, 0.5, -0.4], [-0.3, 0.7, 0.2], [0.6, -0.1, 0.3]],
    layer2: [[0.5, -0.3, 0.4, 0.2], [-0.2, 0.6, -0.1, 0.5]],
  })
  const [learningRate, setLearningRate] = useState(0.1)
  const [isTraining, setIsTraining] = useState(false)
  const [epoch, setEpoch] = useState(0)
  const [loss, setLoss] = useState(0.5)
  const [lossHistory, setLossHistory] = useState([0.8, 0.7, 0.6, 0.55, 0.5])

  const startTraining = () => {
    setIsTraining(true)
    let currentEpoch = epoch
    let currentLoss = loss

    const trainStep = () => {
      currentEpoch++
      currentLoss = Math.max(0.01, currentLoss * (0.95 - Math.random() * 0.05))
      setEpoch(currentEpoch)
      setLoss(currentLoss)
      setLossHistory(prev => [...prev.slice(-19), currentLoss])

      if (currentEpoch < epoch + 20) {
        setTimeout(trainStep, 200)
      } else {
        setIsTraining(false)
      }
    }
    trainStep()
  }

  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Neural Networks" color="blue" />

      {/* Scrollable Content */}
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <Section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Neural Networks
              </h1>
              <p className="text-xl text-omniviz-text-muted max-w-2xl mx-auto">
                Universal function approximators that learn patterns from data through layers of interconnected neurons
              </p>
            </motion.div>
          </Section>

          {/* What is a Neural Network */}
          <Section title="What is a Neural Network?" id="intro">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    A <span className="text-blue-400 font-semibold">neural network</span> is a computational model
                    inspired by the human brain. It consists of interconnected nodes (neurons) organized in layers
                    that process information.
                  </p>
                  <p className="text-omniviz-text-muted mb-4">
                    Information flows from the <span className="text-blue-400">input layer</span> through one or more
                    <span className="text-purple-400"> hidden layers</span>, and finally to the
                    <span className="text-green-400"> output layer</span>. Each connection has a weight that
                    determines its importance.
                  </p>
                  <div className="bg-omniviz-bg rounded-lg p-4 mt-4">
                    <h4 className="text-sm font-semibold text-omniviz-accent mb-2">Key Insight</h4>
                    <p className="text-sm text-omniviz-text-muted">
                      Neural networks don't need to be explicitly programmed with rules. Instead, they
                      <span className="text-cyan-400"> learn patterns</span> from examples, adjusting their
                      internal weights to minimize prediction errors.
                    </p>
                  </div>
                </div>
                <NetworkOverview
                  inputValues={inputValues}
                  setInputValues={setInputValues}
                  isTraining={isTraining}
                  startTraining={startTraining}
                  epoch={epoch}
                  loss={loss}
                  lossHistory={lossHistory}
                />
              </div>
            </ExplanationCard>
          </Section>

          {/* The Building Blocks */}
          <Section title="The Building Blocks" id="building-blocks">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: '📥',
                  title: 'Input Layer',
                  desc: 'Receives raw data features like pixels, words, or numbers',
                  color: 'blue'
                },
                {
                  icon: '🧠',
                  title: 'Hidden Layers',
                  desc: 'Transform inputs into increasingly abstract representations',
                  color: 'purple'
                },
                {
                  icon: '📤',
                  title: 'Output Layer',
                  desc: 'Produces final predictions or classifications',
                  color: 'green'
                },
                {
                  icon: '🔗',
                  title: 'Weights',
                  desc: 'Learnable parameters that control signal strength',
                  color: 'orange'
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-omniviz-surface rounded-xl p-6 border border-omniviz-border"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className={`font-semibold text-${item.color}-400 mb-2`}>{item.title}</div>
                  <p className="text-sm text-omniviz-text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Data Flow Through Layers */}
          <Section title="Data Flow Through Layers" id="data-flow">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    As data flows through the network, each layer transforms it. The
                    <span className="text-orange-400"> weights</span> determine how strongly each input
                    contributes to the next layer's neurons.
                  </p>
                  <div className="space-y-4 mt-6">
                    <div className="bg-omniviz-bg rounded-lg p-4 border border-omniviz-border">
                      <h4 className="text-sm font-semibold text-cyan-400 mb-2">ReLU (Hidden Layers)</h4>
                      <div className="font-mono text-sm bg-omniviz-surface p-2 rounded mb-2 text-omniviz-text border border-omniviz-border">f(x) = max(0, x)</div>
                      <p className="text-xs text-omniviz-text-muted">
                        Introduces non-linearity by zeroing negative values. Simple and computationally efficient.
                      </p>
                    </div>
                    <div className="bg-omniviz-bg rounded-lg p-4 border border-omniviz-border">
                      <h4 className="text-sm font-semibold text-purple-400 mb-2">Sigmoid (Output Layer)</h4>
                      <div className="font-mono text-sm bg-omniviz-surface p-2 rounded mb-2 text-omniviz-text border border-omniviz-border">f(x) = 1 / (1 + e^-x)</div>
                      <p className="text-xs text-omniviz-text-muted">
                        Squashes output to (0, 1) range, perfect for probability interpretation.
                      </p>
                    </div>
                  </div>
                </div>
                <LayerVisualization inputValues={inputValues} weights={weights} />
              </div>
            </ExplanationCard>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-green-500 rounded"></div>
                <span className="text-omniviz-text-muted">Positive weight (excitatory)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-red-500 rounded"></div>
                <span className="text-omniviz-text-muted">Negative weight (inhibitory)</span>
              </div>
            </div>
          </Section>

          {/* Inside a Single Neuron */}
          <Section title="Inside a Single Neuron" id="neuron">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    Each neuron performs a simple but powerful computation:
                  </p>
                  <ol className="space-y-3 text-omniviz-text-muted mb-6">
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold">1.</span>
                      <span><strong className="text-omniviz-text">Weighted Sum:</strong> Multiply each input by its weight and add them all together</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold">2.</span>
                      <span><strong className="text-omniviz-text">Add Bias:</strong> Add a bias term that shifts the activation threshold</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan-400 font-bold">3.</span>
                      <span><strong className="text-omniviz-text">Activation:</strong> Apply a non-linear function to produce the output</span>
                    </li>
                  </ol>

                  <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/30">
                    <h4 className="text-sm font-semibold mb-2">Why Non-Linearity?</h4>
                    <p className="text-xs text-omniviz-text-muted">
                      Without activation functions, stacking layers would just be matrix multiplication -
                      the network could only learn linear relationships. Non-linear activations enable
                      learning complex patterns like image recognition and language understanding.
                    </p>
                  </div>
                </div>
                <NeuronVisualization />
              </div>
            </ExplanationCard>
          </Section>

          {/* Activation Functions */}
          <Section title="Activation Functions" id="activations">
            <ExplanationCard>
              <p className="text-omniviz-text-muted mb-6 max-w-3xl">
                Activation functions introduce non-linearity, allowing networks to learn complex patterns.
                Different functions have different properties that make them suitable for various tasks.
              </p>
              <ActivationFunctionComparison />
            </ExplanationCard>
          </Section>

          {/* Training: How Networks Learn */}
          <Section title="Training: How Networks Learn" id="training">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-omniviz-text-muted mb-4">
                    Training a neural network is an iterative process of adjusting weights to minimize
                    prediction errors. This uses a technique called <span className="text-purple-400 font-semibold">backpropagation</span>
                    combined with <span className="text-green-400 font-semibold">gradient descent</span>.
                  </p>

                  <div className="space-y-4 mt-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center shrink-0">
                        <span className="text-red-400 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-400">Compute Loss</h4>
                        <p className="text-sm text-omniviz-text-muted">Measure how wrong the prediction is compared to the true answer</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0">
                        <span className="text-purple-400 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-400">Backpropagate</h4>
                        <p className="text-sm text-omniviz-text-muted">Calculate how much each weight contributed to the error using chain rule</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center shrink-0">
                        <span className="text-green-400 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-400">Update Weights</h4>
                        <p className="text-sm text-omniviz-text-muted">Adjust weights in the direction that reduces the error</p>
                      </div>
                    </div>
                  </div>
                </div>

                <TrainingSimulation
                  isTraining={isTraining}
                  startTraining={startTraining}
                  epoch={epoch}
                  loss={loss}
                  lossHistory={lossHistory}
                  learningRate={learningRate}
                  setLearningRate={setLearningRate}
                />
              </div>
            </ExplanationCard>
          </Section>

          {/* The Mathematics */}
          <Section title="The Mathematics" id="math">
            <ExplanationCard>
              <p className="text-omniviz-text-muted mb-6">
                Understanding the math behind neural networks reveals how elegant the learning process truly is.
                Here are the key equations that make it all work.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Forward Pass */}
                <div className="bg-omniviz-bg rounded-xl p-5 border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-4">Forward Propagation</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
                      <div className="text-xs text-omniviz-text-muted mb-1">Pre-activation (weighted sum)</div>
                      <div className="font-mono text-sm text-omniviz-text">z = W · x + b</div>
                    </div>
                    <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
                      <div className="text-xs text-omniviz-text-muted mb-1">Activation</div>
                      <div className="font-mono text-sm text-omniviz-text">a = σ(z)</div>
                    </div>
                    <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
                      <div className="text-xs text-omniviz-text-muted mb-1">Layer output (matrix form)</div>
                      <div className="font-mono text-sm text-omniviz-text">a⁽ˡ⁾ = σ(W⁽ˡ⁾ · a⁽ˡ⁻¹⁾ + b⁽ˡ⁾)</div>
                    </div>
                  </div>
                </div>

                {/* Loss Functions */}
                <div className="bg-omniviz-bg rounded-xl p-5 border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-4">Loss Functions</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
                      <div className="text-xs text-omniviz-text-muted mb-1">Mean Squared Error</div>
                      <div className="font-mono text-sm text-omniviz-text">L = (1/n) Σ(y - ŷ)²</div>
                    </div>
                    <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
                      <div className="text-xs text-omniviz-text-muted mb-1">Cross-Entropy</div>
                      <div className="font-mono text-sm text-omniviz-text">L = -Σ y·log(ŷ)</div>
                    </div>
                    <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
                      <div className="text-xs text-omniviz-text-muted mb-1">Binary Cross-Entropy</div>
                      <div className="font-mono text-sm text-omniviz-text">L = -[y·log(ŷ) + (1-y)·log(1-ŷ)]</div>
                    </div>
                  </div>
                </div>

                {/* Backpropagation */}
                <div className="bg-omniviz-bg rounded-xl p-5 border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-4">Backpropagation</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
                      <div className="text-xs text-omniviz-text-muted mb-1">Chain Rule</div>
                      <div className="font-mono text-sm text-omniviz-text">∂L/∂w = ∂L/∂a · ∂a/∂z · ∂z/∂w</div>
                    </div>
                    <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
                      <div className="text-xs text-omniviz-text-muted mb-1">Output gradient</div>
                      <div className="font-mono text-sm text-omniviz-text">δ⁽ᴸ⁾ = ∂L/∂a⁽ᴸ⁾ ⊙ σ'(z⁽ᴸ⁾)</div>
                    </div>
                    <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
                      <div className="text-xs text-omniviz-text-muted mb-1">Hidden gradient</div>
                      <div className="font-mono text-sm text-omniviz-text">δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾)ᵀ · δ⁽ˡ⁺¹⁾ ⊙ σ'(z⁽ˡ⁾)</div>
                    </div>
                  </div>
                </div>

                {/* Gradient Descent */}
                <div className="bg-omniviz-bg rounded-xl p-5 border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-4">Gradient Descent</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
                      <div className="text-xs text-omniviz-text-muted mb-1">Weight update</div>
                      <div className="font-mono text-sm text-omniviz-text">W = W - α · ∂L/∂W</div>
                    </div>
                    <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
                      <div className="text-xs text-omniviz-text-muted mb-1">Bias update</div>
                      <div className="font-mono text-sm text-omniviz-text">b = b - α · ∂L/∂b</div>
                    </div>
                    <div className="p-3 bg-omniviz-surface rounded-lg border border-omniviz-border">
                      <div className="text-xs text-omniviz-text-muted mb-1">Learning rate (α)</div>
                      <div className="font-mono text-sm text-cyan-400">Controls step size</div>
                    </div>
                  </div>
                </div>
              </div>
            </ExplanationCard>
          </Section>

          {/* Activation Derivatives */}
          <Section title="Activation Function Derivatives" id="derivatives">
            <ExplanationCard>
              <p className="text-omniviz-text-muted mb-6">
                During backpropagation, we need the derivatives of activation functions to compute gradients.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Sigmoid', formula: 'σ(x)', derivative: "σ'(x) = σ(x)(1-σ(x))", color: 'purple' },
                  { name: 'ReLU', formula: 'max(0, x)', derivative: "ReLU'(x) = x > 0 ? 1 : 0", color: 'cyan' },
                  { name: 'Tanh', formula: 'tanh(x)', derivative: "tanh'(x) = 1 - tanh²(x)", color: 'blue' },
                  { name: 'Softmax', formula: 'eˣⁱ / Σeˣʲ', derivative: 'sᵢ(1-sᵢ) if i=j', color: 'green' },
                ].map((fn, i) => (
                  <motion.div
                    key={fn.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-omniviz-bg rounded-xl p-4 border border-${fn.color}-500/30 text-center`}
                  >
                    <div className={`font-semibold text-${fn.color}-400 mb-2`}>{fn.name}</div>
                    <div className="font-mono text-sm text-omniviz-text mb-2">{fn.formula}</div>
                    <div className="font-mono text-xs text-omniviz-text-muted">{fn.derivative}</div>
                  </motion.div>
                ))}
              </div>
            </ExplanationCard>
          </Section>

          {/* Universal Approximation Theorem */}
          <Section title="The Power of Neural Networks" id="power">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 rounded-2xl p-8 border border-purple-500/30"
            >
              <h3 className="text-xl font-bold text-center mb-4 text-omniviz-text">The Universal Approximation Theorem</h3>
              <p className="text-omniviz-text-muted text-center max-w-3xl mx-auto mb-6">
                A neural network with a single hidden layer containing a finite number of neurons can approximate
                any continuous function to arbitrary accuracy, given enough neurons. This is why neural networks
                are so powerful - they can learn virtually any pattern in data.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <div className="font-semibold text-omniviz-text">Image Recognition</div>
                  <p className="text-sm text-omniviz-text-muted">Classify photos, detect objects, generate art</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">💬</div>
                  <div className="font-semibold text-omniviz-text">Language Understanding</div>
                  <p className="text-sm text-omniviz-text-muted">Translation, chatbots, text generation</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🎮</div>
                  <div className="font-semibold text-omniviz-text">Game Playing</div>
                  <p className="text-sm text-omniviz-text-muted">Master chess, Go, video games</p>
                </div>
              </div>
            </motion.div>
          </Section>

        </div>
      </div>
    </div>
  )
}

// Reusable Section component
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
      {title && (
        <h2 className="text-2xl font-bold mb-8 text-omniviz-text">{title}</h2>
      )}
      {children}
    </motion.section>
  )
}

// Reusable Explanation Card component
function ExplanationCard({ children }) {
  return (
    <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">
      {children}
    </div>
  )
}

// Network Overview - Interactive mini network
function NetworkOverview({ inputValues, setInputValues, isTraining, startTraining, epoch, loss, lossHistory }) {
  const [showDataFlow, setShowDataFlow] = useState(false)
  const [prediction, setPrediction] = useState(null)

  const runPrediction = () => {
    setShowDataFlow(true)
    setTimeout(() => {
      setPrediction((inputValues[0] * 0.4 + inputValues[1] * 0.5 + inputValues[2] * 0.3).toFixed(3))
      setShowDataFlow(false)
    }, 1500)
  }

  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
      <h4 className="text-sm font-semibold text-purple-400 mb-4 text-center">Interactive Network</h4>

      {/* Input sliders */}
      <div className="mb-4 space-y-2">
        {inputValues.map((val, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-omniviz-text-muted w-6">x{i+1}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={val}
              onChange={(e) => {
                const newVals = [...inputValues]
                newVals[i] = parseFloat(e.target.value)
                setInputValues(newVals)
                setPrediction(null)
              }}
              className="flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 bg-omniviz-surface"
            />
            <span className="text-xs font-mono w-10 text-omniviz-text">{val.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Mini network visualization */}
      <div className="relative">
        {showDataFlow && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-lg"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5 }}
          />
        )}
        <svg className="w-full h-32" viewBox="0 0 200 100">
          {/* Connections */}
          {[0, 1, 2].map(i =>
            [0, 1, 2, 3].map(j => (
              <motion.line
                key={`i-h-${i}-${j}`}
                x1="25" y1={20 + i * 30}
                x2="100" y2={12 + j * 25}
                stroke={COLORS.weight}
                strokeWidth="1"
                strokeOpacity={showDataFlow ? 0.8 : 0.3}
              />
            ))
          )}
          {[0, 1, 2, 3].map(i =>
            [0, 1].map(j => (
              <motion.line
                key={`h-o-${i}-${j}`}
                x1="100" y1={12 + i * 25}
                x2="175" y2={35 + j * 30}
                stroke={COLORS.weight}
                strokeWidth="1"
                strokeOpacity={showDataFlow ? 0.8 : 0.3}
              />
            ))
          )}

          {/* Neurons */}
          {[0, 1, 2].map(i => (
            <circle key={`in-${i}`} cx="25" cy={20 + i * 30} r="8" fill={`${COLORS.input}30`} stroke={COLORS.input} strokeWidth="2" />
          ))}
          {[0, 1, 2, 3].map(i => (
            <circle key={`hid-${i}`} cx="100" cy={12 + i * 25} r="8" fill={`${COLORS.hidden1}30`} stroke={COLORS.hidden1} strokeWidth="2" />
          ))}
          {[0, 1].map(i => (
            <circle key={`out-${i}`} cx="175" cy={35 + i * 30} r="8" fill={`${COLORS.output}30`} stroke={COLORS.output} strokeWidth="2" />
          ))}
        </svg>
      </div>

      <div className="flex gap-2 mt-4">
        <motion.button
          onClick={runPrediction}
          disabled={showDataFlow}
          className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white rounded-lg text-sm font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showDataFlow ? 'Computing...' : 'Forward Pass'}
        </motion.button>
      </div>

      {prediction && (
        <div className="mt-4 text-center">
          <span className="text-xs text-omniviz-text-muted">Output: </span>
          <span className="text-lg font-bold text-green-400 font-mono">{prediction}</span>
        </div>
      )}
    </div>
  )
}

// Layer Visualization
function LayerVisualization({ inputValues, weights }) {
  const hidden1 = weights.layer1.map(neuronWeights => {
    const sum = inputValues.reduce((acc, input, i) => acc + input * neuronWeights[i], 0)
    return Math.max(0, sum)
  })

  const output = weights.layer2.map(neuronWeights => {
    const sum = hidden1.reduce((acc, h, i) => acc + h * neuronWeights[i], 0)
    return 1 / (1 + Math.exp(-sum))
  })

  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border relative">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-blue-400 font-semibold">Input</span>
        <span className="text-xs text-purple-400 font-semibold">Hidden (ReLU)</span>
        <span className="text-xs text-green-400 font-semibold">Output (Sigmoid)</span>
      </div>

      <svg className="w-full h-48" viewBox="0 0 300 150">
        {/* Connections: Input to Hidden */}
        {inputValues.map((_, i) =>
          hidden1.map((_, j) => {
            const w = weights.layer1[j][i]
            return (
              <line
                key={`ih-${i}-${j}`}
                x1="40" y1={30 + i * 45}
                x2="150" y2={20 + j * 35}
                stroke={w > 0 ? '#22c55e' : '#ef4444'}
                strokeWidth={Math.abs(w) * 2 + 0.5}
                strokeOpacity={0.4}
              />
            )
          })
        )}

        {/* Connections: Hidden to Output */}
        {hidden1.map((_, i) =>
          output.map((_, j) => {
            const w = weights.layer2[j][i]
            return (
              <line
                key={`ho-${i}-${j}`}
                x1="150" y1={20 + i * 35}
                x2="260" y2={50 + j * 50}
                stroke={w > 0 ? '#22c55e' : '#ef4444'}
                strokeWidth={Math.abs(w) * 2 + 0.5}
                strokeOpacity={0.4}
              />
            )
          })
        )}

        {/* Input neurons */}
        {inputValues.map((val, i) => (
          <g key={`in-${i}`}>
            <circle cx="40" cy={30 + i * 45} r="18" fill={`${COLORS.input}20`} stroke={COLORS.input} strokeWidth="2" />
            <text x="40" y={34 + i * 45} textAnchor="middle" fill={COLORS.input} fontSize="10" fontFamily="monospace">{val.toFixed(2)}</text>
          </g>
        ))}

        {/* Hidden neurons */}
        {hidden1.map((val, i) => (
          <g key={`hid-${i}`}>
            <circle cx="150" cy={20 + i * 35} r="18" fill={`${COLORS.hidden1}20`} stroke={COLORS.hidden1} strokeWidth="2" />
            <text x="150" y={24 + i * 35} textAnchor="middle" fill={COLORS.hidden1} fontSize="10" fontFamily="monospace">{val.toFixed(2)}</text>
          </g>
        ))}

        {/* Output neurons */}
        {output.map((val, i) => (
          <g key={`out-${i}`}>
            <circle cx="260" cy={50 + i * 50} r="18" fill={`${COLORS.output}20`} stroke={COLORS.output} strokeWidth="2" />
            <text x="260" y={54 + i * 50} textAnchor="middle" fill={COLORS.output} fontSize="10" fontFamily="monospace">{val.toFixed(2)}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// Single Neuron Visualization
function NeuronVisualization() {
  const inputs = [0.5, 0.8, 0.3]
  const weights = [0.4, -0.2, 0.6]
  const bias = 0.1

  const weightedSum = inputs.reduce((acc, inp, i) => acc + inp * weights[i], 0) + bias
  const reluOutput = Math.max(0, weightedSum)

  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
      <div className="space-y-3 mb-6">
        {inputs.map((inp, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-xs"
                 style={{ borderColor: COLORS.input, backgroundColor: `${COLORS.input}20` }}>
              {inp}
            </div>
            <span className="text-omniviz-text-muted">x</span>
            <div className={`px-2 py-1 rounded font-mono text-xs ${weights[i] > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              w={weights[i]}
            </div>
            <span className="text-omniviz-text-muted">=</span>
            <span className="font-mono text-xs text-omniviz-text">{(inp * weights[i]).toFixed(2)}</span>
          </div>
        ))}

        <div className="flex items-center gap-2 text-sm pt-2 border-t border-omniviz-border">
          <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs"
               style={{ borderColor: COLORS.bias, backgroundColor: `${COLORS.bias}20` }}>
            bias
          </div>
          <span className="text-omniviz-text-muted">+</span>
          <span className="px-2 py-1 rounded font-mono text-xs" style={{ backgroundColor: `${COLORS.bias}20`, color: COLORS.bias }}>
            b={bias}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-3 flex flex-col items-center justify-center"
               style={{ borderColor: COLORS.hidden1, backgroundColor: `${COLORS.hidden1}20` }}>
            <span className="text-xs text-omniviz-text-muted">Sum</span>
            <span className="font-mono font-bold text-omniviz-text">{weightedSum.toFixed(2)}</span>
          </div>
        </div>
        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-3 flex flex-col items-center justify-center"
               style={{ borderColor: COLORS.output, backgroundColor: `${COLORS.output}20` }}>
            <span className="text-xs text-omniviz-text-muted">ReLU</span>
            <span className="font-mono font-bold text-green-400">{reluOutput.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-omniviz-surface rounded-lg font-mono text-xs">
        <div className="text-omniviz-text-muted">
          z = Σ(xᵢ × wᵢ) + b = {weightedSum.toFixed(3)}
        </div>
        <div className="text-green-400 mt-1">
          ReLU(z) = max(0, {weightedSum.toFixed(3)}) = {reluOutput.toFixed(3)}
        </div>
      </div>
    </div>
  )
}

// Activation Function Comparison
function ActivationFunctionComparison() {
  const width = 400
  const height = 200
  const padding = 40

  const points = []
  for (let x = -4; x <= 4; x += 0.1) {
    points.push({
      x,
      relu: Math.max(0, x),
      sigmoid: 1 / (1 + Math.exp(-x)),
      tanh: Math.tanh(x),
    })
  }

  const xScale = (x) => ((x + 4) / 8) * (width - padding * 2) + padding
  const yScale = (y, min, max) => height - padding - ((y - min) / (max - min)) * (height - padding * 2)

  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-lg mx-auto">
        {/* Grid */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#374151" />
        <line x1={xScale(0)} y1={padding} x2={xScale(0)} y2={height - padding} stroke="#374151" />

        {/* ReLU */}
        <path
          d={`M ${points.map(p => `${xScale(p.x)},${yScale(p.relu, -1, 4)}`).join(' L ')}`}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
        />

        {/* Sigmoid */}
        <path
          d={`M ${points.map(p => `${xScale(p.x)},${yScale(p.sigmoid, -1, 2)}`).join(' L ')}`}
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
        />

        {/* Tanh */}
        <path
          d={`M ${points.map(p => `${xScale(p.x)},${yScale(p.tanh, -1.5, 1.5)}`).join(' L ')}`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Labels */}
        <text x={width - 60} y={40} fill="#06b6d4" fontSize="12" fontWeight="bold">ReLU</text>
        <text x={width - 60} y={60} fill="#a855f7" fontSize="12" fontWeight="bold">Sigmoid</text>
        <text x={width - 60} y={80} fill="#3b82f6" fontSize="12" fontWeight="bold">Tanh</text>
      </svg>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <div className="p-3 bg-omniviz-surface rounded-lg border border-cyan-500/30">
          <div className="font-semibold text-cyan-400 text-sm mb-1">ReLU</div>
          <div className="font-mono text-xs mb-2 text-cyan-400">f(x) = max(0, x)</div>
          <p className="text-xs text-omniviz-text-muted">Simple, fast, avoids vanishing gradients for positive values</p>
        </div>
        <div className="p-3 bg-omniviz-surface rounded-lg border border-purple-500/30">
          <div className="font-semibold text-purple-400 text-sm mb-1">Sigmoid</div>
          <div className="font-mono text-xs mb-2 text-purple-400">f(x) = 1/(1+e^-x)</div>
          <p className="text-xs text-omniviz-text-muted">Output between 0-1, great for probabilities</p>
        </div>
        <div className="p-3 bg-omniviz-surface rounded-lg border border-blue-500/30">
          <div className="font-semibold text-blue-400 text-sm mb-1">Tanh</div>
          <div className="font-mono text-xs mb-2 text-blue-400">f(x) = tanh(x)</div>
          <p className="text-xs text-omniviz-text-muted">Output between -1 and 1, zero-centered</p>
        </div>
      </div>
    </div>
  )
}

// Training Simulation
function TrainingSimulation({ isTraining, startTraining, epoch, loss, lossHistory, learningRate, setLearningRate }) {
  return (
    <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
      <h4 className="font-semibold text-omniviz-accent mb-4">Training Simulation</h4>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-omniviz-surface rounded-lg p-3 border border-omniviz-border">
          <div className="text-xs text-omniviz-text-muted mb-1">Epoch</div>
          <div className="text-2xl font-bold font-mono text-omniviz-text">{epoch}</div>
        </div>
        <div className="bg-omniviz-surface rounded-lg p-3 border border-omniviz-border">
          <div className="text-xs text-omniviz-text-muted mb-1">Loss</div>
          <div className="text-2xl font-bold font-mono text-red-400">{loss.toFixed(4)}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-omniviz-text-muted mb-1">
          <span>Learning Rate (α)</span>
          <span className="font-mono text-omniviz-text">{learningRate}</span>
        </div>
        <input
          type="range"
          min="0.01"
          max="0.5"
          step="0.01"
          value={learningRate}
          onChange={(e) => setLearningRate(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-purple-500 bg-omniviz-surface"
        />
      </div>

      {/* Loss chart */}
      <div className="h-24 bg-omniviz-surface rounded-lg p-3 flex items-end gap-1 mb-4">
        {lossHistory.map((l, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${l * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      <motion.button
        onClick={startTraining}
        disabled={isTraining}
        className="w-full px-4 py-3 bg-omniviz-accent hover:bg-omniviz-accent-light disabled:opacity-50 text-white rounded-lg font-semibold transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isTraining ? 'Training in progress...' : 'Train for 20 Epochs'}
      </motion.button>

      <p className="text-xs text-omniviz-text-muted mt-3 text-center">
        Watch the loss decrease as the network learns
      </p>
    </div>
  )
}

export default NeuralNetworksConcept
