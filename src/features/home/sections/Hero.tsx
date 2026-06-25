import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import heroImage from '@/assets/hero.svg';
import { brands } from '@/data/brands';
import { createStaggerContainer, fadeUpItem } from '@/lib/animations';

const containerVariants = createStaggerContainer(0.22, 0.2);

// Rendered twice so the CSS marquee (translateX 0 → -50%) loops seamlessly.
const marqueeLogos = [...brands, ...brands];

const ARROW =
  'M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z';

const HERO_STATS: { value: string; label: string; icon: ReactNode }[] = [
  {
    value: '+250%',
    label: 'Average Revenue Growth',
    icon: (
      <path d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z" />
    ),
  },
  {
    value: '3.5x',
    label: 'Average ROAS Generated',
    icon: (
      <>
        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
        <path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
      </>
    ),
  },
  {
    value: '25+',
    label: 'Brands Scaled',
    icon: (
      <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
    ),
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={fadeUpItem} className="hero-title">
            We Turn Brands Into <br />
            <span>Revenue-Generating Machines</span>
          </motion.h1>

          <motion.p
            variants={fadeUpItem}
            className="hero-subtitle"
            style={{ fontSize: '1.15rem', fontWeight: 400, lineHeight: 1.6, maxWidth: '34rem' }}
          >
            Creative Design, Performance Marketing &amp; Digital Strategies that help businesses
            attract customers and scale faster.
          </motion.p>

          <motion.div className="hero-cta" variants={fadeUpItem}>
            <Link to="/#contact" className="hero-btn hero-btn--primary">
              Book Free Strategy Call
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d={ARROW} />
              </svg>
            </Link>
            <Link to="/portfolio" className="hero-btn hero-btn--ghost">
              View Our Results
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d={ARROW} />
              </svg>
            </Link>
          </motion.div>

          <motion.div className="brands-section" variants={fadeUpItem}>
            <h3 className="brands-title">Trusted by 25+ businesses worldwide</h3>

            <div className="brands-marquee-wrapper">
              <div className="brands-track">
                {marqueeLogos.map((brand, index) => (
                  <div
                    className="brand-item"
                    key={`${brand.name}-${index}`}
                    aria-hidden={index >= brands.length}
                  >
                    <img src={brand.logo} alt={brand.name} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="hero-image-wrapper">
          <motion.img
            src={heroImage}
            alt="Hero"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hero-statue"
          />

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {HERO_STATS.map((stat) => (
              <div className="hero-stat" key={stat.label}>
                <span className="hero-stat__icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                    {stat.icon}
                  </svg>
                </span>
                <span className="hero-stat__value">{stat.value}</span>
                <span className="hero-stat__label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
