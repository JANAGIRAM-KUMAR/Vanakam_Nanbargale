import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'

type Status = 'idle' | 'running' | 'over'

type StackBlock = {
  x: number
  width: number
  color: string
  label: string
}

type Debris = {
  x: number
  y: number
  width: number
  height: number
  vx: number
  vy: number
  rotation: number
  spin: number
  ttl: number
  color: string
}

type Effect = {
  kind: 'perfect' | 'drop'
  x: number
  y: number
  ttl: number
  max: number
}

type Game = {
  stack: StackBlock[]
  currentX: number
  currentWidth: number
  currentDirection: 1 | -1
  currentSpeed: number
  currentColor: string
  currentLabel: string
  currentActive: boolean
  score: number
  combo: number
  camera: number
  elapsed: number
  debris: Debris[]
  effects: Effect[]
}

const BEST_KEY = 'jk-commit-stacker-best'
const BLOCK_H = 16
const BASE_PAD = 16
const PERFECT_WINDOW = 3
const MIN_WIDTH = 9

const LABELS = ['main', 'feat', 'fix', 'test', 'docs', 'ci', 'perf', 'build', 'ship']

const COLORS = {
  ink: '#f1efe7',
  sage: '#b9cbaa',
  clay: '#d7b28b',
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

  COLORS.ink = read('--color-ink', COLORS.ink)
  COLORS.sage = read('--color-sage', COLORS.sage)
  COLORS.clay = read('--color-clay', COLORS.clay)
}

function padScore(value: number) {
  return String(value).padStart(4, '0')
}

function readBestScore() {
  if (typeof window === 'undefined') return 0
  try {
    const value = Number(window.localStorage.getItem(BEST_KEY))
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0
  } catch {
    return 0
  }
}

function targetCamera(stackHeight: number, height: number) {
  return Math.max(0, stackHeight - height * 0.42 + BASE_PAD)
}

function drawBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  color: string,
  label: string,
  active = false,
) {
  if (width <= 0) return

  ctx.save()
  if (active) {
    ctx.shadowColor = withAlpha(color, 0.55)
    ctx.shadowBlur = 12
  }

  ctx.fillStyle = withAlpha(color, active ? 0.88 : 0.48)
  ctx.beginPath()
  ctx.roundRect(x, y, width, BLOCK_H, 3)
  ctx.fill()

  ctx.shadowBlur = 0
  ctx.strokeStyle = withAlpha(color, active ? 0.92 : 0.55)
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.roundRect(x + 0.5, y + 0.5, width - 1, BLOCK_H - 1, 3)
  ctx.stroke()

  ctx.fillStyle = withAlpha(COLORS.ink, active ? 0.42 : 0.24)
  ctx.fillRect(x + 4, y + 2, Math.max(0, width - 8), 1)

  if (width > 38) {
    ctx.fillStyle = withAlpha(COLORS.ink, 0.68)
    ctx.font = '600 7px ui-monospace, SFMono-Regular, Menlo, monospace'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, x + 6, y + BLOCK_H / 2 + 0.5)

    ctx.fillStyle = withAlpha(COLORS.ink, 0.38)
    ctx.beginPath()
    ctx.arc(x + width - 8, y + BLOCK_H / 2, 2, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

export function CommitStacker() {
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
    stack: [],
    currentX: 0,
    currentWidth: 0,
    currentDirection: 1,
    currentSpeed: 150,
    currentColor: COLORS.sage,
    currentLabel: LABELS[1],
    currentActive: false,
    score: 0,
    combo: 0,
    camera: 0,
    elapsed: 0,
    debris: [],
    effects: [],
  })

  const setScore = (value: number) => {
    gameRef.current.score = value
    if (scoreRef.current) scoreRef.current.textContent = padScore(value)
  }

  const drawFrame = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const { w, h } = sizeRef.current
    const game = gameRef.current
    if (!w || !h) return

    ctx.clearRect(0, 0, w, h)

    ctx.fillStyle = withAlpha(COLORS.ink, 0.08)
    for (let x = 12; x < w; x += 24) {
      for (let y = 12; y < h; y += 24) {
        ctx.fillRect(x, y, 1, 1)
      }
    }

    ctx.setLineDash([2, 8])
    ctx.strokeStyle = withAlpha(COLORS.ink, 0.07)
    ctx.beginPath()
    ctx.moveTo(w / 2, 8)
    ctx.lineTo(w / 2, h - 6)
    ctx.stroke()
    ctx.setLineDash([])

    if (statusRef.current === 'idle') {
      const demoWidth = Math.min(150, w * 0.4)
      const demoX = (w - demoWidth) / 2
      const demoColors = [COLORS.sage, COLORS.clay, COLORS.sage]
      const demoLabels = ['main', 'feat', 'fix']

      for (let i = 0; i < 3; i += 1) {
        drawBlock(
          ctx,
          demoX,
          h - BASE_PAD - (i + 1) * BLOCK_H,
          demoWidth,
          demoColors[i],
          demoLabels[i],
          i === 2,
        )
      }
    } else {
      const stackHeight = game.stack.length * BLOCK_H
      const topY = h - BASE_PAD - stackHeight + game.camera

      for (let i = 0; i < game.stack.length; i += 1) {
        const block = game.stack[i]
        const y = h - BASE_PAD - (i + 1) * BLOCK_H + game.camera
        if (y > h + BLOCK_H || y < -BLOCK_H) continue
        drawBlock(ctx, block.x, y, block.width, block.color, block.label, i === game.stack.length - 1)
      }

      if (game.currentActive) {
        const currentY = topY - BLOCK_H
        const center = game.currentX + game.currentWidth / 2
        const topCenter = game.stack.length
          ? game.stack[game.stack.length - 1].x + game.stack[game.stack.length - 1].width / 2
          : w / 2

        ctx.setLineDash([2, 5])
        ctx.strokeStyle = withAlpha(COLORS.ink, 0.12)
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(center, currentY + BLOCK_H)
        ctx.lineTo(center, topY)
        ctx.stroke()
        ctx.setLineDash([])

        ctx.strokeStyle = withAlpha(COLORS.ink, 0.16)
        ctx.beginPath()
        ctx.moveTo(topCenter, topY)
        ctx.lineTo(topCenter, topY + 4)
        ctx.stroke()

        drawBlock(
          ctx,
          game.currentX,
          currentY,
          game.currentWidth,
          game.currentColor,
          game.currentLabel,
          true,
        )
      }

      for (const piece of game.debris) {
        ctx.save()
        ctx.globalAlpha = Math.min(1, piece.ttl * 2)
        ctx.translate(piece.x + piece.width / 2, piece.y + piece.height / 2)
        ctx.rotate(piece.rotation)
        ctx.fillStyle = withAlpha(piece.color, 0.4)
        ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height)
        ctx.restore()
      }

      for (const effect of game.effects) {
        const progress = 1 - effect.ttl / effect.max
        const alpha = 1 - progress

        ctx.strokeStyle = withAlpha(COLORS.sage, alpha * 0.8)
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(effect.x, effect.y, 6 + progress * 16, 0, Math.PI * 2)
        ctx.stroke()

        if (effect.kind === 'perfect') {
          ctx.fillStyle = withAlpha(COLORS.sage, alpha)
          ctx.font = '700 8px ui-monospace, SFMono-Regular, Menlo, monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('PERFECT', effect.x, effect.y - 12 - progress * 10)
        }
      }
    }

    ctx.fillStyle = withAlpha(COLORS.ink, 0.3)
    ctx.font = '600 7px ui-monospace, SFMono-Regular, Menlo, monospace'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'bottom'
    ctx.fillText(statusRef.current === 'running' ? 'main' : 'commit-stacker', 8, h - 5)
  }

  const endGame = () => {
    const game = gameRef.current
    const newBest = game.score > bestRef.current

    statusRef.current = 'over'
    setStatus('over')
    setFinalScore(game.score)
    setIsNewBest(newBest)
    game.currentActive = false
    game.currentWidth = 0

    if (newBest) {
      bestRef.current = game.score
      setBest(game.score)
      try {
        window.localStorage.setItem(BEST_KEY, String(game.score))
      } catch {
        void 0
      }
    }
  }

  const spawnCurrent = () => {
    const { w, h } = sizeRef.current
    const game = gameRef.current
    const top = game.stack[game.stack.length - 1]
    if (!top || !w || !h) return

    const direction: 1 | -1 = game.stack.length % 2 === 0 ? -1 : 1
    game.currentWidth = top.width
    game.currentDirection = direction
    game.currentX = direction === 1 ? 0 : w - top.width
    game.currentSpeed = 140 + Math.min(150, game.score * 2.2)
    game.currentColor = game.stack.length % 2 === 0 ? COLORS.clay : COLORS.sage
    game.currentLabel = LABELS[game.stack.length % LABELS.length]
    game.currentActive = true
  }

  const drop = () => {
    const game = gameRef.current
    const { w, h } = sizeRef.current
    if (statusRef.current !== 'running' || !game.currentActive || !w || !h) return

    const top = game.stack[game.stack.length - 1]
    if (!top) return

    const left = Math.max(top.x, game.currentX)
    const right = Math.min(top.x + top.width, game.currentX + game.currentWidth)
    const overlap = right - left
    const stackHeight = game.stack.length * BLOCK_H
    const topY = h - BASE_PAD - stackHeight + game.camera
    const currentY = topY - BLOCK_H
    const currentCenter = game.currentX + game.currentWidth / 2
    const topCenter = top.x + top.width / 2
    const perfect = Math.abs(currentCenter - topCenter) <= PERFECT_WINDOW

    if (overlap <= 0) {
      game.debris.push({
        x: game.currentX,
        y: currentY,
        width: game.currentWidth,
        height: BLOCK_H,
        vx: (game.currentX + game.currentWidth / 2 < w / 2 ? -1 : 1) * 40,
        vy: -35,
        rotation: 0,
        spin: (Math.random() - 0.5) * 6,
        ttl: 1.1,
        color: game.currentColor,
      })
      endGame()
      return
    }

    if (!perfect && overlap < MIN_WIDTH) {
      endGame()
      return
    }

    if (game.currentX < left) {
      game.debris.push({
        x: game.currentX,
        y: currentY,
        width: left - game.currentX,
        height: BLOCK_H,
        vx: -35,
        vy: -30,
        rotation: 0,
        spin: -3,
        ttl: 0.9,
        color: game.currentColor,
      })
    }
    if (game.currentX + game.currentWidth > right) {
      game.debris.push({
        x: right,
        y: currentY,
        width: game.currentX + game.currentWidth - right,
        height: BLOCK_H,
        vx: 35,
        vy: -30,
        rotation: 0,
        spin: 3,
        ttl: 0.9,
        color: game.currentColor,
      })
    }

    const nextWidth = perfect ? top.width : overlap
    const nextX = perfect ? top.x : left

    game.stack.push({
      x: nextX,
      width: nextWidth,
      color: game.currentColor,
      label: game.currentLabel,
    })

    game.effects.push({
      kind: perfect ? 'perfect' : 'drop',
      x: nextX + nextWidth / 2,
      y: topY - BLOCK_H / 2,
      ttl: perfect ? 0.7 : 0.3,
      max: perfect ? 0.7 : 0.3,
    })

    if (perfect) {
      game.combo += 1
      setScore(game.score + 10 + game.combo * 2)
    } else {
      game.combo = 0
      setScore(game.score + 1)
    }

    spawnCurrent()
  }

  const update = (dt: number) => {
    const game = gameRef.current
    const { w, h } = sizeRef.current
    if (!w || !h) return

    game.elapsed += dt
    game.currentX += game.currentDirection * game.currentSpeed * dt

    if (game.currentX <= 0) {
      game.currentX = 0
      game.currentDirection = 1
    } else if (game.currentX + game.currentWidth >= w) {
      game.currentX = w - game.currentWidth
      game.currentDirection = -1
    }

    const wantedCamera = targetCamera(game.stack.length * BLOCK_H, h)
    game.camera += (wantedCamera - game.camera) * Math.min(1, dt * 10)

    for (const piece of game.debris) {
      piece.vy += 360 * dt
      piece.x += piece.vx * dt
      piece.y += piece.vy * dt
      piece.rotation += piece.spin * dt
      piece.ttl -= dt
    }
    game.debris = game.debris.filter((piece) => piece.ttl > 0)

    for (const effect of game.effects) {
      effect.ttl -= dt
    }
    game.effects = game.effects.filter((effect) => effect.ttl > 0)
  }

  const loop = (time: number) => {
    if (statusRef.current !== 'running') return

    if (!lastTimeRef.current) lastTimeRef.current = time
    const dt = Math.min((time - lastTimeRef.current) / 1000, 0.04)
    lastTimeRef.current = time

    update(dt)
    drawFrame()

    if (statusRef.current === 'running') {
      rafRef.current = window.requestAnimationFrame(loop)
    }
  }

  const startGame = () => {
    syncThemeColors()
    const { w, h } = sizeRef.current
    if (!w || !h) return

    const baseWidth = Math.min(150, w * 0.42)
    gameRef.current = {
      stack: [
        {
          x: (w - baseWidth) / 2,
          width: baseWidth,
          color: COLORS.sage,
          label: 'main',
        },
      ],
      currentX: 0,
      currentWidth: baseWidth,
      currentDirection: 1,
      currentSpeed: 140,
      currentColor: COLORS.sage,
      currentLabel: LABELS[1],
      currentActive: false,
      score: 0,
      combo: 0,
      camera: 0,
      elapsed: 0,
      debris: [],
      effects: [],
    }

    if (scoreRef.current) scoreRef.current.textContent = padScore(0)
    setFinalScore(0)
    setIsNewBest(false)
    bestRef.current = best
    statusRef.current = 'running'
    setStatus('running')
    lastTimeRef.current = 0
    spawnCurrent()

    if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    rafRef.current = window.requestAnimationFrame(loop)
  }

  const act = () => {
    if (statusRef.current === 'running') {
      drop()
    } else {
      startGame()
    }
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.focus()
    act()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ' ' || event.key === 'Enter' || event.key === 'ArrowDown') {
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
      if (statusRef.current !== 'running') drawFrame()
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
      aria-label="Commit Stacker mini-game"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] pb-3">
        <div className="flex items-center gap-2 font-mono text-[10px] text-dim sm:text-[11px]">
          <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
          commit-stacker.ts
        </div>
        <div className="font-mono text-[9px] text-dim sm:text-[10px]">
          score <span ref={scoreRef} className="text-ink">0000</span> · best {padScore(best)}
        </div>
      </div>

      <div
        ref={wrapRef}
        className="relative mt-3 h-[180px] cursor-pointer touch-manipulation select-none overflow-hidden rounded-xl border border-white/[0.06] bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/60 sm:h-[190px]"
        role="application"
        tabIndex={0}
        aria-label="Commit Stacker. Tap or press space to drop each commit onto the stack. Perfect drops keep the full width."
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
      >
        <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />

        {status !== 'running' && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
            <div className="rounded-lg bg-void/80 px-3 py-2.5 text-center sm:rounded-xl sm:px-4 sm:py-3">
              {status === 'idle' ? (
                <>
                  <p className="font-display text-lg text-ink sm:text-xl">Commit Stacker</p>
                  <p className="mt-1 text-[10px] text-muted sm:text-[11px]">
                    Drop commits. Keep the stack aligned.
                  </p>
                  <p className="mt-2 font-mono text-[10px] text-dim">tap / space to start</p>
                </>
              ) : (
                <>
                  <p className="font-display text-lg text-clay sm:text-xl">Merge conflict.</p>
                  <p className="mt-1 text-[10px] text-muted sm:text-[11px]">
                    score {padScore(finalScore)}
                    {isNewBest && <span className="text-sage"> · new best</span>}
                  </p>
                  <p className="mt-2 font-mono text-[10px] text-dim">tap / space to retry</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-dim">
        <span>
          <span className="sm:hidden">tap to drop</span>
          <span className="hidden sm:inline">tap / space to drop</span>
        </span>
        <span className={status === 'over' ? 'text-clay' : status === 'running' ? 'text-sage' : ''}>
          {status === 'idle' ? 'ready' : status === 'running' ? 'stacking' : 'collapsed'}
        </span>
      </div>

      <p className="sr-only" aria-live="polite">
        {status === 'running'
          ? 'Commit Stacker running.'
          : status === 'over'
            ? `Stack collapsed. Score ${finalScore}.`
            : 'Game ready. Press Space or tap to start.'}
      </p>
    </motion.aside>
  )
}
