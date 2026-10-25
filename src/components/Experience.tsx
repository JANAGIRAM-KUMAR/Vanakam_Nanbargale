import { motion, useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { EXPERIENCE } from '../data/content'
import { Section } from './ui'

export function Experience() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="experience"
      index="02"
      title="Experience"
      intro="Industry work in networking, AI tooling, and internal tools."
    >
      <div className="relative border-l border-white/10 pl-5 sm:pl-8">
        <span
          className="absolute left-0 top-2 size-2.5 -translate-x-1/2 rounded-full bg-sage ring-4 ring-sage/10"
          aria-hidden="true"
        />

        {EXPERIENCE.map((job) => (
          <motion.article
            key={job.company}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-xl leading-none text-ink sm:text-2xl">
                {job.company}
              </h3>
              <span className="font-mono text-[10px] text-dim">{job.period}</span>
            </div>
            <p className="mt-2 text-sm text-sage">{job.role}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-dim">
              <MapPin className="size-3" aria-hidden="true" />
              {job.location}
            </p>

            <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
              {job.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-px w-3 shrink-0 bg-sage/60" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">Education</p>
        <h3 className="mt-3 font-display text-lg leading-tight text-ink sm:text-xl">
          Computer Science Engineering
        </h3>
        <p className="mt-1 text-sm text-muted">Sri Venkateswara College of Engineering</p>
      </div>
    </Section>
  )
}
