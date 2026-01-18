import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function DataStructuresConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Data Structures" color="orange" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Data Structures</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Ways to organize and store data for efficient access and modification.
              </motion.p>
            </div>
          </Section>

          <Section title="Arrays" id="arrays"><ExplanationCard><h3 className="text-lg font-semibold text-orange-400 mb-4">Contiguous Memory</h3><p className="text-omniviz-text-muted mb-4">Arrays store elements in contiguous memory locations, enabling O(1) random access by index.</p></ExplanationCard><div className="mt-8"><ArrayDemo /></div></Section>
          <Section title="Linked List" id="linked-list"><ExplanationCard><h3 className="text-lg font-semibold text-blue-400 mb-4">Dynamic Chain of Nodes</h3><p className="text-omniviz-text-muted mb-4">Each node points to the next, allowing efficient insertions and deletions but O(n) access.</p></ExplanationCard><div className="mt-8"><LinkedListDemo /></div></Section>
          <Section title="Stack" id="stack"><ExplanationCard><h3 className="text-lg font-semibold text-green-400 mb-4">Last In, First Out (LIFO)</h3><p className="text-omniviz-text-muted mb-4">Elements are added and removed from the same end. Used for undo operations, function calls.</p></ExplanationCard><div className="mt-8"><StackDemo /></div></Section>
          <Section title="Queue" id="queue"><ExplanationCard><h3 className="text-lg font-semibold text-purple-400 mb-4">First In, First Out (FIFO)</h3><p className="text-omniviz-text-muted mb-4">Elements are added at rear and removed from front. Used for task scheduling, BFS.</p></ExplanationCard><div className="mt-8"><QueueDemo /></div></Section>
          <Section title="Binary Tree" id="tree"><ExplanationCard><h3 className="text-lg font-semibold text-red-400 mb-4">Hierarchical Structure</h3><p className="text-omniviz-text-muted mb-4">Each node has at most two children. Binary Search Trees enable O(log n) operations.</p></ExplanationCard><div className="mt-8"><TreeDemo /></div></Section>
          <Section title="Hash Table" id="hash"><ExplanationCard><h3 className="text-lg font-semibold text-cyan-400 mb-4">Key-Value Mapping</h3><p className="text-omniviz-text-muted mb-4">Uses a hash function to map keys to buckets, enabling average O(1) lookup.</p></ExplanationCard><div className="mt-8"><HashTableDemo /></div></Section>
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

function ArrayDemo() {
  const [arr, setArr] = useState([5, 12, 8, 3, 17, 9])
  const [newVal, setNewVal] = useState('')
  const [highlight, setHighlight] = useState(-1)

  const insert = () => {
    if (newVal) {
      setArr([...arr, parseInt(newVal) || 0])
      setNewVal('')
    }
  }
  const remove = (i) => setArr(arr.filter((_, idx) => idx !== i))
  const access = (i) => { setHighlight(i); setTimeout(() => setHighlight(-1), 1000) }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-2 mb-4 flex-wrap">
        {arr.map((val, i) => (
          <motion.div key={i} animate={{ scale: highlight === i ? 1.2 : 1, backgroundColor: highlight === i ? '#f59e0b' : '#1e1e2e' }} className="relative">
            <div onClick={() => access(i)} className="w-14 h-14 rounded-lg border border-omniviz-border flex items-center justify-center text-omniviz-text font-mono cursor-pointer hover:border-orange-500">{val}</div>
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-omniviz-text-muted">[{i}]</div>
            <button onClick={() => remove(i)} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs">×</button>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2">
        <input type="number" value={newVal} onChange={(e) => setNewVal(e.target.value)} placeholder="Value" className="w-24 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2" />
        <button onClick={insert} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Push</button>
      </div>
      <div className="mt-4 text-sm text-omniviz-text-muted">Access: O(1) | Insert/Delete: O(n) | Search: O(n)</div>
    </div>
  )
}

function LinkedListDemo() {
  const [nodes, setNodes] = useState([{ val: 5 }, { val: 12 }, { val: 8 }, { val: 3 }])
  const [newVal, setNewVal] = useState('')

  const prepend = () => { if (newVal) { setNodes([{ val: parseInt(newVal) || 0 }, ...nodes]); setNewVal('') } }
  const append = () => { if (newVal) { setNodes([...nodes, { val: parseInt(newVal) || 0 }]); setNewVal('') } }
  const remove = (i) => setNodes(nodes.filter((_, idx) => idx !== i))

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        <span className="text-omniviz-text-muted text-sm">HEAD →</span>
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="relative">
              <div className="w-16 h-12 rounded-lg border border-blue-500 bg-blue-500/10 flex items-center justify-center text-omniviz-text font-mono">{node.val}</div>
              <button onClick={() => remove(i)} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs">×</button>
            </div>
            {i < nodes.length - 1 && <span className="text-blue-400">→</span>}
          </div>
        ))}
        <span className="text-omniviz-text-muted text-sm">→ NULL</span>
      </div>
      <div className="flex gap-2">
        <input type="number" value={newVal} onChange={(e) => setNewVal(e.target.value)} placeholder="Value" className="w-24 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2" />
        <button onClick={prepend} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Prepend</button>
        <button onClick={append} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Append</button>
      </div>
      <div className="mt-4 text-sm text-omniviz-text-muted">Access: O(n) | Insert/Delete at head: O(1) | Search: O(n)</div>
    </div>
  )
}

function StackDemo() {
  const [stack, setStack] = useState([1, 2, 3])
  const [newVal, setNewVal] = useState('')
  const [popped, setPopped] = useState(null)

  const push = () => { if (newVal) { setStack([...stack, parseInt(newVal) || 0]); setNewVal(''); setPopped(null) } }
  const pop = () => { if (stack.length) { setPopped(stack[stack.length - 1]); setStack(stack.slice(0, -1)) } }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col-reverse gap-1 min-h-[200px] w-32 mx-auto md:mx-0 border-l-2 border-r-2 border-b-2 border-green-500 p-2 rounded-b-lg">
          {stack.map((val, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className={`h-10 rounded flex items-center justify-center text-white font-mono ${i === stack.length - 1 ? 'bg-green-500' : 'bg-green-700'}`}>{val}</motion.div>
          ))}
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex gap-2">
            <input type="number" value={newVal} onChange={(e) => setNewVal(e.target.value)} placeholder="Value" className="w-24 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2" />
            <button onClick={push} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Push</button>
            <button onClick={pop} disabled={!stack.length} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50">Pop</button>
          </div>
          {popped !== null && <div className="p-3 bg-red-500/20 rounded-lg text-red-400">Popped: {popped}</div>}
          <div className="p-3 bg-omniviz-bg rounded-lg text-omniviz-text">
            <div>Top: <span className="text-green-400">{stack.length ? stack[stack.length - 1] : 'empty'}</span></div>
            <div>Size: <span className="text-cyan-400">{stack.length}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QueueDemo() {
  const [queue, setQueue] = useState([1, 2, 3, 4])
  const [newVal, setNewVal] = useState('')
  const [dequeued, setDequeued] = useState(null)

  const enqueue = () => { if (newVal) { setQueue([...queue, parseInt(newVal) || 0]); setNewVal(''); setDequeued(null) } }
  const dequeue = () => { if (queue.length) { setDequeued(queue[0]); setQueue(queue.slice(1)) } }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-omniviz-text-muted text-sm">Front →</span>
          {queue.map((val, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-mono ${i === 0 ? 'bg-purple-500' : 'bg-purple-700'}`}>{val}</motion.div>
          ))}
          <span className="text-omniviz-text-muted text-sm">← Rear</span>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <input type="number" value={newVal} onChange={(e) => setNewVal(e.target.value)} placeholder="Value" className="w-24 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2" />
        <button onClick={enqueue} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">Enqueue</button>
        <button onClick={dequeue} disabled={!queue.length} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50">Dequeue</button>
      </div>
      {dequeued !== null && <div className="p-3 bg-red-500/20 rounded-lg text-red-400 mb-4">Dequeued: {dequeued}</div>}
      <div className="text-sm text-omniviz-text-muted">Enqueue/Dequeue: O(1)</div>
    </div>
  )
}

function TreeDemo() {
  const [tree, setTree] = useState({ val: 10, left: { val: 5, left: { val: 3 }, right: { val: 7 } }, right: { val: 15, left: { val: 12 }, right: { val: 20 } } })
  const [search, setSearch] = useState('')
  const [found, setFound] = useState(null)

  const searchBST = (node, val) => {
    if (!node) return null
    if (node.val === val) return node
    return val < node.val ? searchBST(node.left, val) : searchBST(node.right, val)
  }

  const doSearch = () => {
    const val = parseInt(search)
    setFound(searchBST(tree, val) ? val : 'not found')
  }

  const renderNode = (node, depth = 0) => {
    if (!node) return null
    return (
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-sm ${found === node.val ? 'bg-green-500 border-green-400 text-white' : 'bg-omniviz-bg border-red-500 text-omniviz-text'}`}>{node.val}</div>
        {(node.left || node.right) && (
          <div className="flex gap-4 mt-2">
            <div className="flex flex-col items-center">{node.left && <div className="w-px h-4 bg-red-500" />}{renderNode(node.left, depth + 1)}</div>
            <div className="flex flex-col items-center">{node.right && <div className="w-px h-4 bg-red-500" />}{renderNode(node.right, depth + 1)}</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex justify-center mb-6 overflow-x-auto">{renderNode(tree)}</div>
      <div className="flex gap-2">
        <input type="number" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search value" className="w-32 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2" />
        <button onClick={doSearch} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Search BST</button>
      </div>
      {found !== null && <div className={`mt-4 p-3 rounded-lg ${found === 'not found' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>{found === 'not found' ? 'Value not found' : `Found: ${found}`}</div>}
    </div>
  )
}

function HashTableDemo() {
  const [table, setTable] = useState(Array(7).fill(null).map(() => []))
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')

  const hash = (k) => k.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 7

  const insert = () => {
    if (key && value) {
      const idx = hash(key)
      const newTable = [...table]
      const existing = newTable[idx].findIndex(p => p.key === key)
      if (existing >= 0) newTable[idx][existing].value = value
      else newTable[idx] = [...newTable[idx], { key, value }]
      setTable(newTable)
      setKey(''); setValue('')
    }
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid grid-cols-7 gap-2 mb-6">
        {table.map((bucket, i) => (
          <div key={i} className="space-y-1">
            <div className="text-xs text-omniviz-text-muted text-center">[{i}]</div>
            <div className="min-h-[80px] bg-omniviz-bg rounded-lg border border-cyan-500/30 p-1">
              {bucket.map((item, j) => (
                <div key={j} className="text-xs p-1 bg-cyan-500/20 rounded mb-1 text-omniviz-text">
                  <div className="text-cyan-400">{item.key}</div>
                  <div className="text-omniviz-text-muted">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        <input type="text" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Key" className="w-24 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2" />
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" className="w-24 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2" />
        <button onClick={insert} className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">Insert</button>
        {key && <span className="self-center text-omniviz-text-muted text-sm">hash("{key}") = {hash(key)}</span>}
      </div>
    </div>
  )
}

export default DataStructuresConcept
