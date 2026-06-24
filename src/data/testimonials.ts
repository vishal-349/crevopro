import type { Testimonial } from '@/types/content';

import ewaanLogo from '@/assets/brandWorkWith/Ewaan.svg';
import techConnectLogo from '@/assets/brandWorkWith/tech-connect.svg';
import gourmetLogo from '@/assets/brandWorkWith/gourmet.svg';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ewaan Lifts',
    quote:
      '"Working with Crevopro has been a game-changer for our brand. Their designs are creative, clean, and perfectly aligned with our vision. They\'re professional, quick to respond, and always deliver on time."',
    rating: 5,
    companyLogo: ewaanLogo,
  },
  {
    id: 2,
    name: 'Tech Connect',
    quote:
      '"The team at CrevoPro delivered exceptional results for our marketing campaign. Their creativity and attention to detail is unmatched. We\'ve seen a significant increase in engagement since implementing their strategies."',
    rating: 5,
    companyLogo: techConnectLogo,
  },
  {
    id: 3,
    name: 'Gourmet Foods',
    quote:
      '"CrevoPro helped us establish our brand identity from scratch. Their strategic approach and design expertise were exactly what we needed. Our customers love our new look and our sales have increased by 30%."',
    rating: 5,
    companyLogo: gourmetLogo,
  },
];
