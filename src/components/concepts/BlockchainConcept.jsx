import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function BlockchainConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Blockchain" color="orange" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Blockchain</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Decentralized, immutable ledger technology for secure and transparent record-keeping.
              </motion.p>
            </div>
          </Section>

          <Section title="Block Structure" id="block">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Anatomy of a Block</h3>
              <p className="text-omniviz-text-muted mb-4">Each block contains transactions, a timestamp, the previous block's hash, and its own hash forming a chain.</p>
            </ExplanationCard>
            <div className="mt-8"><BlockStructureDemo /></div>
          </Section>

          <Section title="Hashing" id="hash">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Cryptographic Hash Functions</h3>
              <p className="text-omniviz-text-muted mb-4">Hashes create unique fingerprints of data. Any change to the input produces a completely different hash.</p>
            </ExplanationCard>
            <div className="mt-8"><HashingDemo /></div>
          </Section>

          <Section title="Proof of Work" id="pow">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Mining Blocks</h3>
              <p className="text-omniviz-text-muted mb-4">Proof of Work requires miners to find a nonce that produces a hash meeting the difficulty target.</p>
            </ExplanationCard>
            <div className="mt-8"><MiningDemo /></div>
          </Section>

          <Section title="Chain Validation" id="validation">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Immutability</h3>
              <p className="text-omniviz-text-muted mb-4">Changing any block invalidates all subsequent blocks, making tampering detectable and impractical.</p>
            </ExplanationCard>
            <div className="mt-8"><ValidationDemo /></div>
          </Section>

          <Section title="Transactions" id="transactions">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Digital Signatures</h3>
              <p className="text-omniviz-text-muted mb-4">Transactions are signed with private keys and verified with public keys, ensuring authenticity.</p>
            </ExplanationCard>
            <div className="mt-8"><TransactionDemo /></div>
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

// Simple hash function for demo
const simpleHash = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(8, '0')
}

function BlockStructureDemo() {
  const block = {
    index: 42,
    timestamp: '2024-01-15 14:30:00',
    transactions: [
      { from: 'Alice', to: 'Bob', amount: 5 },
      { from: 'Bob', to: 'Charlie', amount: 3 }
    ],
    previousHash: '0000abc123...',
    nonce: 12345,
    hash: '0000def456...'
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-omniviz-bg rounded-lg border-2 border-blue-500">
          <h4 className="text-blue-400 font-bold text-lg mb-4">Block #{block.index}</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-omniviz-text-muted">Timestamp:</span>
              <span className="text-omniviz-text font-mono">{block.timestamp}</span>
            </div>
            <div>
              <span className="text-omniviz-text-muted">Transactions:</span>
              <div className="mt-1 space-y-1">
                {block.transactions.map((tx, i) => (
                  <div key={i} className="p-2 bg-omniviz-surface rounded text-xs font-mono">
                    {tx.from} → {tx.to}: {tx.amount} coins
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-omniviz-text-muted">Previous Hash:</span>
              <span className="text-yellow-400 font-mono">{block.previousHash}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-omniviz-text-muted">Nonce:</span>
              <span className="text-omniviz-text font-mono">{block.nonce}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-omniviz-border">
              <span className="text-omniviz-text-muted">Block Hash:</span>
              <span className="text-green-400 font-mono">{block.hash}</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Block Components</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <div className="text-blue-400 font-semibold">Index</div>
              <p className="text-omniviz-text-muted text-sm">Sequential block number in the chain</p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <div className="text-yellow-400 font-semibold">Previous Hash</div>
              <p className="text-omniviz-text-muted text-sm">Links to prior block, creating the chain</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <div className="text-purple-400 font-semibold">Nonce</div>
              <p className="text-omniviz-text-muted text-sm">Number found during mining process</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <div className="text-green-400 font-semibold">Hash</div>
              <p className="text-omniviz-text-muted text-sm">Unique identifier computed from all data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HashingDemo() {
  const [input, setInput] = useState('Hello, Blockchain!')

  const hash = useMemo(() => simpleHash(input), [input])

  const examples = [
    { input: 'Hello, Blockchain!', desc: 'Original' },
    { input: 'Hello, Blockchain.', desc: 'Changed ! to .' },
    { input: 'hello, blockchain!', desc: 'Lowercase' }
  ]

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
      <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg mb-6">
        <div className="text-omniviz-text-muted text-sm mb-1">SHA-256 Hash (simplified)</div>
        <div className="text-green-400 font-mono text-xl break-all">{hash}</div>
      </div>
      <div>
        <h4 className="text-omniviz-text font-semibold mb-4">Avalanche Effect</h4>
        <p className="text-omniviz-text-muted text-sm mb-4">Small changes produce completely different hashes:</p>
        <div className="space-y-2">
          {examples.map((ex, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-omniviz-bg rounded-lg">
              <span className="text-omniviz-text-muted text-sm w-32">{ex.desc}</span>
              <span className="text-omniviz-text font-mono flex-1">{ex.input}</span>
              <span className="text-cyan-400 font-mono">{simpleHash(ex.input)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MiningDemo() {
  const [data, setData] = useState('Block Data')
  const [difficulty, setDifficulty] = useState(2)
  const [mining, setMining] = useState(false)
  const [result, setResult] = useState(null)

  const mine = () => {
    setMining(true)
    setResult(null)
    const target = '0'.repeat(difficulty)

    let nonce = 0
    const startTime = Date.now()

    const mineStep = () => {
      for (let i = 0; i < 1000; i++) {
        const hash = simpleHash(data + nonce)
        if (hash.startsWith(target)) {
          setResult({ nonce, hash, time: Date.now() - startTime, attempts: nonce + 1 })
          setMining(false)
          return
        }
        nonce++
      }
      if (nonce < 1000000) {
        setTimeout(mineStep, 0)
      } else {
        setMining(false)
      }
    }
    mineStep()
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-omniviz-text-muted text-sm">Block Data:</label>
            <input
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 font-mono mt-1"
            />
          </div>
          <div>
            <label className="text-omniviz-text-muted text-sm">Difficulty (leading zeros): {difficulty}</label>
            <input
              type="range"
              min="1"
              max="4"
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="w-full mt-1"
            />
            <div className="text-omniviz-text-muted text-xs">Target: {('0'.repeat(difficulty)).padEnd(8, 'x')}</div>
          </div>
          <button
            onClick={mine}
            disabled={mining}
            className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
          >
            {mining ? 'Mining...' : 'Start Mining'}
          </button>
        </div>
        <div>
          {result ? (
            <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg">
              <h4 className="text-green-400 font-bold mb-3">Block Mined!</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-omniviz-text-muted">Nonce found:</span>
                  <span className="text-omniviz-text font-mono">{result.nonce}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-omniviz-text-muted">Hash:</span>
                  <span className="text-green-400 font-mono">{result.hash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-omniviz-text-muted">Attempts:</span>
                  <span className="text-omniviz-text">{result.attempts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-omniviz-text-muted">Time:</span>
                  <span className="text-omniviz-text">{result.time}ms</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-omniviz-bg rounded-lg h-full flex items-center justify-center">
              <div className="text-omniviz-text-muted text-center">
                {mining ? (
                  <>
                    <div className="text-4xl mb-2">⛏️</div>
                    <div>Mining in progress...</div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-2">💎</div>
                    <div>Click to start mining</div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ValidationDemo() {
  const [blocks, setBlocks] = useState([
    { index: 0, data: 'Genesis Block', prevHash: '0000000000', nonce: 0 },
    { index: 1, data: 'Block 1 Data', prevHash: '', nonce: 123 },
    { index: 2, data: 'Block 2 Data', prevHash: '', nonce: 456 }
  ])
  const [tampered, setTampered] = useState(null)

  // Calculate hashes
  const chain = useMemo(() => {
    return blocks.map((block, i) => {
      const prevHash = i === 0 ? '0000000000' : simpleHash(
        blocks[i - 1].index + blocks[i - 1].data + blocks[i - 1].prevHash + blocks[i - 1].nonce
      )
      const hash = simpleHash(block.index + block.data + prevHash + block.nonce)
      return { ...block, prevHash, hash }
    })
  }, [blocks])

  // Validate chain
  const isValid = chain.every((block, i) => {
    if (i === 0) return true
    const expectedPrev = chain[i - 1].hash
    return block.prevHash === expectedPrev
  })

  const tamperBlock = (index) => {
    const newBlocks = [...blocks]
    newBlocks[index] = { ...newBlocks[index], data: newBlocks[index].data + ' [TAMPERED]' }
    setBlocks(newBlocks)
    setTampered(index)
  }

  const reset = () => {
    setBlocks([
      { index: 0, data: 'Genesis Block', prevHash: '0000000000', nonce: 0 },
      { index: 1, data: 'Block 1 Data', prevHash: '', nonce: 123 },
      { index: 2, data: 'Block 2 Data', prevHash: '', nonce: 456 }
    ])
    setTampered(null)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <button onClick={reset} className="px-4 py-2 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border">
          Reset Chain
        </button>
        <div className={`px-4 py-2 rounded-lg ${isValid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          Chain is {isValid ? 'Valid ✓' : 'Invalid ✗'}
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {chain.map((block, i) => {
          const prevBlock = chain[i - 1]
          const isInvalid = i > 0 && block.prevHash !== prevBlock?.hash

          return (
            <div key={i} className="flex items-center">
              <div className={`p-4 rounded-lg min-w-48 ${isInvalid || tampered === i ? 'bg-red-500/20 border-2 border-red-500' : 'bg-omniviz-bg border border-omniviz-border'}`}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-omniviz-text font-bold">Block {block.index}</span>
                  {i > 0 && (
                    <button
                      onClick={() => tamperBlock(i)}
                      className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                    >
                      Tamper
                    </button>
                  )}
                </div>
                <div className="space-y-1 text-xs">
                  <div className="text-omniviz-text-muted truncate">Data: {block.data}</div>
                  <div className="text-yellow-400 font-mono truncate">Prev: {block.prevHash.slice(0, 8)}...</div>
                  <div className="text-cyan-400 font-mono truncate">Hash: {block.hash.slice(0, 8)}...</div>
                </div>
              </div>
              {i < chain.length - 1 && (
                <div className="flex items-center mx-2">
                  <div className={`w-8 h-0.5 ${isInvalid ? 'bg-red-500' : 'bg-cyan-500'}`} />
                  <span className="text-xl">→</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {tampered !== null && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-sm">
          <span className="text-red-400">Tampering detected! </span>
          <span className="text-omniviz-text-muted">Block {tampered}'s hash changed, breaking the link to Block {tampered + 1}.</span>
        </div>
      )}
    </div>
  )
}

function TransactionDemo() {
  const [sender, setSender] = useState('Alice')
  const [recipient, setRecipient] = useState('Bob')
  const [amount, setAmount] = useState(10)
  const [signed, setSigned] = useState(false)
  const [verified, setVerified] = useState(null)

  const sign = () => {
    setSigned(true)
    setVerified(null)
  }

  const verify = () => {
    setVerified(true)
  }

  const transaction = `${sender} → ${recipient}: ${amount} coins`
  const signature = signed ? simpleHash(transaction + 'privatekey').slice(0, 16) : null

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-omniviz-text font-semibold">Create Transaction</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-omniviz-text-muted text-sm">From:</label>
              <input value={sender} onChange={(e) => { setSender(e.target.value); setSigned(false) }} className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-omniviz-text-muted text-sm">To:</label>
              <input value={recipient} onChange={(e) => { setRecipient(e.target.value); setSigned(false) }} className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 mt-1" />
            </div>
          </div>
          <div>
            <label className="text-omniviz-text-muted text-sm">Amount:</label>
            <input type="number" value={amount} onChange={(e) => { setAmount(Number(e.target.value)); setSigned(false) }} className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 mt-1" />
          </div>
          <div className="flex gap-2">
            <button onClick={sign} disabled={signed} className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50">
              Sign with Private Key
            </button>
            <button onClick={verify} disabled={!signed || verified} className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50">
              Verify Signature
            </button>
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-4">Transaction Details</h4>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-omniviz-text-muted">Transaction:</span>
              <div className="text-omniviz-text font-mono bg-omniviz-surface p-2 rounded mt-1">{transaction}</div>
            </div>
            {signed && (
              <div>
                <span className="text-omniviz-text-muted">Digital Signature:</span>
                <div className="text-orange-400 font-mono bg-omniviz-surface p-2 rounded mt-1">{signature}</div>
              </div>
            )}
            {verified && (
              <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg">
                <span className="text-green-400">✓ Signature verified with {sender}'s public key</span>
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-omniviz-border text-xs text-omniviz-text-muted">
            <p>• Private key: Signs transactions (kept secret)</p>
            <p>• Public key: Verifies signatures (shared publicly)</p>
            <p>• Only the owner can create valid signatures</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockchainConcept
