import type { FooterColumn, NavLink } from '@/types/content';

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Our Work', href: '#portfolio' },
  { label: 'Why Crevopro', href: '#why' },
  { label: 'Contact', href: '#contact', isButton: true },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Graphic Designing',
    links: [
      'Logo Design',
      'Brand Identity',
      'Social Media Graphics',
      'Print Materials',
      'Packaging Design',
      'Illustration',
      'Marketing Collateral',
    ],
  },
  {
    title: 'Web Designing',
    links: [
      'Website Design',
      'UI/UX Design',
      'Responsive Design',
      'Landing Pages',
      'Website Redesign',
      'Mobile App Design',
      'Custom Web Applications',
    ],
  },
  {
    title: 'Digital Marketing',
    links: [
      'SEO Optimization',
      'Social Media Marketing',
      'Content Marketing',
      'Email Marketing',
      'PPC Advertising',
      'Analytics & Reporting',
      'Marketing Strategy',
    ],
  },
  {
    title: 'E-commerce Management',
    links: [
      'Online Store Setup',
      'Product Management',
      'Payment Gateway Integration',
      'Inventory Management',
      'Order Fulfillment',
      'E-commerce Marketing',
      'Customer Support',
    ],
  },
];

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export const contactInfo: ContactInfo = {
  address: 'Dehradun, Uttarakhand, India',
  phone: '+91 703 7792 988',
  email: 'infocrevopro@gmail.com',
};

export interface SocialLink {
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61576661860797' },
  { label: 'Twitter', href: 'https://x.com/CrevoPro' },
  { label: 'WhatsApp', href: 'https://wa.me/917037792988' },
  { label: 'Instagram', href: 'https://www.instagram.com/crevopro/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/crevo-pro-a216ab368/' },
];
