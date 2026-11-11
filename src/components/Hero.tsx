import { PROFILE } from '../data/content'

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto w-full max-w-7xl px-6 pt-12 pb-24 sm:px-8 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-36"
    >
      <div className="fade-up">
        <h1 className="name-clamp text-[var(--text-color)] select-none">
          {PROFILE.name}
        </h1>

        <p className="mt-8 text-lg sm:text-xl leading-relaxed text-[var(--muted-color)] max-w-[62ch]">
          {PROFILE.tagline}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
          <a href="#work" className="btn-primary">
            View my work
          </a>
          <a
            href={PROFILE.resumePdfUrl}
            download="Janagiram_Kumar_Resume.pdf"
            className="btn-secondary"
          >
            Download resume
          </a>
        </div>
      </div>
    </section>
  )
}
