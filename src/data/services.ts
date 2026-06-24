import type { Service } from '@/types/content';

import graphicDesignIcon from '@/assets/graphic-design.svg';
import digitalMarketingIcon from '@/assets/digitalMarketing.svg';
import webDesignIcon from '@/assets/websiteDesign.svg';
import ecommerceIcon from '@/assets/eccomerce.svg';

export const services: Service[] = [
  {
    id: 1,
    icon: graphicDesignIcon,
    title: 'Graphic Design',
    description:
      'Professional graphic design services for all your branding and marketing needs, including logo design, brand identity, print materials, and digital assets.',
  },
  {
    id: 2,
    icon: digitalMarketingIcon,
    title: 'Digital Marketing',
    description:
      'Strategic digital marketing campaigns to boost your online presence and reach, including SEO, social media marketing, content strategy, and paid advertising.',
  },
  {
    id: 3,
    icon: webDesignIcon,
    title: 'Website Design',
    description:
      'Custom website design and development for businesses of all sizes, focusing on user experience, responsive design, and conversion optimization.',
  },
  {
    id: 4,
    icon: ecommerceIcon,
    title: 'E-commerce Solutions',
    description:
      'Complete e-commerce solutions to help you sell products online effectively, including store setup, payment integration, and inventory management.',
  },
];
