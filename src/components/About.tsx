import { motion, useReducedMotion } from 'framer-motion'
import { ABOUT, RESEARCH } from '../data/content'
import { Section } from './ui'

const FACTS = [
  {
    label: 'Education',
    value: 'Computer Science Engineering, Sri Venkateswara College of Engineering',
  },
  { label: 'Experience', value: 'Summer Intern at Ciena' },
  { label: 'Focus', value: 'AI agents, backend systems, and networking' },
  { label: 'Research', value: `AI in cloud security (${RESEARCH.year})` },
]

export function About() {
  const reduce = useReducedMotion()

  return (
    <Section id="about" index="01" title="About" intro="A short version of the longer story.">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45 }}
      >
        <div className="max-w-2xl space-y-4 sm:space-y-5">
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-muted sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-dim sm:mt-10">
          At a glance
        </p>
        <dl className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
          {FACTS.map((fact) => (
            <div key={fact.label} className="border-t border-white/10 pt-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                {fact.label}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </Section>
  )
}
