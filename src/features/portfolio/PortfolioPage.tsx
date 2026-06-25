import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { portfolioCategories, portfolioItems } from '@/data/portfolio';
import type { PortfolioCategory } from '@/types/content';
import './portfolioPage.scss';

type CategoryFilter = 'All' | PortfolioCategory;

export default function PortfolioPage() {
  const [active, setActive] = useState<CategoryFilter>('All');

  const items =
    active === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === active);

  return (
    <div className="pf-page">
      <Navbar />

      <header className="pf-hero">
        <motion.div
          className="pf-hero__orb"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="pf-hero__inner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="pf-hero__eyebrow">Our Work</span>
          <h1 className="pf-hero__title">Portfolio</h1>
          <p className="pf-hero__subtitle">
            A selection of the brands, campaigns, and creatives we&apos;ve crafted — from logos and
            banners to full marketing pushes.
          </p>
          <Link to="/#contact" className="pf-hero__cta">
            Start your project
          </Link>
        </motion.div>
      </header>

      <main className="pf-main">
        <div className="pf-filter" role="tablist" aria-label="Filter portfolio by category">
          {portfolioCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              className={`pf-filter__btn ${active === category ? 'is-active' : ''}`}
              onClick={() => setActive(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div className="pf-grid" layout>
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.figure
                key={item.id}
                className="pf-card"
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <img className="pf-card__img" src={item.image} alt={item.title} loading="lazy" />
                <figcaption className="pf-card__overlay">
                  <span className="pf-card__cat">{item.category}</span>
                  <span className="pf-card__title">{item.title}</span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
