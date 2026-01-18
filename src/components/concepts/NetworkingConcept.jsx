import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function NetworkingConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Computer Networking" color="blue" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Computer Networking</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                How computers communicate across the internet. From packets to protocols.
              </motion.p>
            </div>
          </Section>

          <Section title="OSI Model" id="osi">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">7 Layers of Networking</h3>
              <p className="text-omniviz-text-muted mb-4">The OSI model divides network communication into 7 layers, each with specific responsibilities.</p>
            </ExplanationCard>
            <div className="mt-8"><OSIDemo /></div>
          </Section>

          <Section title="TCP Handshake" id="tcp">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Three-Way Handshake</h3>
              <p className="text-omniviz-text-muted mb-4">TCP establishes reliable connections using SYN, SYN-ACK, and ACK messages.</p>
            </ExplanationCard>
            <div className="mt-8"><TCPDemo /></div>
          </Section>

          <Section title="DNS Resolution" id="dns">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Translating Names to IPs</h3>
              <p className="text-omniviz-text-muted mb-4">DNS converts human-readable domain names into IP addresses through a hierarchical lookup system.</p>
            </ExplanationCard>
            <div className="mt-8"><DNSDemo /></div>
          </Section>

          <Section title="HTTP Request/Response" id="http">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Web Communication Protocol</h3>
              <p className="text-omniviz-text-muted mb-4">HTTP defines how clients request resources and servers respond with data.</p>
            </ExplanationCard>
            <div className="mt-8"><HTTPDemo /></div>
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

function OSIDemo() {
  const [selectedLayer, setSelectedLayer] = useState(null)
  const layers = [
    { num: 7, name: 'Application', protocol: 'HTTP, FTP, SMTP', desc: 'User-facing protocols and interfaces', color: 'red' },
    { num: 6, name: 'Presentation', protocol: 'SSL/TLS, JPEG', desc: 'Data formatting, encryption, compression', color: 'orange' },
    { num: 5, name: 'Session', protocol: 'NetBIOS, RPC', desc: 'Manages sessions between applications', color: 'yellow' },
    { num: 4, name: 'Transport', protocol: 'TCP, UDP', desc: 'End-to-end delivery, flow control', color: 'green' },
    { num: 3, name: 'Network', protocol: 'IP, ICMP', desc: 'Routing and logical addressing', color: 'cyan' },
    { num: 2, name: 'Data Link', protocol: 'Ethernet, WiFi', desc: 'Physical addressing, frames', color: 'blue' },
    { num: 1, name: 'Physical', protocol: 'Cables, Hubs', desc: 'Raw bit transmission', color: 'purple' },
  ]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-1">
          {layers.map(layer => (
            <motion.button
              key={layer.num}
              onClick={() => setSelectedLayer(layer)}
              whileHover={{ scale: 1.02 }}
              className={`w-full p-3 rounded-lg border text-left transition-all ${selectedLayer?.num === layer.num ? `bg-${layer.color}-500/20 border-${layer.color}-500` : 'bg-omniviz-bg border-omniviz-border hover:border-omniviz-accent'}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full bg-${layer.color}-500 flex items-center justify-center text-white font-bold`}>{layer.num}</span>
                <span className="text-omniviz-text font-semibold">{layer.name}</span>
                <span className="text-xs text-omniviz-text-muted ml-auto">{layer.protocol}</span>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="flex-1 p-4 bg-omniviz-bg rounded-lg">
          {selectedLayer ? (
            <div className="text-omniviz-text">
              <h4 className={`text-xl font-bold text-${selectedLayer.color}-400 mb-2`}>Layer {selectedLayer.num}: {selectedLayer.name}</h4>
              <p className="text-omniviz-text-muted mb-4">{selectedLayer.desc}</p>
              <div className="p-3 bg-omniviz-surface rounded-lg">
                <span className="text-omniviz-text-muted text-sm">Protocols: </span>
                <span className="text-cyan-400">{selectedLayer.protocol}</span>
              </div>
            </div>
          ) : (
            <p className="text-omniviz-text-muted text-center">Click a layer to learn more</p>
          )}
        </div>
      </div>
    </div>
  )
}

function TCPDemo() {
  const [step, setStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const steps = [
    { from: 'client', to: 'server', msg: 'SYN', desc: 'Client initiates connection' },
    { from: 'server', to: 'client', msg: 'SYN-ACK', desc: 'Server acknowledges and syncs' },
    { from: 'client', to: 'server', msg: 'ACK', desc: 'Client acknowledges, connection established!' },
  ]

  const run = () => {
    setIsRunning(true)
    setStep(0)
    let i = 0
    const interval = setInterval(() => {
      i++
      setStep(i)
      if (i >= 3) { clearInterval(interval); setIsRunning(false) }
    }, 1000)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex justify-between items-start mb-8">
        <div className="text-center">
          <div className="w-20 h-20 rounded-xl bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center mb-2 mx-auto">
            <span className="text-2xl">💻</span>
          </div>
          <span className="text-omniviz-text">Client</span>
        </div>
        <div className="flex-1 px-4 pt-10 space-y-4">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: step > i ? 1 : 0.3 }} className={`flex items-center gap-2 ${s.from === 'client' ? '' : 'flex-row-reverse'}`}>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${step > i ? 'bg-green-500 text-white' : 'bg-omniviz-bg text-omniviz-text-muted'}`}>{s.msg}</div>
              <div className={`flex-1 h-0.5 ${step > i ? 'bg-green-500' : 'bg-omniviz-border'}`} />
              <span className="text-xs text-omniviz-text-muted">{step > i && s.desc}</span>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <div className="w-20 h-20 rounded-xl bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center mb-2 mx-auto">
            <span className="text-2xl">🖥️</span>
          </div>
          <span className="text-omniviz-text">Server</span>
        </div>
      </div>
      <button onClick={run} disabled={isRunning} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors">
        {isRunning ? 'Connecting...' : 'Start Handshake'}
      </button>
    </div>
  )
}

function DNSDemo() {
  const [domain, setDomain] = useState('www.example.com')
  const [resolving, setResolving] = useState(false)
  const [steps, setSteps] = useState([])

  const resolve = () => {
    setResolving(true)
    setSteps([])
    const dnsSteps = [
      { server: 'Browser Cache', result: 'Miss', delay: 300 },
      { server: 'OS Cache', result: 'Miss', delay: 600 },
      { server: 'Router Cache', result: 'Miss', delay: 900 },
      { server: 'ISP DNS', result: 'Miss', delay: 1200 },
      { server: 'Root DNS (.)', result: 'Referral to .com', delay: 1500 },
      { server: 'TLD DNS (.com)', result: 'Referral to example.com', delay: 1800 },
      { server: 'Authoritative DNS', result: '93.184.216.34', delay: 2100 },
    ]
    dnsSteps.forEach(s => {
      setTimeout(() => setSteps(prev => [...prev, s]), s.delay)
    })
    setTimeout(() => setResolving(false), 2400)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} className="flex-1 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-4 py-2" placeholder="Enter domain..." />
        <button onClick={resolve} disabled={resolving} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors">Resolve</button>
      </div>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 p-3 bg-omniviz-bg rounded-lg">
            <span className="w-40 text-omniviz-text-muted text-sm">{s.server}</span>
            <span className="text-omniviz-text">→</span>
            <span className={`font-mono ${s.result.includes('.') && s.result.split('.').length === 4 ? 'text-green-400' : 'text-yellow-400'}`}>{s.result}</span>
          </motion.div>
        ))}
      </div>
      {steps.length === 7 && (
        <div className="mt-4 p-4 bg-green-500/20 rounded-lg border border-green-500">
          <span className="text-green-400 font-bold">{domain}</span>
          <span className="text-omniviz-text"> → </span>
          <span className="text-green-400 font-mono">93.184.216.34</span>
        </div>
      )}
    </div>
  )
}

function HTTPDemo() {
  const [method, setMethod] = useState('GET')
  const [path, setPath] = useState('/api/users')
  const [response, setResponse] = useState(null)

  const send = () => {
    const responses = {
      'GET': { status: 200, body: '[\n  { "id": 1, "name": "Alice" },\n  { "id": 2, "name": "Bob" }\n]' },
      'POST': { status: 201, body: '{ "id": 3, "name": "New User", "created": true }' },
      'PUT': { status: 200, body: '{ "id": 1, "name": "Updated", "modified": true }' },
      'DELETE': { status: 204, body: '' },
    }
    setResponse(responses[method])
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-orange-400">Request</h4>
          <div className="flex gap-2">
            <select value={method} onChange={(e) => setMethod(e.target.value)} className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2">
              <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
            </select>
            <input type="text" value={path} onChange={(e) => setPath(e.target.value)} className="flex-1 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2" />
          </div>
          <div className="p-3 bg-omniviz-bg rounded-lg font-mono text-sm text-omniviz-text">
            <div><span className={`${method === 'GET' ? 'text-green-400' : method === 'POST' ? 'text-yellow-400' : method === 'PUT' ? 'text-blue-400' : 'text-red-400'}`}>{method}</span> {path} HTTP/1.1</div>
            <div className="text-omniviz-text-muted">Host: api.example.com</div>
            <div className="text-omniviz-text-muted">Content-Type: application/json</div>
          </div>
          <button onClick={send} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">Send Request</button>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-cyan-400">Response</h4>
          {response ? (
            <div className="p-3 bg-omniviz-bg rounded-lg font-mono text-sm">
              <div className={`${response.status < 300 ? 'text-green-400' : 'text-red-400'}`}>HTTP/1.1 {response.status} {response.status === 200 ? 'OK' : response.status === 201 ? 'Created' : response.status === 204 ? 'No Content' : ''}</div>
              <div className="text-omniviz-text-muted">Content-Type: application/json</div>
              <div className="mt-2 text-omniviz-text whitespace-pre">{response.body || '(empty body)'}</div>
            </div>
          ) : (
            <div className="p-3 bg-omniviz-bg rounded-lg text-omniviz-text-muted text-center">Send a request to see response</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NetworkingConcept
