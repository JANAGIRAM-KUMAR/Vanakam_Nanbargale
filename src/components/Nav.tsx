import { Mail, Search, TerminalSquare } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './icons'
import { useEffect, useState } from 'react'
import { NAV_LINKS, PROFILE } from '../data/content'

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-edge' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.22em] text-ink"
        >
          <span className="flex size-5 items-center justify-center rounded border border-cyan/50 text-cyan transition-colors group-hover:bg-cyan/10">
            <TerminalSquare className="size-3" aria-hidden="true" />
          </span>
          {PROFILE.handle}
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs tracking-wider text-muted transition-colors hover:text-cyan"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded border border-edge bg-panel/70 px-2.5 py-1.5 font-mono text-[11px] text-dim transition-colors hover:border-edge-bright hover:text-muted sm:flex"
            aria-label="Open command palette"
          >
            <Search className="size-3" aria-hidden="true" />
            Search
            <kbd className="rounded border border-edge-bright px-1 text-[10px] text-dim">⌘K</kbd>
          </button>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden rounded p-2 text-muted transition-colors hover:text-cyan sm:block"
            aria-label="GitHub profile"
          >
            <Github className="size-4" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden rounded p-2 text-muted transition-colors hover:text-cyan sm:block"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden rounded p-2 text-muted transition-colors hover:text-cyan sm:block"
            aria-label="Email"
          >
            <Mail className="size-4" />
          </a>
          <button
            type="button"
            className="rounded border border-edge px-2.5 py-1.5 font-mono text-xs text-muted md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? '✕' : '≡'}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass border-t border-edge md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-edge/60 py-3 font-mono text-sm text-muted transition-colors hover:text-cyan"
              >
                <span className="text-dim">→</span> {l.label}
              </a>
            ))}
            <div className="flex gap-4 py-3">
              <a href={PROFILE.github} target="_blank" rel="noreferrer noopener" className="text-muted hover:text-cyan">
                GitHub
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer noopener" className="text-muted hover:text-cyan">
                LinkedIn
              </a>
              <a href={`mailto:${PROFILE.email}`} className="text-muted hover:text-cyan">
                Email
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
