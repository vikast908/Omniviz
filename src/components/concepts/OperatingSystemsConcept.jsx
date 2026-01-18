import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

// Process states
const PROCESS_STATES = ['new', 'ready', 'running', 'waiting', 'terminated']

// Sample processes for scheduling demo
const INITIAL_PROCESSES = [
  { id: 'P1', name: 'Browser', burstTime: 8, arrivalTime: 0, priority: 2, color: '#3b82f6' },
  { id: 'P2', name: 'Editor', burstTime: 4, arrivalTime: 1, priority: 1, color: '#10b981' },
  { id: 'P3', name: 'Compiler', burstTime: 9, arrivalTime: 2, priority: 3, color: '#f59e0b' },
  { id: 'P4', name: 'Game', burstTime: 5, arrivalTime: 3, priority: 4, color: '#ef4444' },
]

function OperatingSystemsConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Operating Systems" color="red" />

      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <Section>
            <div className="text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text"
              >
                Operating Systems
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-omniviz-text-muted max-w-3xl mx-auto"
              >
                The software that manages hardware and provides services for programs.
                Learn about process scheduling, memory management, and file systems.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Process Management', desc: 'CPU scheduling, context switching, synchronization', icon: '⚙️', color: 'red' },
                { title: 'Memory Management', desc: 'Virtual memory, paging, segmentation', icon: '🧠', color: 'blue' },
                { title: 'File Systems', desc: 'Storage organization, directories, permissions', icon: '📁', color: 'green' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`p-6 bg-omniviz-surface rounded-2xl border border-omniviz-border`}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className={`text-lg font-semibold text-${item.color}-400 mb-2`}>{item.title}</h3>
                  <p className="text-omniviz-text-muted text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Process Scheduling Section */}
          <Section title="Process Scheduling" id="scheduling">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-red-400 mb-4">What is Process Scheduling?</h3>
              <p className="text-omniviz-text-muted mb-6">
                The CPU can only run one process at a time. The <strong className="text-red-400">scheduler</strong> decides
                which process runs next. Different algorithms optimize for different goals: response time, throughput, or fairness.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border text-omniviz-text">
                  <h4 className="font-semibold text-blue-400 mb-2">Process States</h4>
                  <div className="flex flex-wrap gap-2">
                    {PROCESS_STATES.map((state, i) => (
                      <span key={state} className="px-3 py-1 bg-omniviz-surface rounded-full text-xs text-omniviz-text-muted">
                        {i + 1}. {state}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border text-omniviz-text">
                  <h4 className="font-semibold text-green-400 mb-2">Key Metrics</h4>
                  <ul className="text-sm text-omniviz-text-muted space-y-1">
                    <li>• <strong>Turnaround Time:</strong> Total time from arrival to completion</li>
                    <li>• <strong>Waiting Time:</strong> Time spent waiting in ready queue</li>
                    <li>• <strong>Response Time:</strong> Time until first response</li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>

            <div className="mt-8">
              <ProcessSchedulerDemo />
            </div>
          </Section>

          {/* Memory Management Section */}
          <Section title="Memory Management" id="memory">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Virtual Memory & Paging</h3>
              <p className="text-omniviz-text-muted mb-6">
                <strong className="text-blue-400">Virtual memory</strong> gives each process the illusion of having its own
                large, contiguous memory space. The OS maps virtual addresses to physical addresses using <strong className="text-cyan-400">page tables</strong>.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  { term: 'Page', def: 'Fixed-size block of virtual memory (typically 4KB)', color: 'blue' },
                  { term: 'Frame', def: 'Fixed-size block of physical memory', color: 'green' },
                  { term: 'Page Table', def: 'Maps virtual pages to physical frames', color: 'purple' },
                ].map(item => (
                  <div key={item.term} className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border text-omniviz-text">
                    <h4 className={`font-semibold text-${item.color}-400 mb-1`}>{item.term}</h4>
                    <p className="text-xs text-omniviz-text-muted">{item.def}</p>
                  </div>
                ))}
              </div>
            </ExplanationCard>

            <div className="mt-8">
              <MemoryDemo />
            </div>
          </Section>

          {/* Page Replacement Section */}
          <Section title="Page Replacement Algorithms" id="page-replacement">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">When Memory is Full</h3>
              <p className="text-omniviz-text-muted mb-6">
                When a page fault occurs and memory is full, the OS must choose a page to evict.
                Different algorithms have different strategies for minimizing future page faults.
              </p>
            </ExplanationCard>

            <div className="mt-8">
              <PageReplacementDemo />
            </div>
          </Section>

          {/* File System Section */}
          <Section title="File Systems" id="filesystem">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Organizing Data on Disk</h3>
              <p className="text-omniviz-text-muted mb-6">
                File systems organize data into files and directories, manage free space,
                and handle permissions. They provide an abstraction over raw disk blocks.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border text-omniviz-text">
                  <h4 className="font-semibold text-green-400 mb-3">Common File Systems</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'ext4', os: 'Linux', feature: 'Journaling, extents' },
                      { name: 'NTFS', os: 'Windows', feature: 'ACLs, encryption' },
                      { name: 'APFS', os: 'macOS', feature: 'Copy-on-write, snapshots' },
                      { name: 'FAT32', os: 'Universal', feature: 'Simple, compatible' },
                    ].map(fs => (
                      <div key={fs.name} className="flex items-center gap-3 p-2 bg-omniviz-surface rounded">
                        <span className="font-mono text-cyan-400 w-16">{fs.name}</span>
                        <span className="text-xs text-omniviz-text-muted">{fs.os} - {fs.feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border text-omniviz-text">
                  <h4 className="font-semibold text-orange-400 mb-3">Key Concepts</h4>
                  <ul className="space-y-2 text-sm text-omniviz-text-muted">
                    <li className="flex gap-2">
                      <span className="text-orange-400">Inode:</span>
                      <span>Metadata about a file (size, permissions, block pointers)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-400">Block:</span>
                      <span>Unit of disk storage (typically 4KB)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-400">Journal:</span>
                      <span>Log of changes for crash recovery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>

            <div className="mt-8">
              <FileSystemDemo />
            </div>
          </Section>

          {/* Synchronization Section */}
          <Section title="Process Synchronization" id="sync">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Coordinating Processes</h3>
              <p className="text-omniviz-text-muted mb-6">
                When multiple processes access shared resources, we need synchronization primitives
                to prevent <strong className="text-red-400">race conditions</strong> and ensure correctness.
              </p>
            </ExplanationCard>

            <div className="mt-8">
              <SyncDemo />
            </div>
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
      {title && <h2 className="text-2xl font-bold mb-8 text-omniviz-text">{title}</h2>}
      {children}
    </motion.section>
  )
}

// Reusable ExplanationCard component
function ExplanationCard({ children }) {
  return (
    <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">
      {children}
    </div>
  )
}

// Process Scheduler Demo
function ProcessSchedulerDemo() {
  const [algorithm, setAlgorithm] = useState('fcfs')
  const [processes, setProcesses] = useState(INITIAL_PROCESSES)
  const [timeline, setTimeline] = useState([])
  const [currentTime, setCurrentTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [quantum, setQuantum] = useState(2)

  const runScheduler = () => {
    setIsRunning(true)
    setCurrentTime(0)
    setTimeline([])

    const procs = processes.map(p => ({ ...p, remaining: p.burstTime, completed: false, startTime: null }))
    const newTimeline = []
    let time = 0

    if (algorithm === 'fcfs') {
      // First Come First Served
      const sorted = [...procs].sort((a, b) => a.arrivalTime - b.arrivalTime)
      sorted.forEach(p => {
        if (time < p.arrivalTime) time = p.arrivalTime
        for (let i = 0; i < p.burstTime; i++) {
          newTimeline.push({ time: time + i, process: p.id, color: p.color })
        }
        time += p.burstTime
      })
    } else if (algorithm === 'sjf') {
      // Shortest Job First (non-preemptive)
      let completed = 0
      while (completed < procs.length) {
        const available = procs.filter(p => !p.completed && p.arrivalTime <= time)
        if (available.length === 0) {
          time++
          continue
        }
        const shortest = available.reduce((min, p) => p.burstTime < min.burstTime ? p : min)
        for (let i = 0; i < shortest.burstTime; i++) {
          newTimeline.push({ time: time + i, process: shortest.id, color: shortest.color })
        }
        time += shortest.burstTime
        shortest.completed = true
        completed++
      }
    } else if (algorithm === 'rr') {
      // Round Robin
      const queue = []
      let procsCopy = procs.map(p => ({ ...p }))
      time = 0

      while (procsCopy.some(p => p.remaining > 0)) {
        // Add newly arrived processes
        procsCopy.forEach(p => {
          if (p.arrivalTime <= time && p.remaining > 0 && !queue.includes(p) && !queue.some(q => q.id === p.id)) {
            queue.push(p)
          }
        })

        if (queue.length === 0) {
          time++
          continue
        }

        const current = queue.shift()
        const runTime = Math.min(quantum, current.remaining)

        for (let i = 0; i < runTime; i++) {
          newTimeline.push({ time: time + i, process: current.id, color: current.color })
        }

        time += runTime
        current.remaining -= runTime

        // Add newly arrived processes before re-adding current
        procsCopy.forEach(p => {
          if (p.arrivalTime <= time && p.remaining > 0 && !queue.includes(p) && !queue.some(q => q.id === p.id) && p.id !== current.id) {
            queue.push(p)
          }
        })

        if (current.remaining > 0) {
          queue.push(current)
        }
      }
    } else if (algorithm === 'priority') {
      // Priority Scheduling (lower number = higher priority)
      let completed = 0
      while (completed < procs.length) {
        const available = procs.filter(p => !p.completed && p.arrivalTime <= time)
        if (available.length === 0) {
          time++
          continue
        }
        const highest = available.reduce((min, p) => p.priority < min.priority ? p : min)
        for (let i = 0; i < highest.burstTime; i++) {
          newTimeline.push({ time: time + i, process: highest.id, color: highest.color })
        }
        time += highest.burstTime
        highest.completed = true
        completed++
      }
    }

    setTimeline(newTimeline)

    // Animate through timeline
    newTimeline.forEach((_, i) => {
      setTimeout(() => {
        setCurrentTime(i + 1)
        if (i === newTimeline.length - 1) setIsRunning(false)
      }, i * 200)
    })
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-4 py-2"
        >
          <option value="fcfs">First Come First Served</option>
          <option value="sjf">Shortest Job First</option>
          <option value="rr">Round Robin</option>
          <option value="priority">Priority Scheduling</option>
        </select>

        {algorithm === 'rr' && (
          <div className="flex items-center gap-2">
            <span className="text-omniviz-text-muted text-sm">Quantum:</span>
            <input
              type="number"
              value={quantum}
              onChange={(e) => setQuantum(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-2 py-1 text-center"
              min="1"
              max="10"
            />
          </div>
        )}

        <button
          onClick={runScheduler}
          disabled={isRunning}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
        >
          {isRunning ? 'Running...' : 'Run Scheduler'}
        </button>
      </div>

      {/* Process Table */}
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-omniviz-text-muted border-b border-omniviz-border">
              <th className="text-left p-2">Process</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Burst Time</th>
              <th className="text-left p-2">Arrival</th>
              <th className="text-left p-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            {processes.map(p => (
              <tr key={p.id} className="border-b border-omniviz-border/50">
                <td className="p-2">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-omniviz-text">{p.id}</span>
                  </span>
                </td>
                <td className="p-2 text-omniviz-text">{p.name}</td>
                <td className="p-2 text-omniviz-text">{p.burstTime}ms</td>
                <td className="p-2 text-omniviz-text">{p.arrivalTime}ms</td>
                <td className="p-2 text-omniviz-text">{p.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gantt Chart */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-omniviz-text-muted mb-2">Gantt Chart</h4>
        <div className="flex gap-0.5 h-12 bg-omniviz-bg rounded-lg overflow-hidden p-1">
          {timeline.slice(0, currentTime).map((slot, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              className="flex-1 rounded flex items-center justify-center text-white text-xs font-bold min-w-[24px]"
              style={{ backgroundColor: slot.color }}
            >
              {slot.process}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-1 text-xs text-omniviz-text-muted">
          <span>0</span>
          <span>{timeline.length}ms</span>
        </div>
      </div>

      {/* Algorithm Description */}
      <div className="p-3 bg-omniviz-bg rounded-lg text-omniviz-text">
        <span className="text-red-400 font-semibold">
          {algorithm === 'fcfs' && 'FCFS: '}
          {algorithm === 'sjf' && 'SJF: '}
          {algorithm === 'rr' && 'Round Robin: '}
          {algorithm === 'priority' && 'Priority: '}
        </span>
        <span className="text-sm text-omniviz-text-muted">
          {algorithm === 'fcfs' && 'Processes run in arrival order. Simple but can cause convoy effect.'}
          {algorithm === 'sjf' && 'Shortest job runs first. Optimal average waiting time but needs burst time prediction.'}
          {algorithm === 'rr' && `Each process gets ${quantum}ms time slice. Fair but context switch overhead.`}
          {algorithm === 'priority' && 'Higher priority (lower number) runs first. Can cause starvation.'}
        </span>
      </div>
    </div>
  )
}

// Memory Demo
function MemoryDemo() {
  const [virtualAddress, setVirtualAddress] = useState('0x1A3F')
  const pageSize = 4096 // 4KB

  const parseAddress = (addr) => {
    const num = parseInt(addr, 16) || 0
    const pageNumber = Math.floor(num / pageSize)
    const offset = num % pageSize
    return { pageNumber, offset, decimal: num }
  }

  const { pageNumber, offset, decimal } = parseAddress(virtualAddress)

  // Simulated page table
  const pageTable = [
    { virtual: 0, physical: 5, valid: true },
    { virtual: 1, physical: 2, valid: true },
    { virtual: 2, physical: null, valid: false },
    { virtual: 3, physical: 8, valid: true },
  ]

  const mapping = pageTable.find(p => p.virtual === pageNumber)
  const physicalAddress = mapping?.valid ? (mapping.physical * pageSize + offset) : null

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <h4 className="text-lg font-semibold text-blue-400 mb-4">Virtual to Physical Address Translation</h4>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Input */}
        <div className="flex-1">
          <label className="text-sm text-omniviz-text-muted block mb-2">Virtual Address (hex)</label>
          <input
            type="text"
            value={virtualAddress}
            onChange={(e) => setVirtualAddress(e.target.value)}
            className="w-full bg-omniviz-bg text-omniviz-text font-mono rounded-lg border border-omniviz-border px-4 py-3 focus:outline-none focus:border-blue-500"
            placeholder="0x1A3F"
          />

          <div className="mt-4 p-4 bg-omniviz-bg rounded-lg text-omniviz-text">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-omniviz-text-muted">Decimal:</span>
              <span className="font-mono">{decimal}</span>
              <span className="text-omniviz-text-muted">Page Number:</span>
              <span className="font-mono text-blue-400">{pageNumber}</span>
              <span className="text-omniviz-text-muted">Offset:</span>
              <span className="font-mono text-green-400">{offset}</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center">
          <svg className="w-8 h-8 text-omniviz-text-muted transform md:rotate-0 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>

        {/* Output */}
        <div className="flex-1">
          <label className="text-sm text-omniviz-text-muted block mb-2">Physical Address</label>
          <div className={`w-full font-mono rounded-lg border px-4 py-3 ${
            physicalAddress !== null
              ? 'bg-green-500/20 border-green-500/50 text-green-400'
              : 'bg-red-500/20 border-red-500/50 text-red-400'
          }`}>
            {physicalAddress !== null ? `0x${physicalAddress.toString(16).toUpperCase()}` : 'PAGE FAULT!'}
          </div>

          {physicalAddress !== null && (
            <div className="mt-4 p-4 bg-omniviz-bg rounded-lg text-omniviz-text">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-omniviz-text-muted">Frame Number:</span>
                <span className="font-mono text-purple-400">{mapping?.physical}</span>
                <span className="text-omniviz-text-muted">Physical Decimal:</span>
                <span className="font-mono">{physicalAddress}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Page Table Visualization */}
      <div className="mt-6">
        <h5 className="text-sm font-semibold text-omniviz-text-muted mb-3">Page Table</h5>
        <div className="grid grid-cols-4 gap-2">
          {pageTable.map((entry, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border text-center ${
                entry.virtual === pageNumber
                  ? entry.valid
                    ? 'bg-blue-500/20 border-blue-500'
                    : 'bg-red-500/20 border-red-500'
                  : 'bg-omniviz-bg border-omniviz-border'
              }`}
            >
              <div className="text-xs text-omniviz-text-muted">Page {entry.virtual}</div>
              <div className={`font-mono text-sm ${entry.valid ? 'text-green-400' : 'text-red-400'}`}>
                {entry.valid ? `Frame ${entry.physical}` : 'Invalid'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Page Replacement Demo
function PageReplacementDemo() {
  const [algorithm, setAlgorithm] = useState('fifo')
  const [frameCount, setFrameCount] = useState(3)
  const [referenceString, setReferenceString] = useState('7,0,1,2,0,3,0,4,2,3,0,3,2')
  const [result, setResult] = useState(null)

  const runSimulation = () => {
    const pages = referenceString.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
    const frames = []
    const history = []
    let faults = 0
    let fifoQueue = []
    let lruStack = []

    pages.forEach((page, step) => {
      const isHit = frames.includes(page)
      let evicted = null

      if (!isHit) {
        faults++
        if (frames.length < frameCount) {
          frames.push(page)
          fifoQueue.push(page)
        } else {
          if (algorithm === 'fifo') {
            evicted = fifoQueue.shift()
            const idx = frames.indexOf(evicted)
            frames[idx] = page
            fifoQueue.push(page)
          } else if (algorithm === 'lru') {
            evicted = lruStack[0]
            lruStack = lruStack.filter(p => p !== evicted)
            const idx = frames.indexOf(evicted)
            frames[idx] = page
          } else if (algorithm === 'optimal') {
            // Find the page that will be used furthest in the future
            const futureUse = frames.map(f => {
              const nextUse = pages.slice(step + 1).indexOf(f)
              return nextUse === -1 ? Infinity : nextUse
            })
            const evictIdx = futureUse.indexOf(Math.max(...futureUse))
            evicted = frames[evictIdx]
            frames[evictIdx] = page
          }
        }
      }

      // Update LRU stack
      if (algorithm === 'lru') {
        lruStack = lruStack.filter(p => p !== page)
        lruStack.push(page)
      }

      history.push({
        page,
        frames: [...frames],
        isHit,
        evicted
      })
    })

    setResult({ history, faults, total: pages.length })
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-4 py-2"
        >
          <option value="fifo">FIFO (First In First Out)</option>
          <option value="lru">LRU (Least Recently Used)</option>
          <option value="optimal">Optimal (Belady's)</option>
        </select>

        <div className="flex items-center gap-2">
          <span className="text-omniviz-text-muted text-sm">Frames:</span>
          <input
            type="number"
            value={frameCount}
            onChange={(e) => setFrameCount(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
            className="w-16 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-2 py-1 text-center"
            min="1"
            max="5"
          />
        </div>

        <button
          onClick={runSimulation}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Simulate
        </button>
      </div>

      <div className="mb-4">
        <label className="text-sm text-omniviz-text-muted block mb-2">Reference String (comma-separated)</label>
        <input
          type="text"
          value={referenceString}
          onChange={(e) => setReferenceString(e.target.value)}
          className="w-full bg-omniviz-bg text-omniviz-text font-mono rounded-lg border border-omniviz-border px-4 py-2 focus:outline-none focus:border-purple-500"
        />
      </div>

      {result && (
        <div className="mt-6">
          <div className="overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {result.history.map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm ${
                    step.isHit ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'
                  }`}>
                    {step.page}
                  </div>
                  <div className="mt-1 flex flex-col gap-0.5">
                    {Array.from({ length: frameCount }).map((_, j) => (
                      <div
                        key={j}
                        className="w-10 h-8 rounded bg-omniviz-bg border border-omniviz-border flex items-center justify-center font-mono text-xs text-omniviz-text"
                      >
                        {step.frames[j] ?? '-'}
                      </div>
                    ))}
                  </div>
                  <div className="mt-1 text-xs text-omniviz-text-muted">
                    {step.isHit ? 'Hit' : 'Miss'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-4 bg-omniviz-bg rounded-lg flex gap-6 text-omniviz-text">
            <div>
              <span className="text-omniviz-text-muted">Page Faults: </span>
              <span className="text-red-400 font-bold">{result.faults}</span>
            </div>
            <div>
              <span className="text-omniviz-text-muted">Hit Rate: </span>
              <span className="text-green-400 font-bold">
                {((result.total - result.faults) / result.total * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// File System Demo
function FileSystemDemo() {
  const [currentPath, setCurrentPath] = useState('/')
  const [selectedFile, setSelectedFile] = useState(null)

  const fileSystem = {
    '/': {
      type: 'dir',
      children: ['home', 'etc', 'var', 'usr'],
      permissions: 'drwxr-xr-x'
    },
    '/home': {
      type: 'dir',
      children: ['user'],
      permissions: 'drwxr-xr-x'
    },
    '/home/user': {
      type: 'dir',
      children: ['documents', 'pictures', '.bashrc'],
      permissions: 'drwx------'
    },
    '/home/user/documents': {
      type: 'dir',
      children: ['report.pdf', 'notes.txt'],
      permissions: 'drwxr-xr-x'
    },
    '/home/user/documents/report.pdf': {
      type: 'file',
      size: '2.4 MB',
      permissions: '-rw-r--r--',
      inode: 12847
    },
    '/home/user/documents/notes.txt': {
      type: 'file',
      size: '156 B',
      permissions: '-rw-r--r--',
      inode: 12848
    },
    '/home/user/pictures': {
      type: 'dir',
      children: ['photo.jpg'],
      permissions: 'drwxr-xr-x'
    },
    '/home/user/pictures/photo.jpg': {
      type: 'file',
      size: '4.2 MB',
      permissions: '-rw-r--r--',
      inode: 12901
    },
    '/home/user/.bashrc': {
      type: 'file',
      size: '3.5 KB',
      permissions: '-rw-r--r--',
      inode: 12500
    },
    '/etc': {
      type: 'dir',
      children: ['passwd', 'hosts'],
      permissions: 'drwxr-xr-x'
    },
    '/etc/passwd': {
      type: 'file',
      size: '2.1 KB',
      permissions: '-rw-r--r--',
      inode: 1001
    },
    '/etc/hosts': {
      type: 'file',
      size: '224 B',
      permissions: '-rw-r--r--',
      inode: 1002
    },
    '/var': {
      type: 'dir',
      children: ['log'],
      permissions: 'drwxr-xr-x'
    },
    '/var/log': {
      type: 'dir',
      children: ['syslog'],
      permissions: 'drwxr-xr-x'
    },
    '/var/log/syslog': {
      type: 'file',
      size: '15.7 MB',
      permissions: '-rw-r-----',
      inode: 5001
    },
    '/usr': {
      type: 'dir',
      children: ['bin', 'lib'],
      permissions: 'drwxr-xr-x'
    },
    '/usr/bin': {
      type: 'dir',
      children: ['python', 'node'],
      permissions: 'drwxr-xr-x'
    },
    '/usr/bin/python': {
      type: 'file',
      size: '5.2 MB',
      permissions: '-rwxr-xr-x',
      inode: 8001
    },
    '/usr/bin/node': {
      type: 'file',
      size: '89 MB',
      permissions: '-rwxr-xr-x',
      inode: 8002
    },
    '/usr/lib': {
      type: 'dir',
      children: [],
      permissions: 'drwxr-xr-x'
    },
  }

  const currentDir = fileSystem[currentPath]
  const pathParts = currentPath.split('/').filter(Boolean)

  const navigateTo = (name) => {
    const newPath = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`
    if (fileSystem[newPath]) {
      if (fileSystem[newPath].type === 'dir') {
        setCurrentPath(newPath)
        setSelectedFile(null)
      } else {
        setSelectedFile({ path: newPath, ...fileSystem[newPath] })
      }
    }
  }

  const goUp = () => {
    if (currentPath !== '/') {
      const parts = currentPath.split('/')
      parts.pop()
      setCurrentPath(parts.join('/') || '/')
      setSelectedFile(null)
    }
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <h4 className="text-lg font-semibold text-green-400 mb-4">File System Explorer</h4>

      <div className="flex flex-col md:flex-row gap-6">
        {/* File Browser */}
        <div className="flex-1">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 mb-4 p-2 bg-omniviz-bg rounded-lg overflow-x-auto">
            <button
              onClick={() => { setCurrentPath('/'); setSelectedFile(null) }}
              className="text-blue-400 hover:underline text-sm"
            >
              root
            </button>
            {pathParts.map((part, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="text-omniviz-text-muted">/</span>
                <button
                  onClick={() => {
                    setCurrentPath('/' + pathParts.slice(0, i + 1).join('/'))
                    setSelectedFile(null)
                  }}
                  className="text-blue-400 hover:underline text-sm"
                >
                  {part}
                </button>
              </span>
            ))}
          </div>

          {/* File List */}
          <div className="bg-omniviz-bg rounded-lg border border-omniviz-border overflow-hidden">
            {currentPath !== '/' && (
              <button
                onClick={goUp}
                className="w-full p-3 flex items-center gap-3 hover:bg-omniviz-surface transition-colors border-b border-omniviz-border text-omniviz-text"
              >
                <span className="text-yellow-400">📁</span>
                <span>..</span>
              </button>
            )}
            {currentDir?.children?.map((name) => {
              const childPath = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`
              const child = fileSystem[childPath]
              const isDir = child?.type === 'dir'
              return (
                <button
                  key={name}
                  onClick={() => navigateTo(name)}
                  className={`w-full p-3 flex items-center gap-3 hover:bg-omniviz-surface transition-colors border-b border-omniviz-border/50 last:border-0 ${
                    selectedFile?.path === childPath ? 'bg-green-500/10' : ''
                  }`}
                >
                  <span className={isDir ? 'text-yellow-400' : 'text-blue-400'}>
                    {isDir ? '📁' : '📄'}
                  </span>
                  <span className="text-omniviz-text flex-1 text-left">{name}</span>
                  {!isDir && <span className="text-xs text-omniviz-text-muted">{child?.size}</span>}
                </button>
              )
            })}
            {currentDir?.children?.length === 0 && (
              <div className="p-4 text-center text-omniviz-text-muted text-sm">Empty directory</div>
            )}
          </div>
        </div>

        {/* File Info Panel */}
        <div className="w-full md:w-72">
          <div className="bg-omniviz-bg rounded-lg border border-omniviz-border p-4">
            <h5 className="text-sm font-semibold text-omniviz-text-muted mb-3">
              {selectedFile ? 'File Info' : 'Directory Info'}
            </h5>

            {selectedFile ? (
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-omniviz-text-muted">Name: </span>
                  <span className="text-omniviz-text">{selectedFile.path.split('/').pop()}</span>
                </div>
                <div>
                  <span className="text-omniviz-text-muted">Size: </span>
                  <span className="text-omniviz-text">{selectedFile.size}</span>
                </div>
                <div>
                  <span className="text-omniviz-text-muted">Inode: </span>
                  <span className="text-cyan-400 font-mono">{selectedFile.inode}</span>
                </div>
                <div>
                  <span className="text-omniviz-text-muted">Permissions: </span>
                  <span className="text-green-400 font-mono">{selectedFile.permissions}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-omniviz-text-muted">Path: </span>
                  <span className="text-omniviz-text font-mono">{currentPath}</span>
                </div>
                <div>
                  <span className="text-omniviz-text-muted">Items: </span>
                  <span className="text-omniviz-text">{currentDir?.children?.length || 0}</span>
                </div>
                <div>
                  <span className="text-omniviz-text-muted">Permissions: </span>
                  <span className="text-green-400 font-mono">{currentDir?.permissions}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Synchronization Demo
function SyncDemo() {
  const [counter, setCounter] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [useLock, setUseLock] = useState(false)
  const [log, setLog] = useState([])
  const lockRef = useRef(false)

  const runDemo = async () => {
    setIsRunning(true)
    setCounter(0)
    setLog([])

    const increment = async (threadId) => {
      for (let i = 0; i < 5; i++) {
        if (useLock) {
          // Simulate acquiring lock
          while (lockRef.current) {
            await new Promise(r => setTimeout(r, 10))
          }
          lockRef.current = true

          setLog(prev => [...prev, { thread: threadId, action: 'acquired lock', time: Date.now() }])

          // Critical section
          await new Promise(r => setTimeout(r, 100))
          setCounter(prev => prev + 1)
          setLog(prev => [...prev, { thread: threadId, action: 'incremented', time: Date.now() }])

          // Release lock
          lockRef.current = false
          setLog(prev => [...prev, { thread: threadId, action: 'released lock', time: Date.now() }])
        } else {
          // No synchronization - race condition!
          const temp = counter
          await new Promise(r => setTimeout(r, Math.random() * 50))
          setCounter(temp + 1) // This causes race conditions
          setLog(prev => [...prev, { thread: threadId, action: 'incremented (no lock)', time: Date.now() }])
        }
        await new Promise(r => setTimeout(r, 50))
      }
    }

    // Run two "threads" concurrently
    await Promise.all([
      increment('Thread A'),
      increment('Thread B'),
    ])

    setIsRunning(false)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <h4 className="text-lg font-semibold text-yellow-400 mb-4">Race Condition Demo</h4>

      <div className="flex flex-wrap gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useLock}
            onChange={(e) => setUseLock(e.target.checked)}
            className="w-4 h-4 rounded border-omniviz-border bg-omniviz-bg"
          />
          <span className="text-omniviz-text">Use Mutex Lock</span>
        </label>

        <button
          onClick={runDemo}
          disabled={isRunning}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 disabled:opacity-50 transition-colors font-semibold"
        >
          {isRunning ? 'Running...' : 'Run 2 Threads (5 increments each)'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-omniviz-bg rounded-lg text-center">
          <div className="text-omniviz-text-muted mb-2">Counter Value</div>
          <div className="text-6xl font-bold text-omniviz-text">{counter}</div>
          <div className={`mt-2 text-sm ${counter === 10 ? 'text-green-400' : 'text-red-400'}`}>
            {counter === 10 ? 'Correct! (10)' : `Expected: 10, Got: ${counter}`}
          </div>
        </div>

        <div className="p-4 bg-omniviz-bg rounded-lg max-h-60 overflow-y-auto">
          <div className="text-xs text-omniviz-text-muted mb-2">Event Log</div>
          {log.map((entry, i) => (
            <div key={i} className={`text-xs py-1 ${
              entry.thread === 'Thread A' ? 'text-blue-400' : 'text-green-400'
            }`}>
              [{entry.thread}] {entry.action}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-omniviz-bg rounded-lg text-omniviz-text">
        <span className="text-yellow-400 font-semibold">Note: </span>
        <span className="text-sm text-omniviz-text-muted">
          Without a lock, both threads may read the same value before either writes, causing lost updates.
          With a mutex lock, only one thread can access the counter at a time.
        </span>
      </div>
    </div>
  )
}

export default OperatingSystemsConcept
