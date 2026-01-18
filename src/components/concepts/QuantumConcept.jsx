import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function QuantumConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Quantum Computing" color="teal" />

      {/* Scrollable content */}
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <Section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Quantum Computing
              </h1>
              <p className="text-xl text-omniviz-text-muted max-w-2xl mx-auto">
                A new paradigm of computation that harnesses the strange properties of quantum mechanics
                to solve problems impossible for classical computers.
              </p>
            </motion.div>
          </Section>

          {/* What is a Qubit? */}
          <Section title="What is a Qubit?" id="qubit">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">The Quantum Bit</h3>
                  <p className="text-omniviz-text-muted mb-4">
                    In classical computing, a <strong className="text-white">bit</strong> can only be 0 or 1 —
                    like a light switch that's either off or on. But in quantum computing,
                    a <strong className="text-cyan-400">qubit</strong> can be 0, 1, or <em>both at the same time</em>.
                  </p>
                  <p className="text-omniviz-text-muted mb-4">
                    This isn't just uncertainty about which state it's in — the qubit genuinely
                    exists in multiple states simultaneously until we measure it. This is called
                    <strong className="text-purple-400"> superposition</strong>.
                  </p>
                  <p className="text-omniviz-text-muted">
                    Think of it like a spinning coin: while it's in the air, it's neither heads
                    nor tails — it's in a superposition of both. Only when it lands (measurement)
                    does it "collapse" to one state.
                  </p>
                </div>
                <ClassicalVsQuantumDemo />
              </div>
            </ExplanationCard>
          </Section>

          {/* Superposition Explained */}
          <Section title="Superposition: Being in Two States at Once" id="superposition">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <SuperpositionDemo />
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">Why Superposition Matters</h3>
                  <p className="text-omniviz-text-muted mb-4">
                    When a qubit is in superposition, it's described by two numbers called
                    <strong className="text-blue-400"> probability amplitudes</strong>: α (alpha) for |0⟩
                    and β (beta) for |1⟩.
                  </p>
                  <div className="bg-omniviz-bg rounded-lg p-4 font-mono text-center mb-4 text-omniviz-text">
                    |ψ⟩ = α|0⟩ + β|1⟩
                  </div>
                  <p className="text-omniviz-text-muted mb-4">
                    When we measure, the qubit collapses to |0⟩ with probability |α|² and
                    to |1⟩ with probability |β|². The amplitudes must satisfy |α|² + |β|² = 1.
                  </p>
                  <p className="text-omniviz-text-muted">
                    <strong className="text-cyan-400">Try the demo:</strong> Put the qubit in superposition,
                    then measure it. Notice how each measurement gives a random result, but
                    the probabilities match the amplitudes!
                  </p>
                </div>
              </div>
            </ExplanationCard>
          </Section>

          {/* The Bloch Sphere */}
          <Section title="The Bloch Sphere: Visualizing Qubit States" id="bloch">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">A 3D Map of All Qubit States</h3>
                  <p className="text-omniviz-text-muted mb-4">
                    The <strong className="text-cyan-400">Bloch sphere</strong> is a way to visualize
                    every possible state of a qubit. Each point on the surface represents a
                    unique quantum state.
                  </p>
                  <ul className="space-y-2 text-omniviz-text-muted mb-4">
                    <li className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500" />
                      <span><strong>North pole (|0⟩)</strong>: The "zero" state</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                      <span><strong>South pole (|1⟩)</strong>: The "one" state</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-pink-500" />
                      <span><strong>Equator</strong>: Equal superpositions of |0⟩ and |1⟩</span>
                    </li>
                  </ul>
                  <p className="text-omniviz-text-muted">
                    Quantum gates rotate the state vector around the sphere. Different axes
                    correspond to different types of rotations.
                  </p>
                </div>
                <BlochSphereDemo />
              </div>
            </ExplanationCard>
          </Section>

          {/* Quantum Gates */}
          <Section title="Quantum Gates: Manipulating Qubits" id="gates">
            <ExplanationCard>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-orange-400">What Are Quantum Gates?</h3>
                <p className="text-omniviz-text-muted mb-4">
                  Just like classical computers use logic gates (AND, OR, NOT) to manipulate bits,
                  quantum computers use <strong className="text-orange-400">quantum gates</strong> to
                  manipulate qubits. Each gate is a specific operation that transforms the qubit's state.
                </p>
                <p className="text-omniviz-text-muted">
                  Mathematically, quantum gates are represented as <strong className="text-purple-400">unitary matrices</strong>.
                  When applied to a qubit's state vector, they rotate it on the Bloch sphere.
                </p>
              </div>
              <QuantumGatesDemo />
            </ExplanationCard>
          </Section>

          {/* Entanglement */}
          <Section title="Entanglement: Spooky Action at a Distance" id="entanglement">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-pink-400">The Strangest Quantum Phenomenon</h3>
                  <p className="text-omniviz-text-muted mb-4">
                    When two qubits become <strong className="text-pink-400">entangled</strong>, they form
                    a connection that defies classical physics. Measuring one qubit instantly
                    affects the other, no matter how far apart they are.
                  </p>
                  <p className="text-omniviz-text-muted mb-4">
                    Einstein called this "spooky action at a distance" and refused to believe it.
                    But experiments have proven it's real — it's not communication, it's correlation.
                  </p>
                  <p className="text-omniviz-text-muted mb-4">
                    The most famous entangled state is the <strong className="text-cyan-400">Bell state</strong>:
                  </p>
                  <div className="bg-omniviz-bg rounded-lg p-4 font-mono text-center mb-4 text-omniviz-text">
                    |Φ⁺⟩ = (|00⟩ + |11⟩) / √2
                  </div>
                  <p className="text-omniviz-text-muted">
                    This means: if you measure one qubit and get 0, the other is <em>guaranteed</em>
                    to be 0. If you get 1, the other is guaranteed to be 1. Always correlated,
                    even across the universe!
                  </p>
                </div>
                <EntanglementDemo />
              </div>
            </ExplanationCard>
          </Section>

          {/* Quantum Circuits */}
          <Section title="Quantum Circuits: Building Algorithms" id="circuits">
            <ExplanationCard>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Combining Gates into Programs</h3>
                <p className="text-omniviz-text-muted mb-4">
                  A <strong className="text-cyan-400">quantum circuit</strong> is a sequence of quantum gates
                  applied to qubits. Just like classical programs are sequences of operations,
                  quantum algorithms are sequences of gates that transform qubit states.
                </p>
                <p className="text-omniviz-text-muted">
                  Below is the circuit that creates a Bell state — two entangled qubits.
                  Watch how the Hadamard gate creates superposition, then the CNOT gate
                  creates entanglement.
                </p>
              </div>
              <BellCircuitDemo />
            </ExplanationCard>
          </Section>

          {/* Why Quantum Computing is Powerful */}
          <Section title="Why Quantum Computers Are Powerful" id="power">
            <ExplanationCard>
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-emerald-400">Exponential State Space</h3>
                  <p className="text-omniviz-text-muted mb-4">
                    The power of quantum computing comes from <strong className="text-emerald-400">parallelism
                    through superposition</strong>. While n classical bits can only represent ONE
                    of 2ⁿ possible states, n qubits can represent ALL 2ⁿ states simultaneously.
                  </p>
                  <QuantumAdvantageTable />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">Quantum Interference</h3>
                  <p className="text-omniviz-text-muted mb-4">
                    Quantum algorithms work by carefully arranging <strong className="text-purple-400">interference</strong>.
                    Wrong answers interfere destructively (cancel out), while correct answers
                    interfere constructively (amplify).
                  </p>
                  <p className="text-omniviz-text-muted mb-4">
                    This is like waves in water: when two waves meet, they can either add up
                    (constructive) or cancel out (destructive). Quantum algorithms harness
                    this to find solutions efficiently.
                  </p>
                  <div className="bg-omniviz-bg rounded-xl p-4">
                    <h4 className="font-semibold mb-3 text-cyan-400">Famous Quantum Algorithms</h4>
                    <ul className="space-y-2 text-sm text-omniviz-text-muted">
                      <li><strong>Shor's Algorithm:</strong> Factors large numbers exponentially faster — breaks RSA encryption</li>
                      <li><strong>Grover's Algorithm:</strong> Searches unsorted databases quadratically faster</li>
                      <li><strong>Quantum Simulation:</strong> Simulates molecules for drug discovery</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ExplanationCard>
          </Section>

          {/* Summary */}
          <Section title="Key Takeaways" id="summary">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Superposition', desc: 'Qubits exist in multiple states simultaneously until measured', color: 'purple' },
                { title: 'Entanglement', desc: 'Qubits can be correlated in ways impossible for classical bits', color: 'pink' },
                { title: 'Interference', desc: 'Probability amplitudes can add or cancel like waves', color: 'cyan' },
                { title: 'Exponential Power', desc: 'n qubits can process 2ⁿ states in parallel', color: 'emerald' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-omniviz-surface rounded-xl p-5 border border-omniviz-border`}
                >
                  <h4 className={`font-semibold mb-2 text-${item.color}-400`}>{item.title}</h4>
                  <p className="text-sm text-omniviz-text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

// Layout Components
function Section({ title, id, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-12 border-b border-omniviz-border last:border-0"
    >
      {title && (
        <h2 className="text-2xl font-bold mb-8 text-omniviz-text">{title}</h2>
      )}
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

// Interactive Demos
function ClassicalVsQuantumDemo() {
  const [classicalBit, setClassicalBit] = useState(0)
  const [qubitInSuperposition, setQubitInSuperposition] = useState(false)

  return (
    <div className="bg-omniviz-bg rounded-xl p-6">
      <div className="grid grid-cols-2 gap-8">
        {/* Classical bit */}
        <div className="text-center">
          <h4 className="font-semibold mb-4 text-blue-400">Classical Bit</h4>
          <motion.button
            onClick={() => setClassicalBit(b => 1 - b)}
            className={`w-24 h-24 rounded-full text-3xl font-bold transition-all ${
              classicalBit === 0
                ? 'bg-blue-500/20 border-2 border-blue-500'
                : 'bg-green-500/20 border-2 border-green-500'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {classicalBit}
          </motion.button>
          <p className="text-xs text-omniviz-text-muted mt-3">Click to flip</p>
          <p className="text-sm mt-2">Always exactly 0 or 1</p>
        </div>

        {/* Qubit */}
        <div className="text-center">
          <h4 className="font-semibold mb-4 text-cyan-400">Qubit</h4>
          <motion.button
            onClick={() => setQubitInSuperposition(s => !s)}
            className="w-24 h-24 rounded-full text-2xl font-mono border-2 border-cyan-500 relative overflow-hidden"
            animate={qubitInSuperposition ? {
              rotate: [0, 360],
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: qubitInSuperposition
                ? 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(34,197,94,0.3))'
                : 'rgba(6,182,212,0.2)'
            }}
          >
            {qubitInSuperposition ? '|ψ⟩' : '|0⟩'}
          </motion.button>
          <p className="text-xs text-omniviz-text-muted mt-3">Click to toggle superposition</p>
          <p className="text-sm mt-2">
            {qubitInSuperposition ? 'Both 0 AND 1!' : 'Can enter superposition'}
          </p>
        </div>
      </div>
    </div>
  )
}

function SuperpositionDemo() {
  const [state, setState] = useState('zero') // zero, one, super
  const [measureResult, setMeasureResult] = useState(null)
  const [measuring, setMeasuring] = useState(false)
  const [stats, setStats] = useState({ zeros: 0, ones: 0 })

  const stateParams = useMemo(() => {
    switch (state) {
      case 'zero': return { alpha: 1, beta: 0 }
      case 'one': return { alpha: 0, beta: 1 }
      case 'super': return { alpha: 0.707, beta: 0.707 }
      default: return { alpha: 1, beta: 0 }
    }
  }, [state])

  const measure = () => {
    if (measuring) return
    setMeasuring(true)
    setMeasureResult(null)

    setTimeout(() => {
      const prob0 = stateParams.alpha * stateParams.alpha
      const result = Math.random() < prob0 ? '0' : '1'
      setMeasureResult(result)
      setMeasuring(false)
      setStats(s => ({
        zeros: s.zeros + (result === '0' ? 1 : 0),
        ones: s.ones + (result === '1' ? 1 : 0)
      }))
    }, 500)
  }

  const totalMeasurements = stats.zeros + stats.ones

  return (
    <div className="bg-omniviz-bg rounded-xl p-6">
      <div className="text-center mb-6">
        <motion.div
          className="w-32 h-32 mx-auto rounded-full border-4 border-cyan-500 flex items-center justify-center text-3xl font-mono"
          style={{
            background: state === 'super'
              ? 'linear-gradient(135deg, rgba(59,130,246,0.4), rgba(34,197,94,0.4))'
              : state === 'one' ? 'rgba(34,197,94,0.3)' : 'rgba(59,130,246,0.3)'
          }}
          animate={state === 'super' ? {
            boxShadow: ['0 0 20px rgba(6,182,212,0.3)', '0 0 40px rgba(6,182,212,0.5)', '0 0 20px rgba(6,182,212,0.3)']
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {measureResult !== null ? `|${measureResult}⟩` :
           state === 'super' ? '|ψ⟩' :
           state === 'one' ? '|1⟩' : '|0⟩'}
        </motion.div>
      </div>

      {/* State buttons */}
      <div className="flex justify-center gap-2 mb-4">
        {[
          { id: 'zero', label: '|0⟩' },
          { id: 'super', label: 'Superposition' },
          { id: 'one', label: '|1⟩' },
        ].map(s => (
          <button
            key={s.id}
            onClick={() => { setState(s.id); setMeasureResult(null); }}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              state === s.id ? 'bg-cyan-500 text-white' : 'bg-omniviz-surface border border-omniviz-border text-omniviz-text hover:border-cyan-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Probabilities */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-blue-400">P(|0⟩)</span>
            <span>{(stateParams.alpha * stateParams.alpha * 100).toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-omniviz-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              animate={{ width: `${stateParams.alpha * stateParams.alpha * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-green-400">P(|1⟩)</span>
            <span>{(stateParams.beta * stateParams.beta * 100).toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-omniviz-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-500"
              animate={{ width: `${stateParams.beta * stateParams.beta * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Measure button */}
      <button
        onClick={measure}
        disabled={measuring}
        className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-omniviz-border text-white rounded-lg font-semibold transition-all"
      >
        {measuring ? 'Measuring...' : 'Measure Qubit'}
      </button>

      {/* Stats */}
      {totalMeasurements > 0 && (
        <div className="mt-4 text-center text-xs text-omniviz-text-muted">
          Results: {stats.zeros} zeros ({(stats.zeros/totalMeasurements*100).toFixed(0)}%), {' '}
          {stats.ones} ones ({(stats.ones/totalMeasurements*100).toFixed(0)}%)
          <button
            onClick={() => setStats({ zeros: 0, ones: 0 })}
            className="ml-2 text-cyan-400 hover:underline"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  )
}

function BlochSphereDemo() {
  const [selectedState, setSelectedState] = useState('zero')

  const states = {
    zero: { theta: 0, phi: 0, label: '|0⟩', desc: 'North pole' },
    one: { theta: Math.PI, phi: 0, label: '|1⟩', desc: 'South pole' },
    plus: { theta: Math.PI/2, phi: 0, label: '|+⟩', desc: 'Positive X axis' },
    minus: { theta: Math.PI/2, phi: Math.PI, label: '|-⟩', desc: 'Negative X axis' },
    plusi: { theta: Math.PI/2, phi: Math.PI/2, label: '|+i⟩', desc: 'Positive Y axis' },
    minusi: { theta: Math.PI/2, phi: -Math.PI/2, label: '|-i⟩', desc: 'Negative Y axis' },
  }

  const current = states[selectedState]
  const x = Math.sin(current.theta) * Math.cos(current.phi)
  const y = Math.sin(current.theta) * Math.sin(current.phi)
  const z = Math.cos(current.theta)

  // Simple 3D projection
  const projX = x * 0.8 + y * 0.3
  const projY = -z * 0.8 + y * 0.2

  const size = 200
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.35

  return (
    <div className="bg-omniviz-bg rounded-xl p-6">
      <div className="flex justify-center mb-4">
        <svg width={size} height={size} className="overflow-visible">
          {/* Back ellipse */}
          <ellipse cx={cx} cy={cy} rx={r} ry={r*0.3} fill="none" stroke="#374151" strokeDasharray="4" />

          {/* Main circle */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#4b5563" strokeWidth="1.5" />

          {/* Axes */}
          <line x1={cx} y1={cy-r-10} x2={cx} y2={cy+r+10} stroke="#60a5fa" strokeWidth="1" opacity="0.5" />
          <line x1={cx-r-10} y1={cy} x2={cx+r+10} y2={cy} stroke="#f472b6" strokeWidth="1" opacity="0.5" />

          {/* Labels */}
          <text x={cx} y={cy-r-15} textAnchor="middle" fill="#60a5fa" fontSize="11">|0⟩</text>
          <text x={cx} y={cy+r+22} textAnchor="middle" fill="#22c55e" fontSize="11">|1⟩</text>
          <text x={cx+r+12} y={cy+4} fill="#f472b6" fontSize="11">|+⟩</text>
          <text x={cx-r-12} y={cy+4} textAnchor="end" fill="#f472b6" fontSize="11">|-⟩</text>

          {/* State vector */}
          <motion.line
            x1={cx} y1={cy}
            animate={{ x2: cx + projX * r, y2: cy + projY * r }}
            stroke="#06b6d4" strokeWidth="3"
          />
          <motion.circle
            animate={{ cx: cx + projX * r, cy: cy + projY * r }}
            r="8" fill="#06b6d4"
          />
          <motion.circle
            animate={{ cx: cx + projX * r, cy: cy + projY * r }}
            r="14" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.4"
          />
        </svg>
      </div>

      <div className="text-center mb-4">
        <span className="text-2xl font-mono text-cyan-400">{current.label}</span>
        <p className="text-sm text-omniviz-text-muted">{current.desc}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Object.entries(states).map(([id, s]) => (
          <button
            key={id}
            onClick={() => setSelectedState(id)}
            className={`px-2 py-1.5 rounded text-sm font-mono transition-all ${
              selectedState === id ? 'bg-cyan-500 text-white' : 'bg-omniviz-surface border border-omniviz-border text-omniviz-text hover:border-cyan-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function QuantumGatesDemo() {
  const [selectedGate, setSelectedGate] = useState('H')
  const [inputState, setInputState] = useState('|0⟩')

  const gates = {
    'X': {
      name: 'Pauli-X (NOT)',
      color: '#ef4444',
      desc: 'Flips the qubit: |0⟩ ↔ |1⟩. Like a classical NOT gate.',
      matrix: [[0, 1], [1, 0]],
      effect: { '|0⟩': '|1⟩', '|1⟩': '|0⟩', '|+⟩': '|+⟩', '|-⟩': '|-⟩' }
    },
    'Z': {
      name: 'Pauli-Z',
      color: '#a855f7',
      desc: 'Adds a phase flip: leaves |0⟩ unchanged, flips sign of |1⟩.',
      matrix: [[1, 0], [0, -1]],
      effect: { '|0⟩': '|0⟩', '|1⟩': '-|1⟩', '|+⟩': '|-⟩', '|-⟩': '|+⟩' }
    },
    'H': {
      name: 'Hadamard',
      color: '#06b6d4',
      desc: 'Creates superposition from basis states. The most important gate!',
      matrix: [['1/√2', '1/√2'], ['1/√2', '-1/√2']],
      effect: { '|0⟩': '|+⟩', '|1⟩': '|-⟩', '|+⟩': '|0⟩', '|-⟩': '|1⟩' }
    },
  }

  const gate = gates[selectedGate]
  const output = gate.effect[inputState] || '?'

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Gate selector */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-omniviz-text mb-2">Select Gate</h4>
        {Object.entries(gates).map(([id, g]) => (
          <button
            key={id}
            onClick={() => setSelectedGate(id)}
            className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
              selectedGate === id ? '' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              borderColor: g.color,
              backgroundColor: selectedGate === id ? `${g.color}20` : `${g.color}10`
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg border-2 flex items-center justify-center font-bold"
                style={{ borderColor: g.color, color: g.color }}
              >
                {id}
              </div>
              <div>
                <div className="font-semibold text-sm text-omniviz-text">{g.name}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Gate visualization */}
      <div className="lg:col-span-2 bg-omniviz-bg rounded-xl p-6">
        <div className="mb-4">
          <h4 className="font-semibold mb-2" style={{ color: gate.color }}>{gate.name}</h4>
          <p className="text-sm text-omniviz-text-muted">{gate.desc}</p>
        </div>

        {/* Matrix */}
        <div className="mb-6">
          <span className="text-xs text-omniviz-text-muted">Matrix representation:</span>
          <div className="mt-2 inline-flex items-center gap-1 font-mono text-sm bg-omniviz-surface p-3 rounded-lg">
            <span className="text-2xl text-omniviz-text-muted">[</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {gate.matrix.flat().map((val, i) => (
                <span key={i} className="text-center w-12 text-omniviz-text">{val}</span>
              ))}
            </div>
            <span className="text-2xl text-omniviz-text-muted">]</span>
          </div>
        </div>

        {/* Interactive demo */}
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <span className="text-xs text-omniviz-text block mb-2">Input:</span>
            <div className="flex gap-2">
              {['|0⟩', '|1⟩', '|+⟩', '|-⟩'].map(s => (
                <button
                  key={s}
                  onClick={() => setInputState(s)}
                  className={`px-3 py-1.5 rounded font-mono text-sm transition-all border ${
                    inputState === s
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-omniviz-surface border-omniviz-border text-omniviz-text hover:border-blue-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl">→</span>
            <div
              className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-lg"
              style={{ borderColor: gate.color, backgroundColor: `${gate.color}20` }}
            >
              {selectedGate}
            </div>
            <span className="text-xl">→</span>
          </div>

          <div>
            <span className="text-xs text-omniviz-text block mb-2">Output:</span>
            <div className="px-4 py-2 bg-omniviz-surface border border-omniviz-border rounded-lg font-mono text-lg text-cyan-400">
              {output}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EntanglementDemo() {
  const [entangled, setEntangled] = useState(false)
  const [measured, setMeasured] = useState(false)
  const [results, setResults] = useState({ a: null, b: null })

  const createEntanglement = () => {
    setEntangled(true)
    setMeasured(false)
    setResults({ a: null, b: null })
  }

  const measureBoth = () => {
    const result = Math.random() < 0.5 ? '0' : '1'
    setMeasured(true)
    setResults({ a: result, b: result }) // Always same!
  }

  const reset = () => {
    setEntangled(false)
    setMeasured(false)
    setResults({ a: null, b: null })
  }

  return (
    <div className="bg-omniviz-bg rounded-xl p-6">
      <div className="flex justify-center items-center gap-8 mb-6">
        {/* Qubit A */}
        <div className="text-center">
          <p className="text-sm text-omniviz-text-muted mb-2">Qubit A (Alice)</p>
          <motion.div
            className={`w-20 h-20 rounded-full border-3 flex items-center justify-center text-lg font-mono ${
              measured ? (results.a === '0' ? 'border-blue-500 bg-blue-500/20' : 'border-green-500 bg-green-500/20')
              : entangled ? 'border-pink-500' : 'border-gray-500'
            }`}
            animate={entangled && !measured ? {
              boxShadow: ['0 0 0 0 rgba(236,72,153,0)', '0 0 20px 10px rgba(236,72,153,0.3)', '0 0 0 0 rgba(236,72,153,0)']
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={entangled && !measured ? {
              background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(34,197,94,0.3))'
            } : {}}
          >
            {measured ? `|${results.a}⟩` : entangled ? '|ψ⟩' : '|0⟩'}
          </motion.div>
        </div>

        {/* Connection */}
        <div className="flex flex-col items-center">
          {entangled && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-pink-400 text-2xl"
            >
              ⟷
            </motion.div>
          )}
          <span className="text-xs text-omniviz-text-muted mt-1">
            {entangled ? (measured ? 'Correlated!' : 'Entangled') : 'Separate'}
          </span>
        </div>

        {/* Qubit B */}
        <div className="text-center">
          <p className="text-sm text-omniviz-text-muted mb-2">Qubit B (Bob)</p>
          <motion.div
            className={`w-20 h-20 rounded-full border-3 flex items-center justify-center text-lg font-mono ${
              measured ? (results.b === '0' ? 'border-blue-500 bg-blue-500/20' : 'border-green-500 bg-green-500/20')
              : entangled ? 'border-pink-500' : 'border-gray-500'
            }`}
            animate={entangled && !measured ? {
              boxShadow: ['0 0 0 0 rgba(236,72,153,0)', '0 0 20px 10px rgba(236,72,153,0.3)', '0 0 0 0 rgba(236,72,153,0)']
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={entangled && !measured ? {
              background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(34,197,94,0.3))'
            } : {}}
          >
            {measured ? `|${results.b}⟩` : entangled ? '|ψ⟩' : '|0⟩'}
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {!entangled && (
          <button onClick={createEntanglement} className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold">
            Create Bell State
          </button>
        )}
        {entangled && !measured && (
          <button onClick={measureBoth} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold">
            Measure Both
          </button>
        )}
        {measured && (
          <button onClick={reset} className="px-4 py-2 bg-omniviz-surface border border-omniviz-border text-omniviz-text hover:border-pink-400 rounded-lg">
            Try Again
          </button>
        )}
      </div>

      {measured && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-pink-400 mt-4"
        >
          Both qubits measured |{results.a}⟩ — always the same result!
        </motion.p>
      )}
    </div>
  )
}

function BellCircuitDemo() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  const steps = [
    { state: '|00⟩', desc: 'Start: both qubits in |0⟩ state' },
    { state: '|+0⟩ = (|0⟩+|1⟩)|0⟩/√2', desc: 'Hadamard creates superposition on first qubit' },
    { state: '|Φ⁺⟩ = (|00⟩+|11⟩)/√2', desc: 'CNOT entangles: if control is |1⟩, flip target' },
  ]

  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => {
      setStep(s => {
        if (s >= steps.length - 1) {
          setPlaying(false)
          return s
        }
        return s + 1
      })
    }, 2000)
    return () => clearInterval(timer)
  }, [playing])

  const runCircuit = () => {
    setStep(0)
    setPlaying(true)
  }

  return (
    <div>
      {/* Circuit diagram */}
      <div className="bg-omniviz-bg rounded-xl p-6 mb-4 overflow-x-auto">
        <svg width="100%" height="140" viewBox="0 0 500 140" className="min-w-[400px]">
          {/* Qubit lines */}
          <line x1="40" y1="50" x2="460" y2="50" stroke="#374151" strokeWidth="2" />
          <line x1="40" y1="100" x2="460" y2="100" stroke="#374151" strokeWidth="2" />

          {/* Labels */}
          <text x="20" y="55" fill="#9ca3af" fontSize="14">q₀</text>
          <text x="20" y="105" fill="#9ca3af" fontSize="14">q₁</text>

          {/* Initial states */}
          <text x="50" y="55" fill="#60a5fa" fontSize="12">|0⟩</text>
          <text x="50" y="105" fill="#60a5fa" fontSize="12">|0⟩</text>

          {/* Hadamard gate */}
          <motion.rect
            x="120" y="30" width="40" height="40" rx="4"
            fill={step >= 1 ? '#06b6d4' : '#1e1e2e'}
            stroke="#06b6d4" strokeWidth="2"
          />
          <text x="140" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">H</text>

          {/* CNOT gate */}
          <motion.circle
            cx="250" cy="50" r="8"
            fill={step >= 2 ? '#f97316' : '#1e1e2e'}
            stroke="#f97316" strokeWidth="2"
          />
          <line x1="250" y1="58" x2="250" y2="92" stroke="#f97316" strokeWidth="2" />
          <motion.circle
            cx="250" cy="100" r="12"
            fill="none" stroke="#f97316" strokeWidth="2"
          />
          <line x1="238" y1="100" x2="262" y2="100" stroke="#f97316" strokeWidth="2" />
          <line x1="250" y1="88" x2="250" y2="112" stroke="#f97316" strokeWidth="2" />

          {/* Output state */}
          <text x="350" y="75" fill="#22c55e" fontSize="14" fontWeight="bold">
            {steps[step].state.split('=')[0]}
          </text>
        </svg>
      </div>

      {/* Step indicator */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => { setStep(i); setPlaying(false); }}
            className={`p-3 rounded-lg text-left transition-all ${
              step === i ? 'bg-cyan-500/20 border border-cyan-500' : 'bg-omniviz-bg hover:bg-omniviz-surface'
            }`}
          >
            <div className="font-mono text-sm text-cyan-400 mb-1">{s.state.split('=')[0]}</div>
            <div className="text-xs text-omniviz-text-muted">{s.desc}</div>
          </button>
        ))}
      </div>

      <button
        onClick={runCircuit}
        disabled={playing}
        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-omniviz-border text-white rounded-lg font-semibold"
      >
        {playing ? 'Running...' : 'Run Circuit'}
      </button>
    </div>
  )
}

function QuantumAdvantageTable() {
  const data = [
    { n: 1, classical: '1', quantum: '2' },
    { n: 2, classical: '1', quantum: '4' },
    { n: 10, classical: '1', quantum: '1,024' },
    { n: 50, classical: '1', quantum: '~10¹⁵' },
    { n: 100, classical: '1', quantum: '~10³⁰' },
  ]

  return (
    <div className="bg-omniviz-bg rounded-xl overflow-hidden border border-omniviz-border">
      <table className="w-full text-sm">
        <thead className="bg-omniviz-surface">
          <tr>
            <th className="px-4 py-2 text-left text-omniviz-text">n bits/qubits</th>
            <th className="px-4 py-2 text-right text-omniviz-text">Classical states</th>
            <th className="px-4 py-2 text-right text-omniviz-text">Quantum states</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.n} className="border-t border-omniviz-border">
              <td className="px-4 py-2 font-mono text-omniviz-text">{row.n}</td>
              <td className="px-4 py-2 text-right text-blue-400">{row.classical}</td>
              <td className="px-4 py-2 text-right text-cyan-400 font-semibold">{row.quantum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default QuantumConcept
