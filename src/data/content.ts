export const PROFILE = {
  name: 'Janagiram Kumar',
  handle: 'JANAGIRAM',
  title: 'Software Engineer | AI Agent Developer | Network Engineer',
  tags: ['Software Engineer', 'AI', 'Networking', 'DevOps'],
  headline: 'Building intelligent systems and reliable infrastructure.',
  subline:
    'Computer Science Engineer focused on AI agents, backend engineering, cloud infrastructure, DevOps, and computer networking.',
  email: 'janagi2368@gmail.com',
  github: 'https://github.com/JANAGIRAM-KUMAR',
  linkedin: 'https://www.linkedin.com/in/janagiram-kumar-1b918421a/',
} as const

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Contact', href: '#contact' },
] as const

export const ABOUT = {
  paragraphs: [
    "I'm a Computer Science Engineering student at Sri Venkateswara College of Engineering, interested in building scalable software systems, AI-powered applications, and reliable infrastructure.",
    'My experience spans backend engineering, AI agent development, DevOps, and computer networking. During my internship at Ciena, I worked with real networking infrastructure, developed AI agents using Google ADK, designed network topologies, and built tools for managing network devices.',
    'I enjoy understanding systems from the application layer all the way down to infrastructure and networking.',
  ],
} as const

export const EXPERIENCE = [
  {
    company: 'Ciena',
    role: 'Summer Intern — SVT/PV Routing IP',
    location: 'Gurugram, Haryana',
    period: 'Jun 2026 – Aug 2026',
    accent: 'cyan' as const,
    highlights: [
      'Developed AI agents from scratch using Google Agent Development Kit (ADK).',
      'Worked with Ciena Service Delivery Switches across multiple models.',
      'Performed device configuration, IP addressing, DHCP setup, connectivity validation, and network protocol testing.',
      'Designed and validated routing topologies across multiple switch models in a hands-on lab environment.',
      'Built a device management tool to streamline device configuration and inventory tracking.',
      'Collaborated with the SVT/PV Routing IP team to reproduce issues, troubleshoot failures, and validate fixes.',
    ],
  },
] as const

export type SkillCategory = {
  id: string
  label: string
  description: string
  items: string[]
}

export const SKILLS: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    description: 'Core programming languages used across backend, systems, and scripting work.',
    items: ['Java', 'JavaScript', 'TypeScript', 'Python', 'C', 'C++'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Component-driven interfaces for web and mobile.',
    items: ['React.js', 'React Native', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    description: 'API design, auth, and service architecture.',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
  },
  {
    id: 'databases',
    label: 'Databases',
    description: 'Relational, document, and in-memory data stores.',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
  },
  {
    id: 'ai',
    label: 'AI',
    description: 'Agent-based systems built with Google ADK.',
    items: ['Google ADK', 'AI Agent Development'],
  },
  {
    id: 'devops',
    label: 'DevOps',
    description: 'Version control, CI/CD, containers, and orchestration.',
    items: ['Git', 'GitHub Actions', 'Docker', 'Kubernetes'],
  },
  {
    id: 'networking',
    label: 'Networking',
    description: 'Protocols and validation practiced on real lab hardware.',
    items: ['IP Networking', 'DHCP', 'IS-IS', 'OSPF', 'CFM'],
  },
  {
    id: 'tools',
    label: 'Tools',
    description: 'Daily engineering toolchain.',
    items: ['Jira', 'Confluence', 'BullMQ', 'Cloudinary', 'WebStorm', 'Postman'],
  },
]

export type ServiceNode = {
  name: string
  note: string
  layer: 'edge' | 'core' | 'data'
}

export type ProjectSignal = { label: string; value: string }

export type Project = {
  id: string
  name: string
  kind: 'backend' | 'fullstack'
  arch: 'microservices' | 'api' | 'fullstack'
  icon: 'layers' | 'server' | 'music'
  repo: string
  tagline: string
  description: string
  stack: string[]
  features: string[]
  signals: ProjectSignal[]
  services: ServiceNode[]
}

export const PROJECTS: Project[] = [
  {
    id: 'microservices-workflow',
    name: 'Microservices Task Platform',
    kind: 'backend',
    arch: 'microservices',
    icon: 'layers',
    repo: 'JANAGIRAM-KUMAR/microservices-workflow',
    tagline: 'Five services, one gateway, Kafka events, and a pipeline that ships on merge.',
    description:
      'An npm-workspaces monorepo where an API gateway (auth, rate limiting, routing) fronts auth, task, media, and workflow services over HTTP and Kafka. A shared package holds JWT, Kafka, logging, and error contracts; PostgreSQL and S3-backed uploads persist the data.',
    stack: ['TypeScript', 'Express', 'PostgreSQL', 'Apache Kafka', 'S3', 'Docker', 'Vitest'],
    features: [
      'Gateway enforces JWT, rate limits, and service-to-service auth',
      'Kafka event flow: task.created drives the workflow service',
      'Shared package for JWT, Kafka client, logger, typed errors',
      'Media service issues presigned S3 upload URLs',
      'Typecheck + tests on every PR, Docker Hub image on merge',
      'Docker Compose runs Kafka and all five services locally',
    ],
    signals: [
      { label: 'SERVICES', value: '5 · ports 5009–5013' },
      { label: 'TEST FILES', value: '35 (Vitest + Supertest)' },
      { label: 'WORKFLOWS', value: 'ci.yml · cd.yml' },
      { label: 'RUNTIME', value: 'Node 22 + TS (tsx)' },
    ],
    services: [
      { name: 'API GATEWAY', note: 'routing · auth · rate-limit', layer: 'edge' },
      { name: 'AUTH', note: 'JWT issue/verify', layer: 'core' },
      { name: 'TASK', note: 'CRUD · emits events', layer: 'core' },
      { name: 'MEDIA', note: 'presigned S3', layer: 'core' },
      { name: 'WORKFLOW', note: 'Kafka consumer', layer: 'core' },
      { name: 'POSTGRESQL', note: 'Neon', layer: 'data' },
      { name: 'KAFKA', note: 'topics', layer: 'data' },
      { name: 'S3 STORAGE', note: 'attachments', layer: 'data' },
    ],
  },
  {
    id: 'acquisitions-api',
    name: 'Acquisitions API',
    kind: 'backend',
    arch: 'api',
    icon: 'server',
    repo: 'JANAGIRAM-KUMAR/acquisitions',
    tagline: 'Hardened REST API: validated input, role-based routes, tested and containerized.',
    description:
      'Express 5 (ESM) split into routes, controllers, services, and models — Zod-validated at the edge, Drizzle migrations against Neon Postgres, JWT in http-only cookies, and Arcjet, Helmet, and Winston guarding and logging every request.',
    stack: ['Node.js', 'Express 5', 'Drizzle ORM', 'PostgreSQL', 'Zod', 'JWT', 'Docker', 'Jest'],
    features: [
      'Layered layout: routes → controllers → services → models',
      'Zod schema validation on every request body',
      'JWT in http-only cookies with role-based access control',
      'Drizzle Kit migrations and a committed coverage report',
      'Arcjet, Helmet, CORS, and structured Winston logs',
      'Actions: tests, lint/format, and a Docker image to Docker Hub',
    ],
    signals: [
      { label: 'WORKFLOWS', value: 'tests · lint · docker' },
      { label: 'TESTING', value: 'Jest + Supertest' },
      { label: 'DATABASE', value: 'Drizzle + Neon (pg)' },
      { label: 'SECURITY', value: 'Arcjet · Helmet · RBAC' },
    ],
    services: [
      { name: 'HTTP CLIENT', note: 'cookie · bearer', layer: 'edge' },
      { name: 'AUTH / RBAC', note: 'jwt + requireRole', layer: 'core' },
      { name: 'VALIDATION', note: 'zod schemas', layer: 'core' },
      { name: 'REST API', note: 'express 5 routes', layer: 'core' },
      { name: 'DATA LAYER', note: 'drizzle orm', layer: 'core' },
      { name: 'POSTGRESQL', note: 'neon', layer: 'data' },
    ],
  },
  {
    id: 'music-manager',
    name: 'MusicManager',
    kind: 'fullstack',
    arch: 'fullstack',
    icon: 'music',
    repo: 'JANAGIRAM-KUMAR/MusicManager',
    tagline: 'Spotify-style client and API: one playback store, a real admin dashboard, live updates.',
    description:
      'React 19 and Vite on the front, Express and Mongoose behind it. Zustand owns playback, library, and auth state; Clerk signs users in on both client and server; Cloudinary stores media streamed through Socket.IO.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Zustand', 'Express', 'MongoDB', 'Cloudinary', 'Clerk'],
    features: [
      'Spotify-style UI: resizable panels, player, album pages',
      'Playback queue, seek, and controls held in Zustand',
      'Admin dashboard for stats plus song and album CRUD',
      'Clerk auth on the client and @clerk/express on the server',
      'Real-time events over Socket.IO, cron jobs via node-cron',
      'Seeded MongoDB catalog behind Mongoose models',
    ],
    signals: [
      { label: 'WORKSPACE', value: 'client + server' },
      { label: 'STATE', value: '3 Zustand stores' },
      { label: 'AUTH', value: 'Clerk (web + express)' },
      { label: 'MEDIA', value: 'Cloudinary uploads' },
    ],
    services: [
      { name: 'REACT CLIENT', note: 'Vite · Tailwind 4', layer: 'edge' },
      { name: 'ZUSTAND STORE', note: 'player · music · auth', layer: 'core' },
      { name: 'EXPRESS API', note: 'routes + controllers', layer: 'core' },
      { name: 'CLERK AUTH', note: 'session → jwt', layer: 'core' },
      { name: 'MONGODB', note: 'mongoose models', layer: 'data' },
      { name: 'CLOUDINARY', note: 'audio + covers', layer: 'data' },
    ],
  },
]

export const RESEARCH = {
  title: 'An Overview of Artificial Intelligence Significance in Cloud Security',
  year: '2024',
  description: 'Research exploring AI-driven threat detection models for adaptive cloud security systems.',
} as const

export const ACHIEVEMENTS = [
  'Solved numerous Data Structures and Algorithms problems on LeetCode.',
  'Continuously build full-stack, backend, DevOps, and AI applications to strengthen software engineering and system design skills.',
] as const

export const PHILOSOPHY = [
  { label: 'Build', text: 'Turn ideas into working systems.' },
  { label: 'Understand', text: 'Learn how software, networks, infrastructure, and AI interact.' },
  { label: 'Improve', text: 'Measure, debug, optimize, and iterate.' },
] as const

export const STACK_LAYERS = [
  {
    title: 'AI',
    lines: ['Google ADK · Agent Development'],
    accent: 'term' as const,
  },
  {
    title: 'Applications',
    lines: ['React / Node / APIs'],
    accent: 'cyan' as const,
  },
  {
    title: 'Data Layer',
    lines: ['PostgreSQL / MongoDB', 'Redis'],
    accent: 'cyan' as const,
  },
  {
    title: 'Infrastructure',
    lines: ['Docker / Kubernetes', 'Linux / OpenStack'],
    accent: 'blue' as const,
  },
  {
    title: 'Networking',
    lines: ['IP / DHCP / IS-IS', 'OSPF / CFM'],
    accent: 'blue' as const,
  },
]

export const TERMINAL_BOOT = [
  '$ whoami',
  'janagiram',
  '',
  'janagiram@portfolio:~$ ./profile',
  '',
  'ROLE      → Software Engineer',
  'FOCUS     → AI / Backend / Networking',
  'STACK     → Node.js / React / Python / Docker',
  'AI        → Google ADK',
  'INFRA     → Kubernetes / Linux / OpenStack',
  'STATUS    → Building things',
  '',
]
