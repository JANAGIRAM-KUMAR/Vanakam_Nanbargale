import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, LayoutDashboard, Music4, Server } from 'lucide-react'
import { GithubIcon as Github } from './icons'
import { PROJECTS, type Project } from '../data/content'
import { Chip, Panel, Section } from './ui'

function FlowDiagram({ flow, accent }: { flow: string[]; accent: string }) {
  const reduce = useReducedMotion()
  return (
    <div className="rounded-lg border border-edge bg-void/60 p-4">
      <div className="mb-3 font-mono text-[10px] tracking-[0.2em] text-dim">ARCHITECTURE</div>
      <ol className="space-y-1.5">
        {flow.map((step, i) => (
          <li key={step} className="flex items-center gap-2.5">
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded border border-edge-bright/70 bg-panel font-mono text-[10px] ${accent}`}
            >
              {i + 1}
            </span>
            <span className="font-mono text-[11px] text-muted sm:text-xs">{step}</span>
            {i < flow.length - 1 && (
              <motion.span
                className="ml-1 text-dim"
                aria-hidden="true"
                animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
              >
                <ArrowRight className="size-3" />
              </motion.span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion()
  const isFrontend = project.kind === 'frontend'
  const accent = isFrontend ? 'text-amber' : 'text-cyan'
  const Icon = isFrontend ? Music4 : project.id === 'acquisitions-api' ? LayoutDashboard : Server
  const flip = index % 2 === 1

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="group relative"
    >
      <Panel hover className="overflow-hidden">
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
            isFrontend ? 'via-amber/70' : 'via-cyan/70'
          } to-transparent`}
          aria-hidden="true"
        />

        <div className={`grid gap-6 p-6 sm:p-7 lg:grid-cols-[1.35fr_1fr] ${flip ? 'lg:grid-flow-dense' : ''}`}>
          <div className={flip ? 'lg:col-start-2' : ''}>
            <div className="flex items-center gap-3">
              <span
                className={`flex size-8 items-center justify-center rounded border ${
                  isFrontend ? 'border-amber/50 bg-amber/10 text-amber' : 'border-cyan/50 bg-cyan/10 text-cyan'
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-dim">
                PROJECT_{String(index + 1).padStart(2, '0')}
              </span>
              <span className="ml-auto rounded border border-edge-bright/70 px-2 py-0.5 font-mono text-[10px] uppercase text-muted">
                {isFrontend ? 'frontend-heavy' : 'backend'}
              </span>
            </div>

            <h3 className={`mt-4 text-xl font-semibold sm:text-2xl ${isFrontend ? 'text-ink' : 'text-ink'}`}>
              {project.name}
            </h3>
            <p className={`mt-1.5 font-mono text-xs leading-relaxed ${accent}`}>{project.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

            <div className="mt-5">
              <div className="mb-2 font-mono text-[10px] tracking-[0.2em] text-dim">KEY FEATURES</div>
              <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-muted">
                    <span className={`mt-1.5 size-1 shrink-0 rounded-full ${isFrontend ? 'bg-amber' : 'bg-cyan'}`} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded border border-edge-bright px-4 py-2 font-mono text-xs text-dim">
                <Github className="size-3.5" aria-hidden="true" /> GitHub → Coming soon
              </span>
            </div>
          </div>

          <div className={flip ? 'lg:col-start-1 lg:row-start-1' : ''}>
            <FlowDiagram flow={project.flow} accent={accent} />
            {!isFrontend && (
              <div className="mt-4 rounded-lg border border-edge bg-void/60 p-4 font-mono text-[11px] leading-relaxed text-dim">
                <span className="text-term">$</span> curl -X POST https://api/…
                <br />
                <span className="text-cyan">HTTP/1.1 200 OK</span>
                <br />
                <span className="text-dim/70">rate-limit: 100 req/min · auth: jwt · rbac: enforced</span>
              </div>
            )}
            {isFrontend && (
              <div className="mt-4 flex items-end gap-1.5 rounded-lg border border-edge bg-void/60 p-4" aria-hidden="true">
                {[14, 26, 18, 34, 22, 40, 28, 16, 30, 20, 36, 24].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-full rounded-sm bg-amber/60"
                    style={{ height: h }}
                    animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.12 }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Panel>
    </motion.article>
  )
}

export function Projects() {
  return (
    <Section
      id="projects"
      index="04"
      label="Projects"
      title="Selected projects"
      intro="Systems with architecture, tests, queues, auth, and containers — not just screens."
    >
      <div className="space-y-6">
        {PROJECTS.map((p, i) => (
          <ProjectPanel key={p.id} project={p} index={i} />
        ))}
      </div>
    </Section>
  )
}
