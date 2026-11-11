import emailjs from '@emailjs/browser'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { PROFILE } from '../data/content'

const EMAILJS_SERVICE =
  (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined) || 'service_g4o2ec5'
const EMAILJS_TEMPLATE =
  (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined) || 'template_8e8dfdb'
const EMAILJS_PUBLIC_KEY =
  (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined) || 'bkfDl801vABe-1wnM'
const EMAILJS_ENABLED = Boolean(EMAILJS_PUBLIC_KEY)

const SUBMIT_COOLDOWN_SEC = 45
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type SendStatus = 'idle' | 'sending' | 'sent' | 'error' | 'rate-limited' | 'mail-client'

export function Contact() {
  const mountTimeRef = useRef(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<SendStatus>('idle')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    mountTimeRef.current = Date.now()
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    // 1. Bot Honeypot
    if (honeypot) {
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    // 2. Speed check
    if (Date.now() - mountTimeRef.current < 1200) {
      setStatus('sent')
      return
    }

    // 3. Rate limiting cooldown
    const lastSentTime = Number(sessionStorage.getItem('contact_last_sent') || '0')
    const elapsedSec = (Date.now() - lastSentTime) / 1000
    if (elapsedSec < SUBMIT_COOLDOWN_SEC) {
      setStatus('rate-limited')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }

    const cleanName = name.trim().slice(0, 100)
    const cleanEmail = email.trim().slice(0, 254)
    const cleanMessage = message.trim().slice(0, 2000)

    if (!cleanName || !cleanEmail || !cleanMessage || !EMAIL_REGEX.test(cleanEmail)) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    if (EMAILJS_ENABLED) {
      setStatus('sending')
      try {
        await emailjs.send(
          EMAILJS_SERVICE,
          EMAILJS_TEMPLATE,
          {
            name: cleanName,
            email: cleanEmail,
            message: cleanMessage,
            to_email: PROFILE.email,
          },
          { publicKey: EMAILJS_PUBLIC_KEY },
        )
        sessionStorage.setItem('contact_last_sent', String(Date.now()))
        setStatus('sent')
        setName('')
        setEmail('')
        setMessage('')
      } catch (err) {
        console.error('EmailJS send failed:', err)
        setStatus('error')
      }
    } else {
      const subject = encodeURIComponent(`Portfolio inquiry — ${cleanName}`)
      const body = encodeURIComponent(`${cleanMessage}\n\n— ${cleanName} (${cleanEmail})`)
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
      setStatus('mail-client')
    }

    setTimeout(() => setStatus('idle'), 6000)
  }

  const statusMessages: Record<SendStatus, { text: string; color: string }> = {
    idle: {
      text: EMAILJS_ENABLED
        ? `Sends an email to ${PROFILE.email}`
        : 'Opens your default mail client.',
      color: 'text-[var(--muted-color)]',
    },
    sending: { text: 'Sending message…', color: 'text-[var(--text-color)]' },
    sent: { text: "Message sent — I'll get back to you soon.", color: 'text-[var(--accent-color)]' },
    'rate-limited': {
      text: `Please wait ${SUBMIT_COOLDOWN_SEC}s between messages.`,
      color: 'text-[var(--accent-color)]',
    },
    error: {
      text: 'Send failed — please verify fields or email directly.',
      color: 'text-[var(--accent-color)]',
    },
    'mail-client': {
      text: 'Opened in mail client — no data leaves your browser.',
      color: 'text-[var(--muted-color)]',
    },
  }

  return (
    <section id="contact" className="border-t border-[var(--line-color)] py-20 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <header className="lg:col-span-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-color)]">
            04 / Contact
          </p>
        </header>

        <div className="lg:col-span-9 fade-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-color)] leading-none">
            Let's talk.
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider">
            <button
              type="button"
              onClick={copyEmail}
              className="link-grow text-[var(--text-color)] min-h-[44px] inline-flex items-center cursor-pointer border-0 bg-transparent p-0"
              aria-label="Copy email address"
            >
              {PROFILE.email} [{copied ? 'Copied' : 'Copy'}]
            </button>
            <span className="text-[var(--line-color)]" aria-hidden="true">
              /
            </span>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer noopener"
              className="link-grow text-[var(--muted-color)] min-h-[44px] inline-flex items-center"
            >
              GitHub ↗
            </a>
            <span className="text-[var(--line-color)]" aria-hidden="true">
              /
            </span>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="link-grow text-[var(--muted-color)] min-h-[44px] inline-flex items-center"
            >
              LinkedIn ↗
            </a>
          </div>

          <form onSubmit={submit} className="mt-12 space-y-6 max-w-xl">
            {/* Hidden honeypot */}
            <div
              className="pointer-events-none absolute -left-[9999px] -top-[9999px] h-0 w-0 opacity-0"
              aria-hidden="true"
            >
              <label htmlFor="company-website">Website</label>
              <input
                id="company-website"
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="c-name"
                className="font-mono text-xs uppercase tracking-wider text-[var(--muted-color)] block"
              >
                Name
              </label>
              <input
                id="c-name"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full border-0 border-b border-[var(--line-color)] bg-transparent px-0 py-3 text-base text-[var(--text-color)] placeholder:text-[var(--muted-color)]/60 focus:border-[var(--accent-color)] focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="c-email"
                className="font-mono text-xs uppercase tracking-wider text-[var(--muted-color)] block"
              >
                Email
              </label>
              <input
                id="c-email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full border-0 border-b border-[var(--line-color)] bg-transparent px-0 py-3 text-base text-[var(--text-color)] placeholder:text-[var(--muted-color)]/60 focus:border-[var(--accent-color)] focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="c-msg"
                className="font-mono text-xs uppercase tracking-wider text-[var(--muted-color)] block"
              >
                Message
              </label>
              <textarea
                id="c-msg"
                required
                rows={4}
                maxLength={2000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about what you are building…"
                className="w-full resize-y border-0 border-b border-[var(--line-color)] bg-transparent px-0 py-3 text-base text-[var(--text-color)] placeholder:text-[var(--muted-color)]/60 focus:border-[var(--accent-color)] focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              <p
                className={`font-mono text-xs uppercase tracking-wider ${statusMessages[status].color}`}
                role="status"
                aria-live="polite"
              >
                {statusMessages[status].text}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
