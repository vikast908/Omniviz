import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

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

function SoftwareArchitectureConcept() {
  return (
    <div className="min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Software Architecture" color="indigo" />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <Section id="intro">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Software Architecture
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-omniviz-text-muted max-w-3xl mx-auto"
            >
              Understanding how modern applications are built - from the browser to the database
              and everything in between.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-indigo-400 mb-4">What is Software Architecture?</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  Software architecture is the <span className="text-indigo-400 font-semibold">blueprint</span> for
                  how a software system is organized. It defines how different components interact, where data flows,
                  and how the system scales.
                </p>
                <p>
                  Just like a building needs architectural plans before construction, software needs a well-thought-out
                  architecture to be maintainable, scalable, and reliable.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-indigo-400 font-semibold mb-2">Key Concerns:</div>
                  <ul className="text-sm space-y-1">
                    <li>• <span className="text-blue-400">Scalability:</span> Handle growth in users/data</li>
                    <li>• <span className="text-green-400">Reliability:</span> Work correctly under stress</li>
                    <li>• <span className="text-yellow-400">Maintainability:</span> Easy to update and fix</li>
                    <li>• <span className="text-purple-400">Security:</span> Protect data and users</li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">The Main Layers</h3>
              <div className="space-y-3">
                {[
                  { layer: 'Frontend (Client)', desc: 'What users see and interact with', icon: '🖥️', color: 'blue' },
                  { layer: 'Backend (Server)', desc: 'Business logic and data processing', icon: '⚙️', color: 'green' },
                  { layer: 'Database', desc: 'Persistent data storage', icon: '🗄️', color: 'yellow' },
                  { layer: 'Network', desc: 'Communication infrastructure', icon: '🌐', color: 'purple' },
                  { layer: 'Infrastructure', desc: 'Servers, containers, cloud', icon: '☁️', color: 'cyan' },
                ].map((item, i) => (
                  <motion.div
                    key={item.layer}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-omniviz-bg rounded-lg border border-omniviz-border"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className={`text-sm font-semibold text-${item.color}-400`}>{item.layer}</div>
                      <div className="text-xs text-omniviz-text-muted">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ExplanationCard>
          </div>
        </Section>

        {/* The Big Picture - Request Flow */}
        <Section title="The Big Picture: How a Request Flows" id="request-flow">
          <ExplanationCard>
            <p className="text-omniviz-text-muted mb-6">
              When you click a button or load a webpage, your request travels through many layers.
              Click "Send Request" to see the journey of a typical web request.
            </p>
            <RequestFlowDemo />
          </ExplanationCard>
        </Section>

        {/* Frontend Section */}
        <Section title="Frontend: The User Interface" id="frontend">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">What is the Frontend?</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  The <span className="text-blue-400 font-semibold">frontend</span> (or client-side) is everything
                  the user sees and interacts with. It runs in the user's browser and handles the visual presentation
                  and user interactions.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-blue-400 font-semibold mb-2">Core Technologies:</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-omniviz-surface rounded">
                      <div className="text-orange-400 font-bold">HTML</div>
                      <div className="text-xs">Structure</div>
                    </div>
                    <div className="text-center p-2 bg-omniviz-surface rounded">
                      <div className="text-blue-400 font-bold">CSS</div>
                      <div className="text-xs">Styling</div>
                    </div>
                    <div className="text-center p-2 bg-omniviz-surface rounded">
                      <div className="text-yellow-400 font-bold">JavaScript</div>
                      <div className="text-xs">Behavior</div>
                    </div>
                  </div>
                </div>
                <p>
                  Modern frontends often use <span className="text-cyan-400 font-semibold">frameworks</span> like
                  React, Vue, or Angular to build complex, interactive user interfaces efficiently.
                </p>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Browser Components</h3>
              <BrowserDemo />
            </ExplanationCard>
          </div>

          <ExplanationCard>
            <h3 className="text-lg font-semibold text-purple-400 mb-4">SPA vs MPA</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-omniviz-bg rounded-lg border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-2">Single Page Application (SPA)</h4>
                <p className="text-sm text-omniviz-text-muted mb-3">
                  Loads once, then dynamically updates content without full page reloads.
                  Feels fast and app-like.
                </p>
                <div className="text-xs space-y-1">
                  <div className="text-green-400">+ Fast interactions</div>
                  <div className="text-green-400">+ Smooth user experience</div>
                  <div className="text-red-400">- Initial load can be slow</div>
                  <div className="text-red-400">- SEO challenges</div>
                </div>
                <div className="mt-2 text-xs text-omniviz-text-muted">
                  Examples: Gmail, Facebook, Twitter
                </div>
              </div>
              <div className="p-4 bg-omniviz-bg rounded-lg border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Multi Page Application (MPA)</h4>
                <p className="text-sm text-omniviz-text-muted mb-3">
                  Each page is a new HTML document from the server. Traditional web approach.
                </p>
                <div className="text-xs space-y-1">
                  <div className="text-green-400">+ Better SEO</div>
                  <div className="text-green-400">+ Simpler architecture</div>
                  <div className="text-red-400">- Full page reloads</div>
                  <div className="text-red-400">- Slower navigation</div>
                </div>
                <div className="mt-2 text-xs text-omniviz-text-muted">
                  Examples: Wikipedia, Amazon, News sites
                </div>
              </div>
            </div>
          </ExplanationCard>
        </Section>

        {/* Backend Section */}
        <Section title="Backend: The Server Side" id="backend">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">What is the Backend?</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  The <span className="text-green-400 font-semibold">backend</span> (or server-side) handles
                  the business logic, data processing, and communicates with databases. Users never see it directly.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-green-400 font-semibold mb-2">Responsibilities:</div>
                  <ul className="text-sm space-y-1">
                    <li>• Process and validate requests</li>
                    <li>• Execute business logic</li>
                    <li>• Communicate with databases</li>
                    <li>• Handle authentication/authorization</li>
                    <li>• Send responses to frontend</li>
                  </ul>
                </div>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-purple-400 font-semibold mb-2">Popular Languages:</div>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Python', 'Java', 'Go', 'Ruby', 'C#', 'PHP', 'Rust'].map(lang => (
                      <span key={lang} className="px-2 py-1 bg-omniviz-surface border border-omniviz-border rounded text-xs text-omniviz-text">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Server Components</h3>
              <ServerComponentsDemo />
            </ExplanationCard>
          </div>

          <ExplanationCard>
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">APIs: The Communication Bridge</h3>
            <APIDemo />
          </ExplanationCard>
        </Section>

        {/* Database Section */}
        <Section title="Databases: Data Storage" id="databases">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">What is a Database?</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  A <span className="text-yellow-400 font-semibold">database</span> is organized storage for
                  your application's data. It persists information so it survives server restarts and can be
                  queried efficiently.
                </p>
                <div className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-yellow-400 font-semibold mb-2">Why Not Just Files?</div>
                  <ul className="text-sm space-y-1">
                    <li>• <span className="text-green-400">Concurrent access</span> - Multiple users at once</li>
                    <li>• <span className="text-blue-400">Querying</span> - Fast searches and filters</li>
                    <li>• <span className="text-purple-400">Transactions</span> - Atomic operations</li>
                    <li>• <span className="text-cyan-400">Integrity</span> - Data validation rules</li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">SQL vs NoSQL</h3>
              <DatabaseComparisonDemo />
            </ExplanationCard>
          </div>
        </Section>

        {/* Networking Section */}
        <Section title="Networking: The Internet Plumbing" id="networking">
          <ExplanationCard>
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">How Data Travels</h3>
              <p className="text-omniviz-text-muted">
                When you type a URL or click a link, your request travels through multiple network components
                before reaching the server. Understanding these components helps debug issues and optimize performance.
              </p>
            </div>
            <NetworkingDemo />
          </ExplanationCard>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">HTTP Protocol</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  <span className="text-blue-400 font-semibold">HTTP</span> (HyperText Transfer Protocol) is
                  how browsers and servers communicate. It's a request-response protocol.
                </p>
                <div className="space-y-2">
                  {[
                    { method: 'GET', desc: 'Retrieve data', color: 'green' },
                    { method: 'POST', desc: 'Create new data', color: 'blue' },
                    { method: 'PUT', desc: 'Update existing data', color: 'yellow' },
                    { method: 'DELETE', desc: 'Remove data', color: 'red' },
                  ].map(m => (
                    <div key={m.method} className="flex items-center gap-3 p-2 bg-omniviz-bg rounded">
                      <span className={`px-2 py-1 bg-${m.color}-500/20 text-${m.color}-400 rounded text-xs font-mono font-bold`}>
                        {m.method}
                      </span>
                      <span className="text-sm text-omniviz-text-muted">{m.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Status Codes</h3>
              <div className="space-y-2">
                {[
                  { code: '2xx', name: 'Success', examples: '200 OK, 201 Created', color: 'green' },
                  { code: '3xx', name: 'Redirect', examples: '301 Moved, 304 Not Modified', color: 'blue' },
                  { code: '4xx', name: 'Client Error', examples: '400 Bad Request, 404 Not Found', color: 'yellow' },
                  { code: '5xx', name: 'Server Error', examples: '500 Internal Error, 503 Unavailable', color: 'red' },
                ].map(s => (
                  <div key={s.code} className={`p-3 bg-${s.color}-500/10 rounded-lg border border-${s.color}-500/30`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-${s.color}-400 font-mono font-bold`}>{s.code}</span>
                      <span className="text-sm font-semibold text-omniviz-text">{s.name}</span>
                    </div>
                    <div className="text-xs text-omniviz-text-muted">{s.examples}</div>
                  </div>
                ))}
              </div>
            </ExplanationCard>
          </div>
        </Section>

        {/* Infrastructure Section */}
        <Section title="Infrastructure: Where Code Lives" id="infrastructure">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Servers & Hosting</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  Your application needs somewhere to run. <span className="text-cyan-400 font-semibold">Servers</span> are
                  computers that host your code and respond to requests 24/7.
                </p>
                <div className="space-y-3">
                  {[
                    { type: 'Physical Server', desc: 'Dedicated hardware you own/rent', icon: '🖥️' },
                    { type: 'Virtual Machine (VM)', desc: 'Simulated server on shared hardware', icon: '📦' },
                    { type: 'Container (Docker)', desc: 'Lightweight, isolated environment', icon: '🐳' },
                    { type: 'Serverless', desc: 'Run code without managing servers', icon: '⚡' },
                  ].map(s => (
                    <div key={s.type} className="flex items-center gap-3 p-3 bg-omniviz-bg rounded-lg border border-omniviz-border">
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-omniviz-text">{s.type}</div>
                        <div className="text-xs text-omniviz-text-muted">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Cloud Providers</h3>
              <div className="space-y-4 text-omniviz-text-muted">
                <p>
                  Instead of buying servers, most companies use <span className="text-orange-400 font-semibold">cloud providers</span> who
                  manage the infrastructure.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'AWS', color: 'orange' },
                    { name: 'Google Cloud', color: 'blue' },
                    { name: 'Azure', color: 'cyan' },
                    { name: 'Vercel', color: 'white' },
                    { name: 'Heroku', color: 'purple' },
                    { name: 'DigitalOcean', color: 'blue' },
                  ].map(p => (
                    <div key={p.name} className="p-3 bg-omniviz-bg rounded-lg border border-omniviz-border text-center">
                      <div className={`text-sm font-semibold text-${p.color}-400`}>{p.name}</div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-omniviz-bg rounded-lg border border-omniviz-border">
                  <div className="text-sm text-orange-400 font-semibold mb-1">Benefits of Cloud:</div>
                  <ul className="text-xs space-y-1">
                    <li>• Scale up/down instantly</li>
                    <li>• Pay only for what you use</li>
                    <li>• Global availability</li>
                    <li>• Managed services (databases, queues, etc.)</li>
                  </ul>
                </div>
              </div>
            </ExplanationCard>
          </div>
        </Section>

        {/* Architecture Patterns */}
        <Section title="Architecture Patterns" id="patterns">
          <ExplanationCard>
            <h3 className="text-lg font-semibold text-pink-400 mb-4">Monolith vs Microservices</h3>
            <ArchitecturePatternDemo />
          </ExplanationCard>
        </Section>

        {/* Security Section */}
        <Section title="Security: Protecting Your App" id="security">
          <div className="grid md:grid-cols-2 gap-8">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-red-400 mb-4">Common Threats</h3>
              <div className="space-y-3">
                {[
                  { threat: 'SQL Injection', desc: 'Malicious SQL in user input', prevention: 'Parameterized queries' },
                  { threat: 'XSS', desc: 'Injecting scripts into pages', prevention: 'Escape user content' },
                  { threat: 'CSRF', desc: 'Forged requests from other sites', prevention: 'CSRF tokens' },
                  { threat: 'DDoS', desc: 'Overwhelming with traffic', prevention: 'Rate limiting, CDN' },
                ].map(t => (
                  <div key={t.threat} className="p-3 bg-omniviz-bg rounded-lg border border-omniviz-border">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-red-400">{t.threat}</span>
                    </div>
                    <p className="text-xs text-omniviz-text-muted mb-1">{t.desc}</p>
                    <p className="text-xs text-green-400">Fix: {t.prevention}</p>
                  </div>
                ))}
              </div>
            </ExplanationCard>

            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Security Layers</h3>
              <SecurityLayersDemo />
            </ExplanationCard>
          </div>
        </Section>

        {/* Summary */}
        <Section title="Putting It All Together" id="summary">
          <ExplanationCard>
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">The Full Stack</h3>
              <p className="text-omniviz-text-muted">
                Modern web applications are complex systems with many moving parts working together.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Frontend', icon: '🖥️', desc: 'User interface' },
                { label: 'Backend', icon: '⚙️', desc: 'Business logic' },
                { label: 'Database', icon: '🗄️', desc: 'Data storage' },
                { label: 'Network', icon: '🌐', desc: 'Communication' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-omniviz-bg p-4 rounded-xl border border-omniviz-border text-center"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-semibold text-omniviz-text">{item.label}</div>
                  <div className="text-xs text-omniviz-text-muted">{item.desc}</div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/30">
              <p className="text-omniviz-text-muted text-center">
                <span className="text-indigo-400 font-semibold">Key Insight:</span> Great software architecture
                isn't about using the latest technology - it's about making the right trade-offs for your
                specific needs. Start simple, measure, then optimize.
              </p>
            </div>
          </ExplanationCard>
        </Section>
      </div>
    </div>
  )
}

// Request Flow Demo
function RequestFlowDemo() {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const steps = [
    { id: 'user', label: 'User', desc: 'User clicks "Submit Order"', x: 50, y: 50 },
    { id: 'browser', label: 'Browser', desc: 'Browser creates HTTP request', x: 150, y: 50 },
    { id: 'dns', label: 'DNS', desc: 'DNS resolves domain to IP', x: 250, y: 50 },
    { id: 'cdn', label: 'CDN', desc: 'CDN checks cache (static assets)', x: 350, y: 50 },
    { id: 'loadbalancer', label: 'Load Balancer', desc: 'Distributes to healthy server', x: 450, y: 50 },
    { id: 'server', label: 'Server', desc: 'Processes business logic', x: 550, y: 50 },
    { id: 'database', label: 'Database', desc: 'Stores/retrieves data', x: 650, y: 50 },
    { id: 'response', label: 'Response', desc: 'Response travels back to user', x: 350, y: 150 },
  ]

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setStep(s => {
        if (s >= steps.length - 1) {
          setIsPlaying(false)
          return s
        }
        return s + 1
      })
    }, 1200)
    return () => clearInterval(timer)
  }, [isPlaying])

  const startDemo = () => {
    setStep(0)
    setIsPlaying(true)
  }

  return (
    <div>
      <div className="bg-omniviz-bg rounded-xl p-6 mb-4 overflow-x-auto">
        <svg width="100%" height="200" viewBox="0 0 750 200" className="min-w-[700px]">
          {/* Connection lines */}
          <line x1="80" y1="50" x2="670" y2="50" stroke="#374151" strokeWidth="2" strokeDasharray="4" />
          <line x1="350" y1="80" x2="350" y2="150" stroke="#374151" strokeWidth="2" strokeDasharray="4" />
          <line x1="350" y1="150" x2="80" y2="150" stroke="#374151" strokeWidth="2" strokeDasharray="4" />

          {/* Nodes */}
          {steps.slice(0, -1).map((s, i) => (
            <g key={s.id}>
              <motion.circle
                cx={s.x}
                cy={s.y}
                r={25}
                fill={step >= i ? '#6366f1' : '#1e1e2e'}
                stroke={step >= i ? '#818cf8' : '#374151'}
                strokeWidth="2"
                animate={step === i ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              />
              <text x={s.x} y={s.y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                {i + 1}
              </text>
              <text x={s.x} y={s.y + 45} textAnchor="middle" fill="#9ca3af" fontSize="10">
                {s.label}
              </text>
            </g>
          ))}

          {/* Response node */}
          <motion.circle
            cx={350}
            cy={150}
            r={25}
            fill={step >= 7 ? '#22c55e' : '#1e1e2e'}
            stroke={step >= 7 ? '#4ade80' : '#374151'}
            strokeWidth="2"
          />
          <text x={350} y={154} textAnchor="middle" fill="white" fontSize="10">✓</text>
          <text x={350} y={185} textAnchor="middle" fill="#9ca3af" fontSize="10">Response</text>

          {/* Animated packet */}
          {isPlaying && step < steps.length - 1 && (
            <motion.circle
              r={8}
              fill="#f472b6"
              initial={{ cx: steps[step].x, cy: steps[step].y }}
              animate={{ cx: steps[Math.min(step + 1, steps.length - 1)].x, cy: steps[Math.min(step + 1, steps.length - 1)].y }}
              transition={{ duration: 1 }}
            />
          )}
        </svg>
      </div>

      {/* Step description */}
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-omniviz-bg rounded-lg border border-omniviz-border flex-1 mr-4">
          <div className="text-sm text-indigo-400 font-semibold">
            Step {step + 1}: {steps[step]?.label}
          </div>
          <div className="text-xs text-omniviz-text-muted">{steps[step]?.desc}</div>
        </div>
        <button
          onClick={startDemo}
          disabled={isPlaying}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg font-semibold"
        >
          {isPlaying ? 'Running...' : 'Send Request'}
        </button>
      </div>

      {/* Step indicators */}
      <div className="flex gap-1">
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={`flex-1 h-1 rounded ${step >= i ? 'bg-indigo-500' : 'bg-omniviz-border'}`}
          />
        ))}
      </div>
    </div>
  )
}

// Browser Demo
function BrowserDemo() {
  return (
    <div className="bg-omniviz-bg rounded-lg border border-omniviz-border overflow-hidden">
      {/* Browser chrome */}
      <div className="bg-omniviz-surface px-3 py-2 border-b border-omniviz-border flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 bg-omniviz-bg rounded px-3 py-1 text-xs text-omniviz-text-muted">
          https://example.com
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="text-xs text-omniviz-text-muted mb-2">Browser processes your code:</div>
        {[
          { component: 'DOM', desc: 'Document Object Model - HTML structure', color: 'orange' },
          { component: 'CSSOM', desc: 'CSS Object Model - Styles', color: 'blue' },
          { component: 'Render Tree', desc: 'Combined visual representation', color: 'green' },
          { component: 'JavaScript Engine', desc: 'V8, SpiderMonkey - Executes JS', color: 'yellow' },
        ].map((c, i) => (
          <motion.div
            key={c.component}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2"
          >
            <div className={`w-2 h-2 rounded-full bg-${c.color}-400`} />
            <div>
              <span className={`text-${c.color}-400 font-semibold text-xs`}>{c.component}</span>
              <span className="text-omniviz-text-muted text-xs ml-2">{c.desc}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Server Components Demo
function ServerComponentsDemo() {
  return (
    <div className="space-y-3">
      {[
        { name: 'Web Server', desc: 'Handles HTTP requests (Nginx, Apache)', color: 'blue' },
        { name: 'Application Server', desc: 'Runs your code (Node, Python, Java)', color: 'green' },
        { name: 'Cache', desc: 'Fast temporary storage (Redis, Memcached)', color: 'red' },
        { name: 'Message Queue', desc: 'Async task processing (RabbitMQ, Kafka)', color: 'purple' },
        { name: 'Background Workers', desc: 'Process jobs off the main thread', color: 'orange' },
      ].map((comp, i) => (
        <motion.div
          key={comp.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`p-3 bg-omniviz-bg rounded-lg border border-${comp.color}-500/30`}
        >
          <div className={`text-sm font-semibold text-${comp.color}-400`}>{comp.name}</div>
          <div className="text-xs text-omniviz-text-muted">{comp.desc}</div>
        </motion.div>
      ))}
    </div>
  )
}

// API Demo
function APIDemo() {
  const [selectedType, setSelectedType] = useState('rest')

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {[
          { id: 'rest', label: 'REST API' },
          { id: 'graphql', label: 'GraphQL' },
          { id: 'websocket', label: 'WebSocket' },
        ].map(type => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
              selectedType === type.id
                ? 'bg-cyan-500 text-white border-cyan-500'
                : 'bg-omniviz-surface border-omniviz-border text-omniviz-text hover:border-cyan-400'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-omniviz-bg rounded-lg p-4 border border-omniviz-border">
          <div className="text-xs text-omniviz-text-muted mb-2">Request</div>
          <pre className="text-xs font-mono text-green-400 whitespace-pre-wrap">
            {selectedType === 'rest' && `GET /api/users/123
Host: api.example.com
Authorization: Bearer token123`}
            {selectedType === 'graphql' && `POST /graphql
{
  query {
    user(id: 123) {
      name
      email
    }
  }
}`}
            {selectedType === 'websocket' && `// Bidirectional connection
ws.connect('wss://api.example.com')
ws.send({ type: 'subscribe', channel: 'updates' })`}
          </pre>
        </div>
        <div className="bg-omniviz-bg rounded-lg p-4 border border-omniviz-border">
          <div className="text-xs text-omniviz-text-muted mb-2">Response</div>
          <pre className="text-xs font-mono text-blue-400 whitespace-pre-wrap">
            {selectedType === 'rest' && `{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15"
}`}
            {selectedType === 'graphql' && `{
  "data": {
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}`}
            {selectedType === 'websocket' && `// Real-time messages
{ type: 'update', data: { ... } }
{ type: 'update', data: { ... } }
// Connection stays open`}
          </pre>
        </div>
      </div>

      <div className="mt-4 p-3 bg-omniviz-bg rounded-lg border border-omniviz-border">
        <div className="text-sm text-cyan-400 font-semibold mb-1">
          {selectedType === 'rest' && 'REST: Resource-based, stateless, cacheable'}
          {selectedType === 'graphql' && 'GraphQL: Query exactly what you need, single endpoint'}
          {selectedType === 'websocket' && 'WebSocket: Real-time, bidirectional communication'}
        </div>
        <div className="text-xs text-omniviz-text-muted">
          {selectedType === 'rest' && 'Best for: CRUD operations, simple APIs, caching'}
          {selectedType === 'graphql' && 'Best for: Complex data needs, mobile apps, reducing requests'}
          {selectedType === 'websocket' && 'Best for: Chat, gaming, live updates, notifications'}
        </div>
      </div>
    </div>
  )
}

// Database Comparison Demo
function DatabaseComparisonDemo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-omniviz-bg rounded-lg border border-blue-500/30">
        <h4 className="font-semibold text-blue-400 mb-3">SQL (Relational)</h4>
        <div className="text-xs text-omniviz-text-muted mb-3">
          Structured tables with relationships
        </div>
        <div className="space-y-2 mb-3">
          {['PostgreSQL', 'MySQL', 'SQLite'].map(db => (
            <div key={db} className="px-2 py-1 bg-omniviz-surface border border-omniviz-border rounded text-xs text-omniviz-text">{db}</div>
          ))}
        </div>
        <div className="text-xs space-y-1">
          <div className="text-green-400">+ ACID transactions</div>
          <div className="text-green-400">+ Complex queries</div>
          <div className="text-red-400">- Rigid schema</div>
        </div>
      </div>
      <div className="p-4 bg-omniviz-bg rounded-lg border border-green-500/30">
        <h4 className="font-semibold text-green-400 mb-3">NoSQL</h4>
        <div className="text-xs text-omniviz-text-muted mb-3">
          Flexible document/key-value storage
        </div>
        <div className="space-y-2 mb-3">
          {['MongoDB', 'Redis', 'DynamoDB'].map(db => (
            <div key={db} className="px-2 py-1 bg-omniviz-surface border border-omniviz-border rounded text-xs text-omniviz-text">{db}</div>
          ))}
        </div>
        <div className="text-xs space-y-1">
          <div className="text-green-400">+ Flexible schema</div>
          <div className="text-green-400">+ Horizontal scaling</div>
          <div className="text-red-400">- Limited joins</div>
        </div>
      </div>
    </div>
  )
}

// Networking Demo
function NetworkingDemo() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        {
          name: 'DNS',
          fullName: 'Domain Name System',
          desc: 'Translates domain names (google.com) to IP addresses (142.250.185.78)',
          icon: '🌐',
          color: 'blue'
        },
        {
          name: 'Router',
          fullName: 'Network Router',
          desc: 'Directs traffic between networks, finds the best path for data packets',
          icon: '🔀',
          color: 'green'
        },
        {
          name: 'Load Balancer',
          fullName: 'Load Balancer',
          desc: 'Distributes incoming traffic across multiple servers for reliability',
          icon: '⚖️',
          color: 'purple'
        },
        {
          name: 'CDN',
          fullName: 'Content Delivery Network',
          desc: 'Caches content at edge locations close to users for faster delivery',
          icon: '🌍',
          color: 'orange'
        },
      ].map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`p-4 bg-omniviz-bg rounded-xl border border-${item.color}-500/30`}
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <div className={`text-sm font-semibold text-${item.color}-400 mb-1`}>{item.name}</div>
          <div className="text-xs text-omniviz-text-muted">{item.desc}</div>
        </motion.div>
      ))}
    </div>
  )
}

// Architecture Pattern Demo
function ArchitecturePatternDemo() {
  const [pattern, setPattern] = useState('monolith')

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {[
          { id: 'monolith', label: 'Monolith' },
          { id: 'microservices', label: 'Microservices' },
        ].map(p => (
          <button
            key={p.id}
            onClick={() => setPattern(p.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
              pattern === p.id
                ? 'bg-pink-500 text-white border-pink-500'
                : 'bg-omniviz-surface border-omniviz-border text-omniviz-text hover:border-pink-400'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Diagram */}
        <div className="bg-omniviz-bg rounded-xl p-6 border border-omniviz-border">
          {pattern === 'monolith' ? (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-xs p-4 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-xl border-2 border-blue-500">
                <div className="text-center font-semibold text-blue-400 mb-3">Single Application</div>
                <div className="space-y-2">
                  {['UI Layer', 'Business Logic', 'Data Access', 'Database'].map((layer, i) => (
                    <div key={layer} className="p-2 bg-omniviz-surface rounded text-xs text-center text-omniviz-text">
                      {layer}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 text-xs text-omniviz-text-muted">
                Everything in one deployable unit
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {['Users', 'Orders', 'Products', 'Payments', 'Inventory', 'Notifications'].map(service => (
                  <div
                    key={service}
                    className="p-2 bg-gradient-to-b from-green-500/20 to-teal-500/20 rounded-lg border border-green-500/50 text-xs text-center text-omniviz-text"
                  >
                    {service}
                  </div>
                ))}
              </div>
              <div className="w-full p-2 bg-purple-500/20 rounded border border-purple-500/50 text-xs text-center text-omniviz-text">
                API Gateway
              </div>
              <div className="mt-3 text-xs text-omniviz-text-muted">
                Independent services communicating via APIs
              </div>
            </div>
          )}
        </div>

        {/* Pros/Cons */}
        <div className="space-y-4">
          <div>
            <div className="text-sm font-semibold text-green-400 mb-2">Advantages</div>
            <ul className="text-xs text-omniviz-text-muted space-y-1">
              {pattern === 'monolith' ? (
                <>
                  <li>• Simple to develop and deploy</li>
                  <li>• Easy debugging (single codebase)</li>
                  <li>• No network latency between components</li>
                  <li>• Good for small teams and MVPs</li>
                </>
              ) : (
                <>
                  <li>• Scale services independently</li>
                  <li>• Use different tech per service</li>
                  <li>• Isolated failures</li>
                  <li>• Teams can work independently</li>
                </>
              )}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-red-400 mb-2">Disadvantages</div>
            <ul className="text-xs text-omniviz-text-muted space-y-1">
              {pattern === 'monolith' ? (
                <>
                  <li>• Hard to scale specific parts</li>
                  <li>• One bug can crash everything</li>
                  <li>• Technology lock-in</li>
                  <li>• Deployment risks (all or nothing)</li>
                </>
              ) : (
                <>
                  <li>• Complex infrastructure</li>
                  <li>• Network latency between services</li>
                  <li>• Harder to debug across services</li>
                  <li>• Requires DevOps expertise</li>
                </>
              )}
            </ul>
          </div>
          <div className="p-3 bg-omniviz-bg rounded-lg border border-omniviz-border">
            <div className="text-xs text-pink-400 font-semibold">When to use?</div>
            <div className="text-xs text-omniviz-text-muted mt-1">
              {pattern === 'monolith'
                ? 'Start here! Good for new projects, small teams, and when you\'re still figuring out the domain.'
                : 'When you have clear service boundaries, need independent scaling, or have multiple teams.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Security Layers Demo
function SecurityLayersDemo() {
  return (
    <div className="space-y-3">
      {[
        { layer: 'HTTPS/TLS', desc: 'Encrypts data in transit', icon: '🔒', color: 'green' },
        { layer: 'Firewall', desc: 'Blocks unauthorized network access', icon: '🛡️', color: 'blue' },
        { layer: 'Authentication', desc: 'Verify user identity (login)', icon: '🔑', color: 'yellow' },
        { layer: 'Authorization', desc: 'Check user permissions', icon: '✅', color: 'purple' },
        { layer: 'Input Validation', desc: 'Sanitize all user input', icon: '🧹', color: 'orange' },
        { layer: 'Encryption at Rest', desc: 'Encrypt stored data', icon: '💾', color: 'cyan' },
      ].map((s, i) => (
        <motion.div
          key={s.layer}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 p-3 bg-omniviz-bg rounded-lg border border-omniviz-border"
        >
          <span className="text-xl">{s.icon}</span>
          <div>
            <div className={`text-sm font-semibold text-${s.color}-400`}>{s.layer}</div>
            <div className="text-xs text-omniviz-text-muted">{s.desc}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default SoftwareArchitectureConcept
