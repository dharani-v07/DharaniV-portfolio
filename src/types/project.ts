export type ProjectAccent = 'red' | 'light' | 'dark'

export type ProjectCategory =
  | 'ALL'
  | 'RESEARCH'
  | 'HACKATHON'
  | 'ANDROID'
  | 'WEB APP'
  | 'COMPUTER VISION'
  | 'FULL STACK'
  | 'AUTOMATION'
  | 'SYSTEMS'
  | 'DEV TOOLS'

export interface Project {
  id: string
  number: string
  category: string
  year: string
  title: string
  short: string
  description: string
  stack: string[]
  accent: ProjectAccent
  link?: string
  github?: string
  featured?: boolean
}
