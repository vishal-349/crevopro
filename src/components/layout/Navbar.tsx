import { useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import { motion } from 'framer-motion';

import logo from '@/assets/logo.svg';
import { navLinks } from '@/data/navigation';
import { useScrolled } from '@/hooks/useScrolled';

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

// Maps a search term to the page section it should jump to (single-page site).
const SEARCH_INDEX: { id: string; keywords: string[] }[] = [
  { id: 'about', keywords: ['about', 'team', 'who', 'agency', 'company'] },
  {
    id: 'services',
    keywords: [
      'service',
      'services',
      'graphic',
      'design',
      'marketing',
      'digital',
      'web',
      'website',
      'ecommerce',
      'e-commerce',
      'commerce',
      'seo',
    ],
  },
  {
    id: 'portfolio',
    keywords: ['portfolio', 'work', 'works', 'project', 'projects', 'logo', 'banner', 'catalogue', 'catalog', 'poster'],
  },
  { id: 'why', keywords: ['why', 'stats', 'years', 'clients', 'experience'] },
  { id: 'testimonials', keywords: ['testimonial', 'testimonials', 'feedback', 'review', 'reviews'] },
  { id: 'blog', keywords: ['blog', 'blogs', 'article', 'articles', 'insight', 'insights'] },
  {
    id: 'contact',
    keywords: ['contact', 'appointment', 'book', 'collaborate', 'enquiry', 'inquiry', 'quote', 'email', 'phone', 'reach', 'hire'],
  },
];

function findSectionId(query: string): string | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  for (const section of SEARCH_INDEX) {
    if (section.id.includes(q) || section.keywords.some((k) => k.includes(q) || q.includes(k))) {
      return section.id;
    }
  }
  return null;
}

export default function Navbar() {
  const scrolled = useScrolled(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const closeMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((open) => !open);

  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sectionId = findSectionId(searchValue);
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
      setSearchValue('');
    }
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="navbar-container">
        <motion.div className="navbar-logo" variants={itemVariants}>
          <a href="#home" onClick={scrollToTop} aria-label="CrevoPro — back to top">
            <img src={logo} alt="CrevoPro" />
          </a>
        </motion.div>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <motion.ul variants={navVariants}>
            {navLinks.map((link) => (
              <motion.li key={link.href} variants={itemVariants}>
                <a
                  href={link.href}
                  className={link.isButton ? 'contact-btn' : undefined}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="navbar-search">
          <motion.form onSubmit={handleSearchSubmit} className="search-form" variants={itemVariants}>
            <div className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                aria-label="Search the site"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>
          </motion.form>
        </div>

        <div className="hamburger" onClick={toggleMobileMenu}>
          <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </motion.nav>
  );
}
