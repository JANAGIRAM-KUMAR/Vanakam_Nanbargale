import { motion, useReducedMotion } from 'framer-motion'
import { ABOUT } from '../data/content'
import { Panel, Section } from './ui'

export function About() {
  const reduce = useReducedMotion()
  const stats = [
    { k: 'FOCUS', v: 'AI · Backend · Networking' },
    { k: 'EDUCATION', v: 'Computer Science Engineering' },
    { k: 'INSTITUTE', v: 'Sri Venkateswara College of Engineering' },
    { k: 'APPROACH', v: 'Application layer → Infrastructure' },
  ]

  return (
    <Section
      id="about"
      index="01"
      label="About"
      title="Engineering across the full stack — down to the wire."
    >
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">
              {p}
            </p>
          ))}
        </motion.div>

        <Panel className="p-5">
          <div className="mb-4 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-dim">
            <span className="size-1.5 rounded-full bg-term" aria-hidden="true" />
            SYSTEM.INFO
          </div>
          <dl className="space-y-4">
            {stats.map((s) => (
              <div key={s.k} className="border-b border-edge/70 pb-3 last:border-0 last:pb-0">
                <dt className="font-mono text-[10px] tracking-[0.2em] text-dim">{s.k}</dt>
                <dd className="mt-1 text-sm text-ink">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>
    </Section>
  )
}
