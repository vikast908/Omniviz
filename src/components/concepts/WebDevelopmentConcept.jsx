import { useState } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function WebDevelopmentConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Web Development" color="blue" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Web Development</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Building modern web applications with HTML, CSS, JavaScript, and beyond.
              </motion.p>
            </div>
          </Section>

          <Section title="DOM Manipulation" id="dom">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Document Object Model</h3>
              <p className="text-omniviz-text-muted mb-4">The DOM represents the page structure as a tree of nodes that JavaScript can manipulate dynamically.</p>
            </ExplanationCard>
            <div className="mt-8"><DOMDemo /></div>
          </Section>

          <Section title="CSS Box Model" id="box-model">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Content, Padding, Border, Margin</h3>
              <p className="text-omniviz-text-muted mb-4">Every element is a rectangular box with content, padding, border, and margin layers.</p>
            </ExplanationCard>
            <div className="mt-8"><BoxModelDemo /></div>
          </Section>

          <Section title="Flexbox Layout" id="flexbox">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Flexible Box Layout</h3>
              <p className="text-omniviz-text-muted mb-4">Flexbox provides a one-dimensional layout method for arranging items in rows or columns.</p>
            </ExplanationCard>
            <div className="mt-8"><FlexboxDemo /></div>
          </Section>

          <Section title="Event Propagation" id="events">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Bubbling and Capturing</h3>
              <p className="text-omniviz-text-muted mb-4">Events propagate through the DOM in two phases: capturing (down) and bubbling (up).</p>
            </ExplanationCard>
            <div className="mt-8"><EventDemo /></div>
          </Section>

          <Section title="REST API" id="rest">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">RESTful Web Services</h3>
              <p className="text-omniviz-text-muted mb-4">REST defines conventions for creating, reading, updating, and deleting resources over HTTP.</p>
            </ExplanationCard>
            <div className="mt-8"><RESTDemo /></div>
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

function DOMDemo() {
  const [tree, setTree] = useState({
    tag: 'html',
    children: [
      { tag: 'head', children: [{ tag: 'title', text: 'Page' }] },
      { tag: 'body', children: [
        { tag: 'div', id: 'app', children: [
          { tag: 'h1', text: 'Hello' },
          { tag: 'p', text: 'World' }
        ]}
      ]}
    ]
  })
  const [selected, setSelected] = useState(null)
  const [log, setLog] = useState([])

  const renderNode = (node, depth = 0) => (
    <div key={node.tag + depth} style={{ marginLeft: depth * 20 }}>
      <button
        onClick={() => {
          setSelected(node)
          setLog(prev => [...prev.slice(-4), `Selected <${node.tag}>`])
        }}
        className={`px-2 py-1 rounded text-sm font-mono ${selected === node ? 'bg-orange-500 text-white' : 'text-omniviz-text hover:bg-omniviz-bg'}`}
      >
        &lt;{node.tag}{node.id ? ` id="${node.id}"` : ''}&gt;
        {node.text && <span className="text-omniviz-text-muted"> "{node.text}"</span>}
      </button>
      {node.children?.map((child, i) => renderNode(child, depth + 1))}
    </div>
  )

  const addChild = () => {
    if (!selected || selected.text) return
    const newNode = { tag: 'span', text: 'New' }
    selected.children = [...(selected.children || []), newNode]
    setTree({ ...tree })
    setLog(prev => [...prev.slice(-4), `Added <span> to <${selected.tag}>`])
  }

  const removeNode = () => {
    if (!selected || selected.tag === 'html') return
    const remove = (node) => {
      if (node.children) {
        const idx = node.children.indexOf(selected)
        if (idx !== -1) {
          node.children.splice(idx, 1)
          return true
        }
        for (const child of node.children) {
          if (remove(child)) return true
        }
      }
      return false
    }
    remove(tree)
    setLog(prev => [...prev.slice(-4), `Removed <${selected.tag}>`])
    setSelected(null)
    setTree({ ...tree })
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">DOM Tree</h4>
          <div className="p-4 bg-omniviz-bg rounded-lg">{renderNode(tree)}</div>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Operations</h4>
          <div className="flex gap-2 mb-4">
            <button onClick={addChild} disabled={!selected} className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 text-sm">Add Child</button>
            <button onClick={removeNode} disabled={!selected || selected.tag === 'html'} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 text-sm">Remove</button>
          </div>
          <div className="p-3 bg-omniviz-bg rounded-lg">
            <h5 className="text-omniviz-text-muted text-sm mb-2">Console</h5>
            {log.map((l, i) => <div key={i} className="text-green-400 text-sm font-mono">{l}</div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

function BoxModelDemo() {
  const [content, setContent] = useState(100)
  const [padding, setPadding] = useState(20)
  const [border, setBorder] = useState(5)
  const [margin, setMargin] = useState(15)

  const total = content + (padding * 2) + (border * 2) + (margin * 2)

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <div
            className="bg-orange-500/30 flex items-center justify-center"
            style={{ padding: margin }}
          >
            <div
              className="bg-yellow-500/50 flex items-center justify-center"
              style={{ borderWidth: border, borderColor: '#eab308', borderStyle: 'solid', padding: padding }}
            >
              <div
                className="bg-blue-500 flex items-center justify-center text-white font-bold"
                style={{ width: content, height: content }}
              >
                Content
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-omniviz-text text-sm">Content: {content}px</label>
            <input type="range" min="50" max="150" value={content} onChange={(e) => setContent(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-omniviz-text text-sm">Padding: {padding}px</label>
            <input type="range" min="0" max="40" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-omniviz-text text-sm">Border: {border}px</label>
            <input type="range" min="0" max="20" value={border} onChange={(e) => setBorder(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-omniviz-text text-sm">Margin: {margin}px</label>
            <input type="range" min="0" max="40" value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="w-full" />
          </div>
          <div className="p-3 bg-omniviz-bg rounded-lg text-sm">
            <div className="text-omniviz-text">Total width: <span className="text-cyan-400">{total}px</span></div>
            <div className="text-omniviz-text-muted mt-1">= {content} + {padding}×2 + {border}×2 + {margin}×2</div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 text-sm">
        <span className="flex items-center gap-2"><span className="w-4 h-4 bg-orange-500/30 rounded"></span><span className="text-omniviz-text">Margin</span></span>
        <span className="flex items-center gap-2"><span className="w-4 h-4 bg-yellow-500 rounded"></span><span className="text-omniviz-text">Border</span></span>
        <span className="flex items-center gap-2"><span className="w-4 h-4 bg-yellow-500/50 rounded"></span><span className="text-omniviz-text">Padding</span></span>
        <span className="flex items-center gap-2"><span className="w-4 h-4 bg-blue-500 rounded"></span><span className="text-omniviz-text">Content</span></span>
      </div>
    </div>
  )
}

function FlexboxDemo() {
  const [direction, setDirection] = useState('row')
  const [justify, setJustify] = useState('flex-start')
  const [align, setAlign] = useState('stretch')
  const [wrap, setWrap] = useState('nowrap')

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-omniviz-text-muted text-sm">flex-direction</label>
          <select value={direction} onChange={(e) => setDirection(e.target.value)} className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-2 py-1 text-sm">
            <option>row</option><option>row-reverse</option><option>column</option><option>column-reverse</option>
          </select>
        </div>
        <div>
          <label className="text-omniviz-text-muted text-sm">justify-content</label>
          <select value={justify} onChange={(e) => setJustify(e.target.value)} className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-2 py-1 text-sm">
            <option>flex-start</option><option>flex-end</option><option>center</option><option>space-between</option><option>space-around</option><option>space-evenly</option>
          </select>
        </div>
        <div>
          <label className="text-omniviz-text-muted text-sm">align-items</label>
          <select value={align} onChange={(e) => setAlign(e.target.value)} className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-2 py-1 text-sm">
            <option>stretch</option><option>flex-start</option><option>flex-end</option><option>center</option>
          </select>
        </div>
        <div>
          <label className="text-omniviz-text-muted text-sm">flex-wrap</label>
          <select value={wrap} onChange={(e) => setWrap(e.target.value)} className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-2 py-1 text-sm">
            <option>nowrap</option><option>wrap</option><option>wrap-reverse</option>
          </select>
        </div>
      </div>
      <div
        className="h-48 bg-omniviz-bg rounded-lg p-4 border-2 border-dashed border-purple-500"
        style={{ display: 'flex', flexDirection: direction, justifyContent: justify, alignItems: align, flexWrap: wrap }}
      >
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-purple-500 text-white font-bold rounded-lg flex items-center justify-center m-1" style={{ minWidth: 60, minHeight: 40, height: i === 2 ? 60 : i === 4 ? 80 : 40 }}>
            {i}
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-omniviz-bg rounded-lg font-mono text-sm text-omniviz-text">
        display: flex;<br/>
        flex-direction: {direction};<br/>
        justify-content: {justify};<br/>
        align-items: {align};<br/>
        flex-wrap: {wrap};
      </div>
    </div>
  )
}

function EventDemo() {
  const [events, setEvents] = useState([])
  const [phase, setPhase] = useState('bubble')

  const handleClick = (element, e) => {
    if (phase === 'bubble') {
      setEvents(prev => [...prev, { element, phase: 'Bubble' }])
    }
  }

  const clear = () => setEvents([])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <select value={phase} onChange={(e) => setPhase(e.target.value)} className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2">
          <option value="bubble">Bubbling Phase</option>
          <option value="capture">Capturing Phase</option>
        </select>
        <button onClick={clear} className="px-4 py-2 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border">Clear</button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div
          onClick={(e) => handleClick('Grandparent', e)}
          className="p-6 bg-red-500/20 border-2 border-red-500 rounded-lg cursor-pointer"
        >
          <span className="text-red-400 font-semibold">Grandparent (div)</span>
          <div
            onClick={(e) => { handleClick('Parent', e); if (phase === 'bubble') e.stopPropagation() }}
            className="mt-4 p-6 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg"
          >
            <span className="text-yellow-400 font-semibold">Parent (div)</span>
            <button
              onClick={(e) => handleClick('Button', e)}
              className="mt-4 block w-full px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
            >
              Click Me (button)
            </button>
          </div>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-2">Event Log</h4>
          <div className="p-3 bg-omniviz-bg rounded-lg h-48 overflow-y-auto">
            {events.length === 0 ? (
              <p className="text-omniviz-text-muted text-sm">Click the button to see event propagation</p>
            ) : (
              events.map((ev, i) => (
                <div key={i} className="text-sm mb-1">
                  <span className="text-green-400">{ev.phase}:</span>
                  <span className="text-omniviz-text"> {ev.element}</span>
                </div>
              ))
            )}
          </div>
          <p className="mt-2 text-omniviz-text-muted text-sm">
            {phase === 'bubble' ? 'Events bubble up from target to ancestors' : 'Events capture down from ancestors to target'}
          </p>
        </div>
      </div>
    </div>
  )
}

function RESTDemo() {
  const [resources, setResources] = useState([
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ])
  const [method, setMethod] = useState('GET')
  const [endpoint, setEndpoint] = useState('/users')
  const [body, setBody] = useState('')
  const [response, setResponse] = useState(null)

  const send = () => {
    const id = endpoint.match(/\/users\/(\d+)/)
    const userId = id ? Number(id[1]) : null

    switch (method) {
      case 'GET':
        if (userId) {
          const user = resources.find(r => r.id === userId)
          setResponse({ status: user ? 200 : 404, body: user || { error: 'Not found' } })
        } else {
          setResponse({ status: 200, body: resources })
        }
        break
      case 'POST':
        try {
          const data = JSON.parse(body)
          const newUser = { id: resources.length + 1, ...data }
          setResources([...resources, newUser])
          setResponse({ status: 201, body: newUser })
        } catch {
          setResponse({ status: 400, body: { error: 'Invalid JSON' } })
        }
        break
      case 'PUT':
        if (userId) {
          try {
            const data = JSON.parse(body)
            setResources(resources.map(r => r.id === userId ? { ...r, ...data } : r))
            setResponse({ status: 200, body: { id: userId, ...data } })
          } catch {
            setResponse({ status: 400, body: { error: 'Invalid JSON' } })
          }
        }
        break
      case 'DELETE':
        if (userId) {
          setResources(resources.filter(r => r.id !== userId))
          setResponse({ status: 204, body: null })
        }
        break
    }
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-cyan-400 font-semibold">Request</h4>
          <div className="flex gap-2">
            <select value={method} onChange={(e) => setMethod(e.target.value)} className="bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-2 py-2">
              <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
            </select>
            <input value={endpoint} onChange={(e) => setEndpoint(e.target.value)} className="flex-1 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2" placeholder="/users or /users/1" />
          </div>
          {(method === 'POST' || method === 'PUT') && (
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"name": "New User", "email": "new@example.com"}'
              className="w-full h-20 bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-3 py-2 font-mono text-sm"
            />
          )}
          <button onClick={send} className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">Send Request</button>
          <div className="p-3 bg-omniviz-bg rounded-lg">
            <h5 className="text-omniviz-text-muted text-sm mb-2">Resources in "database"</h5>
            <pre className="text-xs text-omniviz-text overflow-auto">{JSON.stringify(resources, null, 2)}</pre>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-green-400 font-semibold">Response</h4>
          {response ? (
            <div className="p-4 bg-omniviz-bg rounded-lg">
              <div className={`font-bold mb-2 ${response.status < 300 ? 'text-green-400' : 'text-red-400'}`}>
                Status: {response.status} {response.status === 200 ? 'OK' : response.status === 201 ? 'Created' : response.status === 204 ? 'No Content' : response.status === 404 ? 'Not Found' : 'Bad Request'}
              </div>
              <pre className="text-sm text-omniviz-text overflow-auto">{JSON.stringify(response.body, null, 2)}</pre>
            </div>
          ) : (
            <div className="p-4 bg-omniviz-bg rounded-lg text-omniviz-text-muted">Send a request to see response</div>
          )}
          <div className="p-3 bg-omniviz-bg rounded-lg text-sm">
            <h5 className="text-omniviz-text font-semibold mb-2">REST Conventions</h5>
            <div className="text-omniviz-text-muted space-y-1">
              <div><span className="text-green-400">GET</span> /users → List all</div>
              <div><span className="text-green-400">GET</span> /users/1 → Get one</div>
              <div><span className="text-yellow-400">POST</span> /users → Create</div>
              <div><span className="text-blue-400">PUT</span> /users/1 → Update</div>
              <div><span className="text-red-400">DELETE</span> /users/1 → Delete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebDevelopmentConcept
