import { motion, useReducedMotion } from 'framer-motion'
import { SKILLS } from '../data/content'
import { Panel, Section } from './ui'

export function Skills() {
  const reduce = useReducedMotion()

  return (
    <Section id="skills" index="04" title="Skills" intro="Tools I reach for, grouped by layer.">
      <Panel className="p-5 sm:p-8">
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
          {SKILLS.map((category, index) => (
            <motion.div
              key={category.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              className="border-t border-white/10 pt-4"
            >
              <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                {category.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {category.items.join(' · ')}
              </p>
            </motion.div>
          ))}
        </div>
      </Panel>
    </Section>
  )
}
