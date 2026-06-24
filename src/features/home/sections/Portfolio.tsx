import { useState } from 'react';
import { motion } from 'framer-motion';

import { portfolioCategories, portfolioItems } from '@/data/portfolio';
import type { PortfolioCategory } from '@/types/content';

type CategoryFilter = 'All' | PortfolioCategory;

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const filteredItems =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio-container">
        <motion.h2
          className="portfolio-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          PORTFOLIO
        </motion.h2>

        <motion.div
          className="portfolio-filter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {portfolioCategories.map((category) => (
            <button
              key={category}
              className={`portfolio-filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="portfolio-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="portfolio-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: item.id * 0.05 }}
              whileHover={{ y: -10 }}
            >
              <img src={item.image} alt={item.title} />
              <div className="portfolio-overlay"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
