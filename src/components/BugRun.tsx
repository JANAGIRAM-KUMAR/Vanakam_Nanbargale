import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'

type Status = 'idle' | 'running' | 'over'
type ObstacleKind = 'beetle' | 'large' | 'spider' | 'caterpillar' | 'fly' | 'swarm'

type Obstacle = {
  kind: ObstacleKind
  x: number
  w: number
  h: number
  variant: number
  altitude: number
  count: number
}

type Game = {
  playerY: number
  playerVy: number
  grounded: boolean
  obstacles: Obstacle[]
  speed: number
  distance: number
  score: number
  spawnTimer: number
  elapsed: number
}

const BEST_KEY = 'jk-bug-run-best'
const DINO_BEST_KEY = 'jk-dino-run-best'
const PLAYER_X = 42
const PLAYER_W = 30
const PLAYER_H = 28
const GROUND_PAD = 34
const START_SPEED = 230
const MAX_SPEED = 580
const GRAVITY = 2600
const JUMP_VELOCITY = -760

const COLORS = {
  cream: '#f1efe7',
  clay: '#d7b28b',
  sage: '#b9cbaa',
  dark: '#0c100d',
  line: 'rgba(241, 239, 231, 0.12)',
  tick: 'rgba(241, 239, 231, 0.1)',
}

function withAlpha(color: string, alpha: number) {
  const match = /^#([0-9a-f]{6})$/i.exec(color.trim())
  if (!match) return color

  const value = Number.parseInt(match[1], 16)
  const red = (value >> 16) & 255
  const green = (value >> 8) & 255
  const blue = value & 255

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

function syncThemeColors() {
  if (typeof window === 'undefined') return

  const styles = getComputedStyle(document.documentElement)
  const read = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback

  COLORS.cream = read('--color-ink', COLORS.cream)
  COLORS.clay = read('--color-clay', COLORS.clay)
  COLORS.sage = read('--color-sage', COLORS.sage)
  COLORS.dark = read('--color-void', COLORS.dark)
  COLORS.line = withAlpha(COLORS.cream, 0.12)
  COLORS.tick = withAlpha(COLORS.cream, 0.1)
}

function padScore(value: number) {
  return String(value).padStart(4, '0')
}

function random(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function readBestScore() {
  if (typeof window === 'undefined') return 0
  try {
    const stored = window.localStorage.getItem(BEST_KEY) ?? window.localStorage.getItem(DINO_BEST_KEY)
    const value = Number(stored)
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0
  } catch {
    return 0
  }
}

function drawDuck(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  grounded: boolean,
  elapsed: number,
) {
  const bob = grounded ? Math.sin(elapsed * 14) * 1.2 : 0
  const bodyY = y + 16 + bob

  ctx.save()
  ctx.lineCap = 'round'

  if (grounded) {
    const swing = Math.sin(elapsed * 16) * 3
    ctx.strokeStyle = COLORS.clay
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x + 12, bodyY + 7)
    ctx.lineTo(x + 10 + swing, bodyY + 13)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x + 19, bodyY + 7)
    ctx.lineTo(x + 21 - swing, bodyY + 13)
    ctx.stroke()
  } else {
    ctx.strokeStyle = COLORS.clay
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x + 13, bodyY + 6)
    ctx.lineTo(x + 9, bodyY + 11)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x + 20, bodyY + 6)
    ctx.lineTo(x + 24, bodyY + 10)
    ctx.stroke()
  }

  ctx.fillStyle = COLORS.cream
  ctx.beginPath()
  ctx.ellipse(x + 15, bodyY, 13, 9, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x + 2, bodyY - 2)
  ctx.lineTo(x - 3, bodyY - 6)
  ctx.lineTo(x + 4, bodyY + 3)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 24, bodyY - 7, 7.5, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = COLORS.clay
  ctx.beginPath()
  ctx.moveTo(x + 30, bodyY - 8)
  ctx.lineTo(x + 38, bodyY - 6)
  ctx.lineTo(x + 30, bodyY - 4)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = COLORS.dark
  ctx.beginPath()
  ctx.arc(x + 26, bodyY - 9, 1.2, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = withAlpha(COLORS.clay, 0.7)
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.arc(x + 14, bodyY + 1, 6, 0.2, Math.PI * 1.2)
  ctx.stroke()

  ctx.restore()
}

function drawBeetle(
  ctx: CanvasRenderingContext2D,
  obstacle: Obstacle,
  groundY: number,
  elapsed: number,
  large = false,
) {
  const { x, w, h, variant } = obstacle
  const y = groundY - h

  ctx.save()
  ctx.lineCap = 'round'
  ctx.strokeStyle = large ? COLORS.clay : COLORS.sage
  ctx.lineWidth = large ? 2 : 1.5

  for (let i = 0; i < 3; i += 1) {
    const legY = y + h * 0.35 + i * h * 0.2
    const wiggle = Math.sin(elapsed * 10 + i + variant) * (large ? 2 : 1.5)
    ctx.beginPath()
    ctx.moveTo(x + w * 0.2, legY)
    ctx.lineTo(x - 4 - (large ? 2 : 0), legY + wiggle)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x + w * 0.8, legY)
    ctx.lineTo(x + w + 4 + (large ? 2 : 0), legY + wiggle)
    ctx.stroke()
  }

  ctx.fillStyle = large
    ? withAlpha(COLORS.sage, 0.95)
    : withAlpha(COLORS.clay, 0.9)
  ctx.beginPath()
  ctx.ellipse(x + w / 2, y + h * 0.55, w / 2, h * 0.38, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + w * 0.2, y + h * 0.35, h * (large ? 0.25 : 0.22), 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = withAlpha(COLORS.cream, 0.35)
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.ellipse(x + w * 0.55, y + h * 0.55, w * 0.26, h * 0.2, 0, 0.25, Math.PI * 1.5)
  ctx.stroke()

  if (large) {
    ctx.strokeStyle = COLORS.clay
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x + w * 0.2, y + h * 0.25)
    ctx.lineTo(x + w * 0.04, y - h * 0.08)
    ctx.stroke()
  }

  ctx.fillStyle = COLORS.dark
  ctx.beginPath()
  ctx.arc(x + w * 0.16, y + h * 0.32, 1.2, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = COLORS.clay
  ctx.beginPath()
  ctx.moveTo(x + w * 0.16, y + h * 0.2)
  ctx.lineTo(x + w * 0.06, y + h * 0.02)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x + w * 0.26, y + h * 0.2)
  ctx.lineTo(x + w * 0.34, y + h * 0.02)
  ctx.stroke()

  ctx.restore()
}

function drawSpider(
  ctx: CanvasRenderingContext2D,
  obstacle: Obstacle,
  groundY: number,
  elapsed: number,
) {
  const { x, w, h, variant } = obstacle
  const y = groundY - h
  const cx = x + w / 2
  const cy = y + h * 0.55
  const radius = Math.min(w, h) * 0.32
  const wave = Math.sin(elapsed * 8 + variant)

  ctx.save()
  ctx.lineCap = 'round'
  ctx.strokeStyle = COLORS.sage
  ctx.lineWidth = 1.4

  for (let i = 0; i < 4; i += 1) {
    const anchorY = cy - radius * 0.45 + i * radius * 0.3
    const reach = 5 + i * 1.3
    const lift = wave * (i % 2 === 0 ? 1.4 : -1.4)

    ctx.beginPath()
    ctx.moveTo(cx - radius * 0.35, anchorY)
    ctx.lineTo(cx - radius - reach, anchorY - lift)
    ctx.lineTo(cx - radius - reach - 2, anchorY + 3 + lift * 0.4)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(cx + radius * 0.35, anchorY)
    ctx.lineTo(cx + radius + reach, anchorY + lift)
    ctx.lineTo(cx + radius + reach + 2, anchorY + 3 - lift * 0.4)
    ctx.stroke()
  }

  ctx.fillStyle = withAlpha(COLORS.clay, 0.95)
  ctx.beginPath()
  ctx.ellipse(cx + radius * 0.25, cy, radius * 1.15, radius * 0.9, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(cx - radius * 0.62, cy - radius * 0.1, radius * 0.58, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = COLORS.sage
  ctx.beginPath()
  ctx.arc(cx + radius * 0.38, cy - radius * 0.28, radius * 0.28, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = COLORS.dark
  ctx.beginPath()
  ctx.arc(cx - radius * 0.8, cy - radius * 0.22, 1.1, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cx - radius * 0.48, cy - radius * 0.32, 1, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = COLORS.clay
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.moveTo(cx - radius * 0.95, cy + radius * 0.15)
  ctx.lineTo(cx - radius * 1.3, cy + radius * 0.4)
  ctx.stroke()

  ctx.restore()
}

function drawCaterpillar(
  ctx: CanvasRenderingContext2D,
  obstacle: Obstacle,
  groundY: number,
  elapsed: number,
) {
  const { x, w, h, variant } = obstacle
  const y = groundY - h
  const segments = 4
  const segmentWidth = w / segments
  const radius = Math.min(segmentWidth * 0.52, h * 0.42)

  ctx.save()
  ctx.lineCap = 'round'

  for (let i = 0; i < segments; i += 1) {
    const cx = x + segmentWidth * (i + 0.5)
    const bob = Math.sin(elapsed * 7 + i * 1.1 + variant) * 1.2
    const cy = y + h * 0.48 + bob

    ctx.strokeStyle = COLORS.clay
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(cx - radius * 0.45, cy + radius * 0.4)
    ctx.lineTo(cx - radius * 0.65, groundY - 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(cx + radius * 0.45, cy + radius * 0.4)
    ctx.lineTo(cx + radius * 0.65, groundY - 2)
    ctx.stroke()

    ctx.fillStyle = i % 2 === 0 ? withAlpha(COLORS.clay, 0.94) : withAlpha(COLORS.sage, 0.9)
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  const headX = x + w - segmentWidth * 0.4
  const headY = y + h * 0.43

  ctx.fillStyle = COLORS.cream
  ctx.beginPath()
  ctx.arc(headX, headY, radius * 1.12, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = COLORS.dark
  ctx.beginPath()
  ctx.arc(headX + radius * 0.35, headY - radius * 0.18, 1.1, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = COLORS.clay
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.moveTo(headX - radius * 0.2, headY - radius * 0.85)
  ctx.lineTo(headX - radius * 0.6, headY - radius * 1.7)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(headX + radius * 0.1, headY - radius * 0.9)
  ctx.lineTo(headX + radius * 0.35, headY - radius * 1.75)
  ctx.stroke()

  ctx.restore()
}

function drawFly(
  ctx: CanvasRenderingContext2D,
  obstacle: Obstacle,
  groundY: number,
  elapsed: number,
) {
  const { x, w, h, variant } = obstacle
  const bob = Math.sin(elapsed * 7 + variant * 2.2) * 2
  const bottom = groundY - obstacle.altitude
  const y = bottom - h + bob
  const cx = x + w / 2
  const cy = y + h * 0.55

  ctx.save()
  ctx.lineCap = 'round'

  ctx.fillStyle = withAlpha(COLORS.sage, 0.38)
  ctx.beginPath()
  ctx.ellipse(cx - w * 0.18, y + h * 0.12, w * 0.34, h * 0.2, -0.4, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(cx + w * 0.18, y + h * 0.12, w * 0.34, h * 0.2, 0.4, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = COLORS.sage
  ctx.lineWidth = 1.2
  for (let i = 0; i < 3; i += 1) {
    const legX = cx - w * 0.18 + i * w * 0.16
    const swing = Math.sin(elapsed * 12 + i + variant) * 1.5
    ctx.beginPath()
    ctx.moveTo(legX, cy + h * 0.25)
    ctx.lineTo(legX - 2 + swing, cy + h * 0.58)
    ctx.stroke()
  }

  ctx.fillStyle = withAlpha(COLORS.clay, 0.96)
  ctx.beginPath()
  ctx.ellipse(cx, cy, w * 0.28, h * 0.34, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(cx + w * 0.22, cy - h * 0.12, h * 0.2, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = COLORS.dark
  ctx.beginPath()
  ctx.arc(cx + w * 0.27, cy - h * 0.16, 1.1, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = COLORS.clay
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(cx + w * 0.08, cy - h * 0.3)
  ctx.lineTo(cx + w * 0.02, cy - h * 0.55)
  ctx.stroke()

  ctx.restore()
}

function drawSwarm(
  ctx: CanvasRenderingContext2D,
  obstacle: Obstacle,
  groundY: number,
  elapsed: number,
) {
  const { x, w, h, variant, count } = obstacle
  const gap = 4
  const pieceWidth = (w - gap * (count - 1)) / count

  for (let i = 0; i < count; i += 1) {
    const bx = x + i * (pieceWidth + gap)
    const bh = h - (i % 2) * 4
    const by = groundY - bh
    const wave = Math.sin(elapsed * 11 + i * 1.7 + variant)
    const color = i % 2 === 0 ? withAlpha(COLORS.clay, 0.94) : withAlpha(COLORS.sage, 0.92)

    ctx.save()
    ctx.lineCap = 'round'
    ctx.strokeStyle = COLORS.sage
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(bx + pieceWidth * 0.3, by + bh * 0.6)
    ctx.lineTo(bx + pieceWidth * 0.2, by + bh + wave)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(bx + pieceWidth * 0.7, by + bh * 0.6)
    ctx.lineTo(bx + pieceWidth * 0.8, by + bh - wave)
    ctx.stroke()

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.ellipse(bx + pieceWidth / 2, by + bh * 0.5, pieceWidth * 0.42, bh * 0.32, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(bx + pieceWidth * 0.28, by + bh * 0.34, bh * 0.18, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = COLORS.dark
    ctx.beginPath()
    ctx.arc(bx + pieceWidth * 0.24, by + bh * 0.31, 0.9, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = COLORS.clay
    ctx.beginPath()
    ctx.moveTo(bx + pieceWidth * 0.24, by + bh * 0.22)
    ctx.lineTo(bx + pieceWidth * 0.12, by + bh * 0.02)
    ctx.stroke()

    ctx.restore()
  }
}

function drawObstacle(
  ctx: CanvasRenderingContext2D,
  obstacle: Obstacle,
  groundY: number,
  elapsed: number,
) {
  if (obstacle.kind === 'spider') drawSpider(ctx, obstacle, groundY, elapsed)
  else if (obstacle.kind === 'caterpillar') drawCaterpillar(ctx, obstacle, groundY, elapsed)
  else if (obstacle.kind === 'fly') drawFly(ctx, obstacle, groundY, elapsed)
  else if (obstacle.kind === 'swarm') drawSwarm(ctx, obstacle, groundY, elapsed)
  else drawBeetle(ctx, obstacle, groundY, elapsed, obstacle.kind === 'large')
}

function createObstacle(w: number, score: number): Obstacle {
  const roll = Math.random()

  if (score >= 170 && roll < 0.12) {
    return {
      kind: 'large',
      x: w + 26,
      w: random(32, 40),
      h: random(30, 38),
      variant: Math.floor(Math.random() * 3),
      altitude: 0,
      count: 1,
    }
  }

  if (score >= 120 && roll < 0.27) {
    const count = Math.random() < 0.5 ? 2 : 3
    return {
      kind: 'swarm',
      x: w + 26,
      w: count * 13 + (count - 1) * 4,
      h: 18,
      variant: Math.floor(Math.random() * 3),
      altitude: 0,
      count,
    }
  }

  if (score >= 80 && roll < 0.47) {
    return {
      kind: 'fly',
      x: w + 26,
      w: random(20, 26),
      h: random(14, 18),
      variant: Math.floor(Math.random() * 3),
      altitude: random(10, 18),
      count: 1,
    }
  }

  if (score >= 55 && roll < 0.62) {
    return {
      kind: 'caterpillar',
      x: w + 26,
      w: random(34, 44),
      h: random(17, 20),
      variant: Math.floor(Math.random() * 3),
      altitude: 0,
      count: 4,
    }
  }

  if (score >= 30 && roll < 0.82) {
    return {
      kind: 'spider',
      x: w + 26,
      w: random(26, 32),
      h: random(20, 24),
      variant: Math.floor(Math.random() * 3),
      altitude: 0,
      count: 1,
    }
  }

  return {
    kind: 'beetle',
    x: w + 26,
    w: random(18, 26),
    h: random(20, 30),
    variant: Math.floor(Math.random() * 3),
    altitude: 0,
    count: 1,
  }
}

export function BugRun() {
  const reduce = useReducedMotion()
  const [status, setStatus] = useState<Status>('idle')
  const [finalScore, setFinalScore] = useState(0)
  const [isNewBest, setIsNewBest] = useState(false)
  const [best, setBest] = useState(readBestScore)

  const statusRef = useRef<Status>('idle')
  const bestRef = useRef(best)
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scoreRef = useRef<HTMLSpanElement>(null)
  const sizeRef = useRef({ w: 0, h: 0 })
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef(0)
  const gameRef = useRef<Game>({
    playerY: 0,
    playerVy: 0,
    grounded: true,
    obstacles: [],
    speed: START_SPEED,
    distance: 0,
    score: 0,
    spawnTimer: 1.15,
    elapsed: 0,
  })

  const drawFrame = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const { w, h } = sizeRef.current
    const game = gameRef.current
    const groundY = h - GROUND_PAD

    ctx.clearRect(0, 0, w, h)

    ctx.strokeStyle = COLORS.line
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, groundY + 0.5)
    ctx.lineTo(w, groundY + 0.5)
    ctx.stroke()

    const offset = game.distance % 48
    ctx.strokeStyle = COLORS.tick
    for (let x = -offset; x < w; x += 48) {
      ctx.beginPath()
      ctx.moveTo(x, groundY + 6)
      ctx.lineTo(x + 10, groundY + 6)
      ctx.stroke()
    }

    for (const obstacle of game.obstacles) {
      drawObstacle(ctx, obstacle, groundY, game.elapsed)
    }

    drawDuck(ctx, PLAYER_X, game.playerY, game.grounded, game.elapsed)
  }

  const endGame = () => {
    const score = gameRef.current.score
    const newBest = score > bestRef.current

    statusRef.current = 'over'
    setStatus('over')
    setFinalScore(score)
    setIsNewBest(newBest)

    if (newBest) {
      bestRef.current = score
      setBest(score)
      try {
        window.localStorage.setItem(BEST_KEY, String(score))
        window.localStorage.removeItem(DINO_BEST_KEY)
      } catch {
        void 0
      }
    }
  }

  const update = (dt: number) => {
    const game = gameRef.current
    const { w, h } = sizeRef.current
    const groundY = h - GROUND_PAD
    const groundTop = groundY - PLAYER_H

    game.elapsed += dt
    game.speed = Math.min(MAX_SPEED, START_SPEED + game.elapsed * 15)
    game.distance += game.speed * dt

    const score = Math.floor(game.distance / 10)
    if (score !== game.score) {
      game.score = score
      if (scoreRef.current) scoreRef.current.textContent = padScore(score)
    }

    if (game.grounded) {
      game.playerY = groundTop
    } else {
      game.playerVy += GRAVITY * dt
      game.playerY += game.playerVy * dt
      if (game.playerY >= groundTop) {
        game.playerY = groundTop
        game.playerVy = 0
        game.grounded = true
      }
    }

    game.spawnTimer -= dt
    if (game.spawnTimer <= 0) {
      game.obstacles.push(createObstacle(w, game.score))
      game.spawnTimer = Math.max(
        0.66,
        random(1, 1.48) - Math.min(0.34, game.elapsed * 0.0065),
      )
    }

    for (const obstacle of game.obstacles) {
      obstacle.x -= game.speed * dt
    }
    game.obstacles = game.obstacles.filter((obstacle) => obstacle.x + obstacle.w > -24)

    const playerLeft = PLAYER_X + 5
    const playerTop = game.playerY + 6
    const playerRight = playerLeft + PLAYER_W - 10
    const playerBottom = playerTop + PLAYER_H - 8

    for (const obstacle of game.obstacles) {
      const obstacleTop =
        obstacle.kind === 'fly'
          ? groundY - obstacle.altitude - obstacle.h
          : groundY - obstacle.h
      const overlapX =
        playerLeft < obstacle.x + obstacle.w - 3 && playerRight > obstacle.x + 3
      const overlapY =
        playerTop < obstacleTop + obstacle.h - 3 && playerBottom > obstacleTop + 3

      if (overlapX && overlapY) {
        endGame()
        return false
      }
    }

    return true
  }

  const loop = (time: number) => {
    if (statusRef.current !== 'running') return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    if (!lastTimeRef.current) lastTimeRef.current = time
    const dt = Math.min((time - lastTimeRef.current) / 1000, 0.04)
    lastTimeRef.current = time

    const alive = update(dt)
    drawFrame()

    if (alive && statusRef.current === 'running') {
      rafRef.current = window.requestAnimationFrame(loop)
    }
  }

  const startGame = () => {
    syncThemeColors()
    const { w, h } = sizeRef.current
    if (!w || !h) return

    const groundTop = h - GROUND_PAD - PLAYER_H
    const first = createObstacle(w, 0)
    first.x = w * 0.82
    first.kind = 'beetle'
    first.w = random(18, 24)
    first.h = random(20, 26)

    gameRef.current = {
      playerY: groundTop,
      playerVy: 0,
      grounded: true,
      obstacles: [first],
      speed: START_SPEED,
      distance: 0,
      score: 0,
      spawnTimer: 1.15,
      elapsed: 0,
    }

    if (scoreRef.current) scoreRef.current.textContent = padScore(0)
    setFinalScore(0)
    setIsNewBest(false)
    bestRef.current = best
    statusRef.current = 'running'
    setStatus('running')
    lastTimeRef.current = 0

    if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    rafRef.current = window.requestAnimationFrame(loop)
  }

  const jump = () => {
    const game = gameRef.current
    if (!game.grounded || statusRef.current !== 'running') return
    game.playerVy = JUMP_VELOCITY
    game.grounded = false
  }

  const act = () => {
    if (statusRef.current === 'running') {
      jump()
    } else {
      startGame()
    }
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    wrapRef.current?.focus()
    act()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ' ' || event.key === 'ArrowUp' || event.key === 'Enter') {
      event.preventDefault()
      act()
    }
  }

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      syncThemeColors()

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      sizeRef.current = { w: rect.width, h: rect.height }

      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (statusRef.current !== 'running') {
        gameRef.current.playerY = rect.height - GROUND_PAD - PLAYER_H
        if (scoreRef.current) scoreRef.current.textContent = padScore(gameRef.current.score)
        drawFrame()
      }
    }

    const observer = new ResizeObserver(resize)
    observer.observe(wrap)
    resize()

    const themeObserver = new MutationObserver(() => {
      syncThemeColors()
      if (statusRef.current !== 'running') drawFrame()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      observer.disconnect()
      themeObserver.disconnect()
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <motion.aside
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
      className="glass w-full rounded-2xl p-3.5 sm:p-5"
      aria-label="Bug Run mini-game"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] pb-3">
        <div className="flex items-center gap-2 font-mono text-[10px] text-dim sm:text-[11px]">
          <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
          bug-run.ts
        </div>
        <div className="font-mono text-[10px] text-dim">
          score <span ref={scoreRef} className="text-ink" /> · best{' '}
          {padScore(best)}
        </div>
      </div>

      <div
        ref={wrapRef}
        className="relative mt-3 h-[180px] touch-manipulation select-none overflow-hidden rounded-xl border border-white/[0.06] bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/60 sm:h-[190px]"
        role="button"
        tabIndex={0}
        aria-label="Bug Run game. Press Space, Enter, or tap to start and jump."
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
      >
        <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />

        {status !== 'running' && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
            <div className="rounded-lg bg-void/55 px-3 py-2.5 text-center backdrop-blur-sm sm:rounded-xl sm:px-4 sm:py-3">
              {status === 'idle' ? (
                <>
                  <p className="font-display text-lg text-ink sm:text-xl">Tap to start</p>
                  <p className="mt-1 text-[10px] text-muted sm:text-[11px]">
                    Jump the bugs. Keep the duck running.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display text-lg text-clay sm:text-xl">Caught a bug.</p>
                  <p className="mt-1 text-[10px] text-muted sm:text-[11px]">
                    score {padScore(finalScore)}
                    {isNewBest && <span className="text-sage"> · new best</span>}
                  </p>
                  <p className="mt-2 font-mono text-[10px] text-dim">
                    tap / space to run again
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-dim">
        <span>
          <span className="sm:hidden">tap to jump</span>
          <span className="hidden sm:inline">space / tap to jump</span>
        </span>
        <span className={status === 'over' ? 'text-clay' : status === 'running' ? 'text-sage' : ''}>
          {status === 'idle' ? 'ready' : status === 'running' ? 'running' : 'crashed'}
        </span>
      </div>

      <p className="sr-only" aria-live="polite">
        {status === 'running'
          ? 'Game running.'
          : status === 'over'
            ? `Game over. Score ${finalScore}.`
            : 'Game ready. Press Space or tap to start.'}
      </p>
    </motion.aside>
  )
}
