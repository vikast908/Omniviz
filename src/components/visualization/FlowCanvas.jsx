import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../store/useStore'

// Animated particle that flows along a path
function DataParticle({ startX, startY, endX, endY, duration, delay, color, size = 6, onComplete }) {
  return (
    <motion.circle
      cx={startX}
      cy={startY}
      r={size}
      fill={color}
      initial={{ cx: startX, cy: startY, opacity: 0, scale: 0 }}
      animate={{
        cx: [startX, endX],
        cy: [startY, endY],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
        times: [0, 0.1, 0.9, 1]
      }}
      onAnimationComplete={onComplete}
    >
      <animate
        attributeName="filter"
        values="url(#glow);url(#glow-strong);url(#glow)"
        dur={`${duration}s`}
        repeatCount="1"
      />
    </motion.circle>
  )
}

// Animated connection line between nodes
function Connection({ x1, y1, x2, y2, animated, color = "#7c3aed", strokeWidth = 2 }) {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

  return (
    <g>
      {/* Base line */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={0.3}
      />
      {/* Animated line */}
      {animated && (
        <motion.line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={length}
          initial={{ strokeDashoffset: length }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      )}
    </g>
  )
}

// Interactive node component
function Node({
  x, y, width, height,
  label, sublabel,
  color = "#7c3aed",
  icon,
  active = false,
  onClick,
  pulsing = false,
  children
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Glow effect when active */}
      {active && (
        <motion.rect
          x={x - 4}
          y={y - 4}
          width={width + 8}
          height={height + 8}
          rx={16}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Main box */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        fill="#12121a"
        stroke={color}
        strokeWidth={active ? 2 : 1}
        filter={active ? "url(#glow)" : undefined}
      />

      {/* Pulsing indicator */}
      {pulsing && (
        <motion.rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={12}
          fill={color}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Label */}
      <text
        x={x + width / 2}
        y={y + height / 2 - (sublabel ? 8 : 0)}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#e2e8f0"
        fontSize={14}
        fontWeight={600}
      >
        {label}
      </text>

      {/* Sublabel */}
      {sublabel && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#94a3b8"
          fontSize={11}
        >
          {sublabel}
        </text>
      )}

      {children}
    </motion.g>
  )
}

// Token chip component
function TokenChip({ x, y, text, color, highlighted = false, delay = 0 }) {
  const width = Math.max(text.length * 9 + 16, 40)

  return (
    <motion.g
      initial={{ opacity: 0, y: y - 10 }}
      animate={{ opacity: 1, y }}
      transition={{ delay, duration: 0.3 }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={28}
        rx={6}
        fill={`${color}20`}
        stroke={color}
        strokeWidth={highlighted ? 2 : 1}
        filter={highlighted ? "url(#glow)" : undefined}
      />
      <text
        x={x + width / 2}
        y={y + 14}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#e2e8f0"
        fontSize={12}
        fontFamily="monospace"
      >
        {text}
      </text>
    </motion.g>
  )
}

// Main Flow Canvas component
function FlowCanvas({
  width = 1200,
  height = 600,
  children,
  onNodeClick
}) {
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width, height })
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="bg-omniviz-bg"
      >
        {/* Definitions */}
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for data flow */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="1" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>

          {/* Arrow marker */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#7c3aed" />
          </marker>
        </defs>

        {/* Grid background */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#1e1e2e"
            strokeWidth="1"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {children}
      </svg>
    </div>
  )
}

export { FlowCanvas, Node, Connection, DataParticle, TokenChip }
