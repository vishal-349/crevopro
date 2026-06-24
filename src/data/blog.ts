import type { BlogPost } from '@/types/content';

import blog1 from '@/assets/blog1.svg';
import blog2 from '@/assets/blog2.svg';
import blog3 from '@/assets/blog3.svg';

export const blogPosts: BlogPost[] = [
  { id: 1, title: 'Top Graphic Design Blogs', image: blog1, category: 'Design' },
  { id: 2, title: 'Top Digital Marketing Blogs', image: blog2, category: 'Marketing' },
  { id: 3, title: 'Top Web Design Blogs', image: blog3, category: 'Web' },
];
