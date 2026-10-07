import { useEffect, useRef, useState } from 'react'
import { TERMINAL_BOOT } from '../data/content'

type Line = { text: string; tone?: 'default' | 'green' | 'cyan' | 'dim' }

const HELP_OUTPUT: Line[] = [
  { text: 'Available commands:', tone: 'cyan' },
  { text: '  help        — list commands' },
  { text: '  whoami      — identity' },
  { text: '  profile     — print profile' },
  { text: '  skills      — skill matrix' },
  { text: '  experience  — work history' },
  { text: '  projects    — project index' },
  { text: '  contact     — how to reach me' },
  { text: '  clear       — clear screen' },
]

const INFO: Record<string, Line[]> = {
  whoami: [
    { text: 'janagiram — Software Engineer | AI Agent Developer | Network Engineer', tone: 'green' },
  ],
  profile: TERMINAL_BOOT.filter((l) => l !== '$ whoami' && l !== 'janagiram' && !l.startsWith('janagiram@')).map(
    (text) => ({ text }),
  ),
  skills: [
    { text: 'LANGUAGES   Java · JavaScript · TypeScript · Python · C · C++' },
    { text: 'FRONTEND    React.js · React Native · Tailwind CSS' },
    { text: 'BACKEND     Node.js · Express.js · REST APIs · JWT' },
    { text: 'DATABASES   PostgreSQL · MongoDB · MySQL · Redis' },
    { text: 'AI          Google ADK · AI Agent Development' },
    { text: 'DEVOPS      Git · GitHub Actions · Docker · Kubernetes' },
    { text: 'NETWORKING  IP · DHCP · IS-IS · OSPF · CFM' },
    { text: 'TOOLS       Jira · Confluence · BullMQ · Cloudinary · WebStorm · Postman', tone: 'dim' },
  ],
  experience: [
    { text: 'CIENA — Summer Intern, SVT/PV Routing IP (Jun 2026 – Aug 2026)', tone: 'green' },
    { text: '  AI agents with Google ADK · Service Delivery Switches' },
    { text: '  6 network topologies · 24 devices · Ottawa Lab tool' },
  ],
  projects: [
    { text: '1. Task Management System  — Node · TS · PostgreSQL · Redis · BullMQ' },
    { text: '2. Acquisitions API        — Node · Docker · CI/CD · Jest · Drizzle' },
    { text: '3. Music Manager           — React · TypeScript · MongoDB · Zustand' },
  ],
  contact: [
    { text: `  email      janagi2368@gmail.com`, tone: 'cyan' },
    { text: `  github     github.com/JANAGIRAM-KUMAR`, tone: 'cyan' },
    { text: `  linkedin   linkedin.com/in/janagiram-kumar`, tone: 'cyan' },
  ],
}

const HIRE_OUTPUT: Line[] = [
  { text: 'ACCESS GRANTED.', tone: 'green' },
  { text: '' },
  { text: 'Candidate detected.', tone: 'cyan' },
  { text: '' },
  { text: 'Skills:' },
  { text: '✓ Software Engineering', tone: 'green' },
  { text: '✓ AI Agents', tone: 'green' },
  { text: '✓ Backend Systems', tone: 'green' },
  { text: '✓ DevOps', tone: 'green' },
  { text: '✓ Networking', tone: 'green' },
  { text: '' },
  { text: 'Initializing conversation...', tone: 'dim' },
  { text: '' },
  { text: "> Let's build something.", tone: 'cyan' },
  { text: '' },
]

const TONE_CLASS: Record<NonNullable<Line['tone']>, string> = {
  default: 'text-[#c9d3e3]',
  green: 'text-term',
  cyan: 'text-cyan',
  dim: 'text-dim',
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(() =>
    TERMINAL_BOOT.map((text) => ({
      text,
      tone: text.startsWith('$') || text.startsWith('janagiram@') ? 'cyan' : 'default',
    })),
  )
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIndex, setHIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const push = (...newLines: Line[]) => setLines((prev) => [...prev, ...newLines])

  const run = (raw: string) => {
    const cmd = raw.trim()
    push({ text: `janagiram@portfolio:~$ ${cmd}`, tone: 'cyan' })
    if (!cmd) return

    const lower = cmd.toLowerCase()

    if (lower === 'sudo hire janagiram') {
      push(...HIRE_OUTPUT)
      return
    }
    if (lower === 'clear') {
      setLines([])
      return
    }
    if (lower === 'help') {
      push(...HELP_OUTPUT, { text: '' })
      return
    }
    if (lower.startsWith('sudo')) {
      push({ text: 'permission denied — nice try.', tone: 'dim' }, { text: '' })
      return
    }
    if (INFO[lower]) {
      push(...INFO[lower], { text: '' })
      return
    }
    push(
      { text: `command not found: ${cmd}`, tone: 'dim' },
      { text: 'type "help" for available commands', tone: 'dim' },
      { text: '' },
    )
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setHistory((h) => [...h, input])
      setHIndex(-1)
    }
    run(input)
    setInput('')
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const next = hIndex === -1 ? history.length - 1 : Math.max(0, hIndex - 1)
      setHIndex(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (hIndex === -1) return
      const next = hIndex + 1
      if (next >= history.length) {
        setHIndex(-1)
        setInput('')
      } else {
        setHIndex(next)
        setInput(history[next])
      }
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-edge bg-[#070a0f] shadow-xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-edge bg-panel/80 px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-2 font-mono text-[11px] text-dim">janagiram@portfolio — zsh</span>
      </div>

      <div
        ref={scrollRef}
        className="terminal-scroll h-64 cursor-text overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed sm:text-[13px]"
        onClick={() => inputRef.current?.focus()}
        role="log"
        aria-live="polite"
      >
        {lines.map((l, i) => (
          <div key={i} className={`whitespace-pre-wrap ${TONE_CLASS[l.tone ?? 'default']}`}>
            {l.text || '\u00A0'}
          </div>
        ))}

        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <label htmlFor="term-input" className="shrink-0 text-cyan">
            {'>'}
          </label>
          <input
            id="term-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
            className="w-full bg-transparent font-mono text-[12px] text-ink caret-transparent focus:outline-none sm:text-[13px]"
            placeholder="type help…"
          />
          <span className="caret -ml-2 inline-block h-3.5 w-2 bg-cyan" aria-hidden="true" />
        </form>
      </div>

      <div className="flex items-center justify-between border-t border-edge px-3 py-1.5 font-mono text-[10px] text-dim">
        <span>interactive · try: help</span>
        <span className="text-term">● ready</span>
      </div>
    </div>
  )
}
