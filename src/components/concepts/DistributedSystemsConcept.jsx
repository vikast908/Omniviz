import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function DistributedSystemsConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Distributed Systems" color="cyan" />

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
                Distributed Systems
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-omniviz-text-muted max-w-3xl mx-auto"
              >
                Systems where components on networked computers communicate and coordinate
                to achieve a common goal. Learn about consensus, replication, and fault tolerance.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Consensus', desc: 'Agreement among distributed nodes', icon: '🤝', color: 'cyan' },
                { title: 'Replication', desc: 'Copying data across multiple nodes', icon: '📋', color: 'green' },
                { title: 'Fault Tolerance', desc: 'Surviving node and network failures', icon: '🛡️', color: 'orange' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-6 bg-omniviz-surface rounded-2xl border border-omniviz-border"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className={`text-lg font-semibold text-${item.color}-400 mb-2`}>{item.title}</h3>
                  <p className="text-omniviz-text-muted text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* CAP Theorem Section */}
          <Section title="CAP Theorem" id="cap">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">The Impossible Triangle</h3>
              <p className="text-omniviz-text-muted mb-6">
                The <strong className="text-cyan-400">CAP Theorem</strong> states that a distributed system can only
                guarantee two out of three properties: <strong className="text-green-400">Consistency</strong>,
                <strong className="text-blue-400"> Availability</strong>, and <strong className="text-orange-400"> Partition Tolerance</strong>.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { letter: 'C', name: 'Consistency', desc: 'Every read receives the most recent write', color: 'green' },
                  { letter: 'A', name: 'Availability', desc: 'Every request receives a response', color: 'blue' },
                  { letter: 'P', name: 'Partition Tolerance', desc: 'System works despite network failures', color: 'orange' },
                ].map(item => (
                  <div key={item.letter} className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                    <div className={`text-3xl font-bold text-${item.color}-400 mb-2`}>{item.letter}</div>
                    <h4 className="font-semibold text-omniviz-text mb-1">{item.name}</h4>
                    <p className="text-xs text-omniviz-text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-omniviz-text-muted text-sm">
                In practice, network partitions are unavoidable, so systems must choose between <strong className="text-green-400">CP</strong> (consistent but may be unavailable)
                or <strong className="text-blue-400">AP</strong> (available but may return stale data).
              </p>
            </ExplanationCard>

            <div className="mt-8">
              <CAPDemo />
            </div>
          </Section>

          {/* Consensus Section */}
          <Section title="Consensus Algorithms" id="consensus">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">How Nodes Agree</h3>
              <p className="text-omniviz-text-muted mb-6">
                <strong className="text-purple-400">Consensus</strong> is the process of getting all nodes to agree on a single value.
                This is fundamental for leader election, transaction ordering, and state machine replication.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border text-omniviz-text">
                  <h4 className="font-semibold text-purple-400 mb-3">Popular Algorithms</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'Paxos', use: 'Google Chubby, Apache Zookeeper' },
                      { name: 'Raft', use: 'etcd, Consul, CockroachDB' },
                      { name: 'PBFT', use: 'Hyperledger Fabric' },
                      { name: 'Nakamoto', use: 'Bitcoin, Ethereum' },
                    ].map(algo => (
                      <div key={algo.name} className="flex items-center gap-3 p-2 bg-omniviz-surface rounded">
                        <span className="font-mono text-cyan-400 w-20">{algo.name}</span>
                        <span className="text-xs text-omniviz-text-muted">{algo.use}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border text-omniviz-text">
                  <h4 className="font-semibold text-orange-400 mb-3">Requirements</h4>
                  <ul className="space-y-2 text-sm text-omniviz-text-muted">
                    <li className="flex gap-2">
                      <span className="text-green-400">✓</span>
                      <span><strong>Agreement:</strong> All correct nodes decide same value</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-400">✓</span>
                      <span><strong>Validity:</strong> Decision must be proposed by some node</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-400">✓</span>
                      <span><strong>Termination:</strong> All correct nodes eventually decide</span>
                    </li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>

            <div className="mt-8">
              <RaftDemo />
            </div>
          </Section>

          {/* Replication Section */}
          <Section title="Data Replication" id="replication">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Keeping Copies in Sync</h3>
              <p className="text-omniviz-text-muted mb-6">
                <strong className="text-green-400">Replication</strong> maintains copies of data on multiple nodes for
                fault tolerance and performance. The challenge is keeping replicas consistent.
              </p>
            </ExplanationCard>

            <div className="mt-8">
              <ReplicationDemo />
            </div>
          </Section>

          {/* Consistent Hashing Section */}
          <Section title="Consistent Hashing" id="hashing">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Distributing Data Across Nodes</h3>
              <p className="text-omniviz-text-muted mb-6">
                <strong className="text-yellow-400">Consistent hashing</strong> distributes keys across nodes in a way that
                minimizes redistribution when nodes join or leave. Used by DynamoDB, Cassandra, and CDNs.
              </p>
            </ExplanationCard>

            <div className="mt-8">
              <ConsistentHashingDemo />
            </div>
          </Section>

          {/* Vector Clocks Section */}
          <Section title="Vector Clocks" id="clocks">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-pink-400 mb-4">Tracking Causality</h3>
              <p className="text-omniviz-text-muted mb-6">
                <strong className="text-pink-400">Vector clocks</strong> help determine the order of events in distributed systems
                where there's no global clock. They track the "happens-before" relationship between events.
              </p>
            </ExplanationCard>

            <div className="mt-8">
              <VectorClockDemo />
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

// Reusable components
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

function ExplanationCard({ children }) {
  return (
    <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">
      {children}
    </div>
  )
}

// CAP Demo
function CAPDemo() {
  const [choice, setChoice] = useState('cp')
  const [partitioned, setPartitioned] = useState(false)
  const [writeValue, setWriteValue] = useState('')
  const [nodes, setNodes] = useState([
    { id: 'A', value: '100', status: 'primary' },
    { id: 'B', value: '100', status: 'replica' },
    { id: 'C', value: '100', status: 'replica' },
  ])

  const simulateWrite = () => {
    if (!writeValue) return

    if (partitioned) {
      if (choice === 'cp') {
        // CP: Reject write during partition (unavailable)
        alert('Write rejected: System is partitioned and prioritizes consistency')
      } else {
        // AP: Accept write but only update reachable nodes
        setNodes(prev => prev.map((n, i) =>
          i === 0 ? { ...n, value: writeValue } : n
        ))
      }
    } else {
      // No partition: update all nodes
      setNodes(prev => prev.map(n => ({ ...n, value: writeValue })))
    }
  }

  const simulateRead = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId)
    if (partitioned && choice === 'cp' && nodeId !== 'A') {
      return 'UNAVAILABLE'
    }
    return node?.value
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
          className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-4 py-2"
        >
          <option value="cp">CP System (Consistent)</option>
          <option value="ap">AP System (Available)</option>
        </select>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={partitioned}
            onChange={(e) => setPartitioned(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-omniviz-text">Network Partition</span>
        </label>
      </div>

      {/* Nodes Visualization */}
      <div className="flex justify-center gap-8 mb-6">
        {nodes.map((node, i) => (
          <div key={node.id} className="relative">
            <motion.div
              animate={{
                borderColor: partitioned && i > 0 ? '#ef4444' : '#22c55e',
                opacity: partitioned && i > 0 && choice === 'cp' ? 0.5 : 1
              }}
              className={`w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center bg-omniviz-bg`}
            >
              <div className="text-lg font-bold text-omniviz-text">Node {node.id}</div>
              <div className="text-2xl font-mono text-cyan-400">{node.value}</div>
              <div className="text-xs text-omniviz-text-muted">{node.status}</div>
            </motion.div>

            {partitioned && i === 0 && (
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 text-center">
                <span className="text-red-400 text-2xl">⚡</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Write Operation */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={writeValue}
          onChange={(e) => setWriteValue(e.target.value)}
          placeholder="New value..."
          className="flex-1 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-4 py-2"
        />
        <button
          onClick={simulateWrite}
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Write to Primary
        </button>
      </div>

      {/* Status */}
      <div className="p-4 bg-omniviz-bg rounded-lg text-omniviz-text">
        <span className={`font-semibold ${choice === 'cp' ? 'text-green-400' : 'text-blue-400'}`}>
          {choice === 'cp' ? 'CP Mode: ' : 'AP Mode: '}
        </span>
        <span className="text-omniviz-text-muted text-sm">
          {choice === 'cp'
            ? partitioned
              ? 'Writes and reads to partitioned nodes are rejected to maintain consistency.'
              : 'All nodes are synchronized. Writes complete only after all replicas confirm.'
            : partitioned
              ? 'Writes accepted but only primary is updated. Replicas may have stale data.'
              : 'All nodes are available. Eventually consistent after replication.'}
        </span>
      </div>
    </div>
  )
}

// Raft Consensus Demo
function RaftDemo() {
  const [nodes, setNodes] = useState([
    { id: 1, state: 'follower', term: 1, votedFor: null, log: [] },
    { id: 2, state: 'follower', term: 1, votedFor: null, log: [] },
    { id: 3, state: 'leader', term: 1, votedFor: 3, log: [] },
    { id: 4, state: 'follower', term: 1, votedFor: null, log: [] },
    { id: 5, state: 'follower', term: 1, votedFor: null, log: [] },
  ])
  const [messages, setMessages] = useState([])
  const [logEntry, setLogEntry] = useState('')

  const leader = nodes.find(n => n.state === 'leader')

  const appendLog = () => {
    if (!logEntry || !leader) return

    // Leader appends to its log
    setNodes(prev => prev.map(n =>
      n.state === 'leader'
        ? { ...n, log: [...n.log, { term: n.term, value: logEntry }] }
        : n
    ))

    setMessages(prev => [...prev, { from: leader.id, to: 'all', type: 'AppendEntries', value: logEntry }])

    // Simulate replication to followers
    setTimeout(() => {
      setNodes(prev => prev.map(n => ({
        ...n,
        log: [...n.log, { term: leader.term, value: logEntry }]
      })))
      setMessages(prev => [...prev, { from: 'all', to: leader.id, type: 'ACK' }])
    }, 500)

    setLogEntry('')
  }

  const triggerElection = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId)
    if (node?.state === 'leader') return

    const newTerm = (nodes.find(n => n.state === 'leader')?.term || 1) + 1

    // Node becomes candidate
    setNodes(prev => prev.map(n =>
      n.id === nodeId
        ? { ...n, state: 'candidate', term: newTerm, votedFor: nodeId }
        : n.state === 'leader'
          ? { ...n, state: 'follower' }
          : n
    ))

    setMessages([{ from: nodeId, to: 'all', type: 'RequestVote', term: newTerm }])

    // Simulate vote collection
    setTimeout(() => {
      setNodes(prev => prev.map(n =>
        n.id === nodeId
          ? { ...n, state: 'leader', term: newTerm }
          : { ...n, state: 'follower', term: newTerm, votedFor: nodeId }
      ))
      setMessages(prev => [...prev, { from: 'majority', to: nodeId, type: 'VoteGranted' }])
    }, 800)
  }

  const getNodeColor = (state) => {
    switch (state) {
      case 'leader': return 'border-yellow-500 bg-yellow-500/10'
      case 'candidate': return 'border-purple-500 bg-purple-500/10'
      default: return 'border-omniviz-border bg-omniviz-bg'
    }
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <h4 className="text-lg font-semibold text-purple-400 mb-4">Raft Consensus Visualization</h4>

      {/* Nodes */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {nodes.map(node => (
          <motion.button
            key={node.id}
            onClick={() => triggerElection(node.id)}
            whileHover={{ scale: 1.05 }}
            className={`w-28 p-4 rounded-xl border-2 ${getNodeColor(node.state)} transition-colors`}
          >
            <div className="text-sm font-bold text-omniviz-text">Node {node.id}</div>
            <div className={`text-xs font-semibold ${
              node.state === 'leader' ? 'text-yellow-400' :
              node.state === 'candidate' ? 'text-purple-400' : 'text-omniviz-text-muted'
            }`}>
              {node.state.toUpperCase()}
            </div>
            <div className="text-xs text-omniviz-text-muted mt-1">Term: {node.term}</div>
            <div className="text-xs text-omniviz-text-muted">Log: {node.log.length}</div>
          </motion.button>
        ))}
      </div>

      {/* Log Append */}
      {leader && (
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={logEntry}
            onChange={(e) => setLogEntry(e.target.value)}
            placeholder="Log entry value..."
            className="flex-1 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-4 py-2"
          />
          <button
            onClick={appendLog}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Append to Log
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="p-4 bg-omniviz-bg rounded-lg max-h-32 overflow-y-auto">
        <div className="text-xs text-omniviz-text-muted mb-2">Message Log</div>
        {messages.slice(-5).map((msg, i) => (
          <div key={i} className="text-xs text-omniviz-text py-1">
            <span className="text-cyan-400">{msg.from}</span>
            <span className="text-omniviz-text-muted"> → </span>
            <span className="text-green-400">{msg.to}</span>
            <span className="text-omniviz-text-muted">: </span>
            <span className="text-purple-400">{msg.type}</span>
            {msg.value && <span className="text-omniviz-text-muted"> ({msg.value})</span>}
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-xs text-omniviz-text-muted">Click a follower to trigger election</div>
        )}
      </div>
    </div>
  )
}

// Replication Demo
function ReplicationDemo() {
  const [strategy, setStrategy] = useState('sync')
  const [primary, setPrimary] = useState({ value: 'A', version: 1 })
  const [replicas, setReplicas] = useState([
    { id: 1, value: 'A', version: 1, synced: true },
    { id: 2, value: 'A', version: 1, synced: true },
  ])
  const [isWriting, setIsWriting] = useState(false)

  const write = async () => {
    setIsWriting(true)
    const newValue = String.fromCharCode(primary.value.charCodeAt(0) + 1)
    const newVersion = primary.version + 1

    // Update primary
    setPrimary({ value: newValue, version: newVersion })

    if (strategy === 'sync') {
      // Synchronous: wait for all replicas
      await new Promise(r => setTimeout(r, 300))
      setReplicas(prev => prev.map(r => ({ ...r, synced: false })))

      for (let i = 0; i < replicas.length; i++) {
        await new Promise(r => setTimeout(r, 400))
        setReplicas(prev => prev.map((r, j) =>
          j === i ? { ...r, value: newValue, version: newVersion, synced: true } : r
        ))
      }
    } else {
      // Asynchronous: return immediately, replicate in background
      setReplicas(prev => prev.map(r => ({ ...r, synced: false })))

      replicas.forEach((_, i) => {
        setTimeout(() => {
          setReplicas(prev => prev.map((r, j) =>
            j === i ? { ...r, value: newValue, version: newVersion, synced: true } : r
          ))
        }, 500 + Math.random() * 1000)
      })
    }

    setIsWriting(false)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-4 py-2"
        >
          <option value="sync">Synchronous Replication</option>
          <option value="async">Asynchronous Replication</option>
        </select>

        <button
          onClick={write}
          disabled={isWriting}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
        >
          {isWriting ? 'Writing...' : 'Write to Primary'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Primary */}
        <div className="text-center">
          <div className="text-xs text-omniviz-text-muted mb-2">Primary</div>
          <motion.div
            animate={{ scale: isWriting ? 1.05 : 1 }}
            className="w-32 h-32 rounded-xl border-2 border-yellow-500 bg-yellow-500/10 flex flex-col items-center justify-center"
          >
            <div className="text-4xl font-bold text-yellow-400">{primary.value}</div>
            <div className="text-xs text-omniviz-text-muted">v{primary.version}</div>
          </motion.div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center">
          <svg className="w-8 h-8 text-omniviz-text-muted transform md:rotate-0 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div className="text-xs text-omniviz-text-muted">{strategy === 'sync' ? 'sync' : 'async'}</div>
        </div>

        {/* Replicas */}
        <div className="flex gap-4">
          {replicas.map(replica => (
            <div key={replica.id} className="text-center">
              <div className="text-xs text-omniviz-text-muted mb-2">Replica {replica.id}</div>
              <motion.div
                animate={{
                  borderColor: replica.synced ? '#22c55e' : '#f59e0b',
                  backgroundColor: replica.synced ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)'
                }}
                className="w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center"
              >
                <div className={`text-3xl font-bold ${replica.synced ? 'text-green-400' : 'text-orange-400'}`}>
                  {replica.value}
                </div>
                <div className="text-xs text-omniviz-text-muted">v{replica.version}</div>
                <div className={`text-xs ${replica.synced ? 'text-green-400' : 'text-orange-400'}`}>
                  {replica.synced ? 'synced' : 'syncing...'}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-omniviz-bg rounded-lg text-omniviz-text">
        <span className={`font-semibold ${strategy === 'sync' ? 'text-blue-400' : 'text-orange-400'}`}>
          {strategy === 'sync' ? 'Synchronous: ' : 'Asynchronous: '}
        </span>
        <span className="text-sm text-omniviz-text-muted">
          {strategy === 'sync'
            ? 'Write completes only after all replicas confirm. Higher latency but strong consistency.'
            : 'Write returns immediately. Lower latency but may lose data if primary fails before replication.'}
        </span>
      </div>
    </div>
  )
}

// Consistent Hashing Demo
function ConsistentHashingDemo() {
  const [nodes, setNodes] = useState(['A', 'B', 'C'])
  const [keys, setKeys] = useState(['user1', 'user2', 'user3', 'order1', 'product1'])
  const [newKey, setNewKey] = useState('')

  const hash = (str) => {
    let h = 0
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0
    }
    return Math.abs(h) % 360
  }

  const nodePositions = nodes.map(n => ({ id: n, position: hash(n) })).sort((a, b) => a.position - b.position)

  const getResponsibleNode = (key) => {
    const keyPos = hash(key)
    for (const node of nodePositions) {
      if (node.position >= keyPos) return node.id
    }
    return nodePositions[0]?.id || 'None'
  }

  const addKey = () => {
    if (newKey && !keys.includes(newKey)) {
      setKeys([...keys, newKey])
      setNewKey('')
    }
  }

  const addNode = () => {
    const next = String.fromCharCode('A'.charCodeAt(0) + nodes.length)
    if (nodes.length < 8) {
      setNodes([...nodes, next])
    }
  }

  const removeNode = () => {
    if (nodes.length > 1) {
      setNodes(nodes.slice(0, -1))
    }
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={addNode}
          disabled={nodes.length >= 8}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
        >
          Add Node
        </button>
        <button
          onClick={removeNode}
          disabled={nodes.length <= 1}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
        >
          Remove Node
        </button>
        <div className="flex gap-2">
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="New key..."
            className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-4 py-2"
          />
          <button
            onClick={addKey}
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Add Key
          </button>
        </div>
      </div>

      {/* Ring Visualization */}
      <div className="flex justify-center mb-6">
        <div className="relative w-64 h-64">
          {/* Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-omniviz-border" />

          {/* Nodes */}
          {nodePositions.map(node => {
            const angle = (node.position - 90) * (Math.PI / 180)
            const x = 50 + 45 * Math.cos(angle)
            const y = 50 + 45 * Math.sin(angle)
            return (
              <motion.div
                key={node.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              >
                {node.id}
              </motion.div>
            )
          })}

          {/* Keys */}
          {keys.map(key => {
            const pos = hash(key)
            const angle = (pos - 90) * (Math.PI / 180)
            const x = 50 + 32 * Math.cos(angle)
            const y = 50 + 32 * Math.sin(angle)
            return (
              <motion.div
                key={key}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-black text-xs font-bold"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                title={key}
              >
                {key.charAt(0)}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Key Assignments */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-omniviz-bg rounded-lg text-omniviz-text">
          <h5 className="font-semibold text-yellow-400 mb-2">Key Assignments</h5>
          <div className="space-y-1">
            {keys.map(key => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-omniviz-text-muted">{key}</span>
                <span className="text-cyan-400">→ Node {getResponsibleNode(key)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg text-omniviz-text">
          <h5 className="font-semibold text-cyan-400 mb-2">Node Positions</h5>
          <div className="space-y-1">
            {nodePositions.map(node => (
              <div key={node.id} className="flex justify-between text-sm">
                <span className="text-omniviz-text-muted">Node {node.id}</span>
                <span className="font-mono text-cyan-400">{node.position}°</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Vector Clock Demo
function VectorClockDemo() {
  const [events, setEvents] = useState([
    { id: 1, node: 'A', clock: { A: 1, B: 0, C: 0 }, desc: 'A writes x=1' },
    { id: 2, node: 'B', clock: { A: 0, B: 1, C: 0 }, desc: 'B writes y=2' },
    { id: 3, node: 'A', clock: { A: 2, B: 1, C: 0 }, desc: 'A receives from B' },
  ])
  const [clocks, setClocks] = useState({ A: { A: 2, B: 1, C: 0 }, B: { A: 0, B: 1, C: 0 }, C: { A: 0, B: 0, C: 0 } })

  const localEvent = (node) => {
    const newClock = { ...clocks[node], [node]: clocks[node][node] + 1 }
    setClocks(prev => ({ ...prev, [node]: newClock }))
    setEvents(prev => [...prev, {
      id: prev.length + 1,
      node,
      clock: newClock,
      desc: `${node} local event`
    }])
  }

  const sendMessage = (from, to) => {
    // Merge clocks and increment receiver
    const merged = {}
    for (const key of Object.keys(clocks[from])) {
      merged[key] = Math.max(clocks[from][key], clocks[to][key])
    }
    merged[to] = merged[to] + 1

    setClocks(prev => ({ ...prev, [to]: merged }))
    setEvents(prev => [...prev, {
      id: prev.length + 1,
      node: to,
      clock: merged,
      desc: `${to} receives from ${from}`
    }])
  }

  const formatClock = (clock) => `[${clock.A}, ${clock.B}, ${clock.C}]`

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      {/* Current Clocks */}
      <div className="flex justify-center gap-8 mb-6">
        {['A', 'B', 'C'].map(node => (
          <div key={node} className="text-center">
            <div className="w-24 h-24 rounded-xl border-2 border-pink-500 bg-pink-500/10 flex flex-col items-center justify-center mb-2">
              <div className="text-lg font-bold text-omniviz-text">Node {node}</div>
              <div className="text-sm font-mono text-pink-400">{formatClock(clocks[node])}</div>
            </div>
            <button
              onClick={() => localEvent(node)}
              className="px-3 py-1 text-xs bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
            >
              Local Event
            </button>
          </div>
        ))}
      </div>

      {/* Send Message Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {['A', 'B', 'C'].map(from =>
          ['A', 'B', 'C'].filter(to => to !== from).map(to => (
            <button
              key={`${from}-${to}`}
              onClick={() => sendMessage(from, to)}
              className="px-3 py-1 text-xs bg-omniviz-bg text-omniviz-text border border-omniviz-border rounded hover:border-pink-500 transition-colors"
            >
              {from} → {to}
            </button>
          ))
        )}
      </div>

      {/* Event History */}
      <div className="p-4 bg-omniviz-bg rounded-lg max-h-48 overflow-y-auto">
        <div className="text-xs text-omniviz-text-muted mb-2">Event History</div>
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 text-sm py-1"
          >
            <span className="text-omniviz-text-muted w-6">{i + 1}.</span>
            <span className="w-12 text-pink-400">{event.node}</span>
            <span className="font-mono text-cyan-400">{formatClock(event.clock)}</span>
            <span className="text-omniviz-text-muted">{event.desc}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-omniviz-bg rounded-lg text-omniviz-text">
        <span className="text-pink-400 font-semibold">Vector Clock Rules: </span>
        <span className="text-sm text-omniviz-text-muted">
          1) Increment own component on local event. 2) On receive, merge by taking max of each component, then increment own.
        </span>
      </div>
    </div>
  )
}

export default DistributedSystemsConcept
