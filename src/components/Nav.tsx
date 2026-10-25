import { useEffect, useState } from 'react'
import { NAV_LINKS, PROFILE } from '../data/content'

export function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4 sm:px-6">
      <nav
        className="glass mx-auto flex h-12 max-w-7xl items-center justify-between rounded-full px-2.5 sm:h-14 sm:px-4"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="flex min-w-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-2"
          aria-label={`${PROFILE.name} — back to top`}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sage font-display text-sm text-void">
            JK
          </span>
          <span className="hidden truncate text-sm font-medium text-ink min-[360px]:inline">
            {PROFILE.name}
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="glass-pill rounded-full px-3.5 py-1.5 text-sm text-muted md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="glass mx-auto mt-2 max-h-[calc(100dvh-5.5rem)] max-w-7xl overflow-y-auto rounded-2xl p-2 md:hidden"
        >
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-1 border-t border-white/[0.07] pt-1">
              <a
                href={`mailto:${PROFILE.email}`}
                className="block rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
              >
                Email me
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
