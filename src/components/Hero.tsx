import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './icons'
import { PROFILE } from '../data/content'
import { BugRun } from './BugRun'

export function Hero() {
  const reduce = useReducedMotion()
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: 'easeOut' as const },
  })

  return (
    <section
      id="top"
      className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 pt-28 sm:gap-12 sm:px-8 sm:pb-20 sm:pt-32 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-8 lg:gap-14 lg:pb-28 lg:pt-36"
    >
      <div>
        <motion.p
          {...fade(0)}
          className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-sage"
        >
          <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
          Software Engineer
        </motion.p>

        <motion.h1
          {...fade(0.06)}
          className="mt-4 font-display text-[3.25rem] leading-[0.92] tracking-[-0.02em] text-ink sm:mt-5 sm:text-[4rem] md:text-[3.75rem] lg:text-[5rem]"
        >
          {PROFILE.name.split(' ').map((part) => (
            <span key={part} className="block">
              {part}
            </span>
          ))}
        </motion.h1>

        <motion.p
          {...fade(0.12)}
          className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink/90 sm:mt-6 sm:text-xl"
        >
          {PROFILE.headline}
        </motion.p>

        <motion.p
          {...fade(0.18)}
          className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base"
        >
          {PROFILE.subline}
        </motion.p>

        <motion.div
          {...fade(0.24)}
          className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-3"
        >
          <a
            href="#projects"
            className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all sm:w-auto sm:px-5"
          >
            View work
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="btn-secondary inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors sm:w-auto sm:px-5"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div {...fade(0.3)} className="mt-7 hidden flex-wrap items-center gap-5 sm:flex md:mt-8">
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
              className="flex items-center gap-2 py-1 text-sm text-muted transition-colors hover:text-ink"
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </a>
          ))}
        </motion.div>
      </div>

      <BugRun />
    </section>
  )
}
