import type { Brand } from '@/types/content';

// Existing brand marks (monochrome line-art SVGs).
import ansika from '@/assets/brandWorkWith/ansika.svg';
import carefirst from '@/assets/brandWorkWith/carefirst.svg';
import ewaan from '@/assets/brandWorkWith/Ewaan.svg';
import gourmet from '@/assets/brandWorkWith/gourmet.svg';
import oculus from '@/assets/brandWorkWith/Oculus.svg';
import pretty from '@/assets/brandWorkWith/pretty.svg';
import techConnect from '@/assets/brandWorkWith/tech-connect.svg';

// Newer client logos (web-optimized from src/assets/brandWorkWith/CrevoPro/*).
import bumpkins from '@/assets/brandWorkWith/clients/bumpkins.png';
import comfero from '@/assets/brandWorkWith/clients/comfero.png';
import drAnshika from '@/assets/brandWorkWith/clients/dr-anshika.png';
import drDivya from '@/assets/brandWorkWith/clients/dr-divya.png';
import enginGuy from '@/assets/brandWorkWith/clients/engin-guy.png';
import flyingSnap from '@/assets/brandWorkWith/clients/flying-snap.png';
import pizzaMaestro from '@/assets/brandWorkWith/clients/pizza-maestro.png';
import turkishDastarkhawan from '@/assets/brandWorkWith/clients/turkish-dastarkhawan.png';

/**
 * Brands shown in the hero marquee, in display order.
 * Data-driven — add a new entry here and the marquee picks it up automatically.
 * "Ewaan Lifts" and the CrevoPro own-logo folder are intentionally excluded
 * (Ewaan already present above; CrevoPro is not a client).
 */
export const brands: Brand[] = [
  { name: 'Gourmet', logo: gourmet },
  { name: 'Ewaan', logo: ewaan },
  { name: 'Ansika', logo: ansika },
  { name: 'Oculus', logo: oculus },
  { name: 'Tech Connect', logo: techConnect },
  { name: 'Care First', logo: carefirst },
  { name: 'Pretty', logo: pretty },
  { name: 'Bumpkins', logo: bumpkins },
  { name: 'Comfero', logo: comfero },
  { name: 'Dr. Anshika', logo: drAnshika },
  { name: 'Dr. Divya', logo: drDivya },
  { name: 'Engin Guy', logo: enginGuy },
  { name: 'Flying Snap', logo: flyingSnap },
  { name: 'Pizza Maestro', logo: pizzaMaestro },
  { name: 'Turkish Dastarkhawan', logo: turkishDastarkhawan },
];
