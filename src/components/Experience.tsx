import { EXPERIENCE } from '../data/content'

export function Experience() {
  return (
    <section id="experience" className="border-t border-[var(--line-color)] py-20 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <header className="lg:col-span-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-color)]">
            02 / Experience
          </p>
        </header>

        <div className="lg:col-span-9 fade-up">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[var(--text-color)]">
              {EXPERIENCE.company}
            </h3>
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted-color)]">
              {EXPERIENCE.role} • {EXPERIENCE.period}
            </p>
          </div>

          <ul className="mt-6 space-y-3 list-none p-0 m-0">
            {EXPERIENCE.lines.map((line, idx) => (
              <li
                key={idx}
                className="text-base sm:text-lg leading-relaxed text-[var(--muted-color)] max-w-[62ch]"
              >
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-12 pt-8 border-t border-[var(--line-color)] space-y-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent-color)] mb-1">
                Education
              </p>
              <p className="text-sm sm:text-base text-[var(--muted-color)] max-w-[62ch]">
                {EXPERIENCE.education}
              </p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent-color)] mb-1">
                Skills
              </p>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted-color)] max-w-[62ch] leading-relaxed">
                {EXPERIENCE.skills}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
