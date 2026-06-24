import type { Brand } from '@/types/content';

import ansika from '@/assets/brandWorkWith/ansika.svg';
import carefirst from '@/assets/brandWorkWith/carefirst.svg';
import ewaan from '@/assets/brandWorkWith/Ewaan.svg';
import gourmet from '@/assets/brandWorkWith/gourmet.svg';
import oculus from '@/assets/brandWorkWith/Oculus.svg';
import pretty from '@/assets/brandWorkWith/pretty.svg';
import techConnect from '@/assets/brandWorkWith/tech-connect.svg';

/** Brands shown in the hero marquee, in display order. */
export const brands: Brand[] = [
  { name: 'Gourmet', logo: gourmet },
  { name: 'Ewaan', logo: ewaan },
  { name: 'Ansika', logo: ansika },
  { name: 'Oculus', logo: oculus },
  { name: 'Tech Connect', logo: techConnect },
  { name: 'Care First', logo: carefirst },
  { name: 'Pretty', logo: pretty },
];
