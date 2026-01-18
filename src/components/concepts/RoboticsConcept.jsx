import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function RoboticsConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Robotics" color="red" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Robotics</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                The intersection of mechanical engineering, electronics, and computer science.
              </motion.p>
            </div>
          </Section>

          <Section title="Robot Arm Kinematics" id="kinematics">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Forward Kinematics</h3>
              <p className="text-omniviz-text-muted mb-4">Forward kinematics calculates the end effector position from joint angles using transformation matrices.</p>
            </ExplanationCard>
            <div className="mt-8"><KinematicsDemo /></div>
          </Section>

          <Section title="Sensors" id="sensors">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Robot Perception</h3>
              <p className="text-omniviz-text-muted mb-4">Robots use various sensors to perceive their environment: cameras, LIDAR, ultrasonic, and encoders.</p>
            </ExplanationCard>
            <div className="mt-8"><SensorDemo /></div>
          </Section>

          <Section title="Path Planning" id="pathplanning">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Navigation Algorithms</h3>
              <p className="text-omniviz-text-muted mb-4">Path planning algorithms find optimal routes while avoiding obstacles, using A*, RRT, or potential fields.</p>
            </ExplanationCard>
            <div className="mt-8"><PathPlanningDemo /></div>
          </Section>

          <Section title="PID Control" id="pid">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Feedback Control</h3>
              <p className="text-omniviz-text-muted mb-4">PID controllers adjust robot behavior based on error, using Proportional, Integral, and Derivative terms.</p>
            </ExplanationCard>
            <div className="mt-8"><PIDDemo /></div>
          </Section>

          <Section title="State Machine" id="state">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Robot Behavior</h3>
              <p className="text-omniviz-text-muted mb-4">Finite state machines define robot behaviors and transitions between states based on sensor input.</p>
            </ExplanationCard>
            <div className="mt-8"><StateMachineDemo /></div>
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

function KinematicsDemo() {
  const canvasRef = useRef(null)
  const [joint1, setJoint1] = useState(45)
  const [joint2, setJoint2] = useState(-30)
  const [endPos, setEndPos] = useState({ x: 0, y: 0 })

  const L1 = 80 // Length of first arm segment
  const L2 = 60 // Length of second arm segment

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const w = canvas.width = 300
    const h = canvas.height = 250

    ctx.fillStyle = 'rgb(var(--omniviz-bg))'
    ctx.fillRect(0, 0, w, h)

    const baseX = w / 2
    const baseY = h - 40

    // Calculate joint positions
    const rad1 = (joint1 - 90) * Math.PI / 180
    const rad2 = (joint1 + joint2 - 90) * Math.PI / 180

    const joint1X = baseX + L1 * Math.cos(rad1)
    const joint1Y = baseY + L1 * Math.sin(rad1)

    const endX = joint1X + L2 * Math.cos(rad2)
    const endY = joint1Y + L2 * Math.sin(rad2)

    setEndPos({ x: (endX - baseX).toFixed(0), y: (baseY - endY).toFixed(0) })

    // Draw base
    ctx.fillStyle = '#6b7280'
    ctx.fillRect(baseX - 20, baseY, 40, 20)

    // Draw arm segments
    ctx.strokeStyle = '#f97316'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'

    // First segment
    ctx.beginPath()
    ctx.moveTo(baseX, baseY)
    ctx.lineTo(joint1X, joint1Y)
    ctx.stroke()

    // Second segment
    ctx.strokeStyle = '#fb923c'
    ctx.beginPath()
    ctx.moveTo(joint1X, joint1Y)
    ctx.lineTo(endX, endY)
    ctx.stroke()

    // Draw joints
    ctx.fillStyle = '#1f2937'
    ctx.beginPath()
    ctx.arc(baseX, baseY, 8, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(joint1X, joint1Y, 6, 0, Math.PI * 2)
    ctx.fill()

    // Draw end effector
    ctx.fillStyle = '#22c55e'
    ctx.beginPath()
    ctx.arc(endX, endY, 8, 0, Math.PI * 2)
    ctx.fill()

    // Draw coordinate system
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.lineWidth = 1
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(baseX, 20)
    ctx.lineTo(baseX, baseY)
    ctx.moveTo(20, baseY)
    ctx.lineTo(w - 20, baseY)
    ctx.stroke()
    ctx.setLineDash([])

  }, [joint1, joint2])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <canvas ref={canvasRef} className="w-full rounded-lg border border-omniviz-border" />
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-omniviz-text text-sm">Joint 1 (θ₁): {joint1}°</label>
            <input type="range" min="-90" max="180" value={joint1} onChange={(e) => setJoint1(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-omniviz-text text-sm">Joint 2 (θ₂): {joint2}°</label>
            <input type="range" min="-150" max="150" value={joint2} onChange={(e) => setJoint2(Number(e.target.value))} className="w-full" />
          </div>
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <h4 className="text-green-400 font-semibold mb-2">End Effector Position</h4>
            <div className="font-mono text-omniviz-text">
              X: {endPos.x} | Y: {endPos.y}
            </div>
          </div>
          <div className="p-4 bg-omniviz-bg rounded-lg text-sm">
            <div className="text-orange-400 mb-2">Forward Kinematics:</div>
            <div className="font-mono text-omniviz-text-muted">
              x = L₁cos(θ₁) + L₂cos(θ₁+θ₂)<br />
              y = L₁sin(θ₁) + L₂sin(θ₁+θ₂)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SensorDemo() {
  const [sensors, setSensors] = useState({
    lidar: Array(12).fill(100),
    ultrasonic: 50,
    camera: true,
    encoder: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => ({
        lidar: prev.lidar.map(() => 30 + Math.random() * 100),
        ultrasonic: 20 + Math.random() * 80,
        camera: prev.camera,
        encoder: (prev.encoder + 5) % 360
      }))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-blue-400 font-semibold mb-4">LIDAR (360° Scan)</h4>
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full" />
            <div className="absolute inset-4 border border-blue-500/20 rounded-full" />
            <div className="absolute inset-8 border border-blue-500/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            {sensors.lidar.map((dist, i) => {
              const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
              const maxDist = 100
              const normalDist = Math.min(dist, maxDist)
              const x = 96 + Math.cos(angle) * (normalDist / maxDist * 80)
              const y = 96 + Math.sin(angle) * (normalDist / maxDist * 80)
              return (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
                  style={{ left: x - 4, top: y - 4 }}
                />
              )
            })}
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <h4 className="text-purple-400 font-semibold mb-2">Ultrasonic Sensor</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-4 bg-omniviz-surface rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 transition-all" style={{ width: `${sensors.ultrasonic}%` }} />
              </div>
              <span className="text-omniviz-text font-mono w-16">{sensors.ultrasonic.toFixed(0)} cm</span>
            </div>
          </div>
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <h4 className="text-green-400 font-semibold mb-2">Wheel Encoder</h4>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 border-4 border-green-500 rounded-full relative">
                <div
                  className="absolute top-1/2 left-1/2 w-1 h-6 bg-green-500 origin-bottom"
                  style={{ transform: `translate(-50%, -100%) rotate(${sensors.encoder}deg)` }}
                />
              </div>
              <span className="text-omniviz-text font-mono">{sensors.encoder}°</span>
            </div>
          </div>
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <h4 className="text-cyan-400 font-semibold mb-2">Camera</h4>
            <div className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full ${sensors.camera ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-omniviz-text">{sensors.camera ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PathPlanningDemo() {
  const [grid, setGrid] = useState(() => {
    const g = Array(10).fill(null).map(() => Array(10).fill(0))
    // Add obstacles
    g[2][3] = g[2][4] = g[2][5] = 1
    g[5][2] = g[5][3] = g[6][3] = 1
    g[4][6] = g[4][7] = g[5][7] = 1
    return g
  })
  const [path, setPath] = useState([])
  const [start] = useState([0, 0])
  const [end] = useState([9, 9])

  const findPath = () => {
    // Simple A* implementation
    const openSet = [{ pos: start, g: 0, f: 0, parent: null }]
    const closedSet = new Set()
    const heuristic = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f)
      const current = openSet.shift()
      const key = `${current.pos[0]},${current.pos[1]}`

      if (current.pos[0] === end[0] && current.pos[1] === end[1]) {
        // Reconstruct path
        const p = []
        let node = current
        while (node) {
          p.unshift(node.pos)
          node = node.parent
        }
        setPath(p)
        return
      }

      closedSet.add(key)

      const neighbors = [[0, 1], [1, 0], [0, -1], [-1, 0]]
      for (const [dx, dy] of neighbors) {
        const nx = current.pos[0] + dx
        const ny = current.pos[1] + dy
        const nkey = `${nx},${ny}`

        if (nx < 0 || nx >= 10 || ny < 0 || ny >= 10) continue
        if (grid[nx][ny] === 1 || closedSet.has(nkey)) continue

        const g = current.g + 1
        const h = heuristic([nx, ny], end)
        const f = g + h

        const existing = openSet.find(n => n.pos[0] === nx && n.pos[1] === ny)
        if (!existing || g < existing.g) {
          if (existing) openSet.splice(openSet.indexOf(existing), 1)
          openSet.push({ pos: [nx, ny], g, f, parent: current })
        }
      }
    }
    setPath([])
  }

  const toggleObstacle = (r, c) => {
    if ((r === start[0] && c === start[1]) || (r === end[0] && c === end[1])) return
    const newGrid = grid.map(row => [...row])
    newGrid[r][c] = newGrid[r][c] === 1 ? 0 : 1
    setGrid(newGrid)
    setPath([])
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <button onClick={findPath} className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        Find Path (A*)
      </button>
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(10, 32px)' }}>
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const isStart = r === start[0] && c === start[1]
            const isEnd = r === end[0] && c === end[1]
            const isPath = path.some(p => p[0] === r && p[1] === c)

            return (
              <div
                key={`${r}-${c}`}
                onClick={() => toggleObstacle(r, c)}
                className={`w-8 h-8 rounded cursor-pointer transition-colors ${
                  isStart ? 'bg-green-500' :
                  isEnd ? 'bg-red-500' :
                  isPath ? 'bg-blue-500' :
                  cell === 1 ? 'bg-gray-600' :
                  'bg-omniviz-bg hover:bg-omniviz-border'
                }`}
              />
            )
          })
        )}
      </div>
      <div className="flex gap-4 mt-4 text-sm">
        <span><span className="inline-block w-4 h-4 bg-green-500 rounded mr-1" /> Start</span>
        <span><span className="inline-block w-4 h-4 bg-red-500 rounded mr-1" /> Goal</span>
        <span><span className="inline-block w-4 h-4 bg-blue-500 rounded mr-1" /> Path</span>
        <span><span className="inline-block w-4 h-4 bg-gray-600 rounded mr-1" /> Obstacle</span>
      </div>
    </div>
  )
}

function PIDDemo() {
  const canvasRef = useRef(null)
  const [kp, setKp] = useState(0.5)
  const [ki, setKi] = useState(0.1)
  const [kd, setKd] = useState(0.2)
  const [setpoint, setSetpoint] = useState(50)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const w = canvas.width = 400
    const h = canvas.height = 150

    ctx.fillStyle = 'rgb(var(--omniviz-bg))'
    ctx.fillRect(0, 0, w, h)

    // Draw setpoint line
    const setpointY = h - (setpoint / 100) * h
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)'
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(0, setpointY)
    ctx.lineTo(w, setpointY)
    ctx.stroke()
    ctx.setLineDash([])

    // Simulate PID response
    let position = 0
    let integral = 0
    let prevError = 0
    const history = []

    for (let t = 0; t < 200; t++) {
      const error = setpoint - position
      integral += error * 0.1
      const derivative = (error - prevError) / 0.1

      const output = kp * error + ki * integral + kd * derivative
      position += output * 0.5

      history.push(position)
      prevError = error
    }

    // Draw response curve
    ctx.strokeStyle = '#22c55e'
    ctx.lineWidth = 2
    ctx.beginPath()
    history.forEach((pos, i) => {
      const x = (i / history.length) * w
      const y = h - (pos / 100) * h
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()

  }, [kp, ki, kd, setpoint])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <canvas ref={canvasRef} className="w-full rounded-lg border border-omniviz-border" />
          <div className="flex gap-4 mt-2 text-sm">
            <span className="text-red-400">--- Setpoint</span>
            <span className="text-green-400">— Response</span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-omniviz-text text-sm">Setpoint: {setpoint}%</label>
            <input type="range" min="10" max="90" value={setpoint} onChange={(e) => setSetpoint(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-red-400 text-sm">Kp (Proportional): {kp}</label>
            <input type="range" min="0" max="2" step="0.1" value={kp} onChange={(e) => setKp(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-green-400 text-sm">Ki (Integral): {ki}</label>
            <input type="range" min="0" max="1" step="0.05" value={ki} onChange={(e) => setKi(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-blue-400 text-sm">Kd (Derivative): {kd}</label>
            <input type="range" min="0" max="1" step="0.05" value={kd} onChange={(e) => setKd(Number(e.target.value))} className="w-full" />
          </div>
          <div className="p-3 bg-omniviz-bg rounded-lg text-xs font-mono">
            <div className="text-purple-400">Output = Kp×e + Ki×∫e + Kd×de/dt</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StateMachineDemo() {
  const [state, setState] = useState('IDLE')
  const [battery, setBattery] = useState(100)
  const [obstacle, setObstacle] = useState(false)

  const states = {
    IDLE: { color: 'gray', next: ['MOVING'] },
    MOVING: { color: 'green', next: ['IDLE', 'AVOIDING', 'CHARGING'] },
    AVOIDING: { color: 'orange', next: ['MOVING'] },
    CHARGING: { color: 'blue', next: ['IDLE'] }
  }

  const transition = (to) => {
    if (states[state].next.includes(to)) {
      setState(to)
    }
  }

  useEffect(() => {
    if (state === 'MOVING' && obstacle) {
      setState('AVOIDING')
    } else if (state === 'MOVING' && battery < 20) {
      setState('CHARGING')
    } else if (state === 'AVOIDING' && !obstacle) {
      setState('MOVING')
    } else if (state === 'CHARGING' && battery >= 100) {
      setState('IDLE')
    }
  }, [state, obstacle, battery])

  useEffect(() => {
    const interval = setInterval(() => {
      if (state === 'MOVING') {
        setBattery(b => Math.max(0, b - 2))
      } else if (state === 'CHARGING') {
        setBattery(b => Math.min(100, b + 5))
      }
    }, 500)
    return () => clearInterval(interval)
  }, [state])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-omniviz-bg rounded-lg">
          <h4 className="text-omniviz-text font-semibold mb-4">State Diagram</h4>
          <div className="relative h-48">
            {Object.entries(states).map(([name, { color }], i) => {
              const positions = [
                { x: 25, y: 25 }, { x: 75, y: 25 },
                { x: 75, y: 75 }, { x: 25, y: 75 }
              ]
              const pos = positions[i]
              return (
                <div
                  key={name}
                  className={`absolute w-20 h-12 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                    state === name ? `bg-${color}-500 text-white scale-110` : `bg-${color}-500/30 text-${color}-400`
                  }`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {name}
                </div>
              )
            })}
            {/* Arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
                </marker>
              </defs>
              <path d="M 75 45 L 75 70" stroke="#888" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
              <path d="M 145 45 L 175 45" stroke="#888" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
              <path d="M 225 70 L 225 95" stroke="#888" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
            </svg>
          </div>
        </div>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg bg-${states[state].color}-500/20 border border-${states[state].color}-500`}>
            <div className={`text-${states[state].color}-400 font-bold text-lg`}>Current: {state}</div>
          </div>
          <div>
            <label className="text-omniviz-text text-sm">Battery: {battery}%</label>
            <div className="h-4 bg-omniviz-bg rounded-full overflow-hidden mt-1">
              <div className={`h-full transition-all ${battery < 20 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${battery}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-omniviz-text text-sm">Obstacle Detected:</label>
            <button
              onClick={() => setObstacle(!obstacle)}
              className={`px-4 py-2 rounded-lg ${obstacle ? 'bg-red-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
            >
              {obstacle ? 'Yes' : 'No'}
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => transition('MOVING')} disabled={!states[state].next.includes('MOVING')} className="px-3 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50">Start Moving</button>
            <button onClick={() => transition('IDLE')} disabled={!states[state].next.includes('IDLE')} className="px-3 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50">Stop</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoboticsConcept
