import { Mail } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './icons'
import { PROFILE } from '../data/content'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-edge bg-panel/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:px-8 md:flex-row">
        <div className="text-center md:text-left">
          <div className="font-mono text-sm font-semibold tracking-[0.22em] text-ink">
            {PROFILE.handle}
          </div>
          <p className="mt-1 font-mono text-[11px] text-dim">
            Software Engineer • AI • Networking • DevOps
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer noopener"
            className="text-muted transition-colors hover:text-cyan"
            aria-label="GitHub"
          >
            <Github className="size-4" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="text-muted transition-colors hover:text-cyan"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-muted transition-colors hover:text-cyan"
            aria-label="Email"
          >
            <Mail className="size-4" />
          </a>
        </div>

        <p className="font-mono text-[10px] text-dim">
          © {YEAR} Janagiram Kumar · deployed on OpenStack
        </p>
      </div>
    </footer>
  )
}
