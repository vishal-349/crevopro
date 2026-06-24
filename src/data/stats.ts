import type { Stat } from '@/types/content';

import calendarIcon from '@/assets/calender.svg';
import digitalSolutionIcon from '@/assets/digitalSolution.svg';
import happyClients from '@/assets/happy_customer.webp';

export const stats: Stat[] = [
  { id: 1, title: 'Years Served', value: '03+', icon: calendarIcon },
  { id: 2, title: 'Digital solutions delivered', value: '100+', icon: digitalSolutionIcon },
  { id: 3, title: 'Happy clients worldwide', value: '50+', icon: happyClients },
];
