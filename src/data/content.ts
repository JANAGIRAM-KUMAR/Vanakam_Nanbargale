export const PROFILE = {
  name: 'JANAGIRAM KUMAR',
  displayName: 'Janagiram Kumar',
  initials: 'JK',
  email: 'janagi2368@gmail.com',
  github: 'https://github.com/JANAGIRAM-KUMAR',
  linkedin: 'https://www.linkedin.com/in/janagiram-kumar-1b918421a/',
  website: 'https://janagiram.dpdns.org',
  tagline: 'I build software that helps computers, networks, and people work together.',
  resumePdfUrl: '/resume.pdf',
  resumePreviewUrl: '/resume-preview.webp',
} as const

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
] as const

export const PROJECTS = [
  {
    numeral: '01',
    title: 'Microservices Platform',
    sentence:
      'Modular microservices with an edge API gateway, Kafka event streaming, and automated PostgreSQL migrations.',
    tags: ['TypeScript', 'Node.js', 'Kafka', 'Docker'],
    github: 'https://github.com/JANAGIRAM-KUMAR/microservices-workflow',
  },
  {
    numeral: '02',
    title: 'Automated Deployment Pipeline',
    sentence:
      'Automated CI/CD pipeline with GitHub Actions, multi-stage Docker builds, and Nginx reverse proxy on OpenStack.',
    tags: ['Docker', 'GitHub Actions', 'Nginx', 'Linux'],
    github: 'https://github.com/JANAGIRAM-KUMAR/Vanakam_Nanbargale',
  },
  {
    numeral: '03',
    title: 'Soundwave',
    sentence:
      'Full-stack audio streaming app with real-time visualizers and a synchronized karaoke lyrics engine.',
    tags: ['React', 'TypeScript', 'Node.js', 'Web Audio API'],
    github: 'https://github.com/JANAGIRAM-KUMAR/MusicManager',
  },
] as const

export const EXPERIENCE = {
  company: 'Ciena',
  role: 'Summer Intern',
  period: 'Jun – Aug 2026',
  lines: [
    'Reduced manual deployment and verification time across network switches by 40%.',
    'Built autonomous AI helpers with Google ADK to extract telemetry and triage equipment logs.',
    'Triaged and fixed 10+ defect tickets across multi-switch topologies with teams in Ottawa and India.',
  ],
  education:
    'Sri Venkateswara College of Engineering (SVCE) — B.E. in Computer Science and Engineering, 2023 – 2027',
  skills:
    'TypeScript, JavaScript, Python, Node.js, Express, Kafka, PostgreSQL, Docker, Kubernetes, Nginx, CI/CD, React',
} as const
