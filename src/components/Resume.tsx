import { motion, useReducedMotion } from 'framer-motion'
import { Download, ExternalLink, FileText, Sparkles } from 'lucide-react'
import { PROFILE } from '../data/content'

export function Resume() {
  const reduce = useReducedMotion()

  return (
    <section id="resume" className="relative mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      {/* Section Header */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-sage">
            <Sparkles className="size-3" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="mt-2.5 font-display text-3xl text-ink sm:text-4xl">
            Resume
          </h2>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
            Official resume of {PROFILE.name}. Available for view or direct download.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={PROFILE.resumePdfUrl}
            download="Janagiram_Kumar_Resume.pdf"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
          >
            <Download className="size-3.5" />
            <span>Download PDF</span>
          </a>

          <a
            href={PROFILE.resumePdfUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-colors"
          >
            <ExternalLink className="size-3.5" />
            <span>Open in Tab</span>
          </a>
        </div>
      </motion.div>

      {/* PDF Document Container */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-6 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#121712] shadow-2xl"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-black/40 px-5 py-3">
          <div className="flex items-center gap-2.5 font-mono text-xs text-muted">
            <FileText className="size-4 text-sage" />
            <span className="font-medium text-ink">Janagiram_Kumar_Resume.pdf</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <a
              href={PROFILE.resumePdfUrl}
              download="Janagiram_Kumar_Resume.pdf"
              className="font-mono text-xs text-sage transition-colors hover:text-ink hover:underline"
            >
              Direct Download
            </a>
          </div>
        </div>

        {/* Embedded PDF iframe */}
        <div className="relative h-[780px] w-full bg-[#1b211b] sm:h-[900px] lg:h-[980px]">
          <iframe
            src={`${PROFILE.resumePdfUrl}#toolbar=0&navpanes=0`}
            title={`${PROFILE.name} — Resume`}
            className="h-full w-full border-0"
          />
        </div>

        {/* Mobile / Fallback info footer */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.08] bg-black/30 px-5 py-2.5 text-xs text-dim sm:flex-row">
          <span>Official Document • Janagiram Kumar</span>
          <div className="flex items-center gap-4">
            <a
              href={PROFILE.resumePdfUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-ink"
            >
              Fullscreen View
            </a>
            <span className="text-white/20">·</span>
            <a
              href={PROFILE.resumePdfUrl}
              download="Janagiram_Kumar_Resume.pdf"
              className="text-sage transition-colors hover:text-ink"
            >
              Download (.pdf)
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
