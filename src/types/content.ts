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

/** One purchasable package shown on the pricing page. */
export interface PricePackage {
  id: string;
  name: string;
  /** Display figure, e.g. '₹4,999' — or 'Custom Quote' where there is no fixed rate. */
  price: string;
  /** Qualifier shown beside the figure, e.g. 'starting from' or '/ month'. */
  unit?: string;
  description?: string;
  features: string[];
  /** Named panels bundled with the package (e-commerce / app builds). */
  panels?: { label: string; items: string[] };
  note?: string;
  /** Highlights the card and shows a "Recommended" badge. */
  featured?: boolean;
}

/** One service/rate row inside a rate table. */
export interface PriceSummaryItem {
  label: string;
  price: string;
}

/** A labelled rate table, mirroring the rate cards in the PDF deck. */
export interface PriceTable {
  label: string;
  items: PriceSummaryItem[];
  note?: string;
}

/** Side-by-side comparison of two packages within a group. */
export interface PriceComparison {
  heading: string;
  columns: string[];
  rows: { label: string; values: string[] }[];
}

export interface PriceGroup {
  /** Anchor id used for in-page links. */
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  packages?: PricePackage[];
  /** Rate tables rendered side by side beneath any packages. */
  tables?: PriceTable[];
  comparison?: PriceComparison;
  /** Terms list, shown as the closing block of its section. */
  terms?: string[];
}

/** Homepage teaser card linking through to the pricing page. */
export interface PriceTeaser {
  id: string;
  title: string;
  price: string;
  unit: string;
  blurb: string;
}
