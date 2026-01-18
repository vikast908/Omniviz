import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ConceptHeader from '../shared/Header'

function ComputerVisionConcept() {
  return (
    <div className="w-full min-h-screen bg-omniviz-bg transition-colors duration-300">
      <ConceptHeader title="Computer Vision" color="purple" />
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-omniviz-text">Computer Vision</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-omniviz-text-muted max-w-3xl mx-auto">
                Teaching machines to interpret and understand visual information from the world.
              </motion.p>
            </div>
          </Section>

          <Section title="Image Filtering" id="filtering">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Convolution Kernels</h3>
              <p className="text-omniviz-text-muted mb-4">Image filters apply convolution kernels to detect edges, blur, sharpen, or extract features from images.</p>
            </ExplanationCard>
            <div className="mt-8"><FilteringDemo /></div>
          </Section>

          <Section title="Edge Detection" id="edges">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-green-400 mb-4">Finding Boundaries</h3>
              <p className="text-omniviz-text-muted mb-4">Edge detection identifies points where image brightness changes sharply, revealing object boundaries.</p>
            </ExplanationCard>
            <div className="mt-8"><EdgeDetectionDemo /></div>
          </Section>

          <Section title="Image Classification" id="classification">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-orange-400 mb-4">What's in the Image?</h3>
              <p className="text-omniviz-text-muted mb-4">CNNs classify images by learning hierarchical features from edges to textures to objects.</p>
            </ExplanationCard>
            <div className="mt-8"><ClassificationDemo /></div>
          </Section>

          <Section title="Object Detection" id="detection">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Finding Objects with Bounding Boxes</h3>
              <p className="text-omniviz-text-muted mb-4">Object detection locates and classifies multiple objects within an image using bounding boxes.</p>
            </ExplanationCard>
            <div className="mt-8"><ObjectDetectionDemo /></div>
          </Section>

          <Section title="Image Segmentation" id="segmentation">
            <ExplanationCard>
              <h3 className="text-lg font-semibold text-red-400 mb-4">Pixel-Level Classification</h3>
              <p className="text-omniviz-text-muted mb-4">Segmentation assigns each pixel to a class, creating precise boundaries around objects.</p>
            </ExplanationCard>
            <div className="mt-8"><SegmentationDemo /></div>
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

function FilteringDemo() {
  const canvasRef = useRef(null)
  const [kernel, setKernel] = useState('identity')

  const kernels = {
    identity: { name: 'Identity', matrix: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] },
    blur: { name: 'Box Blur', matrix: [[1/9, 1/9, 1/9], [1/9, 1/9, 1/9], [1/9, 1/9, 1/9]] },
    sharpen: { name: 'Sharpen', matrix: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]] },
    emboss: { name: 'Emboss', matrix: [[-2, -1, 0], [-1, 1, 1], [0, 1, 2]] },
    edge: { name: 'Edge Detect', matrix: [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]] }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const w = canvas.width = 200
    const h = canvas.height = 150

    // Draw a simple scene
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, w, h)

    // Sky gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h/2)
    grad.addColorStop(0, '#2d3a4d')
    grad.addColorStop(1, '#4a5568')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h/2)

    // Ground
    ctx.fillStyle = '#2d5a3d'
    ctx.fillRect(0, h/2, w, h/2)

    // House
    ctx.fillStyle = '#8b4513'
    ctx.fillRect(60, 60, 60, 50)
    ctx.fillStyle = '#654321'
    ctx.beginPath()
    ctx.moveTo(50, 60)
    ctx.lineTo(90, 30)
    ctx.lineTo(130, 60)
    ctx.fill()

    // Sun
    ctx.fillStyle = '#ffd700'
    ctx.beginPath()
    ctx.arc(160, 40, 20, 0, Math.PI * 2)
    ctx.fill()

    // Apply convolution filter
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const k = kernels[kernel].matrix
    const newData = new Uint8ClampedArray(data.length)

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let sum = 0
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const idx = ((y + ky) * w + (x + kx)) * 4 + c
              sum += data[idx] * k[ky + 1][kx + 1]
            }
          }
          newData[(y * w + x) * 4 + c] = sum
        }
        newData[(y * w + x) * 4 + 3] = 255
      }
    }

    ctx.putImageData(new ImageData(newData, w, h), 0, 0)
  }, [kernel])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Filtered Image</h4>
          <canvas ref={canvasRef} className="w-full rounded-lg border border-omniviz-border" />
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.entries(kernels).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setKernel(key)}
                className={`px-3 py-1 rounded text-sm ${kernel === key ? 'bg-blue-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
              >
                {val.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Kernel Matrix</h4>
          <div className="grid grid-cols-3 gap-1 w-32 mb-4">
            {kernels[kernel].matrix.flat().map((v, i) => (
              <div key={i} className="bg-omniviz-bg p-2 text-center text-omniviz-text font-mono text-xs rounded">
                {v.toFixed(2)}
              </div>
            ))}
          </div>
          <p className="text-omniviz-text-muted text-sm">
            The kernel slides over each pixel, multiplying neighboring values and summing to produce the output.
          </p>
        </div>
      </div>
    </div>
  )
}

function EdgeDetectionDemo() {
  const canvasRef = useRef(null)
  const [threshold, setThreshold] = useState(30)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const w = canvas.width = 200
    const h = canvas.height = 150

    // Draw shapes
    ctx.fillStyle = '#333'
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = '#fff'
    ctx.fillRect(30, 30, 50, 50)

    ctx.beginPath()
    ctx.arc(140, 75, 35, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(90, 120)
    ctx.lineTo(110, 80)
    ctx.lineTo(130, 120)
    ctx.fill()

    // Sobel edge detection
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const gray = new Float32Array(w * h)

    // Convert to grayscale
    for (let i = 0; i < data.length; i += 4) {
      gray[i / 4] = (data[i] + data[i + 1] + data[i + 2]) / 3
    }

    // Sobel operators
    const sobelX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]
    const sobelY = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]]

    const edges = new Uint8ClampedArray(data.length)

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        let gx = 0, gy = 0
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const val = gray[(y + ky) * w + (x + kx)]
            gx += val * sobelX[ky + 1][kx + 1]
            gy += val * sobelY[ky + 1][kx + 1]
          }
        }
        const mag = Math.sqrt(gx * gx + gy * gy)
        const edgeVal = mag > threshold ? 255 : 0
        const idx = (y * w + x) * 4
        edges[idx] = edges[idx + 1] = edges[idx + 2] = edgeVal
        edges[idx + 3] = 255
      }
    }

    ctx.putImageData(new ImageData(edges, w, h), 0, 0)
  }, [threshold])

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Detected Edges</h4>
          <canvas ref={canvasRef} className="w-full rounded-lg border border-omniviz-border" />
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Threshold: {threshold}</h4>
          <input
            type="range"
            min="10"
            max="100"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full mb-4"
          />
          <div className="p-3 bg-omniviz-bg rounded-lg text-sm">
            <p className="text-omniviz-text-muted mb-2">Sobel operators detect gradients:</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-green-400 text-xs mb-1">Horizontal (Gx)</div>
                <div className="grid grid-cols-3 gap-0.5 text-xs font-mono">
                  {[[-1,0,1],[-2,0,2],[-1,0,1]].flat().map((v, i) => (
                    <span key={i} className="bg-omniviz-surface p-1 text-center text-omniviz-text">{v}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-green-400 text-xs mb-1">Vertical (Gy)</div>
                <div className="grid grid-cols-3 gap-0.5 text-xs font-mono">
                  {[[-1,-2,-1],[0,0,0],[1,2,1]].flat().map((v, i) => (
                    <span key={i} className="bg-omniviz-surface p-1 text-center text-omniviz-text">{v}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-omniviz-text-muted mt-2">Edge magnitude = √(Gx² + Gy²)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClassificationDemo() {
  const [selected, setSelected] = useState(null)

  const images = [
    { emoji: '🐱', label: 'Cat', confidence: [0.92, 0.05, 0.02, 0.01], classes: ['Cat', 'Dog', 'Bird', 'Fish'] },
    { emoji: '🐕', label: 'Dog', confidence: [0.03, 0.89, 0.05, 0.03], classes: ['Cat', 'Dog', 'Bird', 'Fish'] },
    { emoji: '🚗', label: 'Car', confidence: [0.95, 0.03, 0.01, 0.01], classes: ['Car', 'Truck', 'Bike', 'Bus'] },
    { emoji: '✈️', label: 'Airplane', confidence: [0.88, 0.06, 0.04, 0.02], classes: ['Airplane', 'Bird', 'Drone', 'Helicopter'] }
  ]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Select an Image</h4>
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(img)}
                className={`p-4 text-4xl rounded-lg transition-all ${selected === img ? 'bg-orange-500/20 border-2 border-orange-500 scale-110' : 'bg-omniviz-bg border border-omniviz-border hover:scale-105'}`}
              >
                {img.emoji}
              </button>
            ))}
          </div>
        </div>
        <div>
          {selected ? (
            <>
              <h4 className="text-omniviz-text font-semibold mb-4">Classification Result</h4>
              <div className="space-y-2">
                {selected.classes.map((cls, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-omniviz-text w-24">{cls}</span>
                    <div className="flex-1 h-4 bg-omniviz-bg rounded-full overflow-hidden">
                      <div
                        className={`h-full ${i === 0 ? 'bg-green-500' : 'bg-gray-500'}`}
                        style={{ width: `${selected.confidence[i] * 100}%` }}
                      />
                    </div>
                    <span className={`w-16 text-right font-mono text-sm ${i === 0 ? 'text-green-400' : 'text-omniviz-text-muted'}`}>
                      {(selected.confidence[i] * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
                <span className="text-green-400">Predicted: {selected.label}</span>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-omniviz-text-muted">
              Click an image to classify
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ObjectDetectionDemo() {
  const [showBoxes, setShowBoxes] = useState(true)

  const objects = [
    { label: 'Person', x: 20, y: 30, w: 25, h: 45, confidence: 0.94, color: 'green' },
    { label: 'Car', x: 55, y: 50, w: 35, h: 25, confidence: 0.87, color: 'blue' },
    { label: 'Dog', x: 10, y: 60, w: 15, h: 20, confidence: 0.76, color: 'orange' }
  ]

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowBoxes(!showBoxes)}
          className={`px-4 py-2 rounded-lg ${showBoxes ? 'bg-cyan-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}
        >
          {showBoxes ? 'Hide Boxes' : 'Show Boxes'}
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative bg-omniviz-bg rounded-lg h-64 overflow-hidden">
          {/* Background scene */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-green-900/50" />

          {/* Scene elements */}
          <div className="absolute text-4xl" style={{ left: '25%', top: '35%' }}>🧑</div>
          <div className="absolute text-3xl" style={{ left: '60%', top: '55%' }}>🚗</div>
          <div className="absolute text-2xl" style={{ left: '12%', top: '65%' }}>🐕</div>

          {/* Bounding boxes */}
          {showBoxes && objects.map((obj, i) => (
            <div
              key={i}
              className={`absolute border-2 border-${obj.color}-500`}
              style={{
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                width: `${obj.w}%`,
                height: `${obj.h}%`
              }}
            >
              <div className={`absolute -top-6 left-0 px-1 bg-${obj.color}-500 text-white text-xs rounded`}>
                {obj.label} {(obj.confidence * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">Detected Objects</h4>
          <div className="space-y-2">
            {objects.map((obj, i) => (
              <div key={i} className={`p-3 rounded-lg bg-${obj.color}-500/20 border border-${obj.color}-500`}>
                <div className="flex justify-between items-center">
                  <span className={`text-${obj.color}-400 font-semibold`}>{obj.label}</span>
                  <span className="text-omniviz-text font-mono">{(obj.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="text-omniviz-text-muted text-xs mt-1">
                  Box: ({obj.x}, {obj.y}) - {obj.w}×{obj.h}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-omniviz-text-muted text-sm">
            Models like YOLO and Faster R-CNN predict bounding boxes and class labels simultaneously.
          </p>
        </div>
      </div>
    </div>
  )
}

function SegmentationDemo() {
  const [mode, setMode] = useState('semantic')

  return (
    <div className="bg-omniviz-surface rounded-2xl p-6 border border-omniviz-border">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setMode('semantic')} className={`px-4 py-2 rounded-lg ${mode === 'semantic' ? 'bg-red-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>
          Semantic
        </button>
        <button onClick={() => setMode('instance')} className={`px-4 py-2 rounded-lg ${mode === 'instance' ? 'bg-red-500 text-white' : 'bg-omniviz-bg text-omniviz-text border border-omniviz-border'}`}>
          Instance
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-48 rounded-lg overflow-hidden">
          {/* Sky */}
          <div className="absolute inset-x-0 top-0 h-1/3 bg-blue-500/70" />
          {/* Ground */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-green-500/70" />
          {/* Road */}
          <div className="absolute inset-x-0 top-1/3 h-1/3 bg-gray-500/70" />

          {mode === 'instance' && (
            <>
              {/* Person 1 */}
              <div className="absolute w-8 h-16 bg-purple-500/70 rounded-t-full" style={{ left: '20%', top: '35%' }} />
              {/* Person 2 */}
              <div className="absolute w-8 h-16 bg-pink-500/70 rounded-t-full" style={{ left: '35%', top: '35%' }} />
              {/* Car 1 */}
              <div className="absolute w-16 h-10 bg-orange-500/70 rounded" style={{ left: '60%', top: '40%' }} />
              {/* Car 2 */}
              <div className="absolute w-16 h-10 bg-yellow-500/70 rounded" style={{ left: '75%', top: '40%' }} />
            </>
          )}
        </div>
        <div>
          <h4 className="text-omniviz-text font-semibold mb-4">{mode === 'semantic' ? 'Semantic Segmentation' : 'Instance Segmentation'}</h4>
          <div className="space-y-2">
            {mode === 'semantic' ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded" />
                  <span className="text-omniviz-text">Sky</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-500 rounded" />
                  <span className="text-omniviz-text">Road</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded" />
                  <span className="text-omniviz-text">Grass</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-500 rounded" />
                  <span className="text-omniviz-text">Person #1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-pink-500 rounded" />
                  <span className="text-omniviz-text">Person #2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded" />
                  <span className="text-omniviz-text">Car #1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-500 rounded" />
                  <span className="text-omniviz-text">Car #2</span>
                </div>
              </>
            )}
          </div>
          <p className="mt-4 text-omniviz-text-muted text-sm">
            {mode === 'semantic' ? 'Semantic: Labels each pixel with a class (all cars are "car")' : 'Instance: Distinguishes individual objects (car #1 vs car #2)'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ComputerVisionConcept
