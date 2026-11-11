import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { PROFILE } from '../data/content'

export function Resume() {
  const [isOpen, setIsOpen] = useState(false)
  const [transform, setTransform] = useState('rotate(-1deg)')
  const [shadow, setShadow] = useState('')
  const sheetRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const el = sheetRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max 6deg tilt
    const rotateX = Math.max(-6, Math.min(6, ((y - centerY) / centerY) * -6))
    const rotateY = Math.max(-6, Math.min(6, ((x - centerX) / centerX) * 6))

    // Dynamic shadow shift
    const shadowX = (x - centerX) * 0.08
    const shadowY = 20 + (y - centerY) * 0.08

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotate(-1deg)`,
    )
    setShadow(
      `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 50px -12px rgba(22, 21, 18, 0.22), 0 4px 14px -2px rgba(22, 21, 18, 0.1)`,
    )
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTransform('rotate(-1deg)')
    setShadow('')
  }, [])

  // Lightbox Focus Trap & Escape key handler
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus close button on open
    setTimeout(() => closeBtnRef.current?.focus(), 50)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
        return
      }

      if (e.key === 'Tab') {
        const modal = document.getElementById('resume-lightbox')
        if (!modal) return
        const focusables = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <section id="resume" className="border-t border-[var(--line-color)] py-20 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <header className="lg:col-span-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-color)]">
            03 / Resume
          </p>
        </header>

        <div className="lg:col-span-9 fade-up">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[var(--text-color)]">
                Curriculum Vitae
              </h3>
              <p className="mt-1 text-sm sm:text-base text-[var(--muted-color)] max-w-[50ch]">
                Official resume sheet. Click sheet to preview or download directly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.resumePdfUrl}
                download="Janagiram_Kumar_Resume.pdf"
                className="btn-primary"
              >
                Download PDF
              </a>
              <a
                href={PROFILE.resumePdfUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-secondary"
              >
                Open in Tab ↗
              </a>
            </div>
          </div>

          {/* Interactive 3D paper sheet */}
          <div className="flex justify-center md:justify-start pt-4 pb-6">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setIsOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setIsOpen(true)
                }
              }}
              className="group block text-left border-0 bg-transparent p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] rounded-sm"
              aria-label="Enlarge resume preview"
              aria-haspopup="dialog"
            >
              <div
                ref={sheetRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform,
                  boxShadow: shadow || undefined,
                  transition: 'transform 180ms ease-out, box-shadow 180ms ease-out',
                }}
                className="relative w-full max-w-[340px] sm:max-w-[420px] bg-white border border-[var(--sheet-border)] shadow-[var(--sheet-shadow)] select-none overflow-hidden"
              >
                <img
                  src={PROFILE.resumePreviewUrl}
                  alt="Janagiram Kumar official resume preview"
                  loading="lazy"
                  width={1224}
                  height={1584}
                  className="block w-full h-auto pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-colors pointer-events-none" />
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-wider text-[var(--muted-color)] group-hover:text-[var(--accent-color)] transition-colors">
                Click sheet to expand preview ↗
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Focus-trapped Lightbox Modal */}
      {isOpen && (
        <div
          id="resume-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Resume document preview"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false)
              triggerRef.current?.focus()
            }
          }}
        >
          <div className="relative flex flex-col items-center max-w-4xl max-h-[92vh] w-full">
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between pb-3 text-white border-b border-white/20">
              <span className="font-mono text-xs uppercase tracking-wider text-white/80">
                Janagiram_Kumar_Resume.pdf
              </span>

              <div className="flex items-center gap-3">
                <a
                  href={PROFILE.resumePdfUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-secondary text-white border-white/30 hover:border-white min-h-[44px]"
                >
                  Open PDF ↗
                </a>
                <a
                  href={PROFILE.resumePdfUrl}
                  download="Janagiram_Kumar_Resume.pdf"
                  className="btn-primary min-h-[44px]"
                >
                  Download
                </a>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    triggerRef.current?.focus()
                  }}
                  className="btn-secondary text-white border-white/30 hover:border-white min-h-[44px]"
                  aria-label="Close preview"
                >
                  Close (Esc)
                </button>
              </div>
            </div>

            {/* Document preview */}
            <div className="mt-4 overflow-y-auto max-h-[calc(92vh-4rem)] bg-white shadow-2xl p-1 sm:p-2">
              <img
                src={PROFILE.resumePreviewUrl}
                alt="Full resolution Janagiram Kumar resume"
                className="max-h-[82vh] w-auto block object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
