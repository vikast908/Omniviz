import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function FunctionalProgrammingConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Functional Programming" color="purple" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Functional Programming</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                A paradigm where programs are built by composing pure functions and avoiding shared state.
              </motion.p>
            </div>
          </Section>

          <Section title="Pure Functions" id="pure">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">No Side Effects</h3>
              <p className="text-omniviz-text-muted mb-4">Pure functions always return the same output for the same input and have no side effects.</p>
            </ExplanationCard>
            <div className="mt-8"><PureFunctionsDemo /></div>
          </Section>

          <Section title="Immutability" id="immutability">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Never Mutate Data</h3>
              <p className="text-omniviz-text-muted mb-4">Instead of changing data, create new copies with the desired changes. This prevents bugs and enables time-travel debugging.</p>
            </ExplanationCard>
            <div className="mt-8"><ImmutabilityDemo /></div>
          </Section>

          <Section title="Higher-Order Functions" id="hof">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Functions as Values</h3>
              <p className="text-omniviz-text-muted mb-4">Higher-order functions take functions as arguments or return functions, enabling powerful abstractions.</p>
            </ExplanationCard>
            <div className="mt-8"><HigherOrderDemo /></div>
          </Section>

          <Section title="Map, Filter, Reduce" id="mfr">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Array Transformations</h3>
              <p className="text-omniviz-text-muted mb-4">These three operations can express most data transformations without loops or mutation.</p>
            </ExplanationCard>
            <div className="mt-8"><MapFilterReduceDemo /></div>
          </Section>

          <Section title="Function Composition" id="composition">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Building Complex from Simple</h3>
              <p className="text-omniviz-text-muted mb-4">Compose simple functions together to build complex behavior, like building with LEGO blocks.</p>
            </ExplanationCard>
            <div className="mt-8"><CompositionDemo /></div>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({ title, id, children }) {
  return (<motion.section id={id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="py-12 border-b border-omniviz-border last:border-0">{title && <h2 className="text-2xl font-bold mb-8 text-omniviz-text">{title}</h2>}{children}</motion.section>)
}
function ExplanationCard({ children }) {
  return <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">{children}</div>
}

function PureFunctionsDemo() {
  const [input, setInput] = useState(5)
  const [callCount, setCallCount] = useState(0)
  const [impureResult, setImpureResult] = useState(0)

  // Pure function - always same output for same input
  const pureDouble = (x) => x * 2
  const pureResult = pureDouble(input)

  // Impure function - different results due to external state
  const impureDouble = (x) => {
    setCallCount(c => c + 1)
    return x * 2 + Math.floor(Math.random() * 10)
  }

  const callImpure = () => {
    setImpureResult(impureDouble(input))
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg">
          <h4 className="text-green-400 font-bold mb-4">Pure Function ✓</h4>
          <pre className="text-sm font-mono text-omniviz-text bg-omniviz-bg p-3 rounded mb-4">
{`const double = (x) => x * 2

double(${input}) = ${pureResult}`}
          </pre>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-omniviz-text">Same input → Same output</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-omniviz-text">No side effects</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-omniviz-text">Easy to test and reason about</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
          <h4 className="text-red-400 font-bold mb-4">Impure Function ✗</h4>
          <pre className="text-sm font-mono text-omniviz-text bg-omniviz-bg p-3 rounded mb-4">
{`// Uses external state + randomness
const double = (x) => {
  callCount++  // side effect!
  return x * 2 + random()
}`}
          </pre>
          <button onClick={callImpure} className="mb-4 px-4 py-2 bg-red-500 text-white rounded-lg">
            Call impureDouble({input})
          </button>
          <div className="space-y-1 text-sm text-omniviz-text-muted">
            <div>Result: <span className="text-red-400">{impureResult}</span></div>
            <div>Call count: <span className="text-red-400">{callCount}</span></div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label className="text-omniviz-text text-sm">Input value: {input}</label>
        <input type="range" min="1" max="10" value={input} onChange={(e) => setInput(Number(e.target.value))} className="w-full" />
      </div>
    </div>
  )
}

function ImmutabilityDemo() {
  const [history, setHistory] = useState([[1, 2, 3]])
  const [currentIndex, setCurrentIndex] = useState(0)

  const current = history[currentIndex]

  const addItem = () => {
    const newArray = [...current, current.length + 1]
    setHistory([...history.slice(0, currentIndex + 1), newArray])
    setCurrentIndex(currentIndex + 1)
  }

  const removeItem = () => {
    if (current.length > 0) {
      const newArray = current.slice(0, -1)
      setHistory([...history.slice(0, currentIndex + 1), newArray])
      setCurrentIndex(currentIndex + 1)
    }
  }

  const undo = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const redo = () => {
    if (currentIndex < history.length - 1) setCurrentIndex(currentIndex + 1)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Current State</h4>
          <div className="flex gap-2 mb-4">
            {current.map((item, i) => (
              <div key={i} className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                {item}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={addItem} className="px-4 py-2 bg-green-500 text-white rounded-lg">Add</button>
            <button onClick={removeItem} className="px-4 py-2 bg-red-500 text-white rounded-lg">Remove</button>
            <button onClick={undo} disabled={currentIndex === 0} className="px-4 py-2 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border disabled:opacity-50">↩ Undo</button>
            <button onClick={redo} disabled={currentIndex === history.length - 1} className="px-4 py-2 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border disabled:opacity-50">↪ Redo</button>
          </div>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">State History</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {history.map((state, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg font-mono text-sm ${i === currentIndex ? 'bg-blue-500/20 border border-blue-500' : 'bg-omniviz-bg'}`}
              >
                <span className="text-omniviz-text-muted">v{i}: </span>
                <span className="text-omniviz-text">[{state.join(', ')}]</span>
                {i === currentIndex && <span className="text-blue-400 ml-2">← current</span>}
              </div>
            ))}
          </div>
          <p className="mt-4 text-omniviz-text-muted text-sm">
            Immutability enables time-travel: every state is preserved!
          </p>
        </div>
      </div>
    </div>
  )
}

function HigherOrderDemo() {
  const [multiplier, setMultiplier] = useState(2)

  // Function that returns a function
  const createMultiplier = (n) => (x) => x * n

  const double = createMultiplier(2)
  const triple = createMultiplier(3)
  const custom = createMultiplier(multiplier)

  const testValue = 5

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Function Factory</h4>
          <pre className="text-sm font-mono text-omniviz-text bg-omniviz-bg p-4 rounded-lg mb-4">
{`// Higher-order function
const createMultiplier = (n) => {
  return (x) => x * n
}

const double = createMultiplier(2)
const triple = createMultiplier(3)

double(5)  // 10
triple(5)  // 15`}
          </pre>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Results</h4>
          <div className="space-y-3">
            <div className="p-3 bg-omniviz-bg rounded-lg flex justify-between">
              <span className="text-omniviz-text">double({testValue})</span>
              <span className="text-green-400 font-mono">{double(testValue)}</span>
            </div>
            <div className="p-3 bg-omniviz-bg rounded-lg flex justify-between">
              <span className="text-omniviz-text">triple({testValue})</span>
              <span className="text-green-400 font-mono">{triple(testValue)}</span>
            </div>
            <div className="p-3 bg-purple-500/20 border border-purple-500 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-omniviz-text">createMultiplier({multiplier})({testValue})</span>
                <span className="text-purple-400 font-mono">{custom(testValue)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MapFilterReduceDemo() {
  const [numbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [operation, setOperation] = useState('map')

  const mapResult = numbers.map(x => x * 2)
  const filterResult = numbers.filter(x => x % 2 === 0)
  const reduceResult = numbers.reduce((sum, x) => sum + x, 0)

  const results = {
    map: { fn: 'x => x * 2', result: mapResult, color: 'green' },
    filter: { fn: 'x => x % 2 === 0', result: filterResult, color: 'blue' },
    reduce: { fn: '(sum, x) => sum + x', result: reduceResult, color: 'purple' }
  }

  const current = results[operation]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-2 mb-6">
        {['map', 'filter', 'reduce'].map(op => (
          <button
            key={op}
            onClick={() => setOperation(op)}
            className={`px-4 py-2 rounded-lg capitalize ${operation === op ? `bg-${results[op].color}-500 text-white` : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
          >
            {op}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-3">Input Array</h4>
          <div className="flex flex-wrap gap-1">
            {numbers.map((n, i) => (
              <span key={i} className="w-8 h-8 bg-omniviz-surface rounded flex items-center justify-center text-omniviz-text font-mono text-sm">
                {n}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className={`text-${current.color}-400 font-semibold mb-3 capitalize`}>{operation}</h4>
          <pre className="text-xs font-mono text-omniviz-text bg-omniviz-surface p-2 rounded mb-2">
{`numbers.${operation}(${current.fn})`}
          </pre>
          <p className="text-omniviz-text-muted text-sm">
            {operation === 'map' && 'Transform each element'}
            {operation === 'filter' && 'Keep matching elements'}
            {operation === 'reduce' && 'Combine into single value'}
          </p>
        </div>
        <div className={`p-4 bg-${current.color}-500/20 border border-${current.color}-500 rounded-lg`}>
          <h4 className={`text-${current.color}-400 font-semibold mb-3`}>Result</h4>
          {Array.isArray(current.result) ? (
            <div className="flex flex-wrap gap-1">
              {current.result.map((n, i) => (
                <span key={i} className={`w-8 h-8 bg-${current.color}-500 rounded flex items-center justify-center text-white font-mono text-sm`}>
                  {n}
                </span>
              ))}
            </div>
          ) : (
            <div className={`text-3xl font-bold text-${current.color}-400`}>{current.result}</div>
          )}
        </div>
      </div>
    </div>
  )
}

function CompositionDemo() {
  const [input, setInput] = useState('hello world')

  // Simple functions
  const trim = (s) => s.trim()
  const toUpper = (s) => s.toUpperCase()
  const addExclaim = (s) => s + '!'
  const replaceSpaces = (s) => s.replace(/ /g, '_')

  // Compose function
  const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x)

  // Composed functions
  const shout = compose(addExclaim, toUpper, trim)
  const slugify = compose(replaceSpaces, trim)
  const shoutSlug = compose(addExclaim, toUpper, replaceSpaces, trim)

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="mb-6">
        <label className="text-omniviz-text-muted text-sm">Input:</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 font-mono mt-1"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Building Blocks</h4>
          <div className="space-y-2">
            {[
              { name: 'trim', fn: trim, desc: 'Remove whitespace' },
              { name: 'toUpper', fn: toUpper, desc: 'Uppercase' },
              { name: 'addExclaim', fn: addExclaim, desc: 'Add !' },
              { name: 'replaceSpaces', fn: replaceSpaces, desc: 'Spaces → _' }
            ].map(({ name, fn, desc }) => (
              <div key={name} className="p-2 bg-omniviz-bg rounded-lg flex justify-between items-center">
                <div>
                  <span className="text-cyan-400 font-mono text-sm">{name}</span>
                  <span className="text-omniviz-text-muted text-xs ml-2">{desc}</span>
                </div>
                <span className="text-omniviz-text font-mono text-sm">{fn(input)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Composed Functions</h4>
          <div className="space-y-3">
            <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg">
              <div className="text-green-400 font-mono text-sm mb-1">shout = compose(addExclaim, toUpper, trim)</div>
              <div className="text-omniviz-text font-mono">{shout(input)}</div>
            </div>
            <div className="p-3 bg-blue-500/20 border border-blue-500 rounded-lg">
              <div className="text-blue-400 font-mono text-sm mb-1">slugify = compose(replaceSpaces, trim)</div>
              <div className="text-omniviz-text font-mono">{slugify(input)}</div>
            </div>
            <div className="p-3 bg-purple-500/20 border border-purple-500 rounded-lg">
              <div className="text-purple-400 font-mono text-sm mb-1">shoutSlug = compose(all four)</div>
              <div className="text-omniviz-text font-mono">{shoutSlug(input)}</div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-omniviz-text-muted text-sm text-center">
        Composition flows right-to-left: trim → replaceSpaces → toUpper → addExclaim
      </p>
    </div>
  )
}

export default FunctionalProgrammingConcept
