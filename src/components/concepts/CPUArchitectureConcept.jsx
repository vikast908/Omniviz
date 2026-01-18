import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function CPUArchitectureConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="CPU Architecture" color="red" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">CPU Architecture</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Understanding how processors execute instructions at the hardware level.
              </motion.p>
            </div>
          </Section>

          <Section title="Fetch-Decode-Execute Cycle" id="cycle">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">The CPU Cycle</h3>
              <p className="text-omniviz-text-muted mb-4">Every instruction goes through fetch (get instruction), decode (interpret it), and execute (perform operation).</p>
            </ExplanationCard>
            <div className="mt-8"><FDECycleDemo /></div>
          </Section>

          <Section title="Registers" id="registers">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">CPU Registers</h3>
              <p className="text-omniviz-text-muted mb-4">Registers are the fastest storage locations, located directly in the CPU for quick access during operations.</p>
            </ExplanationCard>
            <div className="mt-8"><RegistersDemo /></div>
          </Section>

          <Section title="Pipeline" id="pipeline">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Instruction Pipelining</h3>
              <p className="text-omniviz-text-muted mb-4">Pipelining allows multiple instructions to be processed simultaneously at different stages, increasing throughput.</p>
            </ExplanationCard>
            <div className="mt-8"><PipelineDemo /></div>
          </Section>

          <Section title="Cache Hierarchy" id="cache">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Memory Hierarchy</h3>
              <p className="text-omniviz-text-muted mb-4">Multiple cache levels (L1, L2, L3) bridge the speed gap between fast CPU and slower main memory.</p>
            </ExplanationCard>
            <div className="mt-8"><CacheDemo /></div>
          </Section>

          <Section title="Branch Prediction" id="branch">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Speculative Execution</h3>
              <p className="text-omniviz-text-muted mb-4">CPUs predict branch outcomes to continue execution without waiting, flushing the pipeline on misprediction.</p>
            </ExplanationCard>
            <div className="mt-8"><BranchPredictionDemo /></div>
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

function FDECycleDemo() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const [pc, setPc] = useState(0)

  const program = [
    { addr: '0x00', instruction: 'LOAD R1, #5', desc: 'Load value 5 into R1' },
    { addr: '0x04', instruction: 'LOAD R2, #3', desc: 'Load value 3 into R2' },
    { addr: '0x08', instruction: 'ADD R3, R1, R2', desc: 'Add R1 + R2, store in R3' },
    { addr: '0x0C', instruction: 'STORE R3, 0x100', desc: 'Store R3 to memory' }
  ]

  const stages = ['Fetch', 'Decode', 'Execute']

  const run = () => {
    if (running) return
    setRunning(true)
    setStep(0)
    setPc(0)

    let s = 0
    let p = 0
    const interval = setInterval(() => {
      s++
      if (s >= 3) {
        s = 0
        p++
        setPc(p)
      }
      setStep(s)
      if (p >= program.length) {
        clearInterval(interval)
        setRunning(false)
      }
    }, 800)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <button onClick={run} disabled={running} className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">
        {running ? 'Running...' : 'Run Program'}
      </button>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Program Memory</h4>
          <div className="space-y-2">
            {program.map((inst, i) => (
              <div key={i} className={`p-3 rounded-lg font-mono text-sm flex items-center gap-3 ${pc === i && running ? 'bg-blue-500/20 border border-blue-500' : 'bg-omniviz-bg'}`}>
                <span className="text-omniviz-text-muted">{inst.addr}</span>
                <span className="text-omniviz-text flex-1">{inst.instruction}</span>
                {pc === i && running && <span className="text-blue-400">← PC</span>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">CPU Stages</h4>
          <div className="space-y-4">
            {stages.map((stage, i) => (
              <div key={i} className={`p-4 rounded-lg transition-all ${step === i && running ? 'bg-green-500/20 border-2 border-green-500 scale-105' : 'bg-omniviz-bg border border-omniviz-border'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === i && running ? 'bg-green-500 text-white' : 'bg-omniviz-surface text-omniviz-text'}`}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-omniviz-text font-semibold">{stage}</div>
                    <div className="text-omniviz-text-muted text-sm">
                      {stage === 'Fetch' && 'Get instruction from memory'}
                      {stage === 'Decode' && 'Interpret the instruction'}
                      {stage === 'Execute' && 'Perform the operation'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {running && pc < program.length && (
            <div className="mt-4 p-3 bg-omniviz-bg rounded-lg">
              <div className="text-omniviz-text-muted text-sm">Current: {stages[step]}</div>
              <div className="text-omniviz-text font-mono">{program[pc]?.instruction}</div>
              <div className="text-green-400 text-sm">{program[pc]?.desc}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function RegistersDemo() {
  const [registers, setRegisters] = useState({
    R0: 0, R1: 0, R2: 0, R3: 0,
    PC: 0, SP: 1000, FLAGS: 0
  })
  const [operation, setOperation] = useState('')

  const operations = [
    { name: 'MOV R1, #42', fn: () => setRegisters(r => ({ ...r, R1: 42 })) },
    { name: 'MOV R2, #18', fn: () => setRegisters(r => ({ ...r, R2: 18 })) },
    { name: 'ADD R3, R1, R2', fn: () => setRegisters(r => ({ ...r, R3: r.R1 + r.R2 })) },
    { name: 'SUB R0, R1, R2', fn: () => setRegisters(r => ({ ...r, R0: r.R1 - r.R2 })) },
    { name: 'INC PC', fn: () => setRegisters(r => ({ ...r, PC: r.PC + 4 })) },
    { name: 'PUSH (SP-=4)', fn: () => setRegisters(r => ({ ...r, SP: r.SP - 4 })) },
    { name: 'RESET', fn: () => setRegisters({ R0: 0, R1: 0, R2: 0, R3: 0, PC: 0, SP: 1000, FLAGS: 0 }) }
  ]

  const execute = (op) => {
    setOperation(op.name)
    op.fn()
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">General Purpose Registers</h4>
          <div className="grid grid-cols-2 gap-3">
            {['R0', 'R1', 'R2', 'R3'].map(reg => (
              <div key={reg} className="p-3 bg-omniviz-bg rounded-lg">
                <div className="text-green-400 font-mono text-sm">{reg}</div>
                <div className="text-omniviz-text font-mono text-xl">{registers[reg]}</div>
                <div className="text-omniviz-text-muted font-mono text-xs">0x{registers[reg].toString(16).padStart(8, '0')}</div>
              </div>
            ))}
          </div>
          <h4 className="text-omniviz-text font-semibold mb-4 mt-6">Special Registers</h4>
          <div className="grid grid-cols-3 gap-3">
            {['PC', 'SP', 'FLAGS'].map(reg => (
              <div key={reg} className="p-3 bg-omniviz-bg rounded-lg">
                <div className="text-purple-400 font-mono text-sm">{reg}</div>
                <div className="text-omniviz-text font-mono">{registers[reg]}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Operations</h4>
          <div className="space-y-2">
            {operations.map((op, i) => (
              <button
                key={i}
                onClick={() => execute(op)}
                className="w-full p-3 bg-omniviz-bg text-left rounded-lg hover:border-omniviz-accent border border-omniviz-border transition-colors"
              >
                <span className="text-omniviz-text font-mono">{op.name}</span>
              </button>
            ))}
          </div>
          {operation && (
            <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
              <span className="text-green-400">Executed: </span>
              <span className="text-omniviz-text font-mono">{operation}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PipelineDemo() {
  const [running, setRunning] = useState(false)
  const [cycle, setCycle] = useState(0)

  const instructions = ['I1', 'I2', 'I3', 'I4', 'I5']
  const stages = ['IF', 'ID', 'EX', 'MEM', 'WB']

  const run = () => {
    setRunning(true)
    setCycle(0)
    let c = 0
    const interval = setInterval(() => {
      c++
      setCycle(c)
      if (c >= 9) {
        clearInterval(interval)
        setRunning(false)
      }
    }, 600)
  }

  const getInstructionAtStage = (stageIdx, cycleNum) => {
    const instIdx = cycleNum - stageIdx
    if (instIdx >= 0 && instIdx < instructions.length) {
      return instructions[instIdx]
    }
    return null
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <button onClick={run} disabled={running} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50">
          {running ? `Cycle ${cycle}` : 'Start Pipeline'}
        </button>
        <span className="text-omniviz-text-muted self-center">5-stage pipeline visualization</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left p-2 text-omniviz-text-muted">Stage</th>
              {Array(9).fill(null).map((_, i) => (
                <th key={i} className={`p-2 text-center ${cycle === i ? 'text-purple-400' : 'text-omniviz-text-muted'}`}>C{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stages.map((stage, si) => (
              <tr key={stage}>
                <td className="p-2 text-omniviz-text font-semibold">{stage}</td>
                {Array(9).fill(null).map((_, ci) => {
                  const inst = getInstructionAtStage(si, ci)
                  const isActive = ci <= cycle && inst
                  return (
                    <td key={ci} className="p-1">
                      <div className={`w-12 h-8 rounded flex items-center justify-center text-xs font-bold transition-all ${
                        isActive ? 'bg-purple-500 text-white' : inst && ci > cycle ? 'bg-omniviz-bg text-omniviz-text-muted' : ''
                      }`}>
                        {inst}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-3 bg-omniviz-bg rounded-lg text-sm">
        <div className="flex flex-wrap gap-4">
          <span><span className="text-omniviz-text-muted">IF:</span> <span className="text-omniviz-text">Instruction Fetch</span></span>
          <span><span className="text-omniviz-text-muted">ID:</span> <span className="text-omniviz-text">Instruction Decode</span></span>
          <span><span className="text-omniviz-text-muted">EX:</span> <span className="text-omniviz-text">Execute</span></span>
          <span><span className="text-omniviz-text-muted">MEM:</span> <span className="text-omniviz-text">Memory Access</span></span>
          <span><span className="text-omniviz-text-muted">WB:</span> <span className="text-omniviz-text">Write Back</span></span>
        </div>
      </div>
    </div>
  )
}

function CacheDemo() {
  const [address, setAddress] = useState('')
  const [accesses, setAccesses] = useState([])
  const [l1Cache, setL1Cache] = useState({})
  const [l2Cache, setL2Cache] = useState({})
  const [stats, setStats] = useState({ l1Hits: 0, l2Hits: 0, misses: 0 })

  const access = () => {
    if (!address) return
    const addr = address.toUpperCase()
    let result = { address: addr, level: '', latency: 0 }

    if (l1Cache[addr]) {
      result = { ...result, level: 'L1 Hit', latency: 1 }
      setStats(s => ({ ...s, l1Hits: s.l1Hits + 1 }))
    } else if (l2Cache[addr]) {
      result = { ...result, level: 'L2 Hit', latency: 10 }
      setL1Cache(c => ({ ...c, [addr]: true }))
      setStats(s => ({ ...s, l2Hits: s.l2Hits + 1 }))
    } else {
      result = { ...result, level: 'Cache Miss', latency: 100 }
      setL1Cache(c => ({ ...c, [addr]: true }))
      setL2Cache(c => ({ ...c, [addr]: true }))
      setStats(s => ({ ...s, misses: s.misses + 1 }))
    }

    setAccesses(a => [result, ...a.slice(0, 7)])
    setAddress('')
  }

  const levels = [
    { name: 'L1 Cache', size: '32 KB', latency: '~1 cycle', color: 'green' },
    { name: 'L2 Cache', size: '256 KB', latency: '~10 cycles', color: 'yellow' },
    { name: 'L3 Cache', size: '8 MB', latency: '~40 cycles', color: 'orange' },
    { name: 'Main Memory', size: '16 GB', latency: '~100 cycles', color: 'red' }
  ]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Memory Hierarchy</h4>
          <div className="space-y-2">
            {levels.map((level, i) => (
              <div key={i} className={`p-3 rounded-lg bg-${level.color}-500/20 border border-${level.color}-500`} style={{ marginLeft: i * 16 }}>
                <div className="flex justify-between">
                  <span className={`text-${level.color}-400 font-semibold`}>{level.name}</span>
                  <span className="text-omniviz-text-muted text-sm">{level.size}</span>
                </div>
                <div className="text-omniviz-text-muted text-xs">Latency: {level.latency}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Simulate Access</h4>
          <div className="flex gap-2 mb-4">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address (e.g., 0x1000)"
              className="flex-1 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 font-mono"
            />
            <button onClick={access} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Access</button>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="p-2 bg-green-500/20 rounded text-center">
              <div className="text-green-400 text-xl font-bold">{stats.l1Hits}</div>
              <div className="text-omniviz-text-muted text-xs">L1 Hits</div>
            </div>
            <div className="p-2 bg-yellow-500/20 rounded text-center">
              <div className="text-yellow-400 text-xl font-bold">{stats.l2Hits}</div>
              <div className="text-omniviz-text-muted text-xs">L2 Hits</div>
            </div>
            <div className="p-2 bg-red-500/20 rounded text-center">
              <div className="text-red-400 text-xl font-bold">{stats.misses}</div>
              <div className="text-omniviz-text-muted text-xs">Misses</div>
            </div>
          </div>
          <div className="p-3 bg-omniviz-bg rounded-lg h-40 overflow-y-auto">
            {accesses.map((a, i) => (
              <div key={i} className="flex justify-between text-sm mb-1">
                <span className="text-omniviz-text font-mono">{a.address}</span>
                <span className={a.level.includes('L1') ? 'text-green-400' : a.level.includes('L2') ? 'text-yellow-400' : 'text-red-400'}>
                  {a.level} ({a.latency} cycles)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BranchPredictionDemo() {
  const [history, setHistory] = useState([])
  const [predictor, setPredictor] = useState('taken')
  const [stats, setStats] = useState({ correct: 0, wrong: 0 })

  const predict = (actual) => {
    const prediction = predictor === 'taken'
    const correct = prediction === actual

    if (correct) {
      setStats(s => ({ ...s, correct: s.correct + 1 }))
    } else {
      setStats(s => ({ ...s, wrong: s.wrong + 1 }))
    }

    // Simple 1-bit predictor: change prediction based on last result
    setPredictor(actual ? 'taken' : 'not-taken')

    setHistory(h => [{
      prediction: prediction ? 'Taken' : 'Not Taken',
      actual: actual ? 'Taken' : 'Not Taken',
      correct
    }, ...h.slice(0, 7)])
  }

  const accuracy = stats.correct + stats.wrong > 0
    ? Math.round((stats.correct / (stats.correct + stats.wrong)) * 100)
    : 0

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Branch Outcome (Simulate)</h4>
          <p className="text-omniviz-text-muted text-sm mb-4">
            Click to simulate if a conditional branch is taken or not. The CPU predicts before knowing.
          </p>
          <div className="flex gap-4 mb-6">
            <button onClick={() => predict(true)} className="flex-1 p-4 bg-green-500/20 border border-green-500 rounded-lg hover:bg-green-500/30">
              <div className="text-green-400 font-bold">Branch Taken</div>
              <div className="text-omniviz-text-muted text-sm">e.g., if(true)</div>
            </button>
            <button onClick={() => predict(false)} className="flex-1 p-4 bg-red-500/20 border border-red-500 rounded-lg hover:bg-red-500/30">
              <div className="text-red-400 font-bold">Not Taken</div>
              <div className="text-omniviz-text-muted text-sm">e.g., if(false)</div>
            </button>
          </div>
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-omniviz-text">Current Prediction:</span>
              <span className={predictor === 'taken' ? 'text-green-400' : 'text-red-400'}>
                {predictor === 'taken' ? 'Will Take Branch' : 'Will Not Take'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-omniviz-text">Accuracy:</span>
              <span className={accuracy >= 70 ? 'text-green-400' : 'text-yellow-400'}>{accuracy}%</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Prediction History</h4>
          <div className="space-y-2 mb-4">
            {history.map((h, i) => (
              <div key={i} className={`p-2 rounded flex justify-between text-sm ${h.correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                <span className="text-omniviz-text">
                  Predicted: <span className="font-mono">{h.prediction}</span>
                </span>
                <span className="text-omniviz-text">
                  Actual: <span className="font-mono">{h.actual}</span>
                </span>
                <span className={h.correct ? 'text-green-400' : 'text-red-400'}>
                  {h.correct ? '✓' : '✗ Flush'}
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 bg-omniviz-bg rounded-lg text-sm">
            <div className="flex justify-between text-omniviz-text mb-1">
              <span>Correct predictions:</span>
              <span className="text-green-400">{stats.correct}</span>
            </div>
            <div className="flex justify-between text-omniviz-text">
              <span>Mispredictions (pipeline flush):</span>
              <span className="text-red-400">{stats.wrong}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-omniviz-text-muted text-sm">
        Mispredictions are costly: the pipeline must be flushed and restarted, wasting cycles.
      </p>
    </div>
  )
}

export default CPUArchitectureConcept
