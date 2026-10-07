import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { SKILLS } from '../data/content'
import { Section } from './ui'

const ACCENTS = ['text-cyan', 'text-blue', 'text-term', 'text-amber']

export function Skills() {
  const [open, setOpen] = useState<string | null>('languages')
  const reduce = useReducedMotion()

  return (
    <Section
      id="skills"
      index="03"
      label="Skills"
      title="Technical stack"
      intro="Interactive — select a layer to expand the stack."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {SKILLS.map((cat, i) => {
          const isOpen = open === cat.id
          const accent = ACCENTS[i % ACCENTS.length]
          return (
            <div key={cat.id} className={`rounded-lg border ${isOpen ? 'border-edge-bright' : 'border-edge'} bg-panel/70 transition-colors`}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : cat.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span className="flex items-center gap-3">
                  <span className={`font-mono text-[11px] ${accent}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-medium text-ink">{cat.label}</span>
                  <span className="hidden font-mono text-[10px] text-dim sm:inline">
                    {cat.items.length} items
                  </span>
                </span>
                <ChevronDown
                  className={`size-4 text-dim transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-edge px-5 pb-5 pt-4">
                      <p className="mb-3 text-xs leading-relaxed text-dim">{cat.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item, j) => (
                          <motion.span
                            key={item}
                            initial={reduce ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: j * 0.04 }}
                            className={`rounded border border-edge-bright/70 bg-void/60 px-2.5 py-1.5 font-mono text-[11px] ${accent} transition-colors hover:border-current`}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
