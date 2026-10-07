import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
  className = '',
}: {
  id: string
  index: string
  label: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 ${className}`}>
      <motion.header
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-dim">
          <span className="text-cyan">{index}</span>
          <span className="h-px w-8 bg-edge-bright" aria-hidden="true" />
          <span className="uppercase">{label}</span>
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
        {intro && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{intro}</p>}
      </motion.header>
      {children}
    </section>
  )
}

export function Panel({
  children,
  className = '',
  hover = false,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={`relative rounded-lg border border-edge bg-panel/70 transition-colors duration-300 ${
        hover ? 'hover:border-edge-bright' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-edge-bright/70 bg-void/60 px-2 py-1 font-mono text-[11px] text-muted">
      {children}
    </span>
  )
}
