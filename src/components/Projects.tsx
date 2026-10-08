import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Layers, Music4, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { GithubIcon as Github } from './icons'
import { PROJECTS, type Project, type ServiceNode } from '../data/content'
import { Chip, Panel, Section } from './ui'

const ICONS: Record<Project['icon'], LucideIcon> = {
  layers: Layers,
  server: Server,
  music: Music4,
}

const ARCH_LABEL: Record<Project['arch'], string> = {
  microservices: 'MICROSERVICES',
  api: 'REQUEST PATH',
  fullstack: 'SYSTEM MAP',
}

const KIND_LABEL: Record<Project['kind'], string> = {
  backend: 'backend',
  fullstack: 'full-stack',
}

function ServicesArch({ services, label }: { services: ServiceNode[]; label: string }) {
  const byLayer = (layer: ServiceNode['layer']) => services.filter((s) => s.layer === layer)
  return (
    <div
      className="rounded-lg border border-edge bg-void/60 p-4"
      role="img"
      aria-label={`${label}: ${services.map((s) => s.name).join(', ')}`}
    >
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-dim">
        <span>ARCHITECTURE</span>
        <span className="text-cyan">{label}</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        {byLayer('edge').map((s) => (
          <div
            key={s.name}
            className="rounded border border-cyan/50 bg-cyan/10 px-3 py-1.5 font-mono text-[11px] text-cyan"
          >
            {s.name}
            <span className="ml-2 font-sans text-[10px] text-dim">{s.note}</span>
          </div>
        ))}

        <span className="h-3 w-px bg-edge-bright" aria-hidden="true" />

        <div className="grid w-full grid-cols-2 gap-1.5 sm:grid-cols-4">
          {byLayer('core').map((s) => (
            <div
              key={s.name}
              className="rounded border border-edge-bright/70 bg-panel px-2 py-2 text-center font-mono text-[10px] text-muted"
            >
              {s.name}
              <div className="sr-only">{s.note}</div>
            </div>
          ))}
        </div>

        <span className="h-3 w-px bg-edge-bright" aria-hidden="true" />

        <div className="grid w-full grid-cols-3 gap-1.5">
          {byLayer('data').map((s) => (
            <div
              key={s.name}
              className="rounded border border-edge bg-void px-2 py-1.5 text-center font-mono text-[10px] text-dim"
            >
              {s.name}
              <span className="sr-only">{s.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Signals({ items }: { items: Project['signals'] }) {
  return (
    <dl className="mt-4 grid grid-cols-2 gap-1.5">
      {items.map((s) => (
        <div key={s.label} className="rounded border border-edge bg-void/60 px-3 py-2">
          <dt className="font-mono text-[9px] tracking-[0.18em] text-dim">{s.label}</dt>
          <dd className="mt-0.5 truncate font-mono text-[11px] text-muted" title={s.value}>
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function Equalizer() {
  const reduce = useReducedMotion()
  return (
    <div className="mt-4 rounded-lg border border-edge bg-void/60 p-4" aria-hidden="true">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-dim">
        <span>NOW PLAYING</span>
        <span className="text-amber">02:41 / 03:58</span>
      </div>
      <div className="flex h-16 items-end gap-1.5">
        {[14, 26, 18, 34, 22, 40, 28, 16, 30, 20, 36, 24, 32, 18, 26, 12].map((h, i) => (
          <motion.span
            key={i}
            className="w-full rounded-sm bg-amber/60"
            style={{ height: h }}
            animate={reduce ? undefined : { opacity: [0.35, 1, 0.35], scaleY: [0.7, 1, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-edge-bright">
        <motion.span
          className="block h-full rounded-full bg-amber"
          initial={{ width: '0%' }}
          animate={reduce ? undefined : { width: ['0%', '68%', '0%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion()
  const isBackend = project.kind === 'backend'
  const accent = isBackend ? 'text-cyan' : 'text-amber'
  const Icon = ICONS[project.icon]
  const repoShort = project.repo.split('/')[1]
  const isMusic = project.icon === 'music'

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
            isBackend ? 'via-cyan/70' : 'via-amber/70'
          } to-transparent`}
          aria-hidden="true"
        />

        <div className="flex items-center gap-3 border-b border-edge px-6 py-3.5 sm:px-7">
          <span
            className={`flex size-7 items-center justify-center rounded border ${
              isBackend ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-amber/50 bg-amber/10 text-amber'
            }`}
          >
            <Icon className="size-3.5" aria-hidden="true" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-dim">
            PROJECT_{String(index + 1).padStart(2, '0')}
          </span>
          <span className="rounded border border-edge-bright/70 px-2 py-0.5 font-mono text-[10px] text-muted">
            {KIND_LABEL[project.kind]}
          </span>

          <a
            href={`https://github.com/${project.repo}`}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-dim transition-colors hover:text-ink focus-visible:text-ink"
            aria-label={`View ${project.name} on GitHub`}
          >
            <Github className="size-3.5" aria-hidden="true" />
            <span className="max-w-[10ch] truncate sm:max-w-none">{repoShort}</span>
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h3 className="text-xl font-semibold text-ink sm:text-2xl">{project.name}</h3>
            <p className={`mt-1.5 font-mono text-xs leading-relaxed ${accent}`}>{project.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

            <div className="mt-5">
              <div className="mb-2 font-mono text-[10px] tracking-[0.2em] text-dim">HIGHLIGHTS</div>
              <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-muted">
                    <span
                      className={`mt-1.5 size-1 shrink-0 rounded-full ${isBackend ? 'bg-cyan' : 'bg-amber'}`}
                      aria-hidden="true"
                    />
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
          </div>

          <div>
            <ServicesArch services={project.services} label={ARCH_LABEL[project.arch]} />
            <Signals items={project.signals} />
            {isMusic && <Equalizer />}
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
