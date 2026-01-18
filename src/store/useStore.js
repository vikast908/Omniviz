import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Token colors for consistent visualization
const TOKEN_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#3b82f6', '#a855f7', '#ec4899', '#14b8a6'
]

// Get initial theme from HTML attribute (set by index.html script)
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    // First check what's already set on the document (from index.html)
    const htmlTheme = document.documentElement.getAttribute('data-theme')
    if (htmlTheme) return htmlTheme

    // Fallback to localStorage or system preference
    const stored = localStorage.getItem('omniviz-theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'dark'
}

export const useStore = create((set, get) => ({
  // Theme state
  theme: getInitialTheme(),

  // Concept selection (null = landing page)
  selectedConcept: null,

  // Zoom level (0-3 representing the 4 levels)
  zoomLevel: 0,
  zoomProgress: 0, // 0-1 progress within current level transition

  // Input/Output state
  inputText: 'The quick brown fox',
  outputText: '',
  isGenerating: false,

  // Tokenization state
  tokens: [],
  tokenIds: [],
  embeddings: [],

  // Model state
  selectedModel: 'gpt2',
  temperature: 0.7,
  currentLayer: 1,
  maxLayers: 12,
  showAttentionLines: false,

  // Attention visualization
  attentionWeights: [],
  qMatrix: [],
  kMatrix: [],
  vMatrix: [],
  attentionHeatmap: [],

  // Hover state
  hoveredTokenIndex: null,
  focusedComponent: null, // Which component is focused/zoomed

  // Animation state
  isPlaying: true,
  animationSpeed: 1, // 0.5x, 1x, 2x
  currentStep: 0, // Current step in the data flow
  totalSteps: 6, // Total steps in the pipeline

  // Loading states
  modelLoading: false,
  modelReady: false,

  // Actions
  setTheme: (theme) => {
    localStorage.setItem('omniviz-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
    set({ theme })
  },
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('omniviz-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    set({ theme: newTheme })
  },

  setSelectedConcept: (concept) => set({ selectedConcept: concept, zoomLevel: 0 }),
  goToLanding: () => set({ selectedConcept: null, zoomLevel: 0 }),

  setZoomLevel: (level) => set({ zoomLevel: Math.max(0, Math.min(3, level)) }),
  setZoomProgress: (progress) => set({ zoomProgress: Math.max(0, Math.min(1, progress)) }),

  setInputText: (text) => {
    set({ inputText: text })
    // Trigger tokenization
    get().tokenize(text)
  },

  setOutputText: (text) => set({ outputText: text }),
  setIsGenerating: (val) => set({ isGenerating: val }),

  setSelectedModel: (model) => set({ selectedModel: model }),
  setTemperature: (temp) => set({ temperature: temp }),
  setCurrentLayer: (layer) => set({ currentLayer: layer }),
  setShowAttentionLines: (show) => set({ showAttentionLines: show }),

  setHoveredTokenIndex: (index) => set({ hoveredTokenIndex: index }),
  setFocusedComponent: (component) => set({ focusedComponent: component }),

  // Animation controls
  togglePlay: () => set(state => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => set(state => ({
    currentStep: (state.currentStep + 1) % state.totalSteps
  })),
  prevStep: () => set(state => ({
    currentStep: state.currentStep === 0 ? state.totalSteps - 1 : state.currentStep - 1
  })),
  resetAnimation: () => set({ currentStep: 0 }),

  setModelLoading: (loading) => set({ modelLoading: loading }),
  setModelReady: (ready) => set({ modelReady: ready }),

  // Tokenization (simplified mock for initial implementation)
  tokenize: (text) => {
    // Simple word-level tokenization for demo
    const words = text.split(/(\s+)/).filter(w => w.trim())
    const tokens = words.map((word, i) => ({
      text: word,
      color: TOKEN_COLORS[i % TOKEN_COLORS.length],
      index: i
    }))

    // Generate mock token IDs (would be real IDs from tokenizer)
    const tokenIds = tokens.map((_, i) => Math.floor(Math.random() * 50000) + 1000)

    // Generate mock embeddings (768-dim vectors simplified to 3D for visualization)
    const embeddings = tokens.map(() => [
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    ])

    // Generate mock attention weights
    const attentionWeights = tokens.map(() =>
      tokens.map(() => Math.random())
    )

    // Normalize attention weights per row
    const normalizedAttention = attentionWeights.map(row => {
      const sum = row.reduce((a, b) => a + b, 0)
      return row.map(w => w / sum)
    })

    // Generate mock Q, K, V matrices (simplified to 4x4 for visualization)
    const matrixSize = Math.min(tokens.length, 8)
    const qMatrix = Array(matrixSize).fill(0).map(() =>
      Array(4).fill(0).map(() => (Math.random() - 0.5) * 2)
    )
    const kMatrix = Array(matrixSize).fill(0).map(() =>
      Array(4).fill(0).map(() => (Math.random() - 0.5) * 2)
    )
    const vMatrix = Array(matrixSize).fill(0).map(() =>
      Array(4).fill(0).map(() => (Math.random() - 0.5) * 2)
    )

    set({
      tokens,
      tokenIds,
      embeddings,
      attentionWeights: normalizedAttention,
      qMatrix,
      kMatrix,
      vMatrix,
      attentionHeatmap: normalizedAttention
    })
  },

  // Update a single value in Q matrix (for interactive tweaking)
  updateQMatrixValue: (row, col, value) => {
    const qMatrix = [...get().qMatrix]
    if (qMatrix[row]) {
      qMatrix[row] = [...qMatrix[row]]
      qMatrix[row][col] = value

      // Recompute attention heatmap
      const kMatrix = get().kMatrix
      const newHeatmap = qMatrix.map((qRow, i) => {
        return kMatrix.map((kRow, j) => {
          // Dot product of Q and K rows
          const dot = qRow.reduce((sum, q, k) => sum + q * (kRow[k] || 0), 0)
          return Math.exp(dot / Math.sqrt(4)) // Softmax numerator
        })
      })

      // Normalize
      const normalizedHeatmap = newHeatmap.map(row => {
        const sum = row.reduce((a, b) => a + b, 0)
        return row.map(w => w / sum)
      })

      set({ qMatrix, attentionHeatmap: normalizedHeatmap })
    }
  }
}))
