import type { Service } from '@/types/content';

import brandIdentityIcon from '@/assets/graphic-design.svg';
import socialMediaIcon from '@/assets/digitalMarketing.svg';
import performanceIcon from '@/assets/performanceMarketing.svg';
import brandShootIcon from '@/assets/brandShoot.svg';
import signageIcon from '@/assets/outdoorAdvertising.svg';
import webIcon from '@/assets/websiteDesign.svg';

export const services: Service[] = [
  {
    id: 1,
    slug: 'brand-identity-creative',
    icon: brandIdentityIcon,
    title: 'Brand Identity & Creative',
    description:
      'Logos, brand identity, and scroll-stopping creatives that make your brand instantly recognisable and impossible to ignore.',
    accent: { from: '#FF6FD8', to: '#A78BFA' },
  },
  {
    id: 2,
    slug: 'social-media-marketing',
    icon: socialMediaIcon,
    title: 'Social Media Marketing',
    description:
      'Always-on social content, reels, and community management that grow your audience and keep your brand top of mind.',
    accent: { from: '#FF8A3D', to: '#FF4D6D' },
  },
  {
    id: 3,
    slug: 'web-design-development',
    icon: webIcon,
    title: 'Web Design & Development',
    description:
      'Fast, responsive, conversion-focused websites — designed around your users and engineered to rank well and sell.',
    accent: { from: '#3DA8FF', to: '#5EEAD4' },
  },
  {
    id: 4,
    slug: 'performance-marketing',
    icon: performanceIcon,
    title: 'Performance Marketing',
    description:
      'Data-driven Meta & Google ad campaigns engineered for a lower cost per lead and a measurable return on ad spend.',
    accent: { from: '#05FB8D', to: '#00C2A8' },
  },
  {
    id: 5,
    slug: 'brand-shoot-editing',
    icon: brandShootIcon,
    title: 'Brand Shoot & Editing',
    description:
      'Professional brand shoots, product photography, and reel/video editing that make every piece of content look premium.',
    accent: { from: '#7C5CFF', to: '#FF6FD8' },
  },
  {
    id: 6,
    slug: 'digital-signage',
    icon: signageIcon,
    title: 'Digital Signage',
    description:
      'High-impact advertising on LED screens, digital billboards, and mall displays for maximum visibility and citywide reach.',
    accent: { from: '#FFE53B', to: '#FF2EC4' },
  },
];
