import { PROFILE } from '../data/content'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-[var(--line-color)] py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 font-mono text-xs uppercase tracking-wider text-[var(--muted-color)]">
        <p>
          © {YEAR} {PROFILE.displayName}.
        </p>
      </div>
    </footer>
  )
}
