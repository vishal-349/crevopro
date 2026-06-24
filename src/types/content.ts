/** Shared content types for the marketing site's static data. */

export interface Brand {
  name: string;
  logo: string;
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
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
  quote: string;
  rating: number;
  companyLogo: string;
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
}

export interface FooterColumn {
  title: string;
  links: string[];
}
