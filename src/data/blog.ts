import type { BlogPost } from '@/types/content';

import blog1 from '@/assets/blog1.svg';
import blog2 from '@/assets/blog2.svg';
import blog3 from '@/assets/blog3.svg';

export const blogPosts: BlogPost[] = [
  { id: 1, title: 'Brand Identity & Creative Blogs', image: blog1, category: 'Brand' },
  { id: 2, title: 'Social Media Marketing Blogs', image: blog2, category: 'Marketing' },
  { id: 3, title: 'Web Design & Development Blogs', image: blog3, category: 'Web' },
  // NOTE: new cards reuse the existing blog artwork — swap in dedicated images later.
  { id: 4, title: 'Performance Marketing Blogs', image: blog2, category: 'Marketing' },
  { id: 5, title: 'Digital Signage Blogs', image: blog3, category: 'Signage' },
  { id: 6, title: 'Brand Shoot & Editing Blogs', image: blog1, category: 'Production' },
];
