import type { Service } from '@/types/content';

import graphicDesignIcon from '@/assets/graphic-design.svg';
import digitalMarketingIcon from '@/assets/digitalMarketing.svg';
import webDesignIcon from '@/assets/websiteDesign.svg';
import ecommerceIcon from '@/assets/eccomerce.svg';
import outdoorIcon from '@/assets/outdoorAdvertising.svg';

export const services: Service[] = [
  {
    id: 1,
    slug: 'graphic-design',
    icon: graphicDesignIcon,
    title: 'Graphic Design',
    description:
      'Professional graphic design services for all your branding and marketing needs, including logo design, brand identity, print materials, and digital assets.',
    accent: { from: '#FF6FD8', to: '#A78BFA' },
  },
  {
    id: 2,
    slug: 'digital-marketing',
    icon: digitalMarketingIcon,
    title: 'Digital Marketing',
    description:
      'Strategic digital marketing campaigns to boost your online presence and reach, including SEO, social media marketing, content strategy, and paid advertising.',
    accent: { from: '#FF8A3D', to: '#FF4D6D' },
  },
  {
    id: 3,
    slug: 'website-design',
    icon: webDesignIcon,
    title: 'Website Design',
    description:
      'Custom website design and development for businesses of all sizes, focusing on user experience, responsive design, and conversion optimization.',
    accent: { from: '#3DA8FF', to: '#5EEAD4' },
  },
  {
    id: 4,
    slug: 'ecommerce-solutions',
    icon: ecommerceIcon,
    title: 'E-commerce Solutions',
    description:
      'Complete e-commerce solutions to help you sell products online effectively, including store setup, payment integration, and inventory management.',
    accent: { from: '#05FB8D', to: '#00C2A8' },
  },
  {
    id: 5,
    slug: 'outdoor-advertising',
    icon: outdoorIcon,
    title: 'Outdoor & LED Advertising',
    description:
      'High-impact advertising on large LED screens, digital billboards, mall screens, and roadside displays — campaign planning, creative, and citywide reach.',
    accent: { from: '#FFE53B', to: '#FF2EC4' },
  },
];
