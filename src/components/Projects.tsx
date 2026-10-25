import { motion, useReducedMotion } from 'framer-motion'
import { PROJECTS } from '../data/content'
import { Panel, Section } from './ui'

export function Projects() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="projects"
      index="03"
      title="Projects"
      intro="Selected work across backend, infrastructure, and frontend."
    >
      <Panel className="overflow-hidden">
        <div className="divide-y divide-white/[0.07]">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="p-5 transition-colors hover:bg-white/[0.015] sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl leading-tight text-ink sm:text-2xl">
                    {project.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-sage">{project.tagline}</p>
                </div>
                <span className="hidden shrink-0 font-mono text-[10px] text-dim sm:block">
                  0{index + 1}
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4">
                {project.description}
              </p>

              <ul className="mt-4 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
                {project.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-sage/60" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="mt-4 hidden font-mono text-[10px] leading-relaxed text-dim sm:block">
                {project.stack.slice(0, 6).join(' · ')}
                {project.stack.length > 6 && ` · +${project.stack.length - 6}`}
              </p>
            </motion.article>
          ))}
        </div>
      </Panel>
    </Section>
  )
}
