export interface SocialLink {
  name: string
  url: string
  icon?: string
}

export interface MetricItem {
  value: string
  label: string
}

export interface ProfileInfo {
  name: string
  initials: string
  eyebrow: string
  tagline: string
  location: string
  availability: string
  email: string
  leadBio: string
  secondaryBio: string
  metrics: MetricItem[]
  socialLinks: SocialLink[]
}
