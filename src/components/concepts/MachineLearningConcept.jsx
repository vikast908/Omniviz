import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function MachineLearningConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Machine Learning Algorithms" color="green" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">
                Machine Learning Algorithms
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Classical algorithms that learn patterns from data. From simple linear models to complex ensemble methods.
              </motion.p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Supervised', desc: 'Learn from labeled data', icon: '🎯', color: 'green' },
                { title: 'Unsupervised', desc: 'Find hidden patterns', icon: '🔍', color: 'blue' },
                { title: 'Ensemble', desc: 'Combine multiple models', icon: '🌲', color: 'orange' },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="p-6 bg-omniviz-surface rounded-2xl border border-omniviz-border">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className={`text-lg font-semibold text-${item.color}-400 mb-2`}>{item.title}</h3>
                  <p className="text-omniviz-text-muted text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section title="Linear Regression" id="linear-regression">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Fitting a Line to Data</h3>
              <p className="text-omniviz-text-muted mb-4">
                <strong className="text-green-400">Linear regression</strong> finds the best-fit line through data points
                by minimizing the sum of squared errors. The formula is: <code className="text-cyan-400">y = mx + b</code>
              </p>
            </ExplanationCard>
            <div className="mt-8"><LinearRegressionDemo /></div>
          </Section>

          <Section title="K-Nearest Neighbors" id="knn">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Classification by Proximity</h3>
              <p className="text-omniviz-text-muted mb-4">
                <strong className="text-blue-400">KNN</strong> classifies a point based on the majority class of its K nearest neighbors.
                Simple but powerful for many classification tasks.
              </p>
            </ExplanationCard>
            <div className="mt-8"><KNNDemo /></div>
          </Section>

          <Section title="K-Means Clustering" id="kmeans">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Grouping Similar Data</h3>
              <p className="text-omniviz-text-muted mb-4">
                <strong className="text-purple-400">K-Means</strong> partitions data into K clusters by iteratively updating
                cluster centers (centroids) to minimize within-cluster variance.
              </p>
            </ExplanationCard>
            <div className="mt-8"><KMeansDemo /></div>
          </Section>

          <Section title="Decision Trees" id="decision-tree">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">If-Then Rules</h3>
              <p className="text-omniviz-text-muted mb-4">
                <strong className="text-orange-400">Decision trees</strong> split data based on feature thresholds,
                creating a tree of decisions. Easy to interpret and visualize.
              </p>
            </ExplanationCard>
            <div className="mt-8"><DecisionTreeDemo /></div>
          </Section>

          <Section title="Gradient Descent" id="gradient-descent">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-red-400 mb-4">Optimization by Following the Slope</h3>
              <p className="text-omniviz-text-muted mb-4">
                <strong className="text-red-400">Gradient descent</strong> finds the minimum of a function by taking
                steps proportional to the negative gradient. The learning rate controls step size.
              </p>
            </ExplanationCard>
            <div className="mt-8"><GradientDescentDemo /></div>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({ title, id, children }) {
  return (
    <motion.section id={id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="py-12 border-b border-omniviz-border last:border-0">
      {title && <h2 className="text-2xl font-bold mb-8 text-omniviz-text">{title}</h2>}
      {children}
    </motion.section>
  )
}

function ExplanationCard({ children }) {
  return <div className="bg-omniviz-surface rounded-2xl p-8 border border-omniviz-border">{children}</div>
}

function LinearRegressionDemo() {
  const canvasRef = useRef(null)
  const [points, setPoints] = useState([
    { x: 50, y: 200 }, { x: 80, y: 180 }, { x: 120, y: 150 }, { x: 150, y: 140 },
    { x: 180, y: 120 }, { x: 220, y: 100 }, { x: 250, y: 80 }, { x: 280, y: 70 }
  ])
  const [slope, setSlope] = useState(0)
  const [intercept, setIntercept] = useState(0)

  useEffect(() => {
    const n = points.length
    const sumX = points.reduce((a, p) => a + p.x, 0)
    const sumY = points.reduce((a, p) => a + p.y, 0)
    const sumXY = points.reduce((a, p) => a + p.x * p.y, 0)
    const sumX2 = points.reduce((a, p) => a + p.x * p.x, 0)
    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const b = (sumY - m * sumX) / n
    setSlope(m)
    setIntercept(b)
  }, [points])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width, h = canvas.height
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, w, h)

    // Grid
    ctx.strokeStyle = '#2a2a3d'
    for (let x = 0; x <= w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
    for (let y = 0; y <= h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }

    // Regression line
    ctx.strokeStyle = '#22c55e'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, intercept)
    ctx.lineTo(w, slope * w + intercept)
    ctx.stroke()

    // Points
    points.forEach(p => {
      ctx.fillStyle = '#3b82f6'
      ctx.beginPath()
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2)
      ctx.fill()
    })
  }, [points, slope, intercept])

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPoints([...points, { x, y }])
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-col md:flex-row gap-6">
        <canvas ref={canvasRef} width={350} height={250} onClick={handleClick} className="rounded-lg border border-omniviz-border cursor-crosshair mx-auto" />
        <div className="flex-1 space-y-4">
          <div className="p-4 bg-omniviz-bg rounded-lg text-omniviz-text">
            <div className="text-sm text-omniviz-text-muted mb-2">Regression Equation:</div>
            <div className="font-mono text-green-400">y = {slope.toFixed(3)}x + {intercept.toFixed(1)}</div>
          </div>
          <p className="text-sm text-omniviz-text-muted">Click on the canvas to add data points. The green line will adjust to best fit all points.</p>
          <button onClick={() => setPoints([])} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">Clear Points</button>
        </div>
      </div>
    </div>
  )
}

function KNNDemo() {
  const canvasRef = useRef(null)
  const [k, setK] = useState(3)
  const [points] = useState([
    ...Array(15).fill(0).map(() => ({ x: 50 + Math.random() * 100, y: 50 + Math.random() * 100, class: 0 })),
    ...Array(15).fill(0).map(() => ({ x: 150 + Math.random() * 100, y: 150 + Math.random() * 100, class: 1 })),
  ])
  const [testPoint, setTestPoint] = useState({ x: 150, y: 100 })
  const [prediction, setPrediction] = useState(null)

  useEffect(() => {
    const distances = points.map(p => ({
      ...p,
      dist: Math.sqrt((p.x - testPoint.x) ** 2 + (p.y - testPoint.y) ** 2)
    })).sort((a, b) => a.dist - b.dist)

    const neighbors = distances.slice(0, k)
    const votes = neighbors.reduce((acc, n) => { acc[n.class] = (acc[n.class] || 0) + 1; return acc }, {})
    setPrediction(votes[0] > votes[1] ? 0 : 1)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, 300, 250)

    // Draw all points
    points.forEach(p => {
      ctx.fillStyle = p.class === 0 ? '#3b82f6' : '#ef4444'
      ctx.beginPath()
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw lines to k nearest
    neighbors.forEach(n => {
      ctx.strokeStyle = '#6b7280'
      ctx.setLineDash([3, 3])
      ctx.beginPath()
      ctx.moveTo(testPoint.x, testPoint.y)
      ctx.lineTo(n.x, n.y)
      ctx.stroke()
      ctx.setLineDash([])
    })

    // Draw test point
    ctx.fillStyle = prediction === 0 ? '#3b82f6' : '#ef4444'
    ctx.strokeStyle = '#facc15'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(testPoint.x, testPoint.y, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }, [points, testPoint, k, prediction])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-col md:flex-row gap-6">
        <canvas
          ref={canvasRef} width={300} height={250}
          className="rounded-lg border border-omniviz-border cursor-pointer mx-auto"
          onClick={(e) => {
            const rect = e.target.getBoundingClientRect()
            setTestPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top })
          }}
        />
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">K = {k}</label>
            <input type="range" min="1" max="10" value={k} onChange={(e) => setK(parseInt(e.target.value))} className="w-full accent-blue-500" />
          </div>
          <div className="p-4 bg-omniviz-bg rounded-lg text-omniviz-text">
            <div className="flex items-center gap-4">
              <span className="text-omniviz-text-muted">Prediction:</span>
              <span className={`font-bold ${prediction === 0 ? 'text-blue-400' : 'text-red-400'}`}>
                Class {prediction === 0 ? 'Blue' : 'Red'}
              </span>
            </div>
          </div>
          <p className="text-sm text-omniviz-text-muted">Click to place test point. It's classified by the majority of its K nearest neighbors.</p>
        </div>
      </div>
    </div>
  )
}

function KMeansDemo() {
  const canvasRef = useRef(null)
  const [k, setK] = useState(3)
  const [points, setPoints] = useState(() => Array(50).fill(0).map(() => ({ x: 30 + Math.random() * 240, y: 30 + Math.random() * 190, cluster: -1 })))
  const [centroids, setCentroids] = useState([])
  const [iteration, setIteration] = useState(0)
  const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6']

  const initCentroids = () => {
    const c = Array(k).fill(0).map(() => ({ x: 30 + Math.random() * 240, y: 30 + Math.random() * 190 }))
    setCentroids(c)
    setIteration(0)
    setPoints(points.map(p => ({ ...p, cluster: -1 })))
  }

  const step = () => {
    if (centroids.length === 0) return
    // Assign points to nearest centroid
    const newPoints = points.map(p => {
      let minDist = Infinity, cluster = 0
      centroids.forEach((c, i) => {
        const d = Math.sqrt((p.x - c.x) ** 2 + (p.y - c.y) ** 2)
        if (d < minDist) { minDist = d; cluster = i }
      })
      return { ...p, cluster }
    })
    setPoints(newPoints)

    // Update centroids
    const newCentroids = centroids.map((_, i) => {
      const clusterPoints = newPoints.filter(p => p.cluster === i)
      if (clusterPoints.length === 0) return centroids[i]
      return {
        x: clusterPoints.reduce((a, p) => a + p.x, 0) / clusterPoints.length,
        y: clusterPoints.reduce((a, p) => a + p.y, 0) / clusterPoints.length
      }
    })
    setCentroids(newCentroids)
    setIteration(i => i + 1)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, 300, 250)

    points.forEach(p => {
      ctx.fillStyle = p.cluster >= 0 ? colors[p.cluster] : '#6b7280'
      ctx.beginPath()
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2)
      ctx.fill()
    })

    centroids.forEach((c, i) => {
      ctx.fillStyle = colors[i]
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(c.x, c.y, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    })
  }, [points, centroids])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-col md:flex-row gap-6">
        <canvas ref={canvasRef} width={300} height={250} className="rounded-lg border border-omniviz-border mx-auto" />
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">K = {k}</label>
            <input type="range" min="2" max="5" value={k} onChange={(e) => setK(parseInt(e.target.value))} className="w-full accent-purple-500" />
          </div>
          <div className="flex gap-2">
            <button onClick={initCentroids} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">Initialize</button>
            <button onClick={step} disabled={centroids.length === 0} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors">Step</button>
          </div>
          <div className="p-4 bg-omniviz-bg rounded-lg text-omniviz-text">
            <span className="text-omniviz-text-muted">Iteration: </span>
            <span className="text-purple-400 font-bold">{iteration}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function DecisionTreeDemo() {
  const [humidity, setHumidity] = useState(70)
  const [wind, setWind] = useState(false)
  const [outlook, setOutlook] = useState('sunny')

  const predict = () => {
    if (outlook === 'rainy') return wind ? 'No' : 'Yes'
    if (outlook === 'overcast') return 'Yes'
    return humidity <= 70 ? 'Yes' : 'No'
  }

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-2">Outlook</label>
            <select value={outlook} onChange={(e) => setOutlook(e.target.value)} className="w-full bg-omniviz-bg text-omniviz-text rounded-lg border border-omniviz-border px-4 py-2">
              <option value="sunny">Sunny</option>
              <option value="overcast">Overcast</option>
              <option value="rainy">Rainy</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">Humidity: {humidity}%</label>
            <input type="range" min="30" max="100" value={humidity} onChange={(e) => setHumidity(parseInt(e.target.value))} className="w-full accent-orange-500" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={wind} onChange={(e) => setWind(e.target.checked)} className="w-4 h-4" />
            <span className="text-omniviz-text">Windy</span>
          </label>
          <div className="p-4 bg-omniviz-bg rounded-lg">
            <span className="text-omniviz-text-muted">Play Tennis? </span>
            <span className={`font-bold text-xl ${predict() === 'Yes' ? 'text-green-400' : 'text-red-400'}`}>{predict()}</span>
          </div>
        </div>
        <div className="p-4 bg-omniviz-bg rounded-lg text-sm font-mono text-omniviz-text">
          <div className={outlook === 'sunny' ? 'text-yellow-400' : ''}>if outlook == sunny:</div>
          <div className={outlook === 'sunny' && humidity <= 70 ? 'text-green-400 ml-4' : 'ml-4'}>  if humidity &lt;= 70: Yes</div>
          <div className={outlook === 'sunny' && humidity > 70 ? 'text-red-400 ml-4' : 'ml-4'}>  else: No</div>
          <div className={outlook === 'overcast' ? 'text-green-400' : ''}>elif outlook == overcast: Yes</div>
          <div className={outlook === 'rainy' ? 'text-cyan-400' : ''}>elif outlook == rainy:</div>
          <div className={outlook === 'rainy' && !wind ? 'text-green-400 ml-4' : 'ml-4'}>  if not windy: Yes</div>
          <div className={outlook === 'rainy' && wind ? 'text-red-400 ml-4' : 'ml-4'}>  else: No</div>
        </div>
      </div>
    </div>
  )
}

function GradientDescentDemo() {
  const canvasRef = useRef(null)
  const [x, setX] = useState(4)
  const [lr, setLr] = useState(0.1)
  const [history, setHistory] = useState([4])
  const f = (x) => x * x // Simple parabola
  const df = (x) => 2 * x // Derivative

  const step = () => {
    const newX = x - lr * df(x)
    setX(newX)
    setHistory([...history, newX])
  }

  const reset = () => {
    setX(4)
    setHistory([4])
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width, h = canvas.height
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, w, h)

    // Draw function
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let px = 0; px < w; px++) {
      const xVal = (px - w/2) / 30
      const yVal = f(xVal)
      const py = h/2 - yVal * 10
      if (px === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.stroke()

    // Draw path
    ctx.strokeStyle = '#ef4444'
    ctx.lineWidth = 1
    ctx.beginPath()
    history.forEach((xVal, i) => {
      const px = w/2 + xVal * 30
      const py = h/2 - f(xVal) * 10
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    })
    ctx.stroke()

    // Draw current point
    const px = w/2 + x * 30
    const py = h/2 - f(x) * 10
    ctx.fillStyle = '#22c55e'
    ctx.beginPath()
    ctx.arc(px, py, 8, 0, Math.PI * 2)
    ctx.fill()
  }, [x, history])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex flex-col md:flex-row gap-6">
        <canvas ref={canvasRef} width={300} height={200} className="rounded-lg border border-omniviz-border mx-auto" />
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-sm text-omniviz-text-muted block mb-1">Learning Rate: {lr}</label>
            <input type="range" min="0.01" max="0.5" step="0.01" value={lr} onChange={(e) => setLr(parseFloat(e.target.value))} className="w-full accent-red-500" />
          </div>
          <div className="p-4 bg-omniviz-bg rounded-lg text-omniviz-text">
            <div>x = {x.toFixed(4)}</div>
            <div>f(x) = x² = {f(x).toFixed(4)}</div>
            <div className="text-omniviz-text-muted text-sm">Steps: {history.length - 1}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={step} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Step</button>
            <button onClick={reset} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">Reset</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MachineLearningConcept
