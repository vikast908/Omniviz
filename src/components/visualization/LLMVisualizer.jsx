import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../store/useStore'

const COLORS = {
  primary: '#7c3aed',
  secondary: '#3b82f6',
  accent: '#22c55e',
  warning: '#f97316',
  text: '#e2e8f0',
  muted: '#94a3b8',
  bg: '#0a0a0f',
  surface: '#12121a',
  border: '#1e1e2e',
}

const TOKEN_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#3b82f6', '#a855f7', '#ec4899', '#14b8a6'
]

// Animated data particle
function Particle({ path, duration, delay, color, size = 8 }) {
  return (
    <motion.circle
      r={size}
      fill={color}
      filter="url(#glow)"
      initial={{ offsetDistance: '0%', opacity: 0 }}
      animate={{
        offsetDistance: '100%',
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        ease: 'linear',
        repeat: Infinity,
        repeatDelay: duration * 0.5,
      }}
      style={{
        offsetPath: `path('${path}')`,
      }}
    />
  )
}

// Component node with hover/click
function ComponentNode({
  x, y, width, height,
  label, sublabel, description,
  color = COLORS.primary,
  active = false,
  processing = false,
  onClick,
  zoomable = false,
  children
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Outer glow when active */}
      {(active || processing) && (
        <motion.rect
          x={x - 4}
          y={y - 4}
          width={width + 8}
          height={height + 8}
          rx={16}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: processing ? [0.2, 0.6, 0.2] : 0.4 }}
          transition={{ duration: 1.5, repeat: processing ? Infinity : 0 }}
        />
      )}

      {/* Main box */}
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        fill={COLORS.surface}
        stroke={hovered ? COLORS.text : color}
        strokeWidth={active ? 2 : 1.5}
        animate={{
          scale: hovered ? 1.02 : 1,
        }}
        style={{ transformOrigin: `${x + width/2}px ${y + height/2}px` }}
      />

      {/* Processing overlay */}
      {processing && (
        <motion.rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={12}
          fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* Icon area */}
      <rect
        x={x + 12}
        y={y + 12}
        width={36}
        height={36}
        rx={8}
        fill={`${color}20`}
      />

      {/* Label */}
      <text
        x={x + 60}
        y={y + 26}
        fill={COLORS.text}
        fontSize={14}
        fontWeight={600}
      >
        {label}
      </text>

      {/* Sublabel */}
      {sublabel && (
        <text
          x={x + 60}
          y={y + 44}
          fill={COLORS.muted}
          fontSize={11}
        >
          {sublabel}
        </text>
      )}

      {/* Zoom indicator */}
      {zoomable && hovered && (
        <g transform={`translate(${x + width - 30}, ${y + height - 30})`}>
          <circle r={12} fill={COLORS.surface} stroke={color} />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill={color}
            fontSize={14}
          >
            +
          </text>
        </g>
      )}

      {children}
    </motion.g>
  )
}

// Arrow/connection between components
function FlowArrow({ x1, y1, x2, y2, animated = false, color = COLORS.primary, label }) {
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2

  return (
    <g>
      {/* Line */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={2}
        strokeOpacity={0.4}
        markerEnd="url(#arrowhead)"
      />

      {/* Animated particles along the line */}
      {animated && (
        <>
          <motion.circle
            r={4}
            fill={color}
            filter="url(#glow)"
            initial={{ cx: x1, cy: y1 }}
            animate={{ cx: x2, cy: y2 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.circle
            r={4}
            fill={color}
            filter="url(#glow)"
            initial={{ cx: x1, cy: y1 }}
            animate={{ cx: x2, cy: y2 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.5,
            }}
          />
          <motion.circle
            r={4}
            fill={color}
            filter="url(#glow)"
            initial={{ cx: x1, cy: y1 }}
            animate={{ cx: x2, cy: y2 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: 1,
            }}
          />
        </>
      )}

      {/* Label */}
      {label && (
        <text
          x={midX}
          y={midY - 10}
          textAnchor="middle"
          fill={COLORS.muted}
          fontSize={10}
        >
          {label}
        </text>
      )}
    </g>
  )
}

// Token visualization
function TokenDisplay({ tokens, x, y, highlighted, onTokenHover }) {
  let currentX = x

  return (
    <g>
      {tokens.map((token, i) => {
        const width = token.text.length * 10 + 20
        const tokenX = currentX
        currentX += width + 8

        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: y - 20 }}
            animate={{ opacity: 1, y }}
            transition={{ delay: i * 0.1 }}
            onMouseEnter={() => onTokenHover?.(i)}
            onMouseLeave={() => onTokenHover?.(null)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={tokenX}
              y={y}
              width={width}
              height={32}
              rx={6}
              fill={`${token.color}20`}
              stroke={token.color}
              strokeWidth={highlighted === i ? 2 : 1}
              filter={highlighted === i ? 'url(#glow)' : undefined}
            />
            <text
              x={tokenX + width / 2}
              y={y + 20}
              textAnchor="middle"
              fill={COLORS.text}
              fontSize={13}
              fontWeight={500}
            >
              {token.text}
            </text>
          </motion.g>
        )
      })}
    </g>
  )
}

// Main LLM Visualizer
function LLMVisualizer() {
  const {
    zoomLevel,
    setZoomLevel,
    tokens,
    tokenIds,
    isPlaying,
    animationSpeed,
    currentStep,
    nextStep,
    hoveredTokenIndex,
    setHoveredTokenIndex,
    inputText,
    focusedComponent,
    setFocusedComponent,
  } = useStore()

  const svgRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 700 })

  // Auto-advance animation
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      nextStep()
    }, 2000 / animationSpeed)
    return () => clearInterval(interval)
  }, [isPlaying, animationSpeed, nextStep])

  // Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (svgRef.current) {
        const rect = svgRef.current.parentElement.getBoundingClientRect()
        setDimensions({
          width: Math.max(rect.width, 800),
          height: Math.max(rect.height - 100, 500)
        })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const { width, height } = dimensions
  const centerX = width / 2
  const centerY = height / 2

  // Component click handler
  const handleComponentClick = (componentId) => {
    if (focusedComponent === componentId) {
      setFocusedComponent(null)
    } else {
      setFocusedComponent(componentId)
      // Zoom in if clicking a zoomable component
      if (['transformer', 'attention', 'mlp'].includes(componentId)) {
        setZoomLevel(Math.min(zoomLevel + 1, 3))
      }
    }
  }

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      className="bg-omniviz-bg"
    >
      {/* Definitions */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={COLORS.primary} />
        </marker>

        <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.2" />
          <stop offset="50%" stopColor={COLORS.primary} stopOpacity="0.8" />
          <stop offset="100%" stopColor={COLORS.primary} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Grid background */}
      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke={COLORS.border} strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />

      {/* Level 0 & 1: High-level pipeline view */}
      {zoomLevel <= 1 && (
        <g>
          {/* Title */}
          <text x={centerX} y={40} textAnchor="middle" fill={COLORS.text} fontSize={24} fontWeight="bold">
            {zoomLevel === 0 ? 'Large Language Model' : 'Data Pipeline'}
          </text>
          <text x={centerX} y={65} textAnchor="middle" fill={COLORS.muted} fontSize={14}>
            {zoomLevel === 0 ? 'Click components or scroll to explore deeper' : 'Watch data flow through the system'}
          </text>

          {/* Input section */}
          <ComponentNode
            x={50}
            y={centerY - 40}
            width={160}
            height={80}
            label="Input Text"
            sublabel={`"${inputText.substring(0, 15)}${inputText.length > 15 ? '...' : ''}"`}
            color={COLORS.secondary}
            active={currentStep === 0}
            processing={currentStep === 0 && isPlaying}
          >
            <text x={50 + 24} y={centerY - 40 + 30} fill={COLORS.secondary} fontSize={18}>T</text>
          </ComponentNode>

          {/* Tokenizer */}
          <ComponentNode
            x={260}
            y={centerY - 40}
            width={140}
            height={80}
            label="Tokenizer"
            sublabel="Split into tokens"
            color={COLORS.warning}
            active={currentStep === 1}
            processing={currentStep === 1 && isPlaying}
            onClick={() => handleComponentClick('tokenizer')}
            zoomable
          >
            <text x={260 + 24} y={centerY - 40 + 30} fill={COLORS.warning} fontSize={16}>Tk</text>
          </ComponentNode>

          {/* Embeddings */}
          <ComponentNode
            x={450}
            y={centerY - 40}
            width={140}
            height={80}
            label="Embeddings"
            sublabel="768-dim vectors"
            color={COLORS.accent}
            active={currentStep === 2}
            processing={currentStep === 2 && isPlaying}
            onClick={() => handleComponentClick('embeddings')}
            zoomable
          >
            <text x={450 + 24} y={centerY - 40 + 30} fill={COLORS.accent} fontSize={16}>E</text>
          </ComponentNode>

          {/* Transformer */}
          <ComponentNode
            x={640}
            y={centerY - 60}
            width={180}
            height={120}
            label="Transformer"
            sublabel="12 layers of magic"
            color={COLORS.primary}
            active={currentStep === 3 || currentStep === 4}
            processing={(currentStep === 3 || currentStep === 4) && isPlaying}
            onClick={() => handleComponentClick('transformer')}
            zoomable
          >
            <text x={640 + 24} y={centerY - 60 + 30} fill={COLORS.primary} fontSize={16}>Tr</text>
            {/* Layer stack preview */}
            {[0, 1, 2, 3].map(i => (
              <rect
                key={i}
                x={640 + 12}
                y={centerY - 60 + 55 + i * 14}
                width={156}
                height={10}
                rx={3}
                fill={currentStep >= 3 && i <= (currentStep - 3) * 2 ? `${COLORS.primary}40` : `${COLORS.primary}15`}
                stroke={`${COLORS.primary}30`}
              />
            ))}
          </ComponentNode>

          {/* Output */}
          <ComponentNode
            x={870}
            y={centerY - 40}
            width={160}
            height={80}
            label="Output"
            sublabel="Next token probs"
            color="#ec4899"
            active={currentStep === 5}
            processing={currentStep === 5 && isPlaying}
          >
            <text x={870 + 24} y={centerY - 40 + 30} fill="#ec4899" fontSize={16}>O</text>
          </ComponentNode>

          {/* Flow arrows */}
          <FlowArrow x1={210} y1={centerY} x2={260} y2={centerY} animated={currentStep >= 0 && isPlaying} />
          <FlowArrow x1={400} y1={centerY} x2={450} y2={centerY} animated={currentStep >= 1 && isPlaying} />
          <FlowArrow x1={590} y1={centerY} x2={640} y2={centerY} animated={currentStep >= 2 && isPlaying} />
          <FlowArrow x1={820} y1={centerY} x2={870} y2={centerY} animated={currentStep >= 4 && isPlaying} />

          {/* Token display below pipeline */}
          {zoomLevel === 1 && tokens.length > 0 && (
            <g>
              <text x={50} y={centerY + 100} fill={COLORS.muted} fontSize={12}>Tokens:</text>
              <TokenDisplay
                tokens={tokens}
                x={50}
                y={centerY + 120}
                highlighted={hoveredTokenIndex}
                onTokenHover={setHoveredTokenIndex}
              />

              {/* Token IDs */}
              <text x={50} y={centerY + 180} fill={COLORS.muted} fontSize={12}>Token IDs:</text>
              <g>
                {tokens.map((token, i) => {
                  const width = token.text.length * 10 + 20
                  let xPos = 50
                  for (let j = 0; j < i; j++) {
                    xPos += tokens[j].text.length * 10 + 28
                  }
                  return (
                    <motion.g
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <rect
                        x={xPos}
                        y={centerY + 200}
                        width={width}
                        height={28}
                        rx={4}
                        fill={`${token.color}15`}
                        stroke={`${token.color}50`}
                      />
                      <text
                        x={xPos + width / 2}
                        y={centerY + 218}
                        textAnchor="middle"
                        fill={COLORS.text}
                        fontSize={11}
                        fontFamily="monospace"
                      >
                        {tokenIds[i]}
                      </text>
                    </motion.g>
                  )
                })}
              </g>
            </g>
          )}
        </g>
      )}

      {/* Level 2: Transformer detail */}
      {zoomLevel === 2 && (
        <TransformerDetail
          width={width}
          height={height}
          centerX={centerX}
          centerY={centerY}
          currentStep={currentStep}
          isPlaying={isPlaying}
          onComponentClick={handleComponentClick}
          tokens={tokens}
          hoveredTokenIndex={hoveredTokenIndex}
          setHoveredTokenIndex={setHoveredTokenIndex}
        />
      )}

      {/* Level 3: Attention detail */}
      {zoomLevel === 3 && (
        <AttentionDetail
          width={width}
          height={height}
          centerX={centerX}
          centerY={centerY}
          isPlaying={isPlaying}
          tokens={tokens}
        />
      )}
    </svg>
  )
}

// Transformer detail view
function TransformerDetail({
  width, height, centerX, centerY,
  currentStep, isPlaying, onComponentClick,
  tokens, hoveredTokenIndex, setHoveredTokenIndex
}) {
  const { attentionWeights, showAttentionLines, setShowAttentionLines } = useStore()

  return (
    <g>
      <text x={centerX} y={40} textAnchor="middle" fill={COLORS.text} fontSize={24} fontWeight="bold">
        Transformer Layer
      </text>
      <text x={centerX} y={65} textAnchor="middle" fill={COLORS.muted} fontSize={14}>
        One of 12 identical layers processing your input
      </text>

      {/* Input tokens at top */}
      <g transform={`translate(${centerX - 200}, 100)`}>
        <text x={0} y={-10} fill={COLORS.muted} fontSize={12}>Input Embeddings</text>
        <TokenDisplay
          tokens={tokens}
          x={0}
          y={0}
          highlighted={hoveredTokenIndex}
          onTokenHover={setHoveredTokenIndex}
        />
      </g>

      {/* Layer Norm 1 */}
      <ComponentNode
        x={centerX - 100}
        y={180}
        width={200}
        height={50}
        label="Layer Normalization"
        color={COLORS.accent}
        processing={isPlaying}
      >
        <text x={centerX - 100 + 24} y={205} fill={COLORS.accent} fontSize={14}>LN</text>
      </ComponentNode>

      <FlowArrow x1={centerX} y1={145} x2={centerX} y2={180} animated={isPlaying} />

      {/* Multi-Head Attention */}
      <ComponentNode
        x={centerX - 140}
        y={260}
        width={280}
        height={100}
        label="Multi-Head Attention"
        sublabel="8 parallel attention heads"
        color={COLORS.primary}
        processing={isPlaying}
        onClick={() => onComponentClick('attention')}
        zoomable
      >
        <text x={centerX - 140 + 24} y={290} fill={COLORS.primary} fontSize={14}>MHA</text>
        {/* Attention heads preview */}
        <g transform={`translate(${centerX - 140 + 60}, 305)`}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <motion.rect
              key={i}
              x={i * 26}
              y={0}
              width={22}
              height={22}
              rx={4}
              fill={`${COLORS.primary}30`}
              stroke={COLORS.primary}
              animate={{
                opacity: isPlaying ? [0.5, 1, 0.5] : 0.7
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: isPlaying ? Infinity : 0
              }}
            />
          ))}
        </g>
      </ComponentNode>

      <FlowArrow x1={centerX} y1={230} x2={centerX} y2={260} animated={isPlaying} />

      {/* Add & Norm */}
      <ComponentNode
        x={centerX - 80}
        y={390}
        width={160}
        height={50}
        label="Add & Normalize"
        color={COLORS.accent}
        processing={isPlaying}
      >
        <text x={centerX - 80 + 24} y={415} fill={COLORS.accent} fontSize={14}>+</text>
      </ComponentNode>

      <FlowArrow x1={centerX} y1={360} x2={centerX} y2={390} animated={isPlaying} />

      {/* Skip connection */}
      <path
        d={`M ${centerX - 160} 205 Q ${centerX - 200} 205 ${centerX - 200} 300 Q ${centerX - 200} 415 ${centerX - 80} 415`}
        fill="none"
        stroke={COLORS.muted}
        strokeWidth={1.5}
        strokeDasharray="5,5"
        opacity={0.5}
      />
      <text x={centerX - 220} y={300} fill={COLORS.muted} fontSize={10} transform={`rotate(-90, ${centerX - 220}, 300)`}>
        Residual
      </text>

      {/* Feed Forward */}
      <ComponentNode
        x={centerX - 120}
        y={470}
        width={240}
        height={80}
        label="Feed-Forward Network"
        sublabel="2-layer MLP with GELU"
        color={COLORS.secondary}
        processing={isPlaying}
        onClick={() => onComponentClick('mlp')}
        zoomable
      >
        <text x={centerX - 120 + 24} y={500} fill={COLORS.secondary} fontSize={14}>FFN</text>
      </ComponentNode>

      <FlowArrow x1={centerX} y1={440} x2={centerX} y2={470} animated={isPlaying} />

      {/* Final Add & Norm */}
      <ComponentNode
        x={centerX - 80}
        y={580}
        width={160}
        height={50}
        label="Add & Normalize"
        color={COLORS.accent}
        processing={isPlaying}
      >
        <text x={centerX - 80 + 24} y={605} fill={COLORS.accent} fontSize={14}>+</text>
      </ComponentNode>

      <FlowArrow x1={centerX} y1={550} x2={centerX} y2={580} animated={isPlaying} />

      {/* Output arrow */}
      <FlowArrow x1={centerX} y1={630} x2={centerX} y2={height - 40} animated={isPlaying} label="To next layer" />
    </g>
  )
}

// Attention mechanism detail
function AttentionDetail({ width, height, centerX, centerY, isPlaying, tokens }) {
  const { qMatrix, kMatrix, vMatrix, attentionHeatmap, updateQMatrixValue } = useStore()
  const [selectedCell, setSelectedCell] = useState(null)

  const matrixSize = Math.min(tokens.length, 6)
  const cellSize = 40
  const matrixWidth = matrixSize * cellSize

  return (
    <g>
      <text x={centerX} y={40} textAnchor="middle" fill={COLORS.text} fontSize={24} fontWeight="bold">
        Attention Mechanism
      </text>
      <text x={centerX} y={65} textAnchor="middle" fill={COLORS.muted} fontSize={14}>
        Attention(Q, K, V) = softmax(QK^T / √dk) × V
      </text>

      {/* Q Matrix */}
      <g transform={`translate(100, 120)`}>
        <text x={matrixWidth/2} y={-10} textAnchor="middle" fill="#ef4444" fontSize={14} fontWeight="600">
          Query (Q)
        </text>
        <text x={matrixWidth/2} y={8} textAnchor="middle" fill={COLORS.muted} fontSize={11}>
          "What am I looking for?"
        </text>
        <g transform="translate(0, 20)">
          {qMatrix.slice(0, matrixSize).map((row, i) => (
            row.slice(0, 4).map((val, j) => (
              <g key={`q-${i}-${j}`}>
                <motion.rect
                  x={j * cellSize}
                  y={i * cellSize}
                  width={cellSize - 2}
                  height={cellSize - 2}
                  rx={4}
                  fill={selectedCell?.matrix === 'q' && selectedCell.row === i && selectedCell.col === j
                    ? '#ef444440'
                    : '#ef444420'
                  }
                  stroke="#ef4444"
                  strokeWidth={1}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedCell({ matrix: 'q', row: i, col: j })}
                  whileHover={{ scale: 1.1 }}
                  animate={isPlaying ? { opacity: [0.7, 1, 0.7] } : {}}
                  transition={{ duration: 1, delay: i * 0.1 + j * 0.05, repeat: isPlaying ? Infinity : 0 }}
                />
                <text
                  x={j * cellSize + cellSize/2 - 1}
                  y={i * cellSize + cellSize/2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={COLORS.text}
                  fontSize={10}
                  fontFamily="monospace"
                  pointerEvents="none"
                >
                  {val.toFixed(1)}
                </text>
              </g>
            ))
          ))}
        </g>
        {/* Token labels */}
        {tokens.slice(0, matrixSize).map((token, i) => (
          <text
            key={i}
            x={-8}
            y={20 + i * cellSize + cellSize/2}
            textAnchor="end"
            dominantBaseline="middle"
            fill={token.color}
            fontSize={10}
          >
            {token.text.substring(0, 6)}
          </text>
        ))}
      </g>

      {/* K Matrix */}
      <g transform={`translate(320, 120)`}>
        <text x={matrixWidth/2} y={-10} textAnchor="middle" fill="#22c55e" fontSize={14} fontWeight="600">
          Key (K)
        </text>
        <text x={matrixWidth/2} y={8} textAnchor="middle" fill={COLORS.muted} fontSize={11}>
          "What do I contain?"
        </text>
        <g transform="translate(0, 20)">
          {kMatrix.slice(0, matrixSize).map((row, i) => (
            row.slice(0, 4).map((val, j) => (
              <g key={`k-${i}-${j}`}>
                <motion.rect
                  x={j * cellSize}
                  y={i * cellSize}
                  width={cellSize - 2}
                  height={cellSize - 2}
                  rx={4}
                  fill="#22c55e20"
                  stroke="#22c55e"
                  strokeWidth={1}
                  animate={isPlaying ? { opacity: [0.7, 1, 0.7] } : {}}
                  transition={{ duration: 1, delay: i * 0.1 + j * 0.05 + 0.3, repeat: isPlaying ? Infinity : 0 }}
                />
                <text
                  x={j * cellSize + cellSize/2 - 1}
                  y={i * cellSize + cellSize/2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={COLORS.text}
                  fontSize={10}
                  fontFamily="monospace"
                >
                  {val.toFixed(1)}
                </text>
              </g>
            ))
          ))}
        </g>
      </g>

      {/* Multiplication symbol */}
      <text x={280} y={200} textAnchor="middle" fill={COLORS.primary} fontSize={24}>×</text>

      {/* Arrow to heatmap */}
      <motion.path
        d={`M ${centerX} 380 L ${centerX} 420`}
        stroke={COLORS.primary}
        strokeWidth={2}
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      <text x={centerX + 20} y={400} fill={COLORS.muted} fontSize={11}>softmax</text>

      {/* Attention Heatmap */}
      <g transform={`translate(${centerX - matrixSize * cellSize / 2}, 440)`}>
        <text x={matrixSize * cellSize / 2} y={-10} textAnchor="middle" fill={COLORS.primary} fontSize={14} fontWeight="600">
          Attention Weights
        </text>
        {attentionHeatmap.slice(0, matrixSize).map((row, i) => (
          row.slice(0, matrixSize).map((val, j) => (
            <g key={`h-${i}-${j}`}>
              <motion.rect
                x={j * cellSize}
                y={i * cellSize}
                width={cellSize - 2}
                height={cellSize - 2}
                rx={4}
                fill={`rgba(124, 58, 237, ${val})`}
                stroke={COLORS.primary}
                strokeWidth={1}
                animate={isPlaying ? {
                  opacity: [0.8, 1, 0.8],
                } : {}}
                transition={{ duration: 1.5, delay: (i + j) * 0.05, repeat: isPlaying ? Infinity : 0 }}
              />
              <text
                x={j * cellSize + cellSize/2 - 1}
                y={i * cellSize + cellSize/2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={val > 0.5 ? 'white' : COLORS.text}
                fontSize={9}
                fontFamily="monospace"
              >
                {(val * 100).toFixed(0)}%
              </text>
            </g>
          ))
        ))}

        {/* Row labels */}
        {tokens.slice(0, matrixSize).map((token, i) => (
          <text
            key={`row-${i}`}
            x={-8}
            y={i * cellSize + cellSize/2}
            textAnchor="end"
            dominantBaseline="middle"
            fill={token.color}
            fontSize={10}
          >
            {token.text.substring(0, 5)}
          </text>
        ))}

        {/* Column labels */}
        {tokens.slice(0, matrixSize).map((token, i) => (
          <text
            key={`col-${i}`}
            x={i * cellSize + cellSize/2}
            y={matrixSize * cellSize + 15}
            textAnchor="middle"
            fill={token.color}
            fontSize={10}
          >
            {token.text.substring(0, 5)}
          </text>
        ))}
      </g>

      {/* V Matrix */}
      <g transform={`translate(${width - 260}, 120)`}>
        <text x={matrixWidth/2} y={-10} textAnchor="middle" fill="#3b82f6" fontSize={14} fontWeight="600">
          Value (V)
        </text>
        <text x={matrixWidth/2} y={8} textAnchor="middle" fill={COLORS.muted} fontSize={11}>
          "What to output"
        </text>
        <g transform="translate(0, 20)">
          {vMatrix.slice(0, matrixSize).map((row, i) => (
            row.slice(0, 4).map((val, j) => (
              <g key={`v-${i}-${j}`}>
                <motion.rect
                  x={j * cellSize}
                  y={i * cellSize}
                  width={cellSize - 2}
                  height={cellSize - 2}
                  rx={4}
                  fill="#3b82f620"
                  stroke="#3b82f6"
                  strokeWidth={1}
                  animate={isPlaying ? { opacity: [0.7, 1, 0.7] } : {}}
                  transition={{ duration: 1, delay: i * 0.1 + j * 0.05 + 0.6, repeat: isPlaying ? Infinity : 0 }}
                />
                <text
                  x={j * cellSize + cellSize/2 - 1}
                  y={i * cellSize + cellSize/2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={COLORS.text}
                  fontSize={10}
                  fontFamily="monospace"
                >
                  {val.toFixed(1)}
                </text>
              </g>
            ))
          ))}
        </g>
      </g>

      {/* Selected cell editor */}
      {selectedCell && (
        <foreignObject x={100} y={height - 80} width={300} height={60}>
          <div className="bg-omniviz-surface p-3 rounded-lg border border-omniviz-border">
            <p className="text-xs text-omniviz-text-muted mb-2">
              Tweak Q[{selectedCell.row}][{selectedCell.col}]
            </p>
            <input
              type="range"
              min={-2}
              max={2}
              step={0.1}
              value={qMatrix[selectedCell.row]?.[selectedCell.col] || 0}
              onChange={(e) => updateQMatrixValue(selectedCell.row, selectedCell.col, parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </foreignObject>
      )}
    </g>
  )
}

export default LLMVisualizer
