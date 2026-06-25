export interface SiteConfig {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  url: string;
  owner: {
    name: string;
    shortName: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
  social: {
    twitter: string;
    linkedin: string;
    youtube: string;
  };
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface Capability {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Program {
  id: string;
  title: string;
  duration: string;
  description: string;
  features: string[];
  badge: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Startup {
  id: string;
  name: string;
  sector: string;
  description: string;
  stage: string;
  year: string;
  website?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  published?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  url?: string;
}

export interface Value {
  id: string;
  title: string;
  description: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  event: string;
}

export interface ApplicationStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface ApplicationSubmission {
  id: string;
  founderName: string;
  email: string;
  startupName: string;
  program: string;
  sector: string;
  stage: string;
  pitch: string;
  website?: string;
  createdAt: string;
}

export interface SiteContent {
  siteConfig: SiteConfig;
  stats: Stat[];
  capabilities: Capability[];
  programs: Program[];
  services: Service[];
  startups: Startup[];
  testimonials: Testimonial[];
  news: NewsItem[];
  resources: Resource[];
  values: Value[];
  timeline: TimelineItem[];
  applicationSteps: ApplicationStep[];
  contactSubmissions: ContactSubmission[];
  applicationSubmissions: ApplicationSubmission[];
}

export type ContentCollection = keyof Omit<
  SiteContent,
  "siteConfig" | "contactSubmissions" | "applicationSubmissions"
>;

export const COLLECTIONS: ContentCollection[] = [
  "stats",
  "capabilities",
  "programs",
  "services",
  "startups",
  "testimonials",
  "news",
  "resources",
  "values",
  "timeline",
  "applicationSteps",
];
