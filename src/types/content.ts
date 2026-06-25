/** Shared content types for the marketing site's static data. */

export interface Brand {
  name: string;
  logo: string;
}

export interface ServiceAccent {
  from: string;
  to: string;
}

export interface Service {
  id: number;
  slug: string;
  icon: string;
  title: string;
  description: string;
  accent: ServiceAccent;
}

export interface ServiceStat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceHighlight {
  title: string;
  category: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  heroDescription: string;
  stats: ServiceStat[];
  whatWeDo: ServiceFeature[];
  process: ServiceProcessStep[];
  benefits: ServiceFeature[];
  highlights: ServiceHighlight[];
  whyChooseUs: ServiceFeature[];
  faqs: ServiceFaq[];
  ctaHeading: string;
  ctaText: string;
}

export type PortfolioCategory =
  | 'Advertising & Marketing'
  | 'Logo Design'
  | 'Banner Poster'
  | 'Catalogue';

export interface PortfolioItem {
  id: number;
  title: string;
  category: PortfolioCategory;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  companyLogo?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ProblemSolved {
  id: number;
  title: string;
  description: string;
  /** Icon key resolved to an inline SVG in the Problems component. */
  icon: 'leads' | 'visibility' | 'conversion' | 'strategy';
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  /** Icon key resolved to an inline SVG in the Process component. */
  icon: 'discover' | 'strategy' | 'execute' | 'optimize';
}

export interface BlogPost {
  id: number;
  title: string;
  image: string;
  category: string;
}

export interface Stat {
  id: number;
  title: string;
  value: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
  isButton?: boolean;
  /** When true, href is an app route (e.g. /portfolio) rather than an in-page anchor. */
  isRoute?: boolean;
}
