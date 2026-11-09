import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Download, Mail } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './icons'
import { PROFILE } from '../data/content'

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
      className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:pb-16 lg:pt-32"
    >
      <div className="max-w-3xl">
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
          className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink/90 sm:mt-6 sm:text-xl"
        >
          {PROFILE.headline}
        </motion.p>

        <motion.p
          {...fade(0.18)}
          className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base"
        >
          {PROFILE.subline}
        </motion.p>

        <motion.div
          {...fade(0.24)}
          className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8"
        >
          <a
            href="#resume"
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
          >
            View resume
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href={PROFILE.resumePdfUrl}
            download="Janagiram_Kumar_Resume.pdf"
            className="btn-secondary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors"
          >
            <Download className="size-4" aria-hidden="true" />
            Download PDF
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-white/20 hover:text-ink"
          >
            <Mail className="size-4" aria-hidden="true" />
            Get in touch
          </a>
        </motion.div>

        <motion.div {...fade(0.3)} className="mt-8 flex flex-wrap items-center gap-6">
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
    </section>
  )
}
