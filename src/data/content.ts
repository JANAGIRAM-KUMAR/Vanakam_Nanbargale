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
  linkedin: 'https://linkedin.com/in/janagiram-kumar',
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
      'Designed and implemented 6 network topologies involving 24 devices in the Ottawa lab.',
      'Built an Ottawa Lab device management tool.',
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

export type Project = {
  id: string
  name: string
  kind: 'backend' | 'fullstack' | 'frontend'
  tagline: string
  description: string
  stack: string[]
  features: string[]
  flow: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'task-management',
    name: 'Task Management System',
    kind: 'backend',
    tagline: 'Production-style task platform with queues, caching, and role-based access.',
    description:
      'A full backend system for managing tasks with JWT and Google OAuth authentication, role-based access control, Redis caching, and BullMQ background job processing.',
    stack: [
      'Node.js',
      'TypeScript',
      'Express.js',
      'PostgreSQL',
      'Redis',
      'BullMQ',
      'Docker Compose',
      'Cloudinary',
    ],
    features: [
      'RESTful API with task CRUD',
      'JWT authentication + Google OAuth',
      'Role-based access control',
      'PostgreSQL indexing',
      'Redis caching and rate limiting',
      'Pub/Sub and BullMQ background jobs',
      'Cloudinary uploads',
      'Structured logging',
      'Docker Compose setup',
    ],
    flow: [
      'Frontend',
      'API',
      'Auth / RBAC',
      'PostgreSQL + Redis',
      'BullMQ Workers',
      'Cloudinary',
    ],
  },
  {
    id: 'acquisitions-api',
    name: 'Acquisitions API',
    kind: 'backend',
    tagline:
      'Secure backend API engineered with containerization, automated testing, CI/CD, and security middleware.',
    description:
      'A hardened REST API with schema validation, containerized delivery, and an automated pipeline from commit to deployment artifact.',
    stack: [
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Docker',
      'GitHub Actions',
      'JWT',
      'RBAC',
      'Zod',
      'Drizzle ORM',
      'Jest',
      'Supertest',
    ],
    features: [
      'Schema validation with Zod',
      'JWT + RBAC security middleware',
      'Drizzle ORM data layer',
      'Jest + Supertest test suite',
      'GitHub Actions CI/CD',
      'Containerized with Docker',
    ],
    flow: [
      'Developer',
      'GitHub',
      'GitHub Actions',
      'Tests',
      'Docker',
      'Application',
      'PostgreSQL',
    ],
  },
  {
    id: 'music-manager',
    name: 'Music Manager',
    kind: 'frontend',
    tagline: 'Spotify-inspired music manager with centralized playback and smart queues.',
    description:
      'A responsive music application with a centralized playback store, playlist queue management, and multimedia uploads on Cloudinary.',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Zustand', 'Cloudinary'],
    features: [
      'Spotify-inspired interface',
      'Centralized playback state with Zustand',
      'Responsive audio controls',
      'Playlist queue management',
      'Clerk-based RBAC',
      'Cloudinary multimedia uploads',
      'MongoDB aggregation pipelines',
      'Concurrent query handling',
    ],
    flow: ['React Client', 'Zustand Store', 'Node API', 'MongoDB', 'Cloudinary'],
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

export const DEPLOY_FLOW = [
  'Local Development',
  'GitHub',
  'Docker Image',
  'OpenStack VM',
  'Nginx',
  'Portfolio',
]

export const DEPLOY_STATUS = [
  { k: 'OS', v: 'Ubuntu' },
  { k: 'Runtime', v: 'Docker' },
  { k: 'Proxy', v: 'Nginx' },
  { k: 'Network', v: 'OpenStack' },
  { k: 'Status', v: 'HEALTHY' },
] as const

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
