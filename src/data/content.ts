export const PROFILE = {
  name: 'Janagiram Kumar',
  handle: 'JANAGIRAM',
  title: 'Software Engineer',
  tags: ['Software Engineer', 'AI', 'Networking'],
  headline: 'Building reliable software and practical AI systems.',
  subline:
    'Computer Science Engineering student with hands-on experience in AI agents, backend development, networking, and cloud infrastructure.',
  email: 'janagi2368@gmail.com',
  github: 'https://github.com/JANAGIRAM-KUMAR',
  linkedin: 'https://www.linkedin.com/in/janagiram-kumar-1b918421a/',
} as const

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const

export const ABOUT = {
  paragraphs: [
    'I am a Computer Science Engineering student at Sri Venkateswara College of Engineering. I build backend systems, AI-powered tools, and the infrastructure that supports them.',
    'During my internship at Ciena, I developed AI agents with Google ADK, configured and validated routing switches, and built an internal device management tool. I enjoy working from application code down to the network layer.',
  ],
} as const

export const EXPERIENCE = [
  {
    company: 'Ciena',
    role: 'Summer Intern — SVT/PV Routing IP',
    location: 'Gurugram, Haryana',
    period: 'Jun 2026 – Aug 2026',
    highlights: [
      'Developed AI agents from scratch using Google Agent Development Kit (ADK).',
      'Configured and validated Ciena Service Delivery Switches, including IP addressing, DHCP, and routing protocol testing.',
      'Designed and tested routing topologies across multiple switch models in a hands-on lab.',
      'Built an internal device management tool for configuration and inventory tracking.',
    ],
  },
] as const

export type SkillCategory = {
  id: string
  label: string
  items: string[]
}

export const SKILLS: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: ['Java', 'JavaScript', 'TypeScript', 'Python', 'C', 'C++'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React', 'React Native', 'Tailwind CSS'],
  },
  {
    id: 'backend-data',
    label: 'Backend & Data',
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT',
      'PostgreSQL',
      'MongoDB',
      'MySQL',
      'Redis',
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    items: ['Google ADK', 'AI Agent Development'],
  },
  {
    id: 'devops-tools',
    label: 'DevOps & Tools',
    items: [
      'Git',
      'GitHub Actions',
      'Docker',
      'Kubernetes',
      'Jira',
      'Confluence',
      'BullMQ',
      'Cloudinary',
      'Postman',
    ],
  },
  {
    id: 'networking',
    label: 'Networking',
    items: ['IP Networking', 'DHCP', 'IS-IS', 'OSPF', 'CFM'],
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
  description: 'Research exploring AI-driven threat detection for adaptive cloud security systems.',
} as const
