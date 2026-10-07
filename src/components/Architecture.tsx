import { motion, useReducedMotion } from 'framer-motion'
import { STACK_LAYERS } from '../data/content'
import { Section } from './ui'

const ACCENT: Record<string, { border: string; text: string; bg: string; bar: string }> = {
  term: { border: 'border-term/60', text: 'text-term', bg: 'bg-term/10', bar: 'bg-term' },
  cyan: { border: 'border-cyan/60', text: 'text-cyan', bg: 'bg-cyan/10', bar: 'bg-cyan' },
  blue: { border: 'border-blue/60', text: 'text-blue', bg: 'bg-blue/10', bar: 'bg-blue' },
}

export function Architecture() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="architecture"
      index="08"
      label="System Architecture"
      title="Janagiram's stack"
      intro="How the layers I work with fit together — from intelligence down to the wire."
    >
      <div className="relative mx-auto max-w-2xl">
        <div
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-term/70 via-cyan/50 to-blue/70"
          aria-hidden="true"
        />

        <ol className="space-y-5">
          {STACK_LAYERS.map((layer, i) => {
            const a = ACCENT[layer.accent]
            return (
              <motion.li
                key={layer.title}
                initial={reduce ? false : { opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className="relative flex justify-center"
              >
                <div
                  className={`relative w-full rounded-lg border ${a.border} ${a.bg} px-6 py-5 backdrop-blur-sm`}
                >
                  <span className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${a.bar}`} aria-hidden="true" />
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className={`font-mono text-[10px] tracking-[0.3em] ${a.text} opacity-70`}>
                      LAYER {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-ink sm:text-xl">
                      {layer.title}
                    </h3>
                    {layer.lines.map((l) => (
                      <p key={l} className="font-mono text-[12px] text-muted">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>

                {i < STACK_LAYERS.length - 1 && (
                  <motion.span
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-dim"
                    aria-hidden="true"
                    animate={reduce ? undefined : { y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    ▼
                  </motion.span>
                )}
              </motion.li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
