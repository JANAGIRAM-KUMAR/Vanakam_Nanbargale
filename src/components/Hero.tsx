import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './icons'
import { PROFILE } from '../data/content'
import { Terminal } from './Terminal'

const TAGS = ['SOFTWARE ENGINEER', 'AI', 'NETWORKING', 'DEVOPS']

export function Hero() {
  const reduce = useReducedMotion()
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  })

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <div>
          <motion.div {...fade(0)} className="flex flex-wrap items-center gap-2">
            {TAGS.map((t, i) => (
              <span
                key={t}
                className={`rounded border px-2 py-1 font-mono text-[10px] tracking-[0.18em] ${
                  i === 0
                    ? 'border-cyan/50 bg-cyan/10 text-cyan'
                    : 'border-edge-bright/70 text-muted'
                }`}
              >
                {t}
              </span>
            ))}
          </motion.div>

          <motion.h1
            {...fade(0.08)}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            JANAGIRAM
            <br />
            <span className="text-glow text-cyan">KUMAR</span>
          </motion.h1>

          <motion.p {...fade(0.16)} className="mt-4 font-mono text-xs tracking-[0.14em] text-muted sm:text-sm">
            Software Engineer <span className="text-cyan">•</span> AI{' '}
            <span className="text-cyan">•</span> Networking <span className="text-cyan">•</span> DevOps
          </motion.p>

          <motion.h2 {...fade(0.24)} className="mt-7 max-w-xl text-xl font-medium leading-snug text-ink sm:text-2xl">
            {PROFILE.headline}
          </motion.h2>

          <motion.p {...fade(0.32)} className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {PROFILE.subline}
          </motion.p>

          <motion.div {...fade(0.4)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded border border-cyan/60 bg-cyan/10 px-5 py-2.5 font-mono text-sm text-cyan transition-all hover:bg-cyan/20 hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
            >
              View Projects
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded border border-edge-bright bg-panel px-5 py-2.5 font-mono text-sm text-ink transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div {...fade(0.48)} className="mt-7 flex flex-wrap items-center gap-5">
            {[
              { href: PROFILE.github, label: 'GitHub', Icon: Github },
              { href: PROFILE.linkedin, label: 'LinkedIn', Icon: Linkedin },
              { href: `mailto:${PROFILE.email}`, label: 'Email', Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer noopener"
                className="group flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-cyan"
              >
                <Icon className="size-3.5" aria-hidden="true" />
                <span className="border-b border-transparent group-hover:border-cyan/60">{label}</span>
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="space-y-6"
        >
          <Terminal />
        </motion.div>
      </div>

      <div className="relative mx-auto mt-14 flex max-w-6xl items-center gap-3 px-5 font-mono text-[10px] tracking-[0.2em] text-dim sm:px-8">
        <span className="h-px flex-1 bg-edge" aria-hidden="true" />
        SCROLL TO EXPLORE
        <span className="h-px flex-1 bg-edge" aria-hidden="true" />
      </div>
    </section>
  )
}
