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
    tagline: 'A production-style task platform with queues, caching, and role-based access.',
    description:
      'A backend system for managing tasks with JWT and Google OAuth, role-based access, Redis caching, and BullMQ background processing.',
    stack: [
      'Node.js',
      'TypeScript',
      'Express.js',
      'PostgreSQL',
      'Redis',
      'BullMQ',
      'Docker',
      'Cloudinary',
    ],
    features: [
      'RESTful API with task CRUD',
      'JWT authentication + Google OAuth',
      'Role-based access control',
      'Redis caching and rate limiting',
      'BullMQ background jobs',
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
    tagline: 'A secure API with automated testing, CI/CD, and containerized delivery.',
    description:
      'A hardened REST API with schema validation, Docker delivery, and a pipeline from commit to deployment artifact.',
    stack: [
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Docker',
      'GitHub Actions',
      'JWT',
      'Zod',
      'Drizzle ORM',
      'Jest',
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
    tagline: 'A responsive music app with centralized playback and smart queues.',
    description:
      'A responsive music application with centralized playback state, playlist queue management, and media uploads.',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Zustand', 'Cloudinary'],
    features: [
      'Spotify-inspired interface',
      'Centralized playback state',
      'Responsive audio controls',
      'Playlist queue management',
      'Cloudinary media uploads',
      'MongoDB aggregation pipelines',
    ],
    flow: ['React Client', 'Zustand Store', 'Node API', 'MongoDB', 'Cloudinary'],
  },
]

export const RESEARCH = {
  title: 'An Overview of Artificial Intelligence Significance in Cloud Security',
  year: '2024',
  description: 'Research exploring AI-driven threat detection for adaptive cloud security systems.',
} as const
