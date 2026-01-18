import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function AlgorithmsConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Algorithms" color="green" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Algorithms</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Step-by-step procedures for solving computational problems efficiently.
              </motion.p>
            </div>
          </Section>

          <Section title="Sorting Algorithms" id="sorting">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Arranging Data in Order</h3>
              <p className="text-omniviz-text-muted mb-4">Sorting algorithms arrange elements in a specific order. Different algorithms have different time complexities and are suited for different scenarios.</p>
            </ExplanationCard>
            <div className="mt-8"><SortingDemo /></div>
          </Section>

          <Section title="Binary Search" id="binary-search">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Divide and Conquer Search</h3>
              <p className="text-omniviz-text-muted mb-4">Binary search finds elements in a sorted array by repeatedly dividing the search interval in half. Time complexity: O(log n).</p>
            </ExplanationCard>
            <div className="mt-8"><BinarySearchDemo /></div>
          </Section>

          <Section title="Graph Traversal" id="graph">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">BFS vs DFS</h3>
              <p className="text-omniviz-text-muted mb-4">Breadth-First Search explores level by level, while Depth-First Search explores as deep as possible before backtracking.</p>
            </ExplanationCard>
            <div className="mt-8"><GraphTraversalDemo /></div>
          </Section>

          <Section title="Dynamic Programming" id="dp">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Fibonacci with Memoization</h3>
              <p className="text-omniviz-text-muted mb-4">Dynamic programming solves problems by breaking them into subproblems and storing results to avoid redundant calculations.</p>
            </ExplanationCard>
            <div className="mt-8"><DPDemo /></div>
          </Section>

          <Section title="Pathfinding" id="pathfinding">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Dijkstra's Algorithm</h3>
              <p className="text-omniviz-text-muted mb-4">Finds the shortest path between nodes in a weighted graph by greedily selecting the nearest unvisited node.</p>
            </ExplanationCard>
            <div className="mt-8"><PathfindingDemo /></div>
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

function SortingDemo() {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90, 45])
  const [sorting, setSorting] = useState(false)
  const [algorithm, setAlgorithm] = useState('bubble')
  const [comparing, setComparing] = useState([])
  const [sorted, setSorted] = useState([])

  const reset = () => {
    const newArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10)
    setArray(newArr)
    setSorted([])
    setComparing([])
  }

  const bubbleSort = async () => {
    setSorting(true)
    const arr = [...array]
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setComparing([j, j + 1])
        await new Promise(r => setTimeout(r, 300))
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
        }
      }
      setSorted(prev => [...prev, arr.length - i - 1])
    }
    setComparing([])
    setSorting(false)
  }

  const selectionSort = async () => {
    setSorting(true)
    const arr = [...array]
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i
      for (let j = i + 1; j < arr.length; j++) {
        setComparing([minIdx, j])
        await new Promise(r => setTimeout(r, 200))
        if (arr[j] < arr[minIdx]) minIdx = j
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      setArray([...arr])
      setSorted(prev => [...prev, i])
    }
    setComparing([])
    setSorting(false)
  }

  const sort = () => {
    if (algorithm === 'bubble') bubbleSort()
    else selectionSort()
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2">
          <option value="bubble">Bubble Sort O(n²)</option>
          <option value="selection">Selection Sort O(n²)</option>
        </select>
        <button onClick={sort} disabled={sorting} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50">Sort</button>
        <button onClick={reset} disabled={sorting} className="px-4 py-2 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border hover:border-omniviz-accent disabled:opacity-50">Reset</button>
      </div>
      <div className="flex items-end justify-center gap-2 h-48">
        {array.map((val, idx) => (
          <motion.div
            key={idx}
            layout
            className={`w-12 rounded-t-lg flex items-end justify-center pb-2 text-white font-bold text-sm transition-colors ${
              sorted.includes(idx) ? 'bg-green-500' : comparing.includes(idx) ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
            style={{ height: `${val * 2}px` }}
          >
            {val}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function BinarySearchDemo() {
  const [array] = useState([2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91])
  const [target, setTarget] = useState(23)
  const [searching, setSearching] = useState(false)
  const [left, setLeft] = useState(-1)
  const [right, setRight] = useState(-1)
  const [mid, setMid] = useState(-1)
  const [found, setFound] = useState(-1)
  const [steps, setSteps] = useState([])

  const search = async () => {
    setSearching(true)
    setFound(-1)
    setSteps([])
    let l = 0, r = array.length - 1

    while (l <= r) {
      const m = Math.floor((l + r) / 2)
      setLeft(l)
      setRight(r)
      setMid(m)
      setSteps(prev => [...prev, `Checking index ${m}: ${array[m]}`])
      await new Promise(res => setTimeout(res, 800))

      if (array[m] === target) {
        setFound(m)
        setSteps(prev => [...prev, `Found ${target} at index ${m}!`])
        break
      } else if (array[m] < target) {
        setSteps(prev => [...prev, `${array[m]} < ${target}, search right half`])
        l = m + 1
      } else {
        setSteps(prev => [...prev, `${array[m]} > ${target}, search left half`])
        r = m - 1
      }
    }

    if (found === -1 && l > r) {
      setSteps(prev => [...prev, `${target} not found in array`])
    }
    setSearching(false)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <input type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} className="w-24 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2" />
        <button onClick={search} disabled={searching} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">Search</button>
      </div>
      <div className="flex gap-1 mb-6">
        {array.map((val, idx) => (
          <div
            key={idx}
            className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold text-sm transition-all ${
              found === idx ? 'bg-green-500 text-white scale-110' :
              mid === idx ? 'bg-yellow-500 text-black' :
              idx >= left && idx <= right && left !== -1 ? 'bg-blue-500/50 text-omniviz-text' :
              'bg-omniviz-bg text-omniviz-text-muted'
            }`}
          >
            {val}
          </div>
        ))}
      </div>
      <div className="space-y-1 text-sm font-mono">
        {steps.map((step, i) => (
          <div key={i} className={`text-omniviz-text-muted ${step.includes('Found') ? 'text-green-400 font-bold' : ''}`}>
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}

function GraphTraversalDemo() {
  const [mode, setMode] = useState('bfs')
  const [visited, setVisited] = useState([])
  const [running, setRunning] = useState(false)

  const graph = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F'],
    D: ['B'],
    E: ['B', 'F'],
    F: ['C', 'E']
  }

  const positions = {
    A: { x: 150, y: 50 },
    B: { x: 75, y: 120 },
    C: { x: 225, y: 120 },
    D: { x: 30, y: 200 },
    E: { x: 120, y: 200 },
    F: { x: 225, y: 200 }
  }

  const bfs = async () => {
    setRunning(true)
    setVisited([])
    const queue = ['A']
    const seen = new Set(['A'])

    while (queue.length > 0) {
      const node = queue.shift()
      setVisited(prev => [...prev, node])
      await new Promise(r => setTimeout(r, 600))

      for (const neighbor of graph[node]) {
        if (!seen.has(neighbor)) {
          seen.add(neighbor)
          queue.push(neighbor)
        }
      }
    }
    setRunning(false)
  }

  const dfs = async () => {
    setRunning(true)
    setVisited([])
    const stack = ['A']
    const seen = new Set()

    while (stack.length > 0) {
      const node = stack.pop()
      if (seen.has(node)) continue
      seen.add(node)
      setVisited(prev => [...prev, node])
      await new Promise(r => setTimeout(r, 600))

      for (const neighbor of [...graph[node]].reverse()) {
        if (!seen.has(neighbor)) {
          stack.push(neighbor)
        }
      }
    }
    setRunning(false)
  }

  const run = () => {
    if (mode === 'bfs') bfs()
    else dfs()
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <select value={mode} onChange={(e) => setMode(e.target.value)} className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2">
          <option value="bfs">BFS (Breadth-First)</option>
          <option value="dfs">DFS (Depth-First)</option>
        </select>
        <button onClick={run} disabled={running} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50">Traverse</button>
        <button onClick={() => setVisited([])} disabled={running} className="px-4 py-2 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border">Reset</button>
      </div>
      <div className="flex gap-8">
        <svg width="280" height="240" className="bg-omniviz-bg rounded-lg">
          {Object.entries(graph).map(([node, neighbors]) =>
            neighbors.map(neighbor => (
              <line
                key={`${node}-${neighbor}`}
                x1={positions[node].x}
                y1={positions[node].y}
                x2={positions[neighbor].x}
                y2={positions[neighbor].y}
                stroke="rgb(var(--omniviz-border))"
                strokeWidth="2"
              />
            ))
          )}
          {Object.entries(positions).map(([node, pos]) => (
            <g key={node}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="24"
                fill={visited.includes(node) ? '#a855f7' : 'rgb(var(--omniviz-surface))'}
                stroke={visited.includes(node) ? '#a855f7' : 'rgb(var(--omniviz-border))'}
                strokeWidth="2"
              />
              <text x={pos.x} y={pos.y + 5} textAnchor="middle" fill={visited.includes(node) ? 'white' : 'rgb(var(--omniviz-text))'} fontWeight="bold">{node}</text>
            </g>
          ))}
        </svg>
        <div className="flex-1">
          <h4 className="text-omniviz-text font-semibold mb-2">Visit Order:</h4>
          <div className="flex gap-2 flex-wrap">
            {visited.map((node, i) => (
              <span key={i} className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-bold">{node}</span>
            ))}
          </div>
          <p className="mt-4 text-omniviz-text-muted text-sm">
            {mode === 'bfs' ? 'BFS uses a queue - explores level by level' : 'DFS uses a stack - explores deeply first'}
          </p>
        </div>
      </div>
    </div>
  )
}

function DPDemo() {
  const [n, setN] = useState(8)
  const [memo, setMemo] = useState({})
  const [computing, setComputing] = useState(false)
  const [callStack, setCallStack] = useState([])

  const fibMemo = async (num, depth = 0) => {
    setCallStack(prev => [...prev, { n: num, depth, cached: memo[num] !== undefined }])
    await new Promise(r => setTimeout(r, 200))

    if (num <= 1) {
      setMemo(prev => ({ ...prev, [num]: num }))
      return num
    }
    if (memo[num] !== undefined) {
      return memo[num]
    }

    const result = await fibMemo(num - 1, depth + 1) + await fibMemo(num - 2, depth + 1)
    setMemo(prev => ({ ...prev, [num]: result }))
    return result
  }

  const compute = async () => {
    setComputing(true)
    setMemo({})
    setCallStack([])
    await fibMemo(n)
    setComputing(false)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <input type="number" value={n} onChange={(e) => setN(Math.min(12, Math.max(1, Number(e.target.value))))} min="1" max="12" className="w-20 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2" />
        <button onClick={compute} disabled={computing} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50">Compute Fib({n})</button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-2">Memo Table</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(memo).map(([key, val]) => (
              <div key={key} className="px-3 py-1 bg-orange-500/20 border border-orange-500 rounded-lg text-sm">
                <span className="text-orange-400">F({key})</span>
                <span className="text-omniviz-text"> = {val}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-2">Call Stack (recent)</h4>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {callStack.slice(-10).map((call, i) => (
              <div key={i} className="text-sm" style={{ paddingLeft: `${call.depth * 12}px` }}>
                <span className={call.cached ? 'text-green-400' : 'text-omniviz-text-muted'}>
                  fib({call.n}) {call.cached && '← cached!'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {memo[n] !== undefined && (
        <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
          <span className="text-green-400 font-bold">Fibonacci({n}) = {memo[n]}</span>
        </div>
      )}
    </div>
  )
}

function PathfindingDemo() {
  const [grid, setGrid] = useState(() => {
    const g = Array(6).fill(null).map(() => Array(8).fill(0))
    g[1][2] = 1; g[1][3] = 1; g[2][3] = 1; g[3][3] = 1; g[3][4] = 1
    return g
  })
  const [start] = useState([0, 0])
  const [end] = useState([5, 7])
  const [visited, setVisited] = useState(new Set())
  const [path, setPath] = useState([])
  const [running, setRunning] = useState(false)

  const dijkstra = async () => {
    setRunning(true)
    setVisited(new Set())
    setPath([])

    const dist = {}
    const prev = {}
    const pq = [[0, start[0], start[1]]]
    const dirs = [[0,1],[1,0],[0,-1],[-1,0]]

    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 8; c++) {
        dist[`${r},${c}`] = Infinity
      }
    }
    dist[`${start[0]},${start[1]}`] = 0

    while (pq.length > 0) {
      pq.sort((a, b) => a[0] - b[0])
      const [d, r, c] = pq.shift()
      const key = `${r},${c}`

      if (visited.has(key)) continue
      setVisited(prev => new Set([...prev, key]))
      await new Promise(res => setTimeout(res, 100))

      if (r === end[0] && c === end[1]) {
        // Reconstruct path
        const p = []
        let curr = key
        while (curr) {
          p.unshift(curr)
          curr = prev[curr]
        }
        setPath(p)
        break
      }

      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc
        if (nr >= 0 && nr < 6 && nc >= 0 && nc < 8 && grid[nr][nc] !== 1) {
          const nkey = `${nr},${nc}`
          const newDist = d + 1
          if (newDist < dist[nkey]) {
            dist[nkey] = newDist
            prev[nkey] = key
            pq.push([newDist, nr, nc])
          }
        }
      }
    }
    setRunning(false)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <button onClick={dijkstra} disabled={running} className="mb-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50">
        Find Shortest Path
      </button>
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(8, 40px)' }}>
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const key = `${r},${c}`
            const isStart = r === start[0] && c === start[1]
            const isEnd = r === end[0] && c === end[1]
            const isPath = path.includes(key)
            const isVisited = visited.has(key)

            return (
              <div
                key={key}
                className={`w-10 h-10 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                  cell === 1 ? 'bg-gray-600' :
                  isStart ? 'bg-green-500 text-white' :
                  isEnd ? 'bg-red-500 text-white' :
                  isPath ? 'bg-cyan-500 text-white' :
                  isVisited ? 'bg-cyan-500/30' :
                  'bg-omniviz-bg'
                }`}
              >
                {isStart ? 'S' : isEnd ? 'E' : cell === 1 ? '▪' : ''}
              </div>
            )
          })
        )}
      </div>
      <p className="mt-4 text-omniviz-text-muted text-sm">
        Green = Start, Red = End, Gray = Walls, Cyan = Path
      </p>
    </div>
  )
}

export default AlgorithmsConcept
