import { ArrowUpRight, Mail, Terminal } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './icons'
import { motion, useReducedMotion } from 'framer-motion'
import { type ComponentType, useEffect, useMemo, useRef, useState } from 'react'
import { NAV_LINKS, PROFILE } from '../data/content'

type Cmd = { id: string; label: string; hint: string; icon: ComponentType<{ className?: string }>; run: () => void }

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const reduce = useReducedMotion()

  const commands = useMemo<Cmd[]>(
    () => [
      ...NAV_LINKS.map((l) => ({
        id: l.href,
        label: `Go to ${l.label}`,
        hint: 'navigation',
        icon: Terminal,
        run: () => {
          document.querySelector(l.href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
        },
      })),
      {
        id: 'github',
        label: 'Open GitHub',
        hint: 'github.com/JANAGIRAM-KUMAR',
        icon: Github,
        run: () => window.open(PROFILE.github, '_blank', 'noopener'),
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn',
        hint: 'linkedin.com/in/janagiram-kumar-1b918421a',
        icon: Linkedin,
        run: () => window.open(PROFILE.linkedin, '_blank', 'noopener'),
      },
      {
        id: 'email',
        label: 'Send Email',
        hint: PROFILE.email,
        icon: Mail,
        run: () => window.open(`mailto:${PROFILE.email}`, '_blank'),
      },
    ],
    [reduce],
  )

  const results = useMemo(
    () =>
      query.trim()
        ? commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()))
        : commands,
    [commands, query],
  )

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 40)
    return () => clearTimeout(t)
  }, [])

  const activeIndex = Math.min(active, results.length - 1)

  const exec = (cmd: Cmd) => {
    cmd.run()
    onClose()
  }

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[14vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={reduce ? false : { y: -10, scale: 0.98 }}
          animate={{ y: 0, scale: 1 }}
          className="relative w-full max-w-lg overflow-hidden rounded-lg border border-edge-bright bg-panel shadow-2xl shadow-cyan/5"
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActive((a) => Math.min(a + 1, results.length - 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActive((a) => Math.max(a - 1, 0))
            } else if (e.key === 'Enter' && results[activeIndex]) {
              e.preventDefault()
              exec(results[activeIndex])
            } else if (e.key === 'Escape') {
              onClose()
            }
          }}
        >
          <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
            <Terminal className="size-4 shrink-0 text-cyan" aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-dim focus:outline-none"
              aria-label="Search commands"
            />
            <kbd className="rounded border border-edge-bright px-1.5 py-0.5 font-mono text-[10px] text-dim">ESC</kbd>
          </div>

          <ul className="max-h-72 overflow-y-auto py-1.5" role="listbox">
            {results.length === 0 && (
              <li className="px-4 py-6 text-center font-mono text-xs text-dim">No matching commands.</li>
            )}
            {results.map((cmd, i) => {
              const Icon = cmd.icon
              return (
                <li key={cmd.id} role="option" aria-selected={i === activeIndex}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => exec(cmd)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      i === activeIndex ? 'bg-cyan/10 text-ink' : 'text-muted'
                    }`}
                  >
                    <Icon className={`size-4 ${i === activeIndex ? 'text-cyan' : 'text-dim'}`} aria-hidden="true" />
                    <span className="flex-1 font-mono text-sm">
                      <span className={i === activeIndex ? 'text-cyan' : 'text-dim'}>&gt;</span> {cmd.label}
                    </span>
                    <span className="font-mono text-[10px] text-dim">{cmd.hint}</span>
                    {i === activeIndex && <ArrowUpRight className="size-3 text-cyan" aria-hidden="true" />}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center justify-between border-t border-edge px-4 py-2 font-mono text-[10px] text-dim">
            <span>↑↓ navigate · ↵ select</span>
            <span>command palette</span>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
