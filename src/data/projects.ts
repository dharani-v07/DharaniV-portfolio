import { Project } from '../types'

export const projectsData: Project[] = [
  {
    id: 'attendance',
    number: '01',
    category: 'RESEARCH / COMPUTER VISION',
    year: '2026',
    title: 'Real-Time Contactless Attendance',
    short: 'Face recognition built for practical, low-power deployment.',
    description:
      'A real-time attendance system using Haar Cascade and LBPH face recognition, paired with a Flask monitoring interface. The work focuses on keeping computer-vision inference practical on resource-constrained devices.',
    stack: ['Python', 'OpenCV', 'Flask', 'Haar Cascade', 'LBPH'],
    accent: 'dark',
    link: 'https://doi.org/10.26438/ijsrms/v12i2.19',
    featured: true
  },
  {
    id: 'rentrflow',
    number: '02',
    category: 'HACKATHON / FULL STACK',
    year: '2026',
    title: 'RentrFlow',
    short: 'A workflow platform for contractor and rental operations.',
    description:
      'Led the Tech Saviours team through the design and delivery of an end-to-end workflow management platform for contractor and rental tracking, from architecture through final presentation.',
    stack: ['React', 'Full Stack', 'REST API', 'Team Lead'],
    accent: 'red',
    link: 'https://github.com/dharani-v07/RentrFlow',
    github: 'https://github.com/dharani-v07/RentrFlow',
    featured: true
  },
  {
    id: 'workflow-manager',
    number: '03',
    category: 'AUTOMATION / FULL STACK',
    year: '2026',
    title: 'Workflow Manager',
    short: 'Automated task orchestration and workflow lifecycle execution.',
    description:
      'A robust workflow automation engine engineered to coordinate multi-stage task pipelines, manage dependencies, and monitor state transitions with intuitive control and real-time execution tracking.',
    stack: ['TypeScript', 'React', 'Node.js', 'REST API', 'Automation'],
    accent: 'dark',
    link: 'https://github.com/dharani-v07/Workflow-Manager',
    github: 'https://github.com/dharani-v07/Workflow-Manager',
    featured: true
  },
  {
    id: 'linux-toolkit',
    number: '04',
    category: 'SYSTEMS / AUTOMATION',
    year: '2026',
    title: 'Dharani Linux Toolkit',
    short: 'Modular Linux administration, diagnostics, and system automation utilities.',
    description:
      'A modular suite of shell automation utilities and system diagnostics designed for rapid Linux server maintenance, automated environment provisioning, log analysis, and proactive system health checks.',
    stack: ['Bash', 'Linux', 'Shell Scripting', 'System Diagnostics', 'CLI'],
    accent: 'red',
    link: 'https://github.com/dharani-v07/Dharani_LinuxToolkit',
    github: 'https://github.com/dharani-v07/Dharani_LinuxToolkit',
    featured: true
  },
  {
    id: 'chess',
    number: '05',
    category: 'ANDROID / MOBILE',
    year: '2025',
    title: 'Chess Arena',
    short: 'A polished Android chess experience with persistent player data.',
    description:
      'A full-featured Android chess application with authentication, player profiles, gameplay logic and Material Design 3 UI, structured around clean MVVM patterns and local persistence.',
    stack: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Retrofit'],
    accent: 'light',
    link: 'https://github.com/dharani-v07/Chess-Arena',
    github: 'https://github.com/dharani-v07/Chess-Arena',
    featured: true
  },
  {
    id: 'quicknote',
    number: '06',
    category: 'WEB APP',
    year: '2025',
    title: 'Quick Note',
    short: 'Simple note management with a real REST backend.',
    description:
      'A responsive note-management application backed by Flask and SQLite, with CRUD workflows, persistent storage and a clean browser interface.',
    stack: ['Python', 'Flask', 'SQLite', 'REST'],
    accent: 'light',
    link: 'https://github.com/dharani-v07/Quick-Note-Application',
    github: 'https://github.com/dharani-v07/Quick-Note-Application',
    featured: true
  },
  {
    id: 'availability',
    number: '07',
    category: 'WEB APP / REACT',
    year: '2025',
    title: 'Team Availability Tracker',
    short: 'A focused dashboard for live team availability.',
    description:
      'A React dashboard using state-driven availability toggles, conditional rendering, statistics and local storage to keep a lightweight team view useful without a heavy backend.',
    stack: ['React', 'JavaScript', 'Local Storage', 'UI'],
    accent: 'red',
    link: 'https://github.com/dharani-v07/Team-Availability-Tracker',
    github: 'https://github.com/dharani-v07/Team-Availability-Tracker',
    featured: true
  },
  {
    id: 'coffee',
    number: '08',
    category: 'WEB APP / API',
    year: '2025',
    title: 'Coffee Rating',
    short: 'Voting, persistence and API design in one compact app.',
    description:
      'A voting-based application with REST endpoints, real-time vote tracking and SQLite persistence, designed as a practical exercise in backend-first product thinking.',
    stack: ['Flask', 'SQLite', 'REST API'],
    accent: 'dark',
    link: 'https://github.com/dharani-v07/Coffee-Rating-Application',
    github: 'https://github.com/dharani-v07/Coffee-Rating-Application',
    featured: true
  },
  {
    id: 'quotes',
    number: '09',
    category: 'WEB APP / API',
    year: '2025',
    title: 'Quote Generator',
    short: 'External API integration with local history.',
    description:
      'An external quote API integration that automatically stores quote history in SQLite and provides simple management controls.',
    stack: ['Python', 'Flask', 'External API'],
    accent: 'light',
    link: 'https://github.com/dharani-v07/Quote-Generator-with-History',
    github: 'https://github.com/dharani-v07/Quote-Generator-with-History'
  },
  {
    id: 'profile',
    number: '10',
    category: 'WEB APP / GENERATOR',
    year: '2025',
    title: 'Profile Card Generator',
    short: 'Live profile generation from structured user input.',
    description:
      'A dynamic profile generator supporting form input, image URLs, local uploads and immediate live rendering in the browser.',
    stack: ['Flask', 'HTML', 'CSS', 'JavaScript'],
    accent: 'red',
    link: 'https://github.com/dharani-v07/User-Profile-Card-Generator',
    github: 'https://github.com/dharani-v07/User-Profile-Card-Generator'
  }
]

