export interface ExperienceItem {
  id: string
  period: string
  role: string
  organization: string
  description: string
  badgeNumber: string
  badgeLabel: string
  highlights?: string[]
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  period: string
  score: string
  honors?: string
}
