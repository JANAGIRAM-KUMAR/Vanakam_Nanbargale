import { NAV_LINKS, PROFILE } from '../data/content'

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--line-color)] bg-[var(--bg-color)]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <a
          href="#top"
          className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-color)] link-grow min-h-[44px] inline-flex items-center"
          aria-label={`${PROFILE.displayName} — back to top`}
        >
          {PROFILE.initials}
        </a>

        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-[var(--muted-color)] link-grow min-h-[44px] inline-flex items-center"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
