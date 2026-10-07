import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Node = { id: string; label: string; x: number; y: number; tone: 'cyan' | 'blue' | 'term' }
type Edge = { from: string; to: string }

const W = 520
const H = 460

const NODES: Node[] = [
  { id: 'client', label: 'CLIENT', x: 260, y: 36, tone: 'cyan' },
  { id: 'api', label: 'API LAYER', x: 260, y: 128, tone: 'cyan' },
  { id: 'agent', label: 'AI AGENT', x: 260, y: 224, tone: 'term' },
  { id: 'db', label: 'DATABASE', x: 118, y: 324, tone: 'blue' },
  { id: 'services', label: 'SERVICES', x: 402, y: 324, tone: 'blue' },
  { id: 'cloud', label: 'INFRA / CLOUD', x: 402, y: 420, tone: 'cyan' },
]

const EDGES: Edge[] = [
  { from: 'client', to: 'api' },
  { from: 'api', to: 'agent' },
  { from: 'agent', to: 'db' },
  { from: 'agent', to: 'services' },
  { from: 'services', to: 'cloud' },
]

const TONE: Record<Node['tone'], { stroke: string; fill: string; glow: string }> = {
  cyan: { stroke: '#22d3ee', fill: 'rgba(34,211,238,0.10)', glow: 'rgba(34,211,238,0.55)' },
  blue: { stroke: '#3b82f6', fill: 'rgba(59,130,246,0.10)', glow: 'rgba(59,130,246,0.5)' },
  term: { stroke: '#4ade80', fill: 'rgba(74,222,128,0.10)', glow: 'rgba(74,222,128,0.55)' },
}

const BW = 132
const BH = 44

export function Topology() {
  const reduce = useReducedMotion()
  const [activeEdge, setActiveEdge] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setActiveEdge((i) => (i + 1) % EDGES.length), 1400)
    return () => clearInterval(t)
  }, [reduce])

  const pos = (id: string) => NODES.find((n) => n.id === id)!

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Network topology: client to API to AI agent to database and services to cloud infrastructure"
      >
        <defs>
          <filter id="topo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="bg-orb" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.18)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
        </defs>

        <circle cx={W / 2} cy={H / 2} r={200} fill="url(#bg-orb)" />

        {EDGES.map((e, i) => {
          const a = pos(e.from)
          const b = pos(e.to)
          const x1 = a.x
          const y1 = a.y + BH / 2
          const x2 = b.x
          const y2 = b.y - BH / 2
          const isActive = i === activeEdge
          return (
            <g key={`${e.from}-${e.to}`}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e2735" strokeWidth="1.5" />
              {!reduce && (
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isActive ? '#22d3ee' : '#3b82f6'}
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  className="flow-line"
                  style={{ opacity: isActive ? 0.95 : 0.35 }}
                />
              )}
              {!reduce && isActive && (
                <circle r="3" fill="#22d3ee" filter="url(#topo-glow)">
                  <animateMotion dur="1.4s" repeatCount="indefinite" path={`M${x1},${y1} L${x2},${y2}`} />
                </circle>
              )}
            </g>
          )
        })}

        {NODES.map((n, i) => {
          const t = TONE[n.tone]
          const delay = reduce ? '0s' : `${i * 0.35}s`
          return (
            <g key={n.id}>
              <rect
                x={n.x - BW / 2}
                y={n.y - BH / 2}
                width={BW}
                height={BH}
                rx="6"
                fill="rgba(10,14,20,0.92)"
                stroke={t.stroke}
                strokeWidth="1.2"
              />
              <rect
                x={n.x - BW / 2}
                y={n.y - BH / 2}
                width={BW}
                height={BH}
                rx="6"
                fill={t.fill}
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fill="#dbe4f0"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                letterSpacing="1.2"
              >
                {n.label}
              </text>
              <circle
                cx={n.x - BW / 2 + 10}
                cy={n.y - BH / 2 + 10}
                r="3"
                fill={t.stroke}
                className={reduce ? '' : 'node-pulse'}
                style={{ animationDelay: delay }}
                filter="url(#topo-glow)"
              />
            </g>
          )
        })}
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono text-[10px] text-dim">
        <span className="flex items-center gap-1.5">
          <i className="size-1.5 rounded-full bg-cyan" /> edge
        </span>
        <span className="flex items-center gap-1.5">
          <i className="size-1.5 rounded-full bg-blue" /> data
        </span>
        <span className="flex items-center gap-1.5">
          <i className="size-1.5 rounded-full bg-term" /> intelligence
        </span>
        <span className="text-dim/70">live packet flow</span>
      </div>
    </div>
  )
}
