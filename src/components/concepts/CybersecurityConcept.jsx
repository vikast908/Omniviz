import { useState } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function CybersecurityConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Cybersecurity" color="red" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Cybersecurity</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Protecting systems, networks, and data from digital attacks.
              </motion.p>
            </div>
          </Section>

          <Section title="Password Hashing" id="hashing">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Secure Password Storage</h3>
              <p className="text-omniviz-text-muted mb-4">Passwords should never be stored in plaintext. Hashing with salt ensures even identical passwords produce different hashes.</p>
            </ExplanationCard>
            <div className="mt-8"><HashingDemo /></div>
          </Section>

          <Section title="SQL Injection" id="sql">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-red-400 mb-4">Injection Attacks</h3>
              <p className="text-omniviz-text-muted mb-4">SQL injection occurs when untrusted data is sent to an interpreter as part of a command. Parameterized queries prevent this.</p>
            </ExplanationCard>
            <div className="mt-8"><SQLInjectionDemo /></div>
          </Section>

          <Section title="XSS Prevention" id="xss">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Cross-Site Scripting</h3>
              <p className="text-omniviz-text-muted mb-4">XSS attacks inject malicious scripts into web pages. Proper escaping and Content Security Policy prevent this.</p>
            </ExplanationCard>
            <div className="mt-8"><XSSDemo /></div>
          </Section>

          <Section title="Authentication Flow" id="auth">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">JWT Authentication</h3>
              <p className="text-omniviz-text-muted mb-4">JSON Web Tokens provide stateless authentication by encoding user data in a signed token.</p>
            </ExplanationCard>
            <div className="mt-8"><AuthDemo /></div>
          </Section>

          <Section title="Network Security" id="network">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Firewalls and Ports</h3>
              <p className="text-omniviz-text-muted mb-4">Firewalls control network traffic by filtering packets based on rules for ports, protocols, and addresses.</p>
            </ExplanationCard>
            <div className="mt-8"><FirewallDemo /></div>
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

function HashingDemo() {
  const [password, setPassword] = useState('mypassword123')
  const [salt, setSalt] = useState('')
  const [hashed, setHashed] = useState('')

  const simpleHash = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16).padStart(8, '0')
  }

  const generateSalt = () => {
    const newSalt = Math.random().toString(36).substring(2, 10)
    setSalt(newSalt)
    return newSalt
  }

  const hashPassword = () => {
    const s = salt || generateSalt()
    const hash = simpleHash(password + s)
    setHashed(hash)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-omniviz-text-muted text-sm">Password</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 font-mono" />
          </div>
          <div>
            <label className="text-omniviz-text-muted text-sm">Salt (random)</label>
            <div className="flex gap-2">
              <input type="text" value={salt} readOnly className="flex-1 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 font-mono" placeholder="Click hash to generate" />
              <button onClick={generateSalt} className="px-3 py-2 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border">New</button>
            </div>
          </div>
          <button onClick={hashPassword} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">Hash Password</button>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <div className="text-omniviz-text-muted text-sm mb-2">Process</div>
            <div className="space-y-2 font-mono text-sm">
              <div className="text-omniviz-text">password = "{password}"</div>
              <div className="text-yellow-400">salt = "{salt || '?'}"</div>
              <div className="text-green-400">hash(password + salt)</div>
            </div>
          </div>
          {hashed && (
            <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg">
              <div className="text-green-400 text-sm mb-1">Hashed Result</div>
              <div className="font-mono text-omniviz-text break-all">{hashed}</div>
            </div>
          )}
          <p className="text-omniviz-text-muted text-sm">
            Real systems use bcrypt/Argon2 with 10,000+ iterations
          </p>
        </div>
      </div>
    </div>
  )
}

function SQLInjectionDemo() {
  const [username, setUsername] = useState('')
  const [vulnerable, setVulnerable] = useState(true)
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)

  const users = [
    { id: 1, username: 'admin', password: 'secret123', role: 'admin' },
    { id: 2, username: 'alice', password: 'pass456', role: 'user' },
    { id: 3, username: 'bob', password: 'hello789', role: 'user' }
  ]

  const execute = () => {
    if (vulnerable) {
      // Vulnerable query - demonstrates the problem
      const q = `SELECT * FROM users WHERE username = '${username}'`
      setQuery(q)

      // Simulate SQL injection
      if (username.includes("' OR '1'='1")) {
        setResult({ success: true, data: users, injected: true })
      } else if (username.includes("'; DROP TABLE")) {
        setResult({ success: false, error: 'Table dropped!', injected: true })
      } else {
        const found = users.filter(u => u.username === username)
        setResult({ success: true, data: found, injected: false })
      }
    } else {
      // Parameterized query - safe
      const q = `SELECT * FROM users WHERE username = ?`
      setQuery(`${q}\n-- Parameter: "${username}"`)
      const found = users.filter(u => u.username === username)
      setResult({ success: true, data: found, injected: false })
    }
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setVulnerable(true)} className={`px-4 py-2 rounded-lg ${vulnerable ? 'bg-red-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>Vulnerable</button>
        <button onClick={() => setVulnerable(false)} className={`px-4 py-2 rounded-lg ${!vulnerable ? 'bg-green-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>Parameterized</button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-omniviz-text-muted text-sm">Username Input</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 font-mono" placeholder="Try: ' OR '1'='1" />
          </div>
          <button onClick={execute} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Execute Query</button>
          <div className="space-y-2">
            <p className="text-omniviz-text-muted text-sm">Try these injections:</p>
            <button onClick={() => setUsername("' OR '1'='1")} className="block text-left text-red-400 text-sm font-mono hover:underline">' OR '1'='1</button>
            <button onClick={() => setUsername("'; DROP TABLE users; --")} className="block text-left text-red-400 text-sm font-mono hover:underline">'; DROP TABLE users; --</button>
          </div>
        </div>
        <div className="space-y-4">
          {query && (
            <div className="p-3 bg-omniviz-bg rounded-lg">
              <div className="text-omniviz-text-muted text-sm mb-1">Generated Query</div>
              <pre className="text-sm font-mono text-omniviz-text whitespace-pre-wrap">{query}</pre>
            </div>
          )}
          {result && (
            <div className={`p-3 rounded-lg ${result.injected ? 'bg-red-500/20 border border-red-500' : 'bg-green-500/20 border border-green-500'}`}>
              <div className={`text-sm mb-1 ${result.injected ? 'text-red-400' : 'text-green-400'}`}>
                {result.injected ? 'INJECTION DETECTED!' : 'Safe Query'}
              </div>
              {result.error ? (
                <div className="text-red-400 font-mono text-sm">{result.error}</div>
              ) : (
                <pre className="text-xs text-omniviz-text overflow-auto">{JSON.stringify(result.data, null, 2)}</pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function XSSDemo() {
  const [input, setInput] = useState('')
  const [escaped, setEscaped] = useState(true)
  const [output, setOutput] = useState('')

  const escapeHtml = (str) => {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
    return str.replace(/[&<>"']/g, m => map[m])
  }

  const submit = () => {
    if (escaped) {
      setOutput(escapeHtml(input))
    } else {
      setOutput(input)
    }
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setEscaped(false)} className={`px-4 py-2 rounded-lg ${!escaped ? 'bg-red-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>Vulnerable (innerHTML)</button>
        <button onClick={() => setEscaped(true)} className={`px-4 py-2 rounded-lg ${escaped ? 'bg-green-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>Safe (escaped)</button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-omniviz-text-muted text-sm">User Input (comment)</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-24 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 font-mono" placeholder="Try: <script>alert('XSS')</script>" />
          </div>
          <button onClick={submit} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Post Comment</button>
          <div className="space-y-2">
            <p className="text-omniviz-text-muted text-sm">Try these XSS payloads:</p>
            <button onClick={() => setInput("<script>alert('XSS')</script>")} className="block text-left text-red-400 text-sm font-mono hover:underline">&lt;script&gt;alert('XSS')&lt;/script&gt;</button>
            <button onClick={() => setInput('<img src="x" onerror="alert(\'XSS\')">')} className="block text-left text-red-400 text-sm font-mono hover:underline">&lt;img onerror="alert()"&gt;</button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <div className="text-omniviz-text-muted text-sm mb-2">Rendered Output</div>
            {escaped ? (
              <div className="text-omniviz-text">{output}</div>
            ) : (
              <div className="text-omniviz-text" dangerouslySetInnerHTML={{ __html: output }} />
            )}
          </div>
          <div className="p-3 bg-omniviz-bg rounded-lg">
            <div className="text-omniviz-text-muted text-sm mb-1">HTML Source</div>
            <pre className="text-xs font-mono text-omniviz-text overflow-auto">{output}</pre>
          </div>
          <p className={`text-sm ${escaped ? 'text-green-400' : 'text-red-400'}`}>
            {escaped ? '✓ HTML entities escaped - safe!' : '⚠ Raw HTML rendered - vulnerable!'}
          </p>
        </div>
      </div>
    </div>
  )
}

function AuthDemo() {
  const [step, setStep] = useState(0)
  const [token, setToken] = useState('')

  const steps = [
    { title: 'Login Request', desc: 'User sends credentials', data: '{ username: "alice", password: "••••" }' },
    { title: 'Validate', desc: 'Server checks credentials', data: 'SELECT * FROM users WHERE username = ?' },
    { title: 'Generate JWT', desc: 'Create signed token', data: 'header.payload.signature' },
    { title: 'Return Token', desc: 'Send token to client', data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
    { title: 'Store Token', desc: 'Client stores in localStorage', data: 'localStorage.setItem("token", jwt)' },
    { title: 'API Request', desc: 'Include token in header', data: 'Authorization: Bearer eyJhbG...' },
    { title: 'Verify', desc: 'Server validates signature', data: 'jwt.verify(token, SECRET_KEY)' }
  ]

  const simulate = () => {
    setStep(0)
    setToken('')
    let i = 0
    const interval = setInterval(() => {
      i++
      setStep(i)
      if (i === 3) setToken('eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWxpY2UifQ.abc123')
      if (i >= steps.length) clearInterval(interval)
    }, 800)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <button onClick={simulate} className="mb-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Simulate Login Flow</button>
      <div className="space-y-3">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: step > i ? 1 : 0.3 }}
            className={`p-3 rounded-lg border ${step > i ? 'bg-green-500/10 border-green-500' : 'bg-omniviz-bg border-omniviz-border'}`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > i ? 'bg-green-500 text-white' : 'bg-omniviz-surface text-omniviz-text-muted'}`}>{i + 1}</span>
              <div className="flex-1">
                <div className="text-omniviz-text font-semibold">{s.title}</div>
                <div className="text-omniviz-text-muted text-sm">{s.desc}</div>
              </div>
              {step > i && <code className="text-xs text-cyan-400 bg-omniviz-bg px-2 py-1 rounded">{s.data.slice(0, 30)}...</code>}
            </div>
          </motion.div>
        ))}
      </div>
      {token && (
        <div className="mt-6 p-4 bg-omniviz-bg rounded-lg">
          <div className="text-omniviz-text-muted text-sm mb-2">JWT Structure</div>
          <div className="font-mono text-sm">
            <span className="text-red-400">eyJhbGciOiJIUzI1NiJ9</span>.<span className="text-purple-400">eyJ1c2VyIjoiYWxpY2UifQ</span>.<span className="text-cyan-400">abc123</span>
          </div>
          <div className="flex gap-4 mt-2 text-xs">
            <span className="text-red-400">Header</span>
            <span className="text-purple-400">Payload</span>
            <span className="text-cyan-400">Signature</span>
          </div>
        </div>
      )}
    </div>
  )
}

function FirewallDemo() {
  const [rules, setRules] = useState([
    { port: 80, protocol: 'TCP', action: 'allow', desc: 'HTTP' },
    { port: 443, protocol: 'TCP', action: 'allow', desc: 'HTTPS' },
    { port: 22, protocol: 'TCP', action: 'deny', desc: 'SSH' },
    { port: 3306, protocol: 'TCP', action: 'deny', desc: 'MySQL' }
  ])
  const [packets, setPackets] = useState([])

  const sendPacket = (port) => {
    const rule = rules.find(r => r.port === port)
    const result = rule?.action === 'allow' ? 'allowed' : 'blocked'
    setPackets(prev => [...prev.slice(-4), { port, result, time: Date.now() }])
  }

  const toggleRule = (port) => {
    setRules(rules.map(r =>
      r.port === port ? { ...r, action: r.action === 'allow' ? 'deny' : 'allow' } : r
    ))
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Firewall Rules</h4>
          <div className="space-y-2">
            {rules.map(rule => (
              <div key={rule.port} className="flex items-center gap-3 p-3 bg-omniviz-bg rounded-lg">
                <button
                  onClick={() => toggleRule(rule.port)}
                  className={`px-3 py-1 rounded text-sm font-bold ${rule.action === 'allow' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                >
                  {rule.action.toUpperCase()}
                </button>
                <span className="text-omniviz-text font-mono">:{rule.port}</span>
                <span className="text-omniviz-text-muted">{rule.protocol}</span>
                <span className="text-omniviz-text-muted ml-auto">{rule.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Test Connections</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {rules.map(r => (
              <button
                key={r.port}
                onClick={() => sendPacket(r.port)}
                className="px-3 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm"
              >
                Connect :{r.port}
              </button>
            ))}
          </div>
          <div className="p-3 bg-omniviz-bg rounded-lg h-40 overflow-y-auto">
            {packets.length === 0 ? (
              <p className="text-omniviz-text-muted text-sm">Click a port to test connection</p>
            ) : (
              packets.map((p, i) => (
                <div key={i} className="text-sm mb-1">
                  <span className="text-omniviz-text-muted">Packet to :{p.port}</span>
                  <span className={p.result === 'allowed' ? 'text-green-400' : 'text-red-400'}> → {p.result}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CybersecurityConcept
