import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon as Github } from './icons'
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
              className="group p-5 transition-colors hover:bg-white/[0.015] sm:p-8"
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

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="font-mono text-[10px] leading-relaxed text-dim">
                  {project.stack.slice(0, 6).join(' · ')}
                  {project.stack.length > 6 && ` · +${project.stack.length - 6}`}
                </p>
                <a
                  href={`https://github.com/${project.repo}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-dim transition-colors hover:text-ink focus-visible:text-ink"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <Github className="size-3" aria-hidden="true" />
                  GitHub
                  <ArrowUpRight
                    className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </Panel>
    </Section>
  )
}
