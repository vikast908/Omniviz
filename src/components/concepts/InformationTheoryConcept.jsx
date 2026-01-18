import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function InformationTheoryConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Information Theory" color="purple" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Information Theory</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                The mathematical study of information, entropy, and data compression.
              </motion.p>
            </div>
          </Section>

          <Section title="Entropy" id="entropy">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Shannon Entropy</h3>
              <p className="text-omniviz-text-muted mb-4">Entropy measures the average amount of information (surprise) in a random variable. Higher entropy means more uncertainty.</p>
            </ExplanationCard>
            <div className="mt-8"><EntropyDemo /></div>
          </Section>

          <Section title="Huffman Coding" id="huffman">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Optimal Prefix Codes</h3>
              <p className="text-omniviz-text-muted mb-4">Huffman coding creates variable-length codes where frequent symbols get shorter codes, achieving near-optimal compression.</p>
            </ExplanationCard>
            <div className="mt-8"><HuffmanDemo /></div>
          </Section>

          <Section title="Data Compression" id="compression">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Lossless vs Lossy</h3>
              <p className="text-omniviz-text-muted mb-4">Lossless compression preserves all data (ZIP, PNG), while lossy compression discards some data for better ratios (JPEG, MP3).</p>
            </ExplanationCard>
            <div className="mt-8"><CompressionDemo /></div>
          </Section>

          <Section title="Channel Capacity" id="channel">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Shannon's Theorem</h3>
              <p className="text-omniviz-text-muted mb-4">Every communication channel has a maximum rate at which data can be transmitted reliably, determined by bandwidth and signal-to-noise ratio.</p>
            </ExplanationCard>
            <div className="mt-8"><ChannelDemo /></div>
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

function EntropyDemo() {
  const [probs, setProbs] = useState([0.5, 0.5])

  const entropy = useMemo(() => {
    return -probs.reduce((sum, p) => {
      if (p > 0) return sum + p * Math.log2(p)
      return sum
    }, 0)
  }, [probs])

  const updateProb = (idx, val) => {
    const newProbs = [...probs]
    newProbs[idx] = val
    // Normalize to sum to 1
    const sum = newProbs.reduce((a, b) => a + b, 0)
    setProbs(newProbs.map(p => p / sum))
  }

  const addOutcome = () => {
    if (probs.length < 8) {
      const newProbs = [...probs, 0.1]
      const sum = newProbs.reduce((a, b) => a + b, 0)
      setProbs(newProbs.map(p => p / sum))
    }
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Probability Distribution</h4>
          <div className="space-y-3">
            {probs.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-omniviz-text w-16">P(X={i})</span>
                <input
                  type="range"
                  min="0.01"
                  max="1"
                  step="0.01"
                  value={p}
                  onChange={(e) => updateProb(i, Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-cyan-400 font-mono w-16">{(p * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
          <button onClick={addOutcome} disabled={probs.length >= 8} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50">
            Add Outcome
          </button>
        </div>
        <div>
          <div className="p-4 bg-omniviz-bg rounded-lg mb-4">
            <h4 className="text-omniviz-text font-semibold mb-2">Shannon Entropy</h4>
            <div className="text-3xl font-bold text-purple-400">{entropy.toFixed(3)} bits</div>
            <div className="text-omniviz-text-muted text-sm mt-2">
              H(X) = -Σ p(x) log₂ p(x)
            </div>
          </div>
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <h4 className="text-omniviz-text font-semibold mb-2">Interpretation</h4>
            <p className="text-omniviz-text-muted text-sm">
              {entropy < 0.5 && 'Very low entropy: outcome is highly predictable'}
              {entropy >= 0.5 && entropy < 1 && 'Low entropy: some uncertainty'}
              {entropy >= 1 && entropy < 2 && 'Moderate entropy: fair amount of uncertainty'}
              {entropy >= 2 && 'High entropy: outcomes are quite unpredictable'}
            </p>
            <p className="text-omniviz-text-muted text-sm mt-2">
              Max entropy for {probs.length} outcomes: {Math.log2(probs.length).toFixed(3)} bits
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function HuffmanDemo() {
  const [text, setText] = useState('ABRACADABRA')

  const result = useMemo(() => {
    // Count frequencies
    const freq = {}
    for (const char of text) {
      freq[char] = (freq[char] || 0) + 1
    }

    // Build simple codes based on frequency (simplified Huffman)
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1])
    const codes = {}
    sorted.forEach(([char, _], i) => {
      // Simplified: shorter codes for more frequent
      codes[char] = i.toString(2).padStart(Math.ceil(Math.log2(sorted.length + 1)), '0')
    })

    const originalBits = text.length * 8
    const compressedBits = text.split('').reduce((sum, char) => sum + codes[char].length, 0)

    return { freq, codes, originalBits, compressedBits, ratio: (compressedBits / originalBits * 100).toFixed(1) }
  }, [text])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="mb-6">
        <label className="text-omniviz-text-muted text-sm">Input Text:</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value.toUpperCase())}
          className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 font-mono mt-1"
          placeholder="Enter text..."
        />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-3">Character Frequencies</h4>
          <div className="space-y-2">
            {Object.entries(result.freq).sort((a, b) => b[1] - a[1]).map(([char, count]) => (
              <div key={char} className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono w-8">'{char}'</span>
                <div className="flex-1 bg-omniviz-surface rounded-full h-4 overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: `${(count / text.length) * 100}%` }} />
                </div>
                <span className="text-omniviz-text-muted text-sm w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-3">Huffman Codes</h4>
          <div className="space-y-2">
            {Object.entries(result.codes).map(([char, code]) => (
              <div key={char} className="flex justify-between">
                <span className="text-omniviz-text">'{char}'</span>
                <span className="text-yellow-400 font-mono">{code}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-3">Compression Stats</h4>
          <div className="space-y-3">
            <div>
              <span className="text-omniviz-text-muted text-sm">Original (8 bits/char):</span>
              <div className="text-omniviz-text font-mono">{result.originalBits} bits</div>
            </div>
            <div>
              <span className="text-omniviz-text-muted text-sm">Huffman encoded:</span>
              <div className="text-green-400 font-mono">{result.compressedBits} bits</div>
            </div>
            <div>
              <span className="text-omniviz-text-muted text-sm">Compression ratio:</span>
              <div className="text-purple-400 font-mono text-xl">{result.ratio}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompressionDemo() {
  const [mode, setMode] = useState('rle')
  const [input, setInput] = useState('AAABBBCCCCDDDD')

  const result = useMemo(() => {
    if (mode === 'rle') {
      // Run-Length Encoding
      let encoded = ''
      let count = 1
      for (let i = 0; i < input.length; i++) {
        if (input[i] === input[i + 1]) {
          count++
        } else {
          encoded += input[i] + count
          count = 1
        }
      }
      return {
        encoded,
        originalSize: input.length,
        compressedSize: encoded.length,
        ratio: ((1 - encoded.length / input.length) * 100).toFixed(1)
      }
    } else {
      // Dictionary-based (simplified LZ77)
      const dict = {}
      let encoded = ''
      let i = 0
      while (i < input.length) {
        let match = ''
        for (let len = 1; len <= 4 && i + len <= input.length; len++) {
          const sub = input.slice(i, i + len)
          if (dict[sub] !== undefined) {
            match = sub
          }
        }
        if (match) {
          encoded += `[${dict[match]}]`
          i += match.length
        } else {
          const char = input[i]
          dict[char] = Object.keys(dict).length
          encoded += char
          i++
        }
      }
      return {
        encoded,
        originalSize: input.length,
        compressedSize: encoded.length,
        ratio: ((1 - encoded.length / input.length) * 100).toFixed(1),
        dict
      }
    }
  }, [input, mode])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setMode('rle')} className={`px-4 py-2 rounded-lg ${mode === 'rle' ? 'bg-orange-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>
          Run-Length Encoding
        </button>
        <button onClick={() => setMode('dict')} className={`px-4 py-2 rounded-lg ${mode === 'dict' ? 'bg-orange-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>
          Dictionary-Based
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-omniviz-text-muted text-sm">Input:</label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 font-mono mt-1"
          />
          <div className="mt-2 text-omniviz-text-muted text-sm">
            {mode === 'rle' ? 'Try: AAABBBCCCC' : 'Try: ABCABCABC'}
          </div>
        </div>
        <div>
          <label className="text-omniviz-text-muted text-sm">Compressed:</label>
          <div className="w-full bg-omniviz-bg text-green-400 rounded-lg border border-omniviz-border px-3 py-2 font-mono mt-1">
            {result.encoded}
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-omniviz-bg rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-omniviz-text-muted text-sm">Original</div>
            <div className="text-omniviz-text font-mono text-xl">{result.originalSize} chars</div>
          </div>
          <div>
            <div className="text-omniviz-text-muted text-sm">Compressed</div>
            <div className="text-green-400 font-mono text-xl">{result.compressedSize} chars</div>
          </div>
          <div>
            <div className="text-omniviz-text-muted text-sm">Savings</div>
            <div className="text-purple-400 font-mono text-xl">{result.ratio}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChannelDemo() {
  const [bandwidth, setBandwidth] = useState(1000)
  const [snr, setSnr] = useState(10)

  // Shannon-Hartley theorem: C = B * log2(1 + S/N)
  const capacity = bandwidth * Math.log2(1 + snr)

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="text-omniviz-text text-sm">Bandwidth (Hz): {bandwidth}</label>
            <input
              type="range"
              min="100"
              max="10000"
              value={bandwidth}
              onChange={(e) => setBandwidth(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
          <div>
            <label className="text-omniviz-text text-sm">Signal-to-Noise Ratio: {snr}</label>
            <input
              type="range"
              min="1"
              max="100"
              value={snr}
              onChange={(e) => setSnr(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <h4 className="text-omniviz-text font-semibold mb-2">Shannon-Hartley Theorem</h4>
            <code className="text-cyan-400 font-mono">C = B × log₂(1 + S/N)</code>
            <p className="text-omniviz-text-muted text-sm mt-2">
              Maximum channel capacity in bits per second
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-omniviz-text-muted text-sm mb-2">Channel Capacity</div>
          <div className="text-5xl font-bold text-cyan-400">
            {(capacity / 1000).toFixed(2)}
          </div>
          <div className="text-omniviz-text text-xl">kbps</div>
          <div className="mt-4 w-full p-3 bg-omniviz-bg rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-omniviz-text-muted">Bandwidth:</span>
              <span className="text-omniviz-text">{bandwidth} Hz</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-omniviz-text-muted">SNR:</span>
              <span className="text-omniviz-text">{snr} ({(10 * Math.log10(snr)).toFixed(1)} dB)</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-omniviz-text-muted text-sm">
        Doubling bandwidth doubles capacity linearly. Doubling SNR adds only ~1 bit/s/Hz due to logarithmic relationship.
      </p>
    </div>
  )
}

export default InformationTheoryConcept
