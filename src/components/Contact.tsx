import { motion, useReducedMotion } from 'framer-motion'
import { Check, Copy, Mail, Send } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './icons'
import { type ComponentType, useState } from 'react'
import { PROFILE } from '../data/content'
import { Panel, Section } from './ui'

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
    <div className="flex items-center gap-3 border-b border-edge py-4 last:border-0">
      <span className="flex size-9 shrink-0 items-center justify-center rounded border border-edge-bright bg-void text-cyan">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] tracking-[0.2em] text-dim">{label}</div>
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel="noreferrer noopener"
          className="block truncate text-sm text-ink transition-colors hover:text-cyan"
        >
          {value}
        </a>
      </div>
      <button
        type="button"
        onClick={copy}
        className="rounded border border-edge-bright p-2 text-dim transition-colors hover:border-cyan/50 hover:text-cyan"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="size-3.5 text-term" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  )
}

export function Contact() {
  const reduce = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact — ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <Section
      id="contact"
      index="10"
      label="Contact"
      title="Let's build something."
      intro="Interested in software engineering, AI systems, backend development, networking, or infrastructure? Let's connect."
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <ContactRow icon={Mail} label="EMAIL" value={PROFILE.email} href={`mailto:${PROFILE.email}`} />
          <ContactRow
            icon={Github}
            label="GITHUB"
            value="github.com/JANAGIRAM-KUMAR"
            href={PROFILE.github}
          />
          <ContactRow
            icon={Linkedin}
            label="LINKEDIN"
            value="linkedin.com/in/janagiram-kumar"
            href={PROFILE.linkedin}
          />

          <div className="mt-6 rounded-lg border border-edge bg-void/60 p-4 font-mono text-[11px] leading-relaxed text-dim">
            <span className="text-term">$</span> echo &quot;open to software, AI, networking, and
            infrastructure roles&quot;
            <br />
            <span className="text-cyan">→ reply via email for the fastest response</span>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Panel className="p-6">
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label htmlFor="c-name" className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-dim">
                  NAME
                </label>
                <input
                  id="c-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border border-edge bg-void/70 px-3 py-2.5 text-sm text-ink placeholder:text-dim focus:border-cyan/60 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-dim">
                  EMAIL
                </label>
                <input
                  id="c-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border border-edge bg-void/70 px-3 py-2.5 text-sm text-ink placeholder:text-dim focus:border-cyan/60 focus:outline-none"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="c-msg" className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-dim">
                  MESSAGE
                </label>
                <textarea
                  id="c-msg"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-y rounded border border-edge bg-void/70 px-3 py-2.5 text-sm text-ink placeholder:text-dim focus:border-cyan/60 focus:outline-none"
                  placeholder="What would you like to build?"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded border border-cyan/60 bg-cyan/10 px-5 py-3 font-mono text-sm text-cyan transition-all hover:bg-cyan/20 hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
              >
                {sent ? (
                  <>
                    <Check className="size-4" aria-hidden="true" /> Opened in mail client
                  </>
                ) : (
                  <>
                    <Send className="size-4" aria-hidden="true" /> Send Message
                  </>
                )}
              </button>
              <p className="text-center font-mono text-[10px] text-dim">
                Opens your mail client — no data leaves your browser.
              </p>
            </form>
          </Panel>
        </motion.div>
      </div>
    </Section>
  )
}
