import type { BlogPost } from '@/types/content';

import blog1 from '@/assets/blog1.svg';
import blog2 from '@/assets/blog2.svg';
import blog3 from '@/assets/blog3.svg';

export const blogPosts: BlogPost[] = [
  { id: 1, title: 'Brand Identity & Creative Blogs', image: blog1, category: 'Brand' },
  { id: 2, title: 'Social Media Marketing Blogs', image: blog2, category: 'Marketing' },
  { id: 3, title: 'Web Design & Development Blogs', image: blog3, category: 'Web' },
];
