import { motion, useReducedMotion } from 'framer-motion'
import { FileText, Trophy } from 'lucide-react'
import { GithubIcon as Github } from './icons'
import { ACHIEVEMENTS, PHILOSOPHY, RESEARCH } from '../data/content'
import { Panel, Section } from './ui'

export function Research() {
  const reduce = useReducedMotion()
  return (
    <Section id="research" index="05" label="Research" title="Research">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <Panel hover className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start">
          <span className="flex size-9 shrink-0 items-center justify-center rounded border border-cyan/50 bg-cyan/10 text-cyan">
            <FileText className="size-4" aria-hidden="true" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-base font-medium text-ink sm:text-lg">{RESEARCH.title}</h3>
              <span className="rounded border border-edge-bright px-2 py-0.5 font-mono text-[10px] text-muted">
                {RESEARCH.year}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{RESEARCH.description}</p>
          </div>
        </Panel>
      </motion.div>
    </Section>
  )
}

export function Achievements() {
  const reduce = useReducedMotion()
  const cells = Array.from({ length: 52 }, (_, i) => i)

  return (
    <Section id="achievements" index="06" label="Achievements" title="Achievements">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <Panel className="p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-dim">
            <Trophy className="size-3.5 text-amber" aria-hidden="true" /> HIGHLIGHTS
          </div>
          <ul className="mt-4 space-y-4">
            {ACHIEVEMENTS.map((a) => (
              <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-3 border-t border-edge pt-4">
            <a
              href="https://github.com/JANAGIRAM-KUMAR"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-cyan"
            >
              <Github className="size-3.5" aria-hidden="true" /> GitHub profile
            </a>
          </div>
        </Panel>

        <Panel className="hidden p-6 lg:block">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-dim">
            <span>BUILD ACTIVITY</span>
            <span className="text-term">● continuous</span>
          </div>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 grid grid-flow-col grid-rows-7 gap-1"
            aria-hidden="true"
          >
            {cells.map((i) => {
              const level = [0.15, 0.3, 0.5, 0.75, 1][(i * 7 + 3) % 5]
              return (
                <span
                  key={i}
                  className="size-2.5 rounded-[2px]"
                  style={{
                    backgroundColor: `rgba(34, 211, 238, ${level * 0.75})`,
                    outline: level < 0.2 ? '1px solid rgba(38,48,66,0.8)' : 'none',
                    outlineOffset: '-1px',
                  }}
                />
              )
            })}
          </motion.div>
          <p className="mt-4 font-mono text-[10px] leading-relaxed text-dim">
            Illustrative pattern of continuous building — no fabricated statistics.
          </p>
        </Panel>
      </div>
    </Section>
  )
}

export function Philosophy() {
  const reduce = useReducedMotion()
  return (
    <section id="philosophy" className="relative border-y border-edge bg-panel/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-dim">
          <span className="text-cyan">07</span>
          <span className="h-px w-8 bg-edge-bright" aria-hidden="true" />
          <span className="uppercase">How I think</span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-0">
          {PHILOSOPHY.map((p, i) => (
            <motion.div
              key={p.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col items-start gap-2 border border-edge bg-void/60 p-6 sm:border-r-0 sm:last:border-r"
            >
              <span className="font-mono text-[10px] text-cyan">0{i + 1}</span>
              <h3 className="text-lg font-semibold uppercase tracking-[0.18em] text-ink">{p.label}</h3>
              <p className="text-sm leading-relaxed text-muted">{p.text}</p>
              {i < PHILOSOPHY.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-cyan sm:block"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-dim sm:hidden">
          <span>BUILD</span> <span className="text-cyan">→</span> <span>UNDERSTAND</span>{' '}
          <span className="text-cyan">→</span> <span>IMPROVE</span>
        </div>
      </div>
    </section>
  )
}
