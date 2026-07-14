import type { NavLink } from '@/types/content';

export const navLinks: NavLink[] = [
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '/portfolio', isRoute: true },
  { label: 'Our Blog', href: '#blog' },
  { label: 'Contact Us', href: '#contact', isButton: true },
];

export interface ContactInfo {
  address: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
}

export const contactInfo: ContactInfo = {
  address: 'Roorkee, Uttarakhand, 247667',
  phonePrimary: '+91 88594 28724',
  phoneSecondary: '+91 96903 23974',
  email: 'infocrevopro@gmail.com',
};

export const copyrightText = '© 2026 CrevoPro';

/** Footer credit line. ` ` = non-breaking spaces so the extra gap after "Team" isn't collapsed. */
export const creditAuthor = 'Team  CrevoPro';

export interface SocialLink {
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61576661860797' },
  { label: 'WhatsApp', href: 'https://wa.me/918859428724' },
  { label: 'Instagram', href: 'https://www.instagram.com/crevopro/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/crevo-pro-a216ab368/' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/crevopro/' },
];
