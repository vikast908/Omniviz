import { useState } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function TypeSystemsConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Type Systems" color="blue" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Type Systems</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Rules for classifying values and ensuring program correctness at compile time.
              </motion.p>
            </div>
          </Section>

          <Section title="Static vs Dynamic" id="static-dynamic">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">When Types Are Checked</h3>
              <p className="text-omniviz-text-muted mb-4">Static typing catches errors at compile time; dynamic typing checks types at runtime.</p>
            </ExplanationCard>
            <div className="mt-8"><StaticDynamicDemo /></div>
          </Section>

          <Section title="Type Inference" id="inference">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Automatic Type Detection</h3>
              <p className="text-omniviz-text-muted mb-4">Modern type systems can infer types from context, reducing the need for explicit annotations.</p>
            </ExplanationCard>
            <div className="mt-8"><InferenceDemo /></div>
          </Section>

          <Section title="Generics" id="generics">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Parametric Polymorphism</h3>
              <p className="text-omniviz-text-muted mb-4">Generics allow writing code that works with multiple types while maintaining type safety.</p>
            </ExplanationCard>
            <div className="mt-8"><GenericsDemo /></div>
          </Section>

          <Section title="Union & Intersection" id="union">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Combining Types</h3>
              <p className="text-omniviz-text-muted mb-4">Union types represent "either/or" while intersection types represent "both/and".</p>
            </ExplanationCard>
            <div className="mt-8"><UnionIntersectionDemo /></div>
          </Section>

          <Section title="Type Guards" id="guards">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-red-400 mb-4">Narrowing Types</h3>
              <p className="text-omniviz-text-muted mb-4">Type guards help the compiler narrow down types based on runtime checks.</p>
            </ExplanationCard>
            <div className="mt-8"><TypeGuardsDemo /></div>
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

function StaticDynamicDemo() {
  const [mode, setMode] = useState('static')

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setMode('static')} className={`px-4 py-2 rounded-lg ${mode === 'static' ? 'bg-blue-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>
          Static Typing
        </button>
        <button onClick={() => setMode('dynamic')} className={`px-4 py-2 rounded-lg ${mode === 'dynamic' ? 'bg-yellow-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>
          Dynamic Typing
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className={`${mode === 'static' ? 'text-blue-400' : 'text-yellow-400'} font-semibold mb-3`}>
            {mode === 'static' ? 'TypeScript (Static)' : 'JavaScript (Dynamic)'}
          </h4>
          <pre className="text-sm font-mono text-omniviz-text overflow-x-auto">
{mode === 'static' ? `// Types checked at COMPILE time
function add(a: number, b: number): number {
  return a + b
}

add(1, 2)      // ✓ OK
add("1", "2")  // ✗ Error at compile time!

// Caught before running the code` : `// Types checked at RUNTIME
function add(a, b) {
  return a + b
}

add(1, 2)      // 3
add("1", "2")  // "12" (oops!)

// Bug discovered in production 😱`}
          </pre>
        </div>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${mode === 'static' ? 'bg-blue-500/20 border border-blue-500' : 'bg-yellow-500/20 border border-yellow-500'}`}>
            <h4 className={mode === 'static' ? 'text-blue-400' : 'text-yellow-400'}>
              {mode === 'static' ? 'Static Typing' : 'Dynamic Typing'}
            </h4>
            <ul className="mt-2 space-y-1 text-sm text-omniviz-text-muted">
              {mode === 'static' ? (
                <>
                  <li>• Types declared or inferred</li>
                  <li>• Errors caught early</li>
                  <li>• Better IDE support</li>
                  <li>• Languages: TypeScript, Java, Rust</li>
                </>
              ) : (
                <>
                  <li>• Types determined at runtime</li>
                  <li>• More flexible</li>
                  <li>• Faster prototyping</li>
                  <li>• Languages: JavaScript, Python, Ruby</li>
                </>
              )}
            </ul>
          </div>
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-omniviz-text">Error Detection:</span>
              <span className={mode === 'static' ? 'text-green-400' : 'text-yellow-400'}>
                {mode === 'static' ? 'Compile time' : 'Runtime'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InferenceDemo() {
  const examples = [
    { code: 'let x = 42', inferred: 'number', explanation: 'Literal number' },
    { code: 'let s = "hello"', inferred: 'string', explanation: 'Literal string' },
    { code: 'let arr = [1, 2, 3]', inferred: 'number[]', explanation: 'Array of numbers' },
    { code: 'let mixed = [1, "a"]', inferred: '(number | string)[]', explanation: 'Mixed array' },
    { code: 'const obj = { x: 1 }', inferred: '{ x: number }', explanation: 'Object literal' },
    { code: 'const fn = (n) => n * 2', inferred: '(n: any) => number', explanation: 'Arrow function' }
  ]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="space-y-3">
        {examples.map((ex, i) => (
          <div key={i} className="p-3 bg-omniviz-bg rounded-lg flex items-center gap-4">
            <code className="text-omniviz-text font-mono text-sm flex-1">{ex.code}</code>
            <div className="text-center">
              <span className="text-omniviz-text-muted">→</span>
            </div>
            <code className="text-purple-400 font-mono text-sm w-40">{ex.inferred}</code>
            <span className="text-omniviz-text-muted text-sm w-32">{ex.explanation}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-purple-500/20 border border-purple-500 rounded-lg">
        <h4 className="text-purple-400 font-semibold mb-2">How Inference Works</h4>
        <ol className="text-sm text-omniviz-text-muted space-y-1 list-decimal list-inside">
          <li>Analyze the value on the right side</li>
          <li>Determine the most specific compatible type</li>
          <li>Apply that type to the variable</li>
          <li>Use context for functions (parameters, return)</li>
        </ol>
      </div>
    </div>
  )
}

function GenericsDemo() {
  const [type, setType] = useState('number')

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Generic Function</h4>
          <pre className="text-sm font-mono text-omniviz-text bg-omniviz-bg p-4 rounded-lg">
{`// T is a type parameter
function identity<T>(value: T): T {
  return value
}

// Type is inferred from argument
identity(42)        // T = number
identity("hello")   // T = string
identity([1, 2])    // T = number[]`}
          </pre>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Generic Container</h4>
          <pre className="text-sm font-mono text-omniviz-text bg-omniviz-bg p-4 rounded-lg mb-4">
{`interface Box<T> {
  value: T
  map: <U>(fn: (v: T) => U) => Box<U>
}

const numBox: Box<number> = {
  value: 42,
  map: (fn) => ({ value: fn(42), map: ... })
}`}
          </pre>
          <div className="flex gap-2 mb-3">
            {['number', 'string', 'boolean'].map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1 rounded text-sm ${type === t ? 'bg-orange-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="p-3 bg-orange-500/20 border border-orange-500 rounded-lg">
            <code className="text-orange-400 font-mono text-sm">
              Box&lt;{type}&gt; → value: {type === 'number' ? '42' : type === 'string' ? '"hello"' : 'true'}
            </code>
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-omniviz-bg rounded-lg">
        <h4 className="text-omniviz-text font-semibold mb-2">Why Generics?</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><span className="text-green-400">✓</span> <span className="text-omniviz-text">Type safety</span></div>
          <div><span className="text-green-400">✓</span> <span className="text-omniviz-text">Code reuse</span></div>
          <div><span className="text-green-400">✓</span> <span className="text-omniviz-text">No type casting</span></div>
        </div>
      </div>
    </div>
  )
}

function UnionIntersectionDemo() {
  const [mode, setMode] = useState('union')

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setMode('union')} className={`px-4 py-2 rounded-lg ${mode === 'union' ? 'bg-cyan-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>
          Union (|)
        </button>
        <button onClick={() => setMode('intersection')} className={`px-4 py-2 rounded-lg ${mode === 'intersection' ? 'bg-pink-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>
          Intersection (&)
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {mode === 'union' ? (
          <>
            <div className="p-4 bg-omniviz-bg rounded-lg">
              <h4 className="text-cyan-400 font-semibold mb-3">Union Type (A | B)</h4>
              <pre className="text-sm font-mono text-omniviz-text mb-4">
{`type StringOrNumber = string | number

let value: StringOrNumber

value = "hello"  // ✓ OK
value = 42       // ✓ OK
value = true     // ✗ Error!`}
              </pre>
              <p className="text-omniviz-text-muted text-sm">Value can be either type A OR type B</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-blue-500/30 rounded-full absolute left-0" />
                <div className="w-32 h-32 bg-green-500/30 rounded-full absolute left-16" />
                <div className="absolute left-8 top-14 text-white font-bold text-sm">A</div>
                <div className="absolute left-24 top-14 text-white font-bold text-sm">B</div>
                <div className="absolute left-16 top-14 text-yellow-400 font-bold text-xs">A|B</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="p-4 bg-omniviz-bg rounded-lg">
              <h4 className="text-pink-400 font-semibold mb-3">Intersection Type (A & B)</h4>
              <pre className="text-sm font-mono text-omniviz-text mb-4">
{`type Named = { name: string }
type Aged = { age: number }

type Person = Named & Aged

const p: Person = {
  name: "Alice",  // required
  age: 30         // required
}`}
              </pre>
              <p className="text-omniviz-text-muted text-sm">Value must have ALL properties from both types</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-blue-500/30 rounded-full absolute left-0" />
                <div className="w-32 h-32 bg-green-500/30 rounded-full absolute left-16" />
                <div className="w-16 h-32 bg-purple-500/50 rounded-full absolute left-8" style={{ clipPath: 'ellipse(50% 50%)' }} />
                <div className="absolute left-4 top-14 text-white font-bold text-sm">A</div>
                <div className="absolute left-28 top-14 text-white font-bold text-sm">B</div>
                <div className="absolute left-14 top-14 text-yellow-400 font-bold text-xs">A&B</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function TypeGuardsDemo() {
  const [value, setValue] = useState('hello')
  const [valueType, setValueType] = useState('string')

  const typeOf = (v) => {
    if (typeof v === 'string') return 'string'
    if (typeof v === 'number') return 'number'
    if (Array.isArray(v)) return 'array'
    if (v === null) return 'null'
    if (typeof v === 'object') return 'object'
    return typeof v
  }

  const testValues = [
    { val: 'hello', display: '"hello"', type: 'string' },
    { val: 42, display: '42', type: 'number' },
    { val: [1, 2], display: '[1, 2]', type: 'array' },
    { val: null, display: 'null', type: 'null' },
    { val: { x: 1 }, display: '{ x: 1 }', type: 'object' }
  ]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Type Guard Examples</h4>
          <pre className="text-sm font-mono text-omniviz-text bg-omniviz-bg p-4 rounded-lg">
{`function process(value: string | number) {
  // Type guard: typeof
  if (typeof value === 'string') {
    // Here, TypeScript knows value is string
    return value.toUpperCase()
  } else {
    // Here, value must be number
    return value.toFixed(2)
  }
}

// Custom type guard
function isArray(x: unknown): x is any[] {
  return Array.isArray(x)
}`}
          </pre>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Test Type Guards</h4>
          <div className="space-y-2 mb-4">
            {testValues.map((tv, i) => (
              <button
                key={i}
                onClick={() => { setValue(tv.val); setValueType(tv.type) }}
                className={`w-full p-3 rounded-lg text-left ${valueType === tv.type ? 'bg-red-500/20 border border-red-500' : 'bg-omniviz-bg'}`}
              >
                <div className="flex justify-between">
                  <code className="text-omniviz-text font-mono">{tv.display}</code>
                  <span className="text-omniviz-text-muted">→ {tv.type}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <h4 className="text-red-400 font-semibold mb-2">Type Narrowed!</h4>
            <div className="text-sm text-omniviz-text">
              <code className="font-mono">typeof value === '{valueType}'</code>
              <p className="mt-2 text-omniviz-text-muted">
                Inside this branch, TypeScript knows the exact type.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypeSystemsConcept
