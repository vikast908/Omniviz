import { useState, useRef, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function SignalProcessingConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Signal Processing" color="cyan" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Signal Processing</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Analyzing, modifying, and synthesizing signals like audio, images, and sensor data.
              </motion.p>
            </div>
          </Section>

          <Section title="Waveforms" id="waveforms">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Basic Wave Types</h3>
              <p className="text-omniviz-text-muted mb-4">Signals can be represented as sine, square, triangle, and sawtooth waves, each with unique characteristics.</p>
            </ExplanationCard>
            <div className="mt-8"><WaveformDemo /></div>
          </Section>

          <Section title="Fourier Transform" id="fourier">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Frequency Domain Analysis</h3>
              <p className="text-omniviz-text-muted mb-4">The Fourier Transform decomposes signals into their constituent frequencies, revealing hidden patterns.</p>
            </ExplanationCard>
            <div className="mt-8"><FourierDemo /></div>
          </Section>

          <Section title="Sampling" id="sampling">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Nyquist Theorem</h3>
              <p className="text-omniviz-text-muted mb-4">To accurately capture a signal, sample rate must be at least twice the highest frequency (Nyquist rate).</p>
            </ExplanationCard>
            <div className="mt-8"><SamplingDemo /></div>
          </Section>

          <Section title="Filtering" id="filtering">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Frequency Filters</h3>
              <p className="text-omniviz-text-muted mb-4">Filters selectively pass or block certain frequencies: low-pass, high-pass, band-pass, and notch.</p>
            </ExplanationCard>
            <div className="mt-8"><FilterDemo /></div>
          </Section>

          <Section title="Convolution" id="convolution">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-red-400 mb-4">Signal Combination</h3>
              <p className="text-omniviz-text-muted mb-4">Convolution combines two signals to produce a third, fundamental to filtering and system analysis.</p>
            </ExplanationCard>
            <div className="mt-8"><ConvolutionDemo /></div>
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

function WaveformDemo() {
  const canvasRef = useRef(null)
  const [waveType, setWaveType] = useState('sine')
  const [frequency, setFrequency] = useState(2)
  const [amplitude, setAmplitude] = useState(1)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const w = canvas.width = 400
    const h = canvas.height = 150

    ctx.fillStyle = 'rgb(var(--omniviz-bg))'
    ctx.fillRect(0, 0, w, h)

    // Draw grid
    ctx.strokeStyle = 'rgba(var(--omniviz-border), 0.5)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, h / 2)
    ctx.lineTo(w, h / 2)
    ctx.stroke()

    // Draw waveform
    ctx.strokeStyle = '#22c55e'
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let x = 0; x < w; x++) {
      const t = (x / w) * Math.PI * 2 * frequency
      let y

      switch (waveType) {
        case 'sine':
          y = Math.sin(t)
          break
        case 'square':
          y = Math.sin(t) > 0 ? 1 : -1
          break
        case 'triangle':
          y = (2 / Math.PI) * Math.asin(Math.sin(t))
          break
        case 'sawtooth':
          y = (2 / Math.PI) * (t % (Math.PI * 2) - Math.PI)
          y = y > 1 ? y - 2 : y < -1 ? y + 2 : y
          break
        default:
          y = 0
      }

      y = h / 2 - y * amplitude * (h / 2 - 10)

      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }, [waveType, frequency, amplitude])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <canvas ref={canvasRef} className="w-full rounded-lg border border-omniviz-border" />
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-omniviz-text-muted text-sm">Wave Type</label>
            <div className="flex gap-2 mt-1">
              {['sine', 'square', 'triangle', 'sawtooth'].map(type => (
                <button
                  key={type}
                  onClick={() => setWaveType(type)}
                  className={`px-3 py-1 rounded text-sm capitalize ${waveType === type ? 'bg-green-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-omniviz-text text-sm">Frequency: {frequency} Hz</label>
            <input type="range" min="1" max="10" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-omniviz-text text-sm">Amplitude: {amplitude.toFixed(1)}</label>
            <input type="range" min="0.1" max="1" step="0.1" value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

function FourierDemo() {
  const [components, setComponents] = useState([
    { freq: 1, amp: 1 },
    { freq: 3, amp: 0.33 },
    { freq: 5, amp: 0.2 }
  ])
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const w = canvas.width = 400
    const h = canvas.height = 150

    ctx.fillStyle = 'rgb(var(--omniviz-bg))'
    ctx.fillRect(0, 0, w, h)

    ctx.strokeStyle = 'rgba(var(--omniviz-border), 0.5)'
    ctx.beginPath()
    ctx.moveTo(0, h / 2)
    ctx.lineTo(w, h / 2)
    ctx.stroke()

    // Draw combined signal
    ctx.strokeStyle = '#a855f7'
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let x = 0; x < w; x++) {
      const t = (x / w) * Math.PI * 4
      let y = 0
      components.forEach(comp => {
        y += comp.amp * Math.sin(t * comp.freq)
      })

      const py = h / 2 - y * (h / 3)
      if (x === 0) ctx.moveTo(x, py)
      else ctx.lineTo(x, py)
    }
    ctx.stroke()
  }, [components])

  const updateComponent = (index, field, value) => {
    const newComps = [...components]
    newComps[index] = { ...newComps[index], [field]: value }
    setComponents(newComps)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Combined Signal</h4>
          <canvas ref={canvasRef} className="w-full rounded-lg border border-omniviz-border" />
          <p className="text-omniviz-text-muted text-sm mt-2">
            Sum of sine waves at different frequencies
          </p>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Frequency Components</h4>
          <div className="space-y-4">
            {components.map((comp, i) => (
              <div key={i} className="p-3 bg-omniviz-bg rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-purple-400 font-mono w-16">{comp.freq} Hz</span>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={comp.amp}
                      onChange={(e) => updateComponent(i, 'amp', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <span className="text-omniviz-text w-12">{comp.amp.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-omniviz-text-muted text-sm mt-4">
            Fourier analysis breaks any signal into sine wave components.
          </p>
        </div>
      </div>
    </div>
  )
}

function SamplingDemo() {
  const canvasRef = useRef(null)
  const [signalFreq, setSignalFreq] = useState(5)
  const [sampleRate, setSampleRate] = useState(20)

  const nyquistRate = signalFreq * 2
  const isAliasing = sampleRate < nyquistRate

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const w = canvas.width = 400
    const h = canvas.height = 150

    ctx.fillStyle = 'rgb(var(--omniviz-bg))'
    ctx.fillRect(0, 0, w, h)

    // Draw continuous signal
    ctx.strokeStyle = 'rgba(255, 165, 0, 0.5)'
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = 0; x < w; x++) {
      const t = (x / w) * 2
      const y = h / 2 - Math.sin(t * Math.PI * 2 * signalFreq) * (h / 3)
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Draw sample points
    const numSamples = Math.floor(sampleRate * 2)
    ctx.fillStyle = isAliasing ? '#ef4444' : '#22c55e'

    for (let i = 0; i < numSamples; i++) {
      const x = (i / numSamples) * w
      const t = (i / numSamples) * 2
      const y = h / 2 - Math.sin(t * Math.PI * 2 * signalFreq) * (h / 3)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw reconstructed signal
    ctx.strokeStyle = isAliasing ? '#ef4444' : '#22c55e'
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let i = 0; i < numSamples - 1; i++) {
      const x1 = (i / numSamples) * w
      const x2 = ((i + 1) / numSamples) * w
      const t1 = (i / numSamples) * 2
      const t2 = ((i + 1) / numSamples) * 2
      const y1 = h / 2 - Math.sin(t1 * Math.PI * 2 * signalFreq) * (h / 3)
      const y2 = h / 2 - Math.sin(t2 * Math.PI * 2 * signalFreq) * (h / 3)

      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
    }
    ctx.stroke()
  }, [signalFreq, sampleRate, isAliasing])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <canvas ref={canvasRef} className="w-full rounded-lg border border-omniviz-border" />
          <div className="flex gap-4 mt-2 text-sm">
            <span className="text-orange-400">● Original signal</span>
            <span className={isAliasing ? 'text-red-400' : 'text-green-400'}>● Sampled</span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-omniviz-text text-sm">Signal Frequency: {signalFreq} Hz</label>
            <input type="range" min="1" max="20" value={signalFreq} onChange={(e) => setSignalFreq(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-omniviz-text text-sm">Sample Rate: {sampleRate} Hz</label>
            <input type="range" min="5" max="50" value={sampleRate} onChange={(e) => setSampleRate(Number(e.target.value))} className="w-full" />
          </div>
          <div className={`p-3 rounded-lg ${isAliasing ? 'bg-red-500/20 border border-red-500' : 'bg-green-500/20 border border-green-500'}`}>
            <div className={isAliasing ? 'text-red-400' : 'text-green-400'}>
              {isAliasing ? '⚠️ Aliasing! Sample rate too low' : '✓ No aliasing'}
            </div>
            <div className="text-omniviz-text-muted text-sm mt-1">
              Nyquist rate: {nyquistRate} Hz (2 × {signalFreq} Hz)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterDemo() {
  const [filterType, setFilterType] = useState('lowpass')
  const [cutoff, setCutoff] = useState(50)

  const frequencies = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

  const getAttenuation = (freq) => {
    switch (filterType) {
      case 'lowpass':
        return freq <= cutoff ? 1 : Math.max(0, 1 - (freq - cutoff) / 30)
      case 'highpass':
        return freq >= cutoff ? 1 : Math.max(0, 1 - (cutoff - freq) / 30)
      case 'bandpass':
        const center = cutoff
        const dist = Math.abs(freq - center)
        return Math.max(0, 1 - dist / 30)
      case 'notch':
        const notchCenter = cutoff
        const notchDist = Math.abs(freq - notchCenter)
        return notchDist < 15 ? 0 : 1
      default:
        return 1
    }
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-2 mb-6">
        {['lowpass', 'highpass', 'bandpass', 'notch'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg capitalize ${filterType === type ? 'bg-blue-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
          >
            {type.replace('pass', '-pass')}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="text-omniviz-text text-sm">Cutoff Frequency: {cutoff} Hz</label>
            <input type="range" min="10" max="100" value={cutoff} onChange={(e) => setCutoff(Number(e.target.value))} className="w-full" />
          </div>
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <h4 className="text-omniviz-text font-semibold mb-3">Frequency Response</h4>
            <div className="flex items-end h-32 gap-1">
              {frequencies.map(freq => {
                const att = getAttenuation(freq)
                return (
                  <div key={freq} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full rounded-t transition-all"
                      style={{
                        height: `${att * 100}%`,
                        backgroundColor: att > 0.5 ? '#22c55e' : att > 0 ? '#eab308' : '#ef4444'
                      }}
                    />
                    <span className="text-omniviz-text-muted text-xs mt-1">{freq}</span>
                  </div>
                )
              })}
            </div>
            <div className="text-center text-omniviz-text-muted text-sm mt-2">Frequency (Hz)</div>
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-3">Filter Types</h4>
          <div className="space-y-3 text-sm">
            <div className={filterType === 'lowpass' ? 'text-blue-400' : 'text-omniviz-text-muted'}>
              <strong>Low-pass:</strong> Allows low frequencies, blocks high
            </div>
            <div className={filterType === 'highpass' ? 'text-blue-400' : 'text-omniviz-text-muted'}>
              <strong>High-pass:</strong> Allows high frequencies, blocks low
            </div>
            <div className={filterType === 'bandpass' ? 'text-blue-400' : 'text-omniviz-text-muted'}>
              <strong>Band-pass:</strong> Allows a range of frequencies
            </div>
            <div className={filterType === 'notch' ? 'text-blue-400' : 'text-omniviz-text-muted'}>
              <strong>Notch:</strong> Blocks a specific frequency band
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConvolutionDemo() {
  const [signal, setSignal] = useState([0, 0, 1, 2, 3, 2, 1, 0, 0])
  const [kernel, setKernel] = useState([0.25, 0.5, 0.25])

  const result = useMemo(() => {
    const output = []
    const padded = [...Array(kernel.length - 1).fill(0), ...signal, ...Array(kernel.length - 1).fill(0)]

    for (let i = 0; i < signal.length + kernel.length - 1; i++) {
      let sum = 0
      for (let j = 0; j < kernel.length; j++) {
        sum += padded[i + j] * kernel[kernel.length - 1 - j]
      }
      output.push(sum)
    }
    return output
  }, [signal, kernel])

  const maxVal = Math.max(...signal, ...result, 3)

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-3">Input Signal</h4>
          <div className="flex items-end h-24 gap-1">
            {signal.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-green-500 rounded-t" style={{ height: `${(val / maxVal) * 100}%` }} />
                <span className="text-omniviz-text-muted text-xs mt-1">{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-3">Kernel (Filter)</h4>
          <div className="flex items-end h-24 gap-1 justify-center">
            {kernel.map((val, i) => (
              <div key={i} className="w-12 flex flex-col items-center">
                <div className="w-full bg-purple-500 rounded-t" style={{ height: `${val * 100}%` }} />
                <span className="text-omniviz-text-muted text-xs mt-1">{val}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3 justify-center">
            <button onClick={() => setKernel([1, 1, 1].map(v => v / 3))} className="px-2 py-1 text-xs bg-omniviz-surface rounded border border-omniviz-border text-omniviz-text">Box</button>
            <button onClick={() => setKernel([0.25, 0.5, 0.25])} className="px-2 py-1 text-xs bg-omniviz-surface rounded border border-omniviz-border text-omniviz-text">Gaussian</button>
            <button onClick={() => setKernel([-1, 2, -1])} className="px-2 py-1 text-xs bg-omniviz-surface rounded border border-omniviz-border text-omniviz-text">Edge</button>
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-3">Output (Convolved)</h4>
          <div className="flex items-end h-24 gap-0.5">
            {result.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className={`w-full rounded-t ${val >= 0 ? 'bg-cyan-500' : 'bg-red-500'}`} style={{ height: `${(Math.abs(val) / maxVal) * 100}%` }} />
                <span className="text-omniviz-text-muted text-xs mt-1">{val.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-omniviz-text-muted text-sm mt-4 text-center">
        Convolution slides the kernel over the signal, computing weighted sums at each position.
      </p>
    </div>
  )
}

export default SignalProcessingConcept
