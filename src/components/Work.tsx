import { PROJECTS } from '../data/content'

export function Work() {
  return (
    <section id="work" className="border-t border-[var(--line-color)] py-20 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <header className="lg:col-span-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-color)]">
            01 / Work
          </p>
        </header>

        <div className="lg:col-span-9 divide-y divide-[var(--line-color)] border-y border-[var(--line-color)]">
          {PROJECTS.map((project) => (
            <article
              key={project.numeral}
              className="group py-8 sm:py-10 transition-transform duration-200 ease-out hover:translate-x-1.5 fade-up"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[var(--accent-color)]">
                    {project.numeral}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[var(--text-color)]">
                    {project.title}
                  </h3>
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-xs uppercase tracking-wider text-[var(--accent-color)] link-grow min-h-[44px] inline-flex items-center self-start sm:self-auto"
                >
                  GitHub ↗
                </a>
              </div>

              <p className="mt-3 text-base sm:text-lg leading-relaxed text-[var(--muted-color)] max-w-[62ch]">
                {project.sentence}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wider text-[var(--muted-color)]">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
