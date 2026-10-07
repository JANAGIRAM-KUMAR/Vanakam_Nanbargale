import { motion, useReducedMotion } from 'framer-motion'
import { Building2, MapPin } from 'lucide-react'
import { EXPERIENCE } from '../data/content'
import { Panel, Section } from './ui'

function LabDiagram() {
  const reduce = useReducedMotion()
  const devices = Array.from({ length: 12 }, (_, i) => i)
  return (
    <Panel className="overflow-hidden p-5">
      <div className="mb-4 flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-dim">
        <span>OTTAWA LAB</span>
        <span className="text-term">● LIVE</span>
      </div>

      <div className="grid grid-cols-4 gap-2" aria-hidden="true">
        {devices.map((i) => (
          <motion.div
            key={i}
            className="flex h-11 items-center justify-center rounded border border-edge-bright/70 bg-void/70 font-mono text-[9px] text-dim"
            animate={reduce ? undefined : { borderColor: ['rgba(38,48,66,0.7)', 'rgba(34,211,238,0.55)', 'rgba(38,48,66,0.7)'] }}
            transition={reduce ? undefined : { duration: 3, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          >
            SW-{String(i + 1).padStart(2, '0')}
          </motion.div>
        ))}
      </div>

      <div className="my-4 flex items-center gap-2">
        <span className="h-px flex-1 bg-edge" aria-hidden="true" />
        <span className="font-mono text-[10px] text-cyan">IS-IS · OSPF · CFM</span>
        <span className="h-px flex-1 bg-edge" aria-hidden="true" />
      </div>

      <svg viewBox="0 0 320 96" className="w-full" role="img" aria-label="Six network topologies across twenty-four devices">
        {[0, 1, 2, 3, 4, 5].map((t) => {
          const x = 26 + t * 51
          return (
            <g key={t}>
              <rect x={x - 16} y={14} width={32} height={20} rx="3" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" strokeWidth="0.8" />
              <rect x={x - 16} y={62} width={32} height={20} rx="3" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="0.8" />
              <line x1={x} y1={34} x2={x} y2={62} stroke="#263042" strokeWidth="1" />
              <line x1={x} y1={48} x2={x + 25} y2={48} stroke="#263042" strokeWidth="1" strokeDasharray="3 3" className="flow-line" />
              <text x={x} y={27} textAnchor="middle" fill="#8b97ab" fontSize="7" fontFamily="ui-monospace, monospace">
                {t + 1}
              </text>
              <text x={x} y={75} textAnchor="middle" fill="#5c6779" fontSize="7" fontFamily="ui-monospace, monospace">
                {t + 1}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-3 border-t border-edge pt-4 font-mono text-[11px]">
        <div>
          <div className="text-2xl font-semibold text-cyan">6</div>
          <div className="text-dim">TOPOLOGIES</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-term">24</div>
          <div className="text-dim">DEVICES</div>
        </div>
      </div>
    </Panel>
  )
}

export function Experience() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="experience"
      index="02"
      label="Experience"
      title="Professional experience"
      intro="Real infrastructure, real hardware, real teams."
    >
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <div className="relative pl-6 sm:pl-8">
          <span className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-cyan via-edge-bright to-transparent" aria-hidden="true" />
          <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-cyan shadow-[0_0_12px_rgba(34,211,238,0.8)]" aria-hidden="true" />

          {EXPERIENCE.map((job) => (
            <motion.article
              key={job.company}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55 }}
            >
              <Panel hover className="relative p-6">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent"
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded border border-cyan/50 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] tracking-[0.16em] text-cyan">
                        CURRENT
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.14em] text-dim">{job.period}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-ink sm:text-2xl">{job.company}</h3>
                    <p className="mt-1 text-sm text-cyan">{job.role}</p>
                    <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-dim">
                      <Building2 className="size-3" aria-hidden="true" /> Ciena
                      <span className="mx-1 text-edge-bright">·</span>
                      <MapPin className="size-3" aria-hidden="true" /> {job.location}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-3">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan/80" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </motion.article>
          ))}

          <div className="relative mt-6">
            <span className="absolute -left-[30px] top-2 size-2 rounded-full bg-edge-bright sm:-left-[38px]" aria-hidden="true" />
            <p className="font-mono text-[11px] text-dim">
              Computer Science Engineering · Sri Venkateswara College of Engineering
            </p>
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <LabDiagram />
        </div>
      </div>
    </Section>
  )
}
