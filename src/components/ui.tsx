import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Section({
  id,
  index,
  title,
  intro,
  children,
  className = '',
}: {
  id: string
  index: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <section id={id} className={`border-t border-white/[0.06] ${className}`}>
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-16 sm:gap-8 sm:px-8 sm:py-20 lg:grid-cols-[190px_1fr] lg:gap-14 lg:py-24">
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="self-start lg:sticky lg:top-28"
        >
          <p className="hidden font-mono text-[11px] tracking-[0.2em] text-sage sm:block">
            {index}
          </p>
          <h2 className="font-display text-3xl leading-none text-ink sm:mt-2 sm:text-4xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-4 hidden max-w-[16rem] text-sm leading-relaxed text-muted sm:block">
              {intro}
            </p>
          )}
        </motion.header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

export function Panel({
  children,
  className = '',
  hover = false,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={`glass rounded-2xl ${
        hover ? 'transition-colors duration-300 hover:border-white/20' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
