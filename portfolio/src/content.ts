export const links = {
  email: 'bezaalehegn23@gmail.com',
  github: 'https://github.com/pazion233',
  linkedin: 'https://www.linkedin.com/in/beza-alehegn-9549443b2',
  telegram: 'https://t.me/Freaknbez',
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
]

export const facts: [string, string][] = [
  ['University', 'Bahir Dar University'],
  ['Graduation', 'Class of 2027'],
  ['Focus', 'Enterprise systems & full-stack'],
  ['Status', 'Open to internships & projects'],
]

export interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo?: string
}

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`

export const projects: Project[] = [
  {
    title: 'STV-SSR: Shift Reminder & Confirmation',
    description:
      'Smart Staff Schedule Reminder and Shift Confirmation System for Amhara Media Corporation. Reminders go out at least 4 hours before a shift, staff confirm within 30 minutes, and duties are reassigned to same-role colleagues when someone is unavailable. Amharic and English message templates.',
    image: u('photo-1598488035139-bdbb2231ce04'),
    tags: ['Requirements (IEEE 830)', 'Scheduling logic', 'Amharic / English', 'Broadcast operations'],
    github: links.github,
  },
  {
    title: 'Full-Stack E-Commerce Platform',
    description: 'Online storefront with secure authentication, cart state, catalog filtering, and order handling.',
    image: u('photo-1557821552-17105176677c'),
    tags: ['React', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    github: links.github,
  },
  {
    title: 'Enterprise Task & Sprint Management',
    description: 'Agile tracker with drag-and-drop kanban boards, milestone analytics, and sprint tracking.',
    image: u('photo-1507238691740-187a5b1d37b8'),
    tags: ['TypeScript', 'React', 'Tailwind', 'REST API'],
    github: links.github,
  },
  {
    title: 'Hospitality & Dining Reservation Suite',
    description: 'Restaurant landing and reservation app with table seating logic, event booking, and confirmations.',
    image: u('photo-1517248135467-4c7edcad34c4'),
    tags: ['JavaScript', 'HTML5', 'Tailwind CSS', 'Vite'],
    github: links.github,
  },
  {
    title: 'Interactive Knowledge Assessment System',
    description: 'Quiz platform with category selection, animated timers, and performance scorecards.',
    image: u('photo-1606326608606-aa0b62935f2b'),
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    github: links.github,
  },
  {
    title: 'Campus Event & Ticketing Portal',
    description: 'Registration portal for university summits with QR ticket generation and capacity tracking.',
    image: u('photo-1492684223066-81342ee5ff30'),
    tags: ['HTML5', 'Tailwind CSS', 'Node.js'],
    github: links.github,
  },
  {
    title: 'Interactive 3D Portfolio',
    description: 'This site: a Spline 3D hero, a WebGL liquid-glass project carousel, and a scroll-driven timeline.',
    image: u('photo-1555066931-4365d14bab8c'),
    tags: ['React 18', 'Spline 3D', 'Tailwind CSS', 'Framer Motion'],
    github: links.github,
  },
]
