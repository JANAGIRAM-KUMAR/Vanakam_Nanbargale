import { PROFILE } from '../data/content'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-8">
        <p className="text-dim">
          © {YEAR} {PROFILE.name}
        </p>

        <div className="flex items-center gap-5">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer noopener"
            className="py-1 text-muted transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="py-1 text-muted transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="py-1 text-muted transition-colors hover:text-ink"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
