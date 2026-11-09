import emailjs from '@emailjs/browser'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, CircleAlert, Copy, Loader2, Mail, Send } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './icons'
import { type ComponentType, type FormEvent, useEffect, useRef, useState } from 'react'
import { PROFILE } from '../data/content'
import { Panel, Section } from './ui'

const EMAILJS_SERVICE =
  (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined) || 'service_g4o2ec5'
const EMAILJS_TEMPLATE =
  (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined) || 'template_8e8dfdb'
const EMAILJS_PUBLIC_KEY =
  (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined) || 'bkfDl801vABe-1wnM'
const EMAILJS_ENABLED = Boolean(EMAILJS_PUBLIC_KEY)

// Cooldown between form submissions (seconds) to prevent quota exhaustion & spam flood
const SUBMIT_COOLDOWN_SEC = 45
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type SendStatus = 'idle' | 'sending' | 'sent' | 'error' | 'rate-limited' | 'mail-client'

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  href: string
}) {
  const [copied, setCopied] = useState(false)
  const isExternal = href.startsWith('http')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="flex min-w-0 items-center gap-3 border-b border-white/[0.08] py-3 last:border-0 sm:py-3.5">
      <Icon className="size-4 shrink-0 text-sage" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">{label}</p>
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel="noreferrer noopener"
          className="mt-1 block truncate py-1 text-sm text-ink transition-colors hover:text-sage"
        >
          {value}
        </a>
      </div>
      <button
        type="button"
        onClick={copy}
        className="rounded-lg p-2.5 text-dim transition-colors hover:text-ink"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="size-4 text-term" /> : <Copy className="size-4" />}
      </button>
    </div>
  )
}

export function Contact() {
  const reduce = useReducedMotion()
  const mountTimeRef = useRef(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('') // Bot trap field
  const [status, setStatus] = useState<SendStatus>('idle')

  useEffect(() => {
    mountTimeRef.current = Date.now()
  }, [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    // 1. Bot Honeypot detection: bots automatically populate hidden fields
    if (honeypot) {
      // Silently discard bot submission without burning API quota
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    // 2. Submission speed check: humans take > 1.2s to fill out the form
    if (Date.now() - mountTimeRef.current < 1200) {
      setStatus('sent')
      return
    }

    // 3. Client-side Rate Limit / Cooldown check
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
          EMAILJS_SERVICE!,
          EMAILJS_TEMPLATE!,
          {
            name: cleanName,
            email: cleanEmail,
            message: cleanMessage,
            to_email: PROFILE.email,
          },
          { publicKey: EMAILJS_PUBLIC_KEY! },
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
      const subject = encodeURIComponent(`Portfolio contact — ${cleanName}`)
      const body = encodeURIComponent(`${cleanMessage}\n\n— ${cleanName} (${cleanEmail})`)
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
      setStatus('mail-client')
    }

    setTimeout(() => setStatus('idle'), 6000)
  }

  const statusLine: Record<SendStatus, { text: string; className: string }> = {
    idle: {
      text: EMAILJS_ENABLED
        ? `Sends directly to ${PROFILE.email}.`
        : 'Opens your mail client — no data leaves your browser.',
      className: 'text-dim',
    },
    sending: { text: 'Sending message…', className: 'text-sage' },
    sent: { text: "Message sent — I'll get back to you soon.", className: 'text-term' },
    'rate-limited': {
      text: `Please wait ${SUBMIT_COOLDOWN_SEC}s between sending messages.`,
      className: 'text-amber',
    },
    error: {
      text: 'Send failed or invalid input — please verify email or contact directly.',
      className: 'text-amber',
    },
    'mail-client': {
      text: 'Opened in mail client — no data leaves your browser.',
      className: 'text-dim',
    },
  }
  const line = statusLine[status]

  return (
    <Section
      id="contact"
      title="Contact"
      intro="The fastest way to reach me."
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45 }}
      >
        <Panel className="p-5 sm:p-8">
          <div className="grid min-w-0 gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
            <div className="min-w-0">
              <h3 className="font-display text-xl leading-none text-ink sm:text-2xl">Say hello.</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                Open to thoughtful conversations about software, AI, and infrastructure.
              </p>

              <div className="mt-5 sm:mt-6">
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={PROFILE.email}
                  href={`mailto:${PROFILE.email}`}
                />
                <ContactRow
                  icon={Github}
                  label="GitHub"
                  value="github.com/JANAGIRAM-KUMAR"
                  href={PROFILE.github}
                />
                <ContactRow
                  icon={Linkedin}
                  label="LinkedIn"
                  value="linkedin.com/in/janagiram-kumar-1b918421a"
                  href={PROFILE.linkedin}
                />
              </div>
            </div>

            <form onSubmit={submit} className="min-w-0 space-y-4">
              {/* Bot Honeypot field (hidden from view and assistive tech) */}
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

              <div className="grid min-w-0 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="c-name" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                    Name
                  </label>
                  <input
                    id="c-name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-sm text-ink placeholder:text-dim backdrop-blur-md transition-colors focus:border-sage/50 focus:bg-white/[0.05] focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor="c-email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
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
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-sm text-ink placeholder:text-dim backdrop-blur-md transition-colors focus:border-sage/50 focus:bg-white/[0.05] focus:outline-none"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <label htmlFor="c-msg" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                  Message
                </label>
                <textarea
                  id="c-msg"
                  required
                  rows={4}
                  maxLength={2000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-y rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-sm text-ink placeholder:text-dim backdrop-blur-md transition-colors focus:border-sage/50 focus:bg-white/[0.05] focus:outline-none"
                  placeholder="What would you like to build?"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all disabled:cursor-wait disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : status === 'sent' ? (
                  <>
                    <Check className="size-4" aria-hidden="true" /> Message sent
                  </>
                ) : status === 'error' ? (
                  <>
                    <CircleAlert className="size-4" aria-hidden="true" /> Try again
                  </>
                ) : (
                  <>
                    <Send className="size-4" aria-hidden="true" /> Send message
                  </>
                )}
              </button>
              <p className={`text-center text-xs ${line.className}`} role="status" aria-live="polite">
                {line.text}
              </p>
            </form>
          </div>
        </Panel>
      </motion.div>
    </Section>
  )
}
