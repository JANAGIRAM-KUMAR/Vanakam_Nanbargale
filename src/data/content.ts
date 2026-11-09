export const PROFILE = {
  name: 'Janagiram Kumar',
  handle: 'JANAGIRAM',
  title: 'Software Engineer',
  role: 'Software Engineer • AI & Cloud Infrastructure',
  location: 'Chennai, India',
  phone: '+91 9444808937',
  email: 'janagi2368@gmail.com',
  github: 'https://github.com/JANAGIRAM-KUMAR',
  linkedin: 'https://www.linkedin.com/in/janagiram-kumar-1b918421a/',
  website: 'https://janagiram.dpdns.org',
  headline: 'Building resilient backend systems, distributed microservices, and autonomous AI agents.',
  subline:
    'Computer Science Engineering student with hands-on experience in AI agents, backend systems, networking, and cloud infrastructure.',
  resumePdfUrl: '/resume.pdf',
} as const

export const NAV_LINKS = [
  { label: 'Overview', href: '#top' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
] as const

export const EDUCATION = {
  institution: 'Sri Venkateswara College of Engineering (SVCE)',
  degree: 'B.E. in Computer Science and Engineering',
  period: '2023 – 2027',
  cgpa: '9.09 / 10.0',
  coursework: [
    'Data Structures & Algorithms',
    'DBMS',
    'Operating Systems',
    'Computer Networks',
    'System Design',
    'OOP',
  ],
} as const

export const EXPERIENCE = [
  {
    company: 'Ciena',
    role: 'Summer Intern – SVT/PV Routing IP',
    location: 'Gurugram, Haryana',
    period: 'Jun 2026 – Aug 2026',
    metrics: [
      { label: 'Deployment Time', value: '-40%' },
      { label: 'Defects Triaged', value: '10+' },
      { label: 'Topology Protocols', value: 'IS-IS / OSPF' },
    ],
    highlights: [
      'Developed an internal network device management tool across Ciena Service Delivery Switches, reducing manual deployment and verification time by 40% while eliminating manual errors on multi-node topologies.',
      'Developed autonomous AI agents using Google Agent Development Kit (ADK) to automate telemetry extraction, log triage, and device state verification workflows.',
      'Partnered with P3 engineers and cross-functional teams to design, deploy, and validate multi-switch network topologies (IS-IS, OSPF, DHCP); triaged and resolved 10+ critical hardware/software defect tickets using Jira.',
      'Collaborated with globally distributed engineering teams (Ottawa and India) to troubleshoot failure scenarios, physical device configurations, and validate software fixes on networking infrastructure.',
    ],
  },
] as const

export type ResumeProject = {
  id: string
  name: string
  stack: string[]
  repo?: string
  highlights: string[]
  badge?: string
}

export const PROJECTS: ResumeProject[] = [
  {
    id: 'microservices-platform',
    name: 'Distributed Microservices Platform',
    stack: ['TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Apache Kafka', 'Docker'],
    repo: 'https://github.com/JANAGIRAM-KUMAR/microservices-workflow',
    badge: '380+ Automated Tests',
    highlights: [
      'Built a modular microservices platform with an edge API Gateway handling request routing, rate limiting, and centralized Role-Based Access Control (RBAC).',
      'Implemented asynchronous event streaming with Apache Kafka for background task auditing and automated PostgreSQL migrations, backed by 380+ automated tests.',
      'Containerized all services and Kafka brokers with Docker Compose for automated CI verification and local replication.',
    ],
  },
  {
    id: 'cloud-infrastructure',
    name: 'Cloud Infrastructure & Automated CI/CD Pipeline',
    stack: ['Docker', 'GitHub Actions', 'Nginx', 'Linux', 'OpenStack', 'Bash'],
    repo: 'https://github.com/JANAGIRAM-KUMAR/Vanakam_Nanbargale',
    badge: 'Zero-Downtime Deployments',
    highlights: [
      'Engineered an automated CI/CD pipeline using GitHub Actions to run linting, type checks, and zero-downtime container deployments.',
      'Containerized production services using multi-stage Docker builds and deployed them behind an Nginx reverse proxy with automated health checks.',
      'Hardened web server with connection limits, Slowloris timeouts, and Content Security Policies on OpenStack virtual infrastructure.',
    ],
  },
  {
    id: 'soundwave',
    name: 'Soundwave – Full-Stack Audio Streaming Platform',
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Web Audio API'],
    repo: 'https://github.com/JANAGIRAM-KUMAR/MusicManager',
    badge: '90% Re-render Reduction',
    highlights: [
      'Developed a full-stack media streaming web application with custom audio equalization, dynamic volume normalization, and real-time canvas visualizers.',
      'Built a synchronized karaoke lyrics engine with sub-millisecond playhead tracking, optimizing the audio event loop to reduce unnecessary React re-renders by 90%.',
      'Designed responsive UI featuring playlist curation, queue management, and instantaneous stream seek buffers.',
    ],
  },
]

export type SkillGroup = {
  category: string
  skills: string[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'SQL (PostgreSQL)', 'Java', 'C/C++'],
  },
  {
    category: 'Backend & Systems',
    skills: [
      'Node.js',
      'Express.js',
      'RESTful APIs',
      'Apache Kafka',
      'Microservices Architecture',
      'Zod',
      'Redis',
    ],
  },
  {
    category: 'AI & Testing',
    skills: [
      'Google ADK (AI Agents)',
      'Generative AI',
      'ML Anomaly Detection',
      'MCP',
      'Vitest',
      'Supertest',
    ],
  },
  {
    category: 'DevOps & Infrastructure',
    skills: [
      'Docker',
      'Kubernetes',
      'GitHub Actions (CI/CD)',
      'Nginx (Reverse Proxy)',
      'Linux',
      'Git',
    ],
  },
  {
    category: 'Frontend & UI',
    skills: ['React.js', 'React Native', 'Tailwind CSS', 'Zustand'],
  },
  {
    category: 'Databases & Cloud',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'AWS (S3)'],
  },
]

export const RESEARCH = {
  title: 'AI Significance in Cloud Security: Adaptive Threat Detection',
  year: '2024',
  description:
    'Researched machine learning anomaly detection models (Random Forest, Isolation Forest) for cloud security threat analysis; presented findings on adaptive risk mitigation and behavioral profiling across distributed cloud infrastructure.',
} as const

export const ACHIEVEMENTS = [
  {
    title: 'Competitive Programming',
    description: 'Solved 400+ Data Structures and Algorithms problems across LeetCode and NeetCode.',
    badge: '400+ DSA Solved',
  },
  {
    title: 'Production Engineering',
    description:
      'Built and deployed full-stack systems, event-driven microservices, AI agents, strict test coverage, and automated deployment pipelines.',
    badge: 'Production Hardened',
  },
] as const
