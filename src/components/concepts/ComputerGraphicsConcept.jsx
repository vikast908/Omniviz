import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function ComputerGraphicsConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Computer Graphics" color="pink" />

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
                Computer Graphics
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-omniviz-text-muted max-w-3xl mx-auto"
              >
                The art and science of generating images with computers.
                Learn about transformations, rendering, and how pixels become pictures.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Transformations', desc: 'Translate, rotate, scale objects', icon: '🔄', color: 'pink' },
                { title: 'Rendering', desc: 'Converting 3D to 2D images', icon: '🎨', color: 'purple' },
                { title: 'Shading', desc: 'Simulating light and materials', icon: '💡', color: 'yellow' },
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

          {/* 2D Transformations Section */}
          <Section title="2D Transformations" id="transforms-2d">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-pink-400 mb-4">Moving Objects in 2D</h3>
              <p className="text-omniviz-text-muted mb-6">
                <strong className="text-pink-400">Transformations</strong> change the position, size, or orientation
                of objects. Using <strong className="text-cyan-400">matrices</strong>, we can combine multiple
                transformations into one operation.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  { name: 'Translation', desc: 'Move object by (tx, ty)', formula: '[1 0 tx; 0 1 ty; 0 0 1]', color: 'blue' },
                  { name: 'Rotation', desc: 'Rotate by angle θ', formula: '[cos -sin 0; sin cos 0; 0 0 1]', color: 'green' },
                  { name: 'Scale', desc: 'Scale by (sx, sy)', formula: '[sx 0 0; 0 sy 0; 0 0 1]', color: 'orange' },
                ].map(t => (
                  <div key={t.name} className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                    <h4 className={`font-semibold text-${t.color}-400 mb-1`}>{t.name}</h4>
                    <p className="text-xs text-omniviz-text-muted mb-2">{t.desc}</p>
                    <div className="font-mono text-xs text-omniviz-text bg-omniviz-surface p-2 rounded">{t.formula}</div>
                  </div>
                ))}
              </div>
            </ExplanationCard>

            <div className="mt-8">
              <Transform2DDemo />
            </div>
          </Section>

          {/* Color Models Section */}
          <Section title="Color Models" id="color">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Representing Colors</h3>
              <p className="text-omniviz-text-muted mb-6">
                Different color models serve different purposes. <strong className="text-red-400">RGB</strong> is
                additive (for screens), while <strong className="text-cyan-400">CMYK</strong> is subtractive (for printing).
                <strong className="text-yellow-400"> HSL</strong> is more intuitive for humans.
              </p>
            </ExplanationCard>

            <div className="mt-8">
              <ColorModelDemo />
            </div>
          </Section>

          {/* Rendering Pipeline Section */}
          <Section title="Rendering Pipeline" id="pipeline">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">From 3D to Pixels</h3>
              <p className="text-omniviz-text-muted mb-6">
                The <strong className="text-cyan-400">rendering pipeline</strong> transforms 3D geometry into 2D images.
                Modern GPUs process millions of triangles per second through this pipeline.
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {[
                  { stage: 'Vertex', desc: 'Transform vertices' },
                  { stage: 'Primitive', desc: 'Assemble triangles' },
                  { stage: 'Rasterize', desc: 'Convert to fragments' },
                  { stage: 'Fragment', desc: 'Calculate pixel colors' },
                  { stage: 'Output', desc: 'Write to framebuffer' },
                ].map((item, i) => (
                  <div key={item.stage} className="flex items-center">
                    <div className="p-3 bg-omniviz-bg rounded-lg border border-omniviz-border text-center min-w-[100px]">
                      <div className="text-sm font-semibold text-cyan-400">{item.stage}</div>
                      <div className="text-xs text-omniviz-text-muted">{item.desc}</div>
                    </div>
                    {i < 4 && <span className="text-omniviz-text-muted mx-2">→</span>}
                  </div>
                ))}
              </div>
            </ExplanationCard>

            <div className="mt-8">
              <RasterizationDemo />
            </div>
          </Section>

          {/* Bezier Curves Section */}
          <Section title="Bézier Curves" id="bezier">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Smooth Curves from Control Points</h3>
              <p className="text-omniviz-text-muted mb-6">
                <strong className="text-green-400">Bézier curves</strong> are defined by control points and create
                smooth, scalable shapes. They're fundamental to fonts, vector graphics, and animation paths.
              </p>
            </ExplanationCard>

            <div className="mt-8">
              <BezierDemo />
            </div>
          </Section>

          {/* Shading Section */}
          <Section title="Shading Models" id="shading">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Simulating Light</h3>
              <p className="text-omniviz-text-muted mb-6">
                Shading determines how surfaces appear under light. The <strong className="text-yellow-400">Phong model</strong> combines
                ambient, diffuse, and specular components for realistic illumination.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: 'Ambient', desc: 'Constant base illumination', color: '#444' },
                  { name: 'Diffuse', desc: 'Light scattered equally in all directions', color: '#888' },
                  { name: 'Specular', desc: 'Mirror-like highlight reflection', color: '#fff' },
                ].map(item => (
                  <div key={item.name} className="p-4 bg-omniviz-bg rounded-lg border border-omniviz-border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full" style={{ backgroundColor: item.color }} />
                      <h4 className="font-semibold text-omniviz-text">{item.name}</h4>
                    </div>
                    <p className="text-xs text-omniviz-text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </ExplanationCard>

            <div className="mt-8">
              <ShadingDemo />
            </div>
          </Section>

          {/* Ray Tracing Section */}
          <Section title="Ray Tracing" id="raytracing">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-red-400 mb-4">Realistic Rendering</h3>
              <p className="text-omniviz-text-muted mb-6">
                <strong className="text-red-400">Ray tracing</strong> simulates how light travels by shooting rays
                from the camera through each pixel. It produces realistic reflections, refractions, and shadows.
              </p>
            </ExplanationCard>

            <div className="mt-8">
              <RayTracingDemo />
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

// 2D Transform Demo
function Transform2DDemo() {
  const canvasRef = useRef(null)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [scaleX, setScaleX] = useState(1)
  const [scaleY, setScaleY] = useState(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    // Clear
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, w, h)

    // Grid
    ctx.strokeStyle = '#2a2a3d'
    ctx.lineWidth = 1
    for (let x = 0; x <= w; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
    }
    for (let y = 0; y <= h; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }

    // Axes
    ctx.strokeStyle = '#6b7280'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(w/2, 0)
    ctx.lineTo(w/2, h)
    ctx.moveTo(0, h/2)
    ctx.lineTo(w, h/2)
    ctx.stroke()

    // Apply transformations
    ctx.save()
    ctx.translate(w/2, h/2) // Center origin
    ctx.translate(translateX, translateY)
    ctx.rotate(rotation * Math.PI / 180)
    ctx.scale(scaleX, scaleY)

    // Draw shape (house)
    ctx.fillStyle = '#ec4899'
    ctx.beginPath()
    ctx.moveTo(-30, 20)
    ctx.lineTo(-30, -20)
    ctx.lineTo(0, -40)
    ctx.lineTo(30, -20)
    ctx.lineTo(30, 20)
    ctx.closePath()
    ctx.fill()

    // Door
    ctx.fillStyle = '#7c3aed'
    ctx.fillRect(-10, 0, 20, 20)

    ctx.restore()
  }, [translateX, translateY, rotation, scaleX, scaleY])

  const reset = () => {
    setTranslateX(0)
    setTranslateY(0)
    setRotation(0)
    setScaleX(1)
    setScaleY(1)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-col md:flex-row gap-6">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="rounded-lg border border-omniviz-border mx-auto"
        />

        <div className="flex-1 space-y-4">
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">Translate X: {translateX}px</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={translateX}
              onChange={(e) => setTranslateX(parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">Translate Y: {translateY}px</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={translateY}
              onChange={(e) => setTranslateY(parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">Rotation: {rotation}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              className="w-full accent-green-500"
            />
          </div>
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">Scale X: {scaleX.toFixed(1)}</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={scaleX}
              onChange={(e) => setScaleX(parseFloat(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">Scale Y: {scaleY.toFixed(1)}</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={scaleY}
              onChange={(e) => setScaleY(parseFloat(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>
          <button
            onClick={reset}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

// Color Model Demo
function ColorModelDemo() {
  const [r, setR] = useState(128)
  const [g, setG] = useState(64)
  const [b, setB] = useState(192)

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const { h, s, l } = rgbToHsl(r, g, b)
  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Color Preview */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-40 h-40 rounded-xl shadow-lg"
            style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
          />
          <div className="font-mono text-lg text-omniviz-text">{hex.toUpperCase()}</div>
        </div>

        {/* RGB Sliders */}
        <div className="flex-1 space-y-4">
          <h4 className="font-semibold text-red-400">RGB (Additive)</h4>
          <div>
            <label className="text-sm text-red-400 block mb-1">Red: {r}</label>
            <input
              type="range" min="0" max="255" value={r}
              onChange={(e) => setR(parseInt(e.target.value))}
              className="w-full accent-red-500"
            />
          </div>
          <div>
            <label className="text-sm text-green-400 block mb-1">Green: {g}</label>
            <input
              type="range" min="0" max="255" value={g}
              onChange={(e) => setG(parseInt(e.target.value))}
              className="w-full accent-green-500"
            />
          </div>
          <div>
            <label className="text-sm text-blue-400 block mb-1">Blue: {b}</label>
            <input
              type="range" min="0" max="255" value={b}
              onChange={(e) => setB(parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </div>

        {/* HSL Display */}
        <div className="flex-1">
          <h4 className="font-semibold text-yellow-400 mb-4">HSL (Intuitive)</h4>
          <div className="space-y-3">
            <div className="p-3 bg-omniviz-bg rounded-lg text-omniviz-text">
              <span className="text-omniviz-text-muted">Hue: </span>
              <span className="text-yellow-400">{h}°</span>
              <div className="h-2 mt-2 rounded-full" style={{
                background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)'
              }} />
            </div>
            <div className="p-3 bg-omniviz-bg rounded-lg text-omniviz-text">
              <span className="text-omniviz-text-muted">Saturation: </span>
              <span className="text-yellow-400">{s}%</span>
              <div className="h-2 mt-2 rounded-full bg-gradient-to-r from-gray-500 to-current" style={{ color: `hsl(${h}, 100%, 50%)` }} />
            </div>
            <div className="p-3 bg-omniviz-bg rounded-lg text-omniviz-text">
              <span className="text-omniviz-text-muted">Lightness: </span>
              <span className="text-yellow-400">{l}%</span>
              <div className="h-2 mt-2 rounded-full bg-gradient-to-r from-black via-gray-500 to-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Rasterization Demo
function RasterizationDemo() {
  const canvasRef = useRef(null)
  const [gridSize, setGridSize] = useState(20)
  const [showGrid, setShowGrid] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const cellSize = w / gridSize

    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, w, h)

    // Draw triangle vertices
    const v1 = { x: w * 0.5, y: h * 0.2 }
    const v2 = { x: w * 0.2, y: h * 0.8 }
    const v3 = { x: w * 0.8, y: h * 0.7 }

    // Rasterize triangle
    const sign = (p1, p2, p3) => (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)
    const pointInTriangle = (pt) => {
      const d1 = sign(pt, v1, v2)
      const d2 = sign(pt, v2, v3)
      const d3 = sign(pt, v3, v1)
      const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0)
      const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0)
      return !(hasNeg && hasPos)
    }

    // Draw pixels
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const centerX = (x + 0.5) * cellSize
        const centerY = (y + 0.5) * cellSize

        if (pointInTriangle({ x: centerX, y: centerY })) {
          ctx.fillStyle = '#ec4899'
          ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
        }
      }
    }

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = '#2a2a3d'
      ctx.lineWidth = 1
      for (let i = 0; i <= gridSize; i++) {
        ctx.beginPath()
        ctx.moveTo(i * cellSize, 0)
        ctx.lineTo(i * cellSize, h)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, i * cellSize)
        ctx.lineTo(w, i * cellSize)
        ctx.stroke()
      }
    }

    // Draw triangle outline
    ctx.strokeStyle = '#22c55e'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(v1.x, v1.y)
    ctx.lineTo(v2.x, v2.y)
    ctx.lineTo(v3.x, v3.y)
    ctx.closePath()
    ctx.stroke()

    // Draw vertices
    ;[v1, v2, v3].forEach((v, i) => {
      ctx.fillStyle = '#facc15'
      ctx.beginPath()
      ctx.arc(v.x, v.y, 6, 0, Math.PI * 2)
      ctx.fill()
    })
  }, [gridSize, showGrid])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <h4 className="text-lg font-semibold text-cyan-400 mb-4">Triangle Rasterization</h4>

      <div className="flex flex-col md:flex-row gap-6">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="rounded-lg border border-omniviz-border mx-auto"
        />

        <div className="flex-1 space-y-4">
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">Resolution: {gridSize}x{gridSize}</label>
            <input
              type="range" min="5" max="50" value={gridSize}
              onChange={(e) => setGridSize(parseInt(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox" checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-omniviz-text">Show Grid</span>
          </label>

          <div className="p-4 bg-omniviz-bg rounded-lg text-omniviz-text text-sm">
            <p className="text-omniviz-text-muted">
              <span className="text-green-400">Green outline</span> = vector triangle<br />
              <span className="text-pink-400">Pink squares</span> = rasterized pixels<br />
              <span className="text-yellow-400">Yellow dots</span> = vertices
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Bezier Demo
function BezierDemo() {
  const canvasRef = useRef(null)
  const [points, setPoints] = useState([
    { x: 50, y: 200 },
    { x: 100, y: 50 },
    { x: 200, y: 50 },
    { x: 250, y: 200 },
  ])
  const [t, setT] = useState(0.5)
  const [dragging, setDragging] = useState(null)

  const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })

  const bezierPoint = (t) => {
    const [p0, p1, p2, p3] = points
    const a = lerp(p0, p1, t)
    const b = lerp(p1, p2, t)
    const c = lerp(p2, p3, t)
    const d = lerp(a, b, t)
    const e = lerp(b, c, t)
    return lerp(d, e, t)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, w, h)

    // Draw control polygon
    ctx.strokeStyle = '#3f3f51'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    points.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
    ctx.stroke()
    ctx.setLineDash([])

    // Draw bezier curve
    ctx.strokeStyle = '#22c55e'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 0; i <= 100; i++) {
      const p = bezierPoint(i / 100)
      ctx.lineTo(p.x, p.y)
    }
    ctx.stroke()

    // Draw intermediate lines at t
    const [p0, p1, p2, p3] = points
    const a = lerp(p0, p1, t)
    const b = lerp(p1, p2, t)
    const c = lerp(p2, p3, t)
    const d = lerp(a, b, t)
    const e = lerp(b, c, t)
    const f = lerp(d, e, t)

    // Level 1 lines
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
    ctx.moveTo(b.x, b.y); ctx.lineTo(c.x, c.y)
    ctx.stroke()

    // Level 2 line
    ctx.strokeStyle = '#f59e0b'
    ctx.beginPath()
    ctx.moveTo(d.x, d.y); ctx.lineTo(e.x, e.y)
    ctx.stroke()

    // Draw control points
    points.forEach((p, i) => {
      ctx.fillStyle = '#ec4899'
      ctx.beginPath()
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.font = '10px sans-serif'
      ctx.fillText(`P${i}`, p.x + 10, p.y - 10)
    })

    // Draw intermediate points
    ;[a, b, c].forEach(p => {
      ctx.fillStyle = '#3b82f6'
      ctx.beginPath()
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2)
      ctx.fill()
    })
    ;[d, e].forEach(p => {
      ctx.fillStyle = '#f59e0b'
      ctx.beginPath()
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw point on curve
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(f.x, f.y, 7, 0, Math.PI * 2)
    ctx.fill()
  }, [points, t])

  const handleMouseMove = (e) => {
    if (dragging === null) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPoints(prev => prev.map((p, i) => i === dragging ? { x, y } : p))
  }

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const idx = points.findIndex(p => Math.hypot(p.x - x, p.y - y) < 15)
    if (idx !== -1) setDragging(idx)
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-col md:flex-row gap-6">
        <canvas
          ref={canvasRef}
          width={300}
          height={250}
          className="rounded-lg border border-omniviz-border mx-auto cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setDragging(null)}
          onMouseLeave={() => setDragging(null)}
        />

        <div className="flex-1 space-y-4">
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">t = {t.toFixed(2)}</label>
            <input
              type="range" min="0" max="1" step="0.01" value={t}
              onChange={(e) => setT(parseFloat(e.target.value))}
              className="w-full accent-green-500"
            />
          </div>

          <div className="p-4 bg-omniviz-bg rounded-lg text-omniviz-text text-sm">
            <p className="text-omniviz-text-muted mb-2">
              <strong>Drag the pink control points!</strong>
            </p>
            <p className="text-omniviz-text-muted">
              <span className="text-pink-400">Pink</span> = control points<br />
              <span className="text-blue-400">Blue</span> = 1st interpolation<br />
              <span className="text-orange-400">Orange</span> = 2nd interpolation<br />
              <span className="text-red-400">Red</span> = point on curve at t
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Shading Demo
function ShadingDemo() {
  const canvasRef = useRef(null)
  const [lightX, setLightX] = useState(150)
  const [lightY, setLightY] = useState(50)
  const [ambient, setAmbient] = useState(0.1)
  const [diffuse, setDiffuse] = useState(0.7)
  const [specular, setSpecular] = useState(0.5)
  const [shininess, setShininess] = useState(32)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const imageData = ctx.createImageData(w, h)

    const sphereCenter = { x: w / 2, y: h / 2, z: 0 }
    const sphereRadius = 80
    const viewDir = { x: 0, y: 0, z: 1 }
    const lightPos = { x: lightX - w/2, y: lightY - h/2, z: 100 }
    const baseColor = { r: 236, g: 72, b: 153 } // Pink

    const normalize = (v) => {
      const len = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z)
      return { x: v.x/len, y: v.y/len, z: v.z/len }
    }

    const dot = (a, b) => a.x*b.x + a.y*b.y + a.z*b.z

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = x - sphereCenter.x
        const dy = y - sphereCenter.y
        const distSq = dx*dx + dy*dy

        const idx = (y * w + x) * 4

        if (distSq <= sphereRadius * sphereRadius) {
          const dz = Math.sqrt(sphereRadius * sphereRadius - distSq)
          const normal = normalize({ x: dx, y: dy, z: dz })
          const lightDir = normalize({ x: lightPos.x - dx, y: lightPos.y - dy, z: lightPos.z - dz })

          // Ambient
          let intensity = ambient

          // Diffuse
          const diff = Math.max(0, dot(normal, lightDir))
          intensity += diffuse * diff

          // Specular
          const reflectDir = {
            x: 2 * dot(normal, lightDir) * normal.x - lightDir.x,
            y: 2 * dot(normal, lightDir) * normal.y - lightDir.y,
            z: 2 * dot(normal, lightDir) * normal.z - lightDir.z,
          }
          const spec = Math.pow(Math.max(0, dot(normalize(reflectDir), viewDir)), shininess)
          intensity += specular * spec

          intensity = Math.min(1, intensity)

          imageData.data[idx] = Math.min(255, baseColor.r * intensity + spec * 255)
          imageData.data[idx + 1] = Math.min(255, baseColor.g * intensity + spec * 255)
          imageData.data[idx + 2] = Math.min(255, baseColor.b * intensity + spec * 255)
          imageData.data[idx + 3] = 255
        } else {
          imageData.data[idx] = 10
          imageData.data[idx + 1] = 10
          imageData.data[idx + 2] = 15
          imageData.data[idx + 3] = 255
        }
      }
    }

    ctx.putImageData(imageData, 0, 0)

    // Draw light indicator
    ctx.fillStyle = '#facc15'
    ctx.beginPath()
    ctx.arc(lightX, lightY, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = '12px sans-serif'
    ctx.fillText('💡', lightX - 8, lightY - 12)
  }, [lightX, lightY, ambient, diffuse, specular, shininess])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <h4 className="text-lg font-semibold text-yellow-400 mb-4">Phong Shading Model</h4>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={250}
            height={250}
            className="rounded-lg border border-omniviz-border mx-auto cursor-pointer"
            onMouseMove={(e) => {
              const rect = e.target.getBoundingClientRect()
              setLightX(e.clientX - rect.left)
              setLightY(e.clientY - rect.top)
            }}
          />
          <div className="text-xs text-omniviz-text-muted text-center mt-2">Move mouse to move light</div>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">Ambient: {ambient.toFixed(2)}</label>
            <input type="range" min="0" max="0.5" step="0.01" value={ambient}
              onChange={(e) => setAmbient(parseFloat(e.target.value))} className="w-full accent-gray-500" />
          </div>
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">Diffuse: {diffuse.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.01" value={diffuse}
              onChange={(e) => setDiffuse(parseFloat(e.target.value))} className="w-full accent-pink-500" />
          </div>
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">Specular: {specular.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.01" value={specular}
              onChange={(e) => setSpecular(parseFloat(e.target.value))} className="w-full accent-white" />
          </div>
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">Shininess: {shininess}</label>
            <input type="range" min="1" max="128" value={shininess}
              onChange={(e) => setShininess(parseInt(e.target.value))} className="w-full accent-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Ray Tracing Demo
function RayTracingDemo() {
  const canvasRef = useRef(null)
  const [isRendering, setIsRendering] = useState(false)
  const [progress, setProgress] = useState(0)

  const render = () => {
    setIsRendering(true)
    setProgress(0)

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const imageData = ctx.createImageData(w, h)

    // Scene: spheres and a ground plane
    const spheres = [
      { center: { x: 0, y: 0, z: 5 }, radius: 1, color: { r: 255, g: 100, b: 100 }, reflective: 0.3 },
      { center: { x: 2.5, y: 0.5, z: 6 }, radius: 1.5, color: { r: 100, g: 255, b: 100 }, reflective: 0.5 },
      { center: { x: -2, y: -0.5, z: 4 }, radius: 0.8, color: { r: 100, g: 100, b: 255 }, reflective: 0.2 },
    ]

    const lightPos = { x: -5, y: 5, z: 0 }
    const cameraPos = { x: 0, y: 0, z: -3 }

    const normalize = (v) => {
      const len = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z)
      return { x: v.x/len, y: v.y/len, z: v.z/len }
    }

    const sub = (a, b) => ({ x: a.x-b.x, y: a.y-b.y, z: a.z-b.z })
    const add = (a, b) => ({ x: a.x+b.x, y: a.y+b.y, z: a.z+b.z })
    const scale = (v, s) => ({ x: v.x*s, y: v.y*s, z: v.z*s })
    const dot = (a, b) => a.x*b.x + a.y*b.y + a.z*b.z

    const intersectSphere = (origin, dir, sphere) => {
      const oc = sub(origin, sphere.center)
      const a = dot(dir, dir)
      const b = 2 * dot(oc, dir)
      const c = dot(oc, oc) - sphere.radius * sphere.radius
      const disc = b*b - 4*a*c
      if (disc < 0) return null
      const t = (-b - Math.sqrt(disc)) / (2*a)
      if (t < 0.001) return null
      return t
    }

    const trace = (origin, dir, depth = 0) => {
      if (depth > 2) return { r: 20, g: 20, b: 30 }

      let closest = Infinity
      let hitSphere = null

      for (const sphere of spheres) {
        const t = intersectSphere(origin, dir, sphere)
        if (t && t < closest) {
          closest = t
          hitSphere = sphere
        }
      }

      // Ground plane at y = -1
      if (dir.y < 0) {
        const t = (-1 - origin.y) / dir.y
        if (t > 0.001 && t < closest) {
          const hitPoint = add(origin, scale(dir, t))
          const checker = (Math.floor(hitPoint.x) + Math.floor(hitPoint.z)) % 2
          return checker ? { r: 80, g: 80, b: 80 } : { r: 40, g: 40, b: 40 }
        }
      }

      if (!hitSphere) return { r: 20, g: 20, b: 30 }

      const hitPoint = add(origin, scale(dir, closest))
      const normal = normalize(sub(hitPoint, hitSphere.center))
      const toLight = normalize(sub(lightPos, hitPoint))

      // Shadow check
      let inShadow = false
      for (const sphere of spheres) {
        if (sphere === hitSphere) continue
        if (intersectSphere(hitPoint, toLight, sphere)) {
          inShadow = true
          break
        }
      }

      const ambient = 0.1
      const diffuseStrength = inShadow ? 0 : Math.max(0, dot(normal, toLight))
      const intensity = ambient + 0.7 * diffuseStrength

      let color = {
        r: hitSphere.color.r * intensity,
        g: hitSphere.color.g * intensity,
        b: hitSphere.color.b * intensity,
      }

      // Reflection
      if (hitSphere.reflective > 0) {
        const reflectDir = sub(dir, scale(normal, 2 * dot(dir, normal)))
        const reflectColor = trace(hitPoint, normalize(reflectDir), depth + 1)
        color.r = color.r * (1 - hitSphere.reflective) + reflectColor.r * hitSphere.reflective
        color.g = color.g * (1 - hitSphere.reflective) + reflectColor.g * hitSphere.reflective
        color.b = color.b * (1 - hitSphere.reflective) + reflectColor.b * hitSphere.reflective
      }

      return color
    }

    let row = 0
    const renderRow = () => {
      if (row >= h) {
        ctx.putImageData(imageData, 0, 0)
        setIsRendering(false)
        return
      }

      for (let x = 0; x < w; x++) {
        const px = (x / w - 0.5) * 2
        const py = (0.5 - row / h) * 2
        const rayDir = normalize({ x: px, y: py, z: 1 })
        const color = trace(cameraPos, rayDir)
        const idx = (row * w + x) * 4
        imageData.data[idx] = Math.min(255, color.r)
        imageData.data[idx + 1] = Math.min(255, color.g)
        imageData.data[idx + 2] = Math.min(255, color.b)
        imageData.data[idx + 3] = 255
      }

      row++
      setProgress(Math.round(row / h * 100))
      requestAnimationFrame(renderRow)
    }

    renderRow()
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <h4 className="text-lg font-semibold text-red-400 mb-4">Simple Ray Tracer</h4>

      <div className="flex flex-col items-center gap-4">
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          className="rounded-lg border border-omniviz-border bg-gray-900"
        />

        <div className="flex items-center gap-4">
          <button
            onClick={render}
            disabled={isRendering}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            {isRendering ? `Rendering... ${progress}%` : 'Render Scene'}
          </button>
        </div>

        <div className="text-sm text-omniviz-text-muted text-center">
          Features: 3 reflective spheres, checkerboard floor, soft shadows, recursive reflections
        </div>
      </div>
    </div>
  )
}

export default ComputerGraphicsConcept
