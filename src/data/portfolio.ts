import type { PortfolioCategory, PortfolioItem } from '@/types/content';

import market1 from '@/assets/portfoliio/market1.svg';
import market2 from '@/assets/portfoliio/market2.svg';
import market3 from '@/assets/portfoliio/market3.svg';
import market4 from '@/assets/portfoliio/market4.svg';
import logo1 from '@/assets/portfoliio/logo1.svg';
import logo2 from '@/assets/portfoliio/logo2.svg';
import logo3 from '@/assets/portfoliio/logo3.webp';
import logo4 from '@/assets/portfoliio/logo4.svg';
import banner1 from '@/assets/portfoliio/banner1.svg';
import banner2 from '@/assets/portfoliio/banner2.svg';
import banner3 from '@/assets/portfoliio/banner3.svg';
import banner4 from '@/assets/portfoliio/banner4.svg';
import catalouge1 from '@/assets/portfoliio/catalouge1.svg';
import catalouge2 from '@/assets/portfoliio/catalouge2.svg';
import catalouge3 from '@/assets/portfoliio/catalouge3.svg';
import catalouge4 from '@/assets/portfoliio/catalouge4.svg';

export const portfolioItems: PortfolioItem[] = [
  { id: 1, title: 'Shopping Cart Discount', category: 'Advertising & Marketing', image: market1 },
  { id: 2, title: 'Natural Wall Colors', category: 'Logo Design', image: logo1 },
  { id: 3, title: 'Organic Colors Guide', category: 'Banner Poster', image: banner1 },
  { id: 4, title: 'Natural Preserved Fruits', category: 'Catalogue', image: catalouge1 },
  {
    id: 5,
    title: 'From Challenges to Change',
    category: 'Advertising & Marketing',
    image: market2,
  },
  { id: 6, title: 'Work in Australia', category: 'Banner Poster', image: banner2 },
  { id: 7, title: 'Business Boost', category: 'Advertising & Marketing', image: market3 },
  { id: 8, title: 'Engine Oil Product', category: 'Catalogue', image: catalouge2 },
  { id: 9, title: 'Saxophone Lessons', category: 'Logo Design', image: logo2 },
  { id: 10, title: 'Smooth Ride', category: 'Banner Poster', image: banner3 },
  { id: 11, title: 'Car Wash Service', category: 'Advertising & Marketing', image: market4 },
  { id: 12, title: 'Air Filters Guide', category: 'Catalogue', image: catalouge3 },
  { id: 13, title: 'Battery Service', category: 'Logo Design', image: logo3 },
  { id: 14, title: 'Car Cleaning', category: 'Banner Poster', image: banner4 },
  { id: 15, title: 'Coolant Service', category: 'Logo Design', image: logo4 },
  { id: 16, title: 'Blue Dream House', category: 'Catalogue', image: catalouge4 },
];

export const portfolioCategories: Array<'All' | PortfolioCategory> = [
  'All',
  'Advertising & Marketing',
  'Logo Design',
  'Banner Poster',
  'Catalogue',
];
