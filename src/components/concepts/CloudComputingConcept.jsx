import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function CloudComputingConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Cloud Computing" color="cyan" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Cloud Computing</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                On-demand delivery of computing resources over the internet.
              </motion.p>
            </div>
          </Section>

          <Section title="Service Models" id="models">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">IaaS, PaaS, SaaS</h3>
              <p className="text-omniviz-text-muted mb-4">Cloud services are offered at different abstraction levels, from raw infrastructure to ready-to-use software.</p>
            </ExplanationCard>
            <div className="mt-8"><ServiceModelsDemo /></div>
          </Section>

          <Section title="Auto Scaling" id="scaling">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Horizontal Scaling</h3>
              <p className="text-omniviz-text-muted mb-4">Auto scaling automatically adjusts compute resources based on demand to maintain performance and minimize costs.</p>
            </ExplanationCard>
            <div className="mt-8"><AutoScalingDemo /></div>
          </Section>

          <Section title="Load Balancing" id="lb">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Traffic Distribution</h3>
              <p className="text-omniviz-text-muted mb-4">Load balancers distribute incoming requests across multiple servers to ensure no single server becomes overwhelmed.</p>
            </ExplanationCard>
            <div className="mt-8"><LoadBalancerDemo /></div>
          </Section>

          <Section title="Containers" id="containers">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Docker & Kubernetes</h3>
              <p className="text-omniviz-text-muted mb-4">Containers package applications with their dependencies for consistent deployment across environments.</p>
            </ExplanationCard>
            <div className="mt-8"><ContainerDemo /></div>
          </Section>

          <Section title="CDN" id="cdn">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Content Delivery Network</h3>
              <p className="text-omniviz-text-muted mb-4">CDNs cache content at edge locations worldwide, reducing latency by serving users from nearby servers.</p>
            </ExplanationCard>
            <div className="mt-8"><CDNDemo /></div>
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

function ServiceModelsDemo() {
  const [selected, setSelected] = useState('saas')

  const models = {
    saas: {
      name: 'SaaS',
      full: 'Software as a Service',
      examples: ['Gmail', 'Salesforce', 'Slack'],
      you: ['Use the app'],
      provider: ['Application', 'Data', 'Runtime', 'Middleware', 'OS', 'Virtualization', 'Servers', 'Storage', 'Networking'],
      color: 'green'
    },
    paas: {
      name: 'PaaS',
      full: 'Platform as a Service',
      examples: ['Heroku', 'Google App Engine', 'Vercel'],
      you: ['Application', 'Data'],
      provider: ['Runtime', 'Middleware', 'OS', 'Virtualization', 'Servers', 'Storage', 'Networking'],
      color: 'purple'
    },
    iaas: {
      name: 'IaaS',
      full: 'Infrastructure as a Service',
      examples: ['AWS EC2', 'Azure VMs', 'Google Compute'],
      you: ['Application', 'Data', 'Runtime', 'Middleware', 'OS'],
      provider: ['Virtualization', 'Servers', 'Storage', 'Networking'],
      color: 'orange'
    }
  }

  const m = models[selected]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-2 mb-6">
        {Object.entries(models).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-4 py-2 rounded-lg font-semibold ${selected === key ? `bg-${val.color}-500 text-white` : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
          >
            {val.name}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className={`text-${m.color}-400 font-bold text-lg mb-2`}>{m.full}</h4>
          <p className="text-omniviz-text-muted text-sm mb-4">Examples: {m.examples.join(', ')}</p>
          <div className="space-y-1">
            {['Application', 'Data', 'Runtime', 'Middleware', 'OS', 'Virtualization', 'Servers', 'Storage', 'Networking'].map(layer => {
              const isYou = m.you.includes(layer)
              return (
                <div key={layer} className={`px-3 py-2 rounded text-sm font-medium ${isYou ? 'bg-blue-500 text-white' : 'bg-gray-500/50 text-omniviz-text-muted'}`}>
                  {layer} <span className="float-right">{isYou ? '(You)' : '(Provider)'}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex items-center">
          <div className="p-4 bg-omniviz-bg rounded-lg w-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-2xl">👤</div>
              <div className="text-omniviz-text">You manage <span className="text-blue-400 font-bold">{m.you.length}</span> layers</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center text-2xl">☁️</div>
              <div className="text-omniviz-text">Provider manages <span className="text-gray-400 font-bold">{m.provider.length}</span> layers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AutoScalingDemo() {
  const [load, setLoad] = useState(30)
  const [instances, setInstances] = useState([{ id: 1, cpu: 30 }])
  const [autoScale, setAutoScale] = useState(true)

  useEffect(() => {
    if (!autoScale) return

    const avgCpu = load / instances.length

    if (avgCpu > 70 && instances.length < 5) {
      setInstances(prev => [...prev, { id: Date.now(), cpu: load / (prev.length + 1) }])
    } else if (avgCpu < 30 && instances.length > 1) {
      setInstances(prev => prev.slice(0, -1))
    }
  }, [load, autoScale])

  useEffect(() => {
    setInstances(prev => prev.map(inst => ({ ...inst, cpu: Math.min(100, load / instances.length) })))
  }, [load, instances.length])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex items-center gap-4 mb-6">
        <label className="text-omniviz-text">Incoming Load: {load}%</label>
        <input type="range" min="10" max="300" value={load} onChange={(e) => setLoad(Number(e.target.value))} className="flex-1" />
        <button onClick={() => setAutoScale(!autoScale)} className={`px-4 py-2 rounded-lg ${autoScale ? 'bg-green-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>
          Auto Scale: {autoScale ? 'ON' : 'OFF'}
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4 mb-6">
        {instances.map(inst => (
          <motion.div
            key={inst.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border text-center"
          >
            <div className="text-2xl mb-2">🖥️</div>
            <div className="text-omniviz-text text-sm font-bold">Instance</div>
            <div className={`text-sm ${inst.cpu > 70 ? 'text-red-400' : inst.cpu > 50 ? 'text-yellow-400' : 'text-green-400'}`}>
              CPU: {Math.round(inst.cpu)}%
            </div>
            <div className="mt-2 h-2 bg-omniviz-surface rounded-full overflow-hidden">
              <div className={`h-full ${inst.cpu > 70 ? 'bg-red-500' : inst.cpu > 50 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${inst.cpu}%` }} />
            </div>
          </motion.div>
        ))}
        {Array(5 - instances.length).fill(null).map((_, i) => (
          <div key={i} className="p-4 bg-omniviz-bg/50 rounded-lg border border-dashed border-omniviz-border text-center opacity-30">
            <div className="text-2xl mb-2">➕</div>
            <div className="text-omniviz-text-muted text-sm">Standby</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-omniviz-text">Active Instances: <span className="text-green-400 font-bold">{instances.length}</span></span>
        <span className="text-omniviz-text">Avg CPU: <span className={load / instances.length > 70 ? 'text-red-400' : 'text-green-400'}>{Math.round(load / instances.length)}%</span></span>
        <span className="text-omniviz-text-muted">Scale up at 70% | Scale down at 30%</span>
      </div>
    </div>
  )
}

function LoadBalancerDemo() {
  const [algorithm, setAlgorithm] = useState('round-robin')
  const [servers, setServers] = useState([
    { id: 1, requests: 0, health: 'healthy' },
    { id: 2, requests: 0, health: 'healthy' },
    { id: 3, requests: 0, health: 'healthy' }
  ])
  const [lastServer, setLastServer] = useState(0)

  const sendRequest = () => {
    let targetIdx
    const healthyServers = servers.map((s, i) => s.health === 'healthy' ? i : -1).filter(i => i !== -1)

    if (healthyServers.length === 0) return

    if (algorithm === 'round-robin') {
      const nextIdx = (lastServer + 1) % servers.length
      targetIdx = servers[nextIdx].health === 'healthy' ? nextIdx : healthyServers[0]
      setLastServer(targetIdx)
    } else if (algorithm === 'least-conn') {
      targetIdx = healthyServers.reduce((min, i) => servers[i].requests < servers[min].requests ? i : min, healthyServers[0])
    } else {
      targetIdx = healthyServers[Math.floor(Math.random() * healthyServers.length)]
    }

    setServers(prev => prev.map((s, i) => i === targetIdx ? { ...s, requests: s.requests + 1 } : s))
  }

  const toggleHealth = (id) => {
    setServers(prev => prev.map(s => s.id === id ? { ...s, health: s.health === 'healthy' ? 'unhealthy' : 'healthy' } : s))
  }

  const reset = () => {
    setServers(prev => prev.map(s => ({ ...s, requests: 0 })))
    setLastServer(0)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2">
          <option value="round-robin">Round Robin</option>
          <option value="least-conn">Least Connections</option>
          <option value="random">Random</option>
        </select>
        <button onClick={sendRequest} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">Send Request</button>
        <button onClick={() => { for (let i = 0; i < 10; i++) setTimeout(sendRequest, i * 100) }} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Send 10x</button>
        <button onClick={reset} className="px-4 py-2 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border">Reset</button>
      </div>
      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl mb-2">🌐</div>
          <span className="text-omniviz-text text-sm">Load Balancer</span>
        </div>
        <div className="flex flex-col gap-2">
          {servers.map((_, i) => (
            <div key={i} className="w-20 h-0.5 bg-purple-500" />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {servers.map(server => (
            <div key={server.id} className="flex items-center gap-4">
              <div
                onClick={() => toggleHealth(server.id)}
                className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl cursor-pointer transition-colors ${server.health === 'healthy' ? 'bg-green-500/20 border-2 border-green-500' : 'bg-red-500/20 border-2 border-red-500'}`}
              >
                🖥️
              </div>
              <div>
                <div className="text-omniviz-text text-sm">Server {server.id}</div>
                <div className="text-omniviz-text-muted text-xs">{server.requests} requests</div>
                <div className={`text-xs ${server.health === 'healthy' ? 'text-green-400' : 'text-red-400'}`}>{server.health}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-omniviz-text-muted text-sm text-center">Click servers to toggle health status</p>
    </div>
  )
}

function ContainerDemo() {
  const [containers, setContainers] = useState([
    { id: 1, name: 'web-app', image: 'nginx:latest', status: 'running', port: 80 },
    { id: 2, name: 'api-server', image: 'node:18', status: 'running', port: 3000 },
    { id: 3, name: 'database', image: 'postgres:15', status: 'running', port: 5432 }
  ])

  const toggleContainer = (id) => {
    setContainers(prev => prev.map(c =>
      c.id === id ? { ...c, status: c.status === 'running' ? 'stopped' : 'running' } : c
    ))
  }

  const addContainer = () => {
    const images = ['redis:7', 'mongo:6', 'mysql:8', 'rabbitmq:3']
    const newContainer = {
      id: Date.now(),
      name: `container-${containers.length + 1}`,
      image: images[Math.floor(Math.random() * images.length)],
      status: 'running',
      port: 8000 + containers.length
    }
    setContainers([...containers, newContainer])
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <button onClick={addContainer} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">+ Deploy Container</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {containers.map(container => (
          <motion.div
            key={container.id}
            layout
            className={`p-4 rounded-lg border ${container.status === 'running' ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📦</span>
                <span className="text-omniviz-text font-semibold">{container.name}</span>
              </div>
              <button
                onClick={() => toggleContainer(container.id)}
                className={`px-3 py-1 rounded text-sm ${container.status === 'running' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
              >
                {container.status === 'running' ? 'Stop' : 'Start'}
              </button>
            </div>
            <div className="space-y-1 text-sm font-mono">
              <div><span className="text-omniviz-text-muted">Image:</span> <span className="text-cyan-400">{container.image}</span></div>
              <div><span className="text-omniviz-text-muted">Port:</span> <span className="text-omniviz-text">{container.port}</span></div>
              <div><span className="text-omniviz-text-muted">Status:</span> <span className={container.status === 'running' ? 'text-green-400' : 'text-red-400'}>{container.status}</span></div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-omniviz-bg rounded-lg font-mono text-sm">
        <div className="text-omniviz-text-muted mb-2"># Docker commands</div>
        <div className="text-green-400">$ docker ps</div>
        <div className="text-omniviz-text">CONTAINER ID  IMAGE         STATUS</div>
        {containers.filter(c => c.status === 'running').map(c => (
          <div key={c.id} className="text-omniviz-text-muted">{c.id.toString().slice(-8)}     {c.image.padEnd(12)} Up</div>
        ))}
      </div>
    </div>
  )
}

function CDNDemo() {
  const [userLocation, setUserLocation] = useState('new-york')
  const [cacheHit, setCacheHit] = useState(null)

  const locations = {
    'new-york': { name: 'New York', x: 25, y: 40 },
    'london': { name: 'London', x: 45, y: 30 },
    'tokyo': { name: 'Tokyo', x: 80, y: 40 },
    'sydney': { name: 'Sydney', x: 85, y: 75 }
  }

  const edges = {
    'new-york': { latency: 20, cached: true },
    'london': { latency: 15, cached: true },
    'tokyo': { latency: 25, cached: false },
    'sydney': { latency: 30, cached: true }
  }

  const origin = { x: 50, y: 55, name: 'Origin (US-West)' }

  const request = () => {
    const edge = edges[userLocation]
    setCacheHit(edge.cached)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <select value={userLocation} onChange={(e) => { setUserLocation(e.target.value); setCacheHit(null) }} className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2">
          {Object.entries(locations).map(([key, val]) => (
            <option key={key} value={key}>{val.name}</option>
          ))}
        </select>
        <button onClick={request} className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">Request Content</button>
      </div>
      <div className="relative bg-omniviz-bg rounded-lg h-64 overflow-hidden">
        {/* World map simplified */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-blue-500/20 to-green-500/20" />

        {/* Origin server */}
        <div className="absolute w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs" style={{ left: `${origin.x}%`, top: `${origin.y}%`, transform: 'translate(-50%, -50%)' }}>
          🏠
        </div>

        {/* Edge locations */}
        {Object.entries(locations).map(([key, loc]) => (
          <div key={key}>
            <div
              className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-xs cursor-pointer transition-transform ${userLocation === key ? 'bg-cyan-500 scale-125' : 'bg-gray-500'}`}
              style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              📍
            </div>
            {userLocation === key && cacheHit !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`absolute px-2 py-1 rounded text-xs ${cacheHit ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
                style={{ left: `${loc.x}%`, top: `${loc.y - 10}%`, transform: 'translate(-50%, -50%)' }}
              >
                {cacheHit ? 'Cache Hit!' : 'Cache Miss'}
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-2">Edge Location: {locations[userLocation].name}</h4>
          <div className="text-sm text-omniviz-text-muted">
            <div>Latency: <span className="text-green-400">{edges[userLocation].latency}ms</span></div>
            <div>Cache: <span className={edges[userLocation].cached ? 'text-green-400' : 'text-yellow-400'}>{edges[userLocation].cached ? 'Warm' : 'Cold'}</span></div>
          </div>
        </div>
        {cacheHit !== null && (
          <div className={`p-3 rounded-lg ${cacheHit ? 'bg-green-500/20 border border-green-500' : 'bg-yellow-500/20 border border-yellow-500'}`}>
            <h4 className={`font-semibold mb-2 ${cacheHit ? 'text-green-400' : 'text-yellow-400'}`}>
              {cacheHit ? 'Served from Edge' : 'Fetched from Origin'}
            </h4>
            <div className="text-sm text-omniviz-text-muted">
              {cacheHit ? 'Content delivered from nearest edge server' : 'Content fetched from origin, now cached at edge'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CloudComputingConcept
